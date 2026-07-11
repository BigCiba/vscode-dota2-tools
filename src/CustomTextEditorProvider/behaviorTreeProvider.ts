import * as vscode from 'vscode';
import { getWebviewContent } from '../utils/getWebViewContent';
import { readKeyValue2, writeKeyValue } from '../utils/kvUtils';
import { localize } from '../utils/localize';

/**
 * Behavior tree node type
 */
export interface BehaviorTreeNode {
	id: string;
	key: string; // English identifier, used as the KV key name
	type: 'Root' | 'Sequence' | 'Selector' | 'Parallel' | 'Condition' | 'Action' | 'Decorator';
	name: string; // Human-readable name, maps to the KV Name field
	description?: string;
	children?: BehaviorTreeNode[];
	x?: number;
	y?: number;
	[key: string]: any; // Other custom properties
}

/**
 * Behavior tree document data
 */
interface BehaviorTreeDocument {
	name: string;
	description?: string;
	root: BehaviorTreeNode;
}

export class BehaviorTreeProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		return vscode.window.registerCustomEditorProvider(
			BehaviorTreeProvider.viewType,
			new BehaviorTreeProvider(context),
			{
				webviewOptions: {
					retainContextWhenHidden: true,
					enableFindWidget: false,
				}
			}
		);
	}

	private static readonly viewType = 'dota2tools.behaviorTree';

	constructor(private readonly context: vscode.ExtensionContext) { }

	public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		webviewPanel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {
		webviewPanel.webview.options = {
			enableScripts: true,
		};

		webviewPanel.webview.html = await getWebviewContent(
			webviewPanel.webview,
			this.context.extensionUri,
			'BehaviorTree'
		);

		let webviewReady = false;
		let pendingData: any = undefined;

		// Send data to the webview
		const postData = (data: any) => {
			if (!webviewReady) {
				pendingData = data;
				return;
			}
			webviewPanel.webview.postMessage({ type: 'update', data });
		};

		// Update the webview
		const updateWebview = () => {
			try {
				const treeData = this.parseDocument(document);
				postData(treeData);
			} catch (error) {
				vscode.window.showErrorMessage(localize('msg_failed_parse_btree', [String(error)]));
			}
		};

		// Listen for document changes
		const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((event) => {
			if (event.document.uri.toString() === document.uri.toString()) {
				updateWebview();
			}
		});

		// Listen for webview messages
		const messageListener = webviewPanel.webview.onDidReceiveMessage((message) => {
			if (!message || typeof message.type !== 'string') {
				return;
			}

			switch (message.type) {
				case 'ready':
					webviewReady = true;
					if (pendingData) {
						postData(pendingData);
						pendingData = undefined;
					} else {
						updateWebview();
					}
					break;

				case 'save':
					this.saveDocument(document, message.data).catch((error) => {
						vscode.window.showErrorMessage(localize('msg_failed_save_btree', [String(error)]));
					});
					break;

				case 'openInTextEditor':
					// Open the text editor on the side
					vscode.commands.executeCommand('vscode.openWith', document.uri, 'default', vscode.ViewColumn.Beside);
					break;

				case 'error':
					vscode.window.showErrorMessage(message.message);
					break;

				case 'saveTemplate':
					this.saveTemplate(message.template).then(() => {
						vscode.window.showInformationMessage(localize('msg_template_saved', [message.template.name]));
						// Send the updated template list
						this.getTemplates().then(templates => {
							webviewPanel.webview.postMessage({ type: 'templatesUpdated', templates });
						});
					}).catch(error => {
						vscode.window.showErrorMessage(localize('msg_failed_save_template', [String(error)]));
					});
					break;

				case 'getTemplates':
					this.getTemplates().then(templates => {
						webviewPanel.webview.postMessage({ type: 'templatesUpdated', templates });
					}).catch(error => {
						vscode.window.showErrorMessage(localize('msg_failed_load_templates', [String(error)]));
					});
					break;

				case 'deleteTemplate':
					this.deleteTemplate(message.templateName).then(() => {
						vscode.window.showInformationMessage(localize('msg_template_deleted', [message.templateName]));
						// Send the updated template list
						this.getTemplates().then(templates => {
							webviewPanel.webview.postMessage({ type: 'templatesUpdated', templates });
						});
					}).catch(error => {
						vscode.window.showErrorMessage(localize('msg_failed_delete_template', [String(error)]));
					});
					break;
			}
		});

		webviewPanel.onDidDispose(() => {
			changeDocumentSubscription.dispose();
			messageListener.dispose();
		});
	}

	/**
	 * Parse the document into behavior tree data
	 */
	private parseDocument(document: vscode.TextDocument): BehaviorTreeDocument {
		const text = document.getText();
		console.log('Parsing document text:', text.substring(0, 200));
		const kvData = readKeyValue2(text);
		console.log('Parsed KV data:', JSON.stringify(kvData, null, 2));

		if (!kvData || typeof kvData !== 'object') {
			throw new Error('Invalid behavior tree file format');
		}

		// Get the root node key name
		const rootKey = Object.keys(kvData)[0];
		if (!rootKey) {
			throw new Error('Behavior tree file is empty');
		}

		const rootData = kvData[rootKey];
		const result = {
			name: rootKey,
			description: rootData.Description,
			root: this.parseNode(rootData, rootKey)
		};

		console.log('Parsed tree document:', JSON.stringify(result, null, 2));
		return result;
	}

	/**
	 * Recursively parse nodes
	 */
	private parseNode(nodeData: any, nodeName: string, parentId: string = ''): BehaviorTreeNode {
		const nodeId = parentId ? `${parentId}_${nodeName}` : nodeName;

		const node: BehaviorTreeNode = {
			id: nodeId,
			key: nodeName, // Key name used as the English identifier
			type: nodeData.Type || 'Action',
			name: nodeData.Name || nodeName, // Name field used as the human-readable name
			description: nodeData.Description,
			x: nodeData.X ? parseFloat(nodeData.X) : undefined,
			y: nodeData.Y ? parseFloat(nodeData.Y) : undefined,
			children: [],
		};

		// Copy other properties
		for (const key in nodeData) {
			if (!['Type', 'Name', 'Description', 'Children', 'X', 'Y'].includes(key)) {
				node[key] = nodeData[key];
			}
		}

		// Parse child nodes
		if (nodeData.Children && typeof nodeData.Children === 'object') {
			for (const childName in nodeData.Children) {
				const childNode = this.parseNode(nodeData.Children[childName], childName, nodeId);
				node.children!.push(childNode);
			}
		}

		return node;
	}

	/**
	 * Save the document
	 */
	private async saveDocument(document: vscode.TextDocument, treeData: BehaviorTreeDocument): Promise<void> {
		const kvData = this.buildKvData(treeData);
		const kvText = writeKeyValue(kvData);

		const edit = new vscode.WorkspaceEdit();
		const fullRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(document.getText().length)
		);
		edit.replace(document.uri, fullRange, kvText);

		await vscode.workspace.applyEdit(edit);
	}

	/**
	 * Build KV data
	 */
	private buildKvData(treeData: BehaviorTreeDocument): any {
		const rootNodeData = this.buildNodeData(treeData.root);

		if (treeData.description) {
			rootNodeData.Description = treeData.description;
		}

		return {
			[treeData.name]: rootNodeData
		};
	}

	/**
	 * Recursively build node data
	 */
	private buildNodeData(node: BehaviorTreeNode): any {
		const nodeData: any = {
			Type: node.type,
			Name: node.name, // Store the human-readable name in the Name field
		};

		if (node.description) {
			nodeData.Description = node.description;
		}

		if (node.x !== undefined) {
			nodeData.X = node.x.toString();
		}

		if (node.y !== undefined) {
			nodeData.Y = node.y.toString();
		}

		// Copy other custom properties
		for (const key in node) {
			if (!['id', 'key', 'type', 'name', 'description', 'children', 'x', 'y'].includes(key)) {
				const value = node[key];
				// Skip empty objects (e.g. empty Params)
				if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
					continue;
				}
				nodeData[key] = value;
			}
		}

		// Process child nodes
		if (node.children && node.children.length > 0) {
			nodeData.Children = {};

			// Sort child nodes by X coordinate (left to right)
			const sortedChildren = [...node.children].sort((a, b) => {
				const xA = a.x !== undefined ? a.x : 0;
				const xB = b.x !== undefined ? b.x : 0;
				return xA - xB;
			});

			for (let i = 0; i < sortedChildren.length; i++) {
				const child = sortedChildren[i];
				const childData = this.buildNodeData(child);
				// Add an Index field to mark the order (starting from 1, sorted by X coordinate)
				childData.Index = (i + 1).toString();
				// Use key as the KV key name
				nodeData.Children[child.key] = childData;
			}
		}

		return nodeData;
	}

	/**
	 * Get the template config file path
	 */
	private getTemplateConfigPath(): vscode.Uri | undefined {
		const workspaceFolders = vscode.workspace.workspaceFolders;
		if (!workspaceFolders || workspaceFolders.length === 0) {
			return undefined;
		}
		return vscode.Uri.joinPath(workspaceFolders[0].uri, '.vscode', 'behavior-tree-templates.json');
	}

	/**
	 * Get all templates
	 */
	private async getTemplates(): Promise<any[]> {
		const configPath = this.getTemplateConfigPath();
		if (!configPath) {
			return [];
		}

		try {
			const data = await vscode.workspace.fs.readFile(configPath);
			const config = JSON.parse(Buffer.from(data).toString('utf8'));
			return config.templates || [];
		} catch (error) {
			// File does not exist or parsing failed; return an empty array
			return [];
		}
	}

	/**
	 * Save a template
	 */
	private async saveTemplate(template: any): Promise<void> {
		const configPath = this.getTemplateConfigPath();
		if (!configPath) {
			throw new Error('No workspace found');
		}

		const templates = await this.getTemplates();

		// Check whether a template with the same name already exists
		const existingIndex = templates.findIndex((t: any) => t.name === template.name);
		if (existingIndex >= 0) {
			// Replace the existing template
			templates[existingIndex] = template;
		} else {
			// Add a new template
			templates.push(template);
		}

		const config = { templates };
		const content = JSON.stringify(config, null, '\t');

		// Ensure the directory exists
		const dirPath = vscode.Uri.joinPath(configPath, '..');
		try {
			await vscode.workspace.fs.createDirectory(dirPath);
		} catch (error) {
			// The directory may already exist; ignore the error
		}

		await vscode.workspace.fs.writeFile(configPath, Buffer.from(content, 'utf8'));
	}

	/**
	 * Delete a template
	 */
	private async deleteTemplate(templateName: string): Promise<void> {
		const configPath = this.getTemplateConfigPath();
		if (!configPath) {
			throw new Error('No workspace found');
		}

		const templates = await this.getTemplates();
		const filteredTemplates = templates.filter((t: any) => t.name !== templateName);

		const config = { templates: filteredTemplates };
		const content = JSON.stringify(config, null, '\t');
		await vscode.workspace.fs.writeFile(configPath, Buffer.from(content, 'utf8'));
	}
}

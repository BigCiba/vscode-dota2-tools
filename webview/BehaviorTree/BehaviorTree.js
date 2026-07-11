// VS Code API
console.log('BehaviorTree.js is loading...');

const vscode = acquireVsCodeApi();
console.log('VS Code API acquired:', vscode);

// i18n
const _lang = document.documentElement.lang;
const _i18n = {
	'en': {
		nodeType: 'Node Type:',
		identifierKey: 'Identifier (Key):',
		displayNameLabel: 'Display Name (Name):',
		descriptionLabel: 'Description:',
		placeholderKey: 'e.g.: Heal, Attack',
		placeholderName: 'e.g.: Heal, Attack',
		placeholderParamName: 'Parameter name',
		placeholderParamValue: 'Parameter value',
		paramsHeading: 'Parameters (Params)',
		addParam: 'Add Parameter',
		deleteParam: 'Delete parameter',
		noParams: 'No parameters',
		customProperties: 'Custom Properties',
		saveAsTemplate: 'Save as Template',
		selectNode: 'Please select a node',
		selectParentOr: 'Please select a parent node first, or double-click the root to add a child',
		rootNode: 'Root',
		rootCreated: 'Root node created',
		cannotDeleteRoot: 'Cannot delete the root node',
		selectNodeToCopy: 'Please select a node to copy first',
		nodeCopied: 'Node copied: ',
		clipboardEmpty: 'Clipboard is empty. Copy a node first.',
		selectParent: 'Please select a parent node first',
		nodePasted: 'Node pasted: ',
		noTemplates: 'No templates yet. Select a node and click "Save as Template" to create one.',
		noDescription: 'No description',
		keyLabel: 'Key: ',
		nodeCount: ' node(s)',
		useTemplate: 'Use',
		noMatchingTemplates: 'No matching templates',
		enterTemplateName: 'Please enter a template name',
		templateNotFound: 'Template not found',
		confirmDeleteTemplate: 'Are you sure you want to delete template ',
		enterIdentifier: 'Please enter an identifier (Key)',
		enterDisplayName: 'Please enter a display name (Name)',
	},
	'zh-cn': {
		nodeType: 'Node Type:',
		identifierKey: 'Identifier (Key):',
		displayNameLabel: 'Display Name (Name):',
		descriptionLabel: 'Description:',
		placeholderKey: 'e.g.: Heal, Attack',
		placeholderName: 'e.g.: Heal, Attack',
		placeholderParamName: 'Parameter name',
		placeholderParamValue: 'Parameter value',
		paramsHeading: 'Parameters (Params)',
		addParam: 'Add Parameter',
		deleteParam: 'Delete parameter',
		noParams: 'No parameters',
		customProperties: 'Custom Properties',
		saveAsTemplate: 'Save as Template',
		selectNode: 'Please select a node',
		selectParentOr: 'Please select a parent node first, or double-click the root to add a child',
		rootNode: 'Root',
		rootCreated: 'Root node created',
		cannotDeleteRoot: 'Cannot delete the root node',
		selectNodeToCopy: 'Please select a node to copy first',
		nodeCopied: 'Node copied: ',
		clipboardEmpty: 'Clipboard is empty. Copy a node first.',
		selectParent: 'Please select a parent node first',
		nodePasted: 'Node pasted: ',
		noTemplates: 'No templates yet. Select a node and click "Save as Template" to create one.',
		noDescription: 'No description',
		keyLabel: 'Key: ',
		nodeCount: ' node(s)',
		useTemplate: 'Use',
		noMatchingTemplates: 'No matching templates',
		enterTemplateName: 'Please enter a template name',
		templateNotFound: 'Template not found',
		confirmDeleteTemplate: 'Are you sure you want to delete template ',
		enterIdentifier: 'Please enter an identifier (Key)',
		enterDisplayName: 'Please enter a display name (Name)',
	}
};
function _t(key) { return (_i18n[_lang] && _i18n[_lang][key]) || _i18n['en'][key] || key; }

// Node type config (using Codicon Unicode characters)
const NODE_TYPES = {
	Root: { color: '#9C27B0', icon: '\uEA68', label: 'Root' },        // codicon-root-folder
	Sequence: { color: '#2196F3', icon: '\uEBFE', label: 'Sequence' },  // codicon-arrow-right
	Selector: { color: '#FF9800', icon: '\uEB32', label: 'Selector' },  // codicon-question
	Parallel: { color: '#4CAF50', icon: '\uEBCB', label: 'Parallel' },  // codicon-symbol-array
	Condition: { color: '#00BCD4', icon: '\uEA6D', label: 'Condition' },// codicon-search
	Action: { color: '#F44336', icon: '\uEBA6', label: 'Action' },      // codicon-gear
	Decorator: { color: '#E91E63', icon: '\uEBCF', label: 'Decorator' } // codicon-symbol-color
};

// Canvas config
const CANVAS_CONFIG = {
	NODE_WIDTH: 160,
	NODE_HEIGHT: 80,
	NODE_PADDING: 20,
	VERTICAL_SPACING: 120,
	HORIZONTAL_SPACING: 40,
	MIN_ZOOM: 0.1,
	MAX_ZOOM: 3,
	ZOOM_STEP: 0.1
};

class BehaviorTreeEditor {
	constructor() {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');

		this.treeData = null;
		this.selectedNode = null;
		this.hoveredNode = null;
		this.parentToAdd = null;

		// Canvas state
		this.offset = { x: 0, y: 0 };
		this.zoom = 1;
		this.isDragging = false;
		this.dragStart = { x: 0, y: 0 };
		this.isNodeDragging = false;
		this.draggedNode = null;

		// History (undo/redo)
		this.history = [];
		this.historyIndex = -1;
		this.maxHistorySize = 50;
		this.isUndoRedoing = false;

		// Template data
		this.templates = [];
		this.currentTypeFilter = 'all';
		this.currentSearchText = '';

		// Clipboard
		this.clipboard = null;

		this.initCanvas();
		this.initEventListeners();
		this.notifyReady();
	}

	initCanvas() {
		this.resizeCanvas();
		window.addEventListener('resize', () => this.resizeCanvas());
	}

	resizeCanvas() {
		const container = this.canvas.parentElement;
		this.canvas.width = container.clientWidth;
		this.canvas.height = container.clientHeight;
		this.render();
	}

	initEventListeners() {
		// Toolbar buttons
		document.getElementById('saveBtn').addEventListener('click', () => this.save());
		document.getElementById('addNodeBtn').addEventListener('click', () => this.openAddNodeDialog());
		document.getElementById('addFromTemplateBtn').addEventListener('click', () => this.openTemplateDialog());
		document.getElementById('deleteNodeBtn').addEventListener('click', () => this.deleteSelectedNode());
		document.getElementById('zoomInBtn').addEventListener('click', () => this.zoomIn());
		document.getElementById('zoomOutBtn').addEventListener('click', () => this.zoomOut());
		document.getElementById('fitBtn').addEventListener('click', () => this.fitToCanvas());
		document.getElementById('closePanelBtn').addEventListener('click', () => this.closePropertiesPanel());
		document.getElementById('openTextBtn').addEventListener('click', () => this.openInTextEditor());

		// Tree name input
		document.getElementById('treeNameInput').addEventListener('input', (e) => {
			if (this.treeData) {
				this.treeData.name = e.target.value;
			}
		});

		document.getElementById('treeNameInput').addEventListener('change', (e) => {
			this.saveToHistory();
		});

		// Canvas interaction
		this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
		this.canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
		this.canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
		this.canvas.addEventListener('wheel', (e) => this.onWheel(e));
		this.canvas.addEventListener('click', (e) => this.onClick(e));
		this.canvas.addEventListener('dblclick', (e) => this.onDoubleClick(e));

		// Keyboard shortcuts
		document.addEventListener('keydown', (e) => {
			// Check whether focus is in an input field
			const activeElement = document.activeElement;
			const isInInput = activeElement && (
				activeElement.tagName === 'INPUT' ||
				activeElement.tagName === 'TEXTAREA' ||
				activeElement.tagName === 'SELECT' ||
				activeElement.isContentEditable
			);

			if (e.ctrlKey && e.key === 's') {
				e.preventDefault();
				this.save();
			} else if (e.ctrlKey && e.key === 'z') {
				if (isInInput) {
					// In input fields, use the browser's native undo
					e.preventDefault();
					document.execCommand('undo');
				} else {
					e.preventDefault();
					this.undo();
				}
			} else if (e.ctrlKey && e.key === 'y') {
				if (isInInput) {
					// In input fields, use the browser's native redo
					e.preventDefault();
					document.execCommand('redo');
				} else {
					e.preventDefault();
					this.redo();
				}
			} else if (e.ctrlKey && e.key === 'c' && !isInInput) {
				e.preventDefault();
				this.copyNode();
			} else if (e.ctrlKey && e.key === 'v' && !isInInput) {
				e.preventDefault();
				this.pasteNode();
			} else if (e.key === 'Delete' && this.selectedNode && !isInInput) {
				this.deleteSelectedNode();
			}
		});
	}

	notifyReady() {
		vscode.postMessage({ type: 'ready' });
	}

	updateData(data) {
		console.log('updateData received:', data);

		// Remember the ID of the currently selected node
		const selectedNodeId = this.selectedNode ? this.selectedNode.id : null;

		this.treeData = data;
		document.getElementById('treeNameInput').value = data.name || '';

		// If there is no position info, run auto layout
		if (!this.hasPositionInfo(data.root)) {
			console.log('No position info, running autoLayout');
			this.autoLayout();
		}

		// If a node was previously selected, find the matching node in the new tree and reselect it
		if (selectedNodeId) {
			const newSelectedNode = this.findNodeById(data.root, selectedNodeId);
			if (newSelectedNode) {
				this.selectedNode = newSelectedNode;
				this.showNodeProperties(newSelectedNode);
			} else {
				this.selectedNode = null;
			}
		}

		// Save to history after the initial load
		if (this.history.length === 0) {
			this.saveToHistory();
		}

		console.log('Rendering tree with root:', this.treeData.root);
		this.render();
	}

	findNodeById(node, id) {
		if (node.id === id) {
			return node;
		}
		if (node.children) {
			for (const child of node.children) {
				const found = this.findNodeById(child, id);
				if (found) return found;
			}
		}
		return null;
	}

	hasPositionInfo(node) {
		if (node.x === undefined || node.y === undefined) {
			return false;
		}
		if (node.children && node.children.length > 0) {
			return node.children.every(child => this.hasPositionInfo(child));
		}
		return true;
	}

	autoLayout() {
		if (!this.treeData) return;

		const root = this.treeData.root;
		const bounds = this.calculateSubtreeBounds(root);

		// Center the root node
		const centerX = this.canvas.width / 2 / this.zoom - this.offset.x / this.zoom;
		const centerY = 100;

		this.layoutNode(root, centerX, centerY, bounds);
	}

	calculateSubtreeBounds(node) {
		const bounds = new Map();

		const calculate = (node) => {
			if (!node.children || node.children.length === 0) {
				bounds.set(node.id, 1);
				return 1;
			}

			let totalWidth = 0;
			for (const child of node.children) {
				totalWidth += calculate(child);
			}

			bounds.set(node.id, Math.max(1, totalWidth));
			return Math.max(1, totalWidth);
		};

		calculate(node);
		return bounds;
	}

	layoutNode(node, x, y, bounds) {
		node.x = x;
		node.y = y;

		if (!node.children || node.children.length === 0) {
			return;
		}

		const childY = y + CANVAS_CONFIG.VERTICAL_SPACING;
		const totalWidth = bounds.get(node.id);
		const spacing = (CANVAS_CONFIG.NODE_WIDTH + CANVAS_CONFIG.HORIZONTAL_SPACING);

		let currentX = x - (totalWidth - 1) * spacing / 2;

		for (const child of node.children) {
			const childWidth = bounds.get(child.id);
			const childCenterX = currentX + (childWidth - 1) * spacing / 2;

			this.layoutNode(child, childCenterX, childY, bounds);
			currentX += childWidth * spacing;
		}
	}

	render() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		ctx.save();
		ctx.translate(this.offset.x, this.offset.y);
		ctx.scale(this.zoom, this.zoom);

		if (this.treeData && this.treeData.root) {
			console.log('Rendering root node:', this.treeData.root);
			this.renderConnections(this.treeData.root);
			this.renderNode(this.treeData.root);
		} else {
			console.log('No tree data or root to render');
		}

		ctx.restore();
	}

	renderConnections(node) {
		if (!node.children || node.children.length === 0) return;

		const ctx = this.ctx;
		const startX = node.x;
		const startY = node.y + CANVAS_CONFIG.NODE_HEIGHT / 2;

		for (const child of node.children) {
			const endX = child.x;
			const endY = child.y - CANVAS_CONFIG.NODE_HEIGHT / 2;

			ctx.strokeStyle = '#666';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(startX, startY);

			// Bezier curve connection
			const controlY = (startY + endY) / 2;
			ctx.bezierCurveTo(startX, controlY, endX, controlY, endX, endY);
			ctx.stroke();

			this.renderConnections(child);
		}
	}

	renderNode(node) {
		if (!node) return;

		const ctx = this.ctx;
		const config = NODE_TYPES[node.type] || NODE_TYPES.Action;

		const x = node.x - CANVAS_CONFIG.NODE_WIDTH / 2;
		const y = node.y - CANVAS_CONFIG.NODE_HEIGHT / 2;
		const w = CANVAS_CONFIG.NODE_WIDTH;
		const h = CANVAS_CONFIG.NODE_HEIGHT;

		// Selected or hovered effect
		if (node === this.selectedNode) {
			ctx.strokeStyle = '#FFD700';
			ctx.lineWidth = 3;
			ctx.strokeRect(x - 2, y - 2, w + 4, h + 4);
		} else if (node === this.hoveredNode) {
			ctx.strokeStyle = '#87CEEB';
			ctx.lineWidth = 2;
			ctx.strokeRect(x - 1, y - 1, w + 2, h + 2);
		}

		// Draw the node background
		ctx.fillStyle = config.color;
		ctx.strokeStyle = '#333';
		ctx.lineWidth = 2;

		this.roundRect(ctx, x, y, w, h, 8);
		ctx.fill();
		ctx.stroke();

		// Draw the node type icon (Codicon)
		ctx.font = '20px codicon';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
		ctx.fillText(config.icon, node.x, node.y - 15);

		// Draw the node name
		ctx.font = 'bold 13px sans-serif';
		ctx.fillText(node.name, node.x, node.y + 10);

		// Draw the node type
		ctx.font = '11px sans-serif';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.fillText(config.label, node.x, node.y + 25);

		// Recursively draw child nodes
		if (node.children) {
			for (const child of node.children) {
				this.renderNode(child);
			}
		}
	}

	roundRect(ctx, x, y, w, h, r) {
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.lineTo(x + w - r, y);
		ctx.quadraticCurveTo(x + w, y, x + w, y + r);
		ctx.lineTo(x + w, y + h - r);
		ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
		ctx.lineTo(x + r, y + h);
		ctx.quadraticCurveTo(x, y + h, x, y + h - r);
		ctx.lineTo(x, y + r);
		ctx.quadraticCurveTo(x, y, x + r, y);
		ctx.closePath();
	}

	getNodeAt(x, y) {
		if (!this.treeData) return null;

		const worldX = (x - this.offset.x) / this.zoom;
		const worldY = (y - this.offset.y) / this.zoom;

		const findNode = (node) => {
			const nodeX = node.x - CANVAS_CONFIG.NODE_WIDTH / 2;
			const nodeY = node.y - CANVAS_CONFIG.NODE_HEIGHT / 2;

			if (worldX >= nodeX && worldX <= nodeX + CANVAS_CONFIG.NODE_WIDTH &&
				worldY >= nodeY && worldY <= nodeY + CANVAS_CONFIG.NODE_HEIGHT) {
				return node;
			}

			if (node.children) {
				for (const child of node.children) {
					const found = findNode(child);
					if (found) return found;
				}
			}

			return null;
		};

		return findNode(this.treeData.root);
	}

	onMouseDown(e) {
		const rect = this.canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const node = this.getNodeAt(x, y);

		if (node) {
			this.isNodeDragging = true;
			this.draggedNode = node;
			this.dragStart = { x: x / this.zoom - node.x, y: y / this.zoom - node.y };
		} else {
			this.isDragging = true;
			this.dragStart = { x: x - this.offset.x, y: y - this.offset.y };
		}
	}

	onMouseMove(e) {
		const rect = this.canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		if (this.isNodeDragging && this.draggedNode) {
			this.draggedNode.x = x / this.zoom - this.dragStart.x;
			this.draggedNode.y = y / this.zoom - this.dragStart.y;
			this.render();
		} else if (this.isDragging) {
			this.offset.x = x - this.dragStart.x;
			this.offset.y = y - this.dragStart.y;
			this.render();
		} else {
			const node = this.getNodeAt(x, y);
			if (node !== this.hoveredNode) {
				this.hoveredNode = node;
				this.render();
			}
		}
	}

	onMouseUp(e) {
		// If a node is being dragged, save history
		if (this.isNodeDragging && this.draggedNode) {
			this.saveToHistory();
		}

		this.isDragging = false;
		this.isNodeDragging = false;
		this.draggedNode = null;
	}

	onWheel(e) {
		e.preventDefault();

		const rect = this.canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const oldZoom = this.zoom;
		const delta = e.deltaY > 0 ? -CANVAS_CONFIG.ZOOM_STEP : CANVAS_CONFIG.ZOOM_STEP;
		this.zoom = Math.max(CANVAS_CONFIG.MIN_ZOOM, Math.min(CANVAS_CONFIG.MAX_ZOOM, this.zoom + delta));

		// Zoom centered on the mouse position
		const zoomRatio = this.zoom / oldZoom;
		this.offset.x = mouseX - (mouseX - this.offset.x) * zoomRatio;
		this.offset.y = mouseY - (mouseY - this.offset.y) * zoomRatio;

		this.render();
	}

	onClick(e) {
		const rect = this.canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const node = this.getNodeAt(x, y);
		if (node) {
			this.selectNode(node);
		}
	}
	onDoubleClick(e) {
		this.openAddNodeDialog();
	}

	selectNode(node) {
		this.selectedNode = node;
		this.showNodeProperties(node);
		this.render();
	}

	showNodeProperties(node) {
		const panel = document.getElementById('propertiesContent');

		let html = `
            <div class="form-group">
                <label>${_t('nodeType')}</label>
                <select id="propType">
                    ${Object.keys(NODE_TYPES).map(type =>
			`<option value="${type}" ${type === node.type ? 'selected' : ''}>${NODE_TYPES[type].label}</option>`
		).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>${_t('identifierKey')}</label>
                <input type="text" id="propKey" value="${node.key || ''}" placeholder="${_t('placeholderKey')}">
            </div>
            <div class="form-group">
                <label>${_t('displayNameLabel')}</label>
                <input type="text" id="propName" value="${node.name || ''}" placeholder="${_t('placeholderName')}">
            </div>
            <div class="form-group">
                <label>${_t('descriptionLabel')}</label>
                <textarea id="propDesc" rows="3">${node.description || ''}</textarea>
            </div>
        `;

		// Show the Params parameters
		if (node.Params || node.params) {
			const params = node.Params || node.params;
			html += '<hr style="margin: 16px 0; border-color: var(--border-color);">';
			html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">';
			html += '<h4 style="margin: 0;">' + _t('paramsHeading') + '</h4>';
			html += '<button id="addParamBtn" class="btn-small" style="padding: 4px 8px; font-size: 12px;"><i class="codicon codicon-add"></i> ' + _t('addParam') + '</button>';
			html += '</div>';
			html += '<div id="paramsContainer">';

			if (typeof params === 'object' && params !== null) {
				for (const [key, value] of Object.entries(params)) {
					html += `
						<div class="param-item">
							<input type="text" class="param-key" value="${key}" data-old-key="${key}" placeholder="${_t('placeholderParamName')}">
							<input type="text" class="param-value" value="${value || ''}" data-param-key="${key}" placeholder="${_t('placeholderParamValue')}">
							<button class="delete-param-btn" data-param-key="${key}" title="${_t('deleteParam')}">
								<i class="codicon codicon-trash"></i>
							</button>
						</div>
					`;
				}
			}
			html += '</div>';
		} else {
			// No Params, show the add button
			html += '<hr style="margin: 16px 0; border-color: var(--border-color);">';
			html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">';
			html += '<h4 style="margin: 0;">' + _t('paramsHeading') + '</h4>';
			html += '<button id="addParamBtn" class="btn-small" style="padding: 4px 8px; font-size: 12px;"><i class="codicon codicon-add"></i> ' + _t('addParam') + '</button>';
			html += '</div>';
			html += '<div id="paramsContainer"><p style="color: var(--vscode-descriptionForeground); font-size: 12px;">' + _t('noParams') + '</p></div>';
		}

		// Show other custom properties
		const customProps = Object.keys(node).filter(key =>
			!['id', 'key', 'type', 'name', 'description', 'children', 'x', 'y', 'Params', 'params', 'Index'].includes(key)
		);

		if (customProps.length > 0) {
			html += '<hr style="margin: 16px 0; border-color: var(--border-color);">';
			html += '<h4 style="margin-bottom: 12px;">' + _t('customProperties') + '</h4>';

			for (const key of customProps) {
				html += `
                    <div class="form-group">
                        <label>${key}:</label>
                        <input type="text" data-prop="${key}" value="${node[key] || ''}" class="custom-prop">
                    </div>
                `;
			}
		}

		// Add the "Save as Template" button
		html += '<hr style="margin: 16px 0; border-color: var(--border-color);">';
		html += '<button id="saveAsTemplateBtn" class="btn" style="width: 100%;"><i class="codicon codicon-save"></i> ' + _t('saveAsTemplate') + '</button>';

		panel.innerHTML = html;

		// Bind events
		document.getElementById('propType').addEventListener('change', (e) => {
			this.saveToHistory();
			node.type = e.target.value;
			this.render();
		});

		document.getElementById('propKey').addEventListener('input', (e) => {
			node.key = e.target.value;
			this.render();
		});

		document.getElementById('propKey').addEventListener('change', (e) => {
			this.saveToHistory();
		});

		document.getElementById('propName').addEventListener('input', (e) => {
			node.name = e.target.value;
			this.render();
		});

		document.getElementById('propName').addEventListener('change', (e) => {
			this.saveToHistory();
		});

		document.getElementById('propDesc').addEventListener('input', (e) => {
			node.description = e.target.value;
		});

		document.getElementById('propDesc').addEventListener('change', (e) => {
			this.saveToHistory();
		});

		// Add parameter button
		const addParamBtn = document.getElementById('addParamBtn');
		if (addParamBtn) {
			addParamBtn.addEventListener('click', () => {
				this.addParameter(node);
			});
		}

		// Parameter input field events
		document.querySelectorAll('.param-key').forEach((input) => {
			const oldKey = input.getAttribute('data-old-key');

			input.addEventListener('change', (e) => {
				const newKey = e.target.value.trim();
				if (newKey && newKey !== oldKey) {
					this.saveToHistory();

					if (!node.Params && !node.params) {
						node.Params = {};
					}
					// Use Params or params (based on the existing field)
					const paramsObj = node.Params || node.params;
					const value = paramsObj[oldKey];
					delete paramsObj[oldKey];
					paramsObj[newKey] = value;
					// Update the data-old-key attribute
					e.target.setAttribute('data-old-key', newKey);
					// Update the data-param-key of the corresponding value input
					const valueInput = e.target.parentElement.querySelector('.param-value');
					if (valueInput) {
						valueInput.setAttribute('data-param-key', newKey);
					}
				}
			});
		});

		// Parameter value input field events
		document.querySelectorAll('.param-value').forEach((input) => {
			input.addEventListener('input', (e) => {
				if (!node.Params && !node.params) {
					node.Params = {};
				}
				const paramsObj = node.Params || node.params;
				const paramKey = e.target.getAttribute('data-param-key');
				if (paramKey) {
					paramsObj[paramKey] = e.target.value;
				}
			});

			input.addEventListener('change', (e) => {
				this.saveToHistory();
			});
		});

		// Delete parameter button
		document.querySelectorAll('.delete-param-btn').forEach(btn => {
			btn.addEventListener('click', (e) => {
				const key = btn.getAttribute('data-param-key');
				this.deleteParameter(node, key);
			});
		});

		document.querySelectorAll('.custom-prop').forEach(input => {
			input.addEventListener('input', (e) => {
				const propName = e.target.getAttribute('data-prop');
				node[propName] = e.target.value;
			});
		});

		// "Save as Template" button
		const saveAsTemplateBtn = document.getElementById('saveAsTemplateBtn');
		console.log('Looking for saveAsTemplateBtn:', saveAsTemplateBtn);
		if (saveAsTemplateBtn) {
			saveAsTemplateBtn.addEventListener('click', () => {
				console.log('Save as template clicked for node:', node);
				this.saveNodeAsTemplate(node);
			});
		} else {
			console.warn('saveAsTemplateBtn not found in DOM');
		}
	}

	addParameter(node) {
		this.saveToHistory();

		if (!node.Params && !node.params) {
			// Use Params (capital P) as the default
			node.Params = {};
		}
		const paramsObj = node.Params || node.params;

		// Generate a new parameter name
		let newKey = 'NewParam';
		let counter = 1;
		while (paramsObj[newKey]) {
			newKey = `NewParam${counter}`;
			counter++;
		}

		paramsObj[newKey] = '';
		this.showNodeProperties(node);
	}

	deleteParameter(node, key) {
		this.saveToHistory();

		const paramsObj = node.Params || node.params;
		if (paramsObj && paramsObj[key] !== undefined) {
			delete paramsObj[key];

			// If Params is an empty object, you can choose to keep or remove it
			if (Object.keys(paramsObj).length === 0) {
				if (node.Params) delete node.Params;
				if (node.params) delete node.params;
			}

			this.showNodeProperties(node);
		}
	}

	closePropertiesPanel() {
		this.selectedNode = null;
		document.getElementById('propertiesContent').innerHTML = '<p class="empty-state">' + _t('selectNode') + '</p>';
		this.render();
	}

	openAddNodeDialog() {
		// If there is no tree data or no root node, create the root node
		if (!this.treeData || !this.treeData.root) {
			this.createRootNode();
			return;
		}

		if (!this.selectedNode) {
			vscode.postMessage({
				type: 'error',
				message: _t('selectParentOr')
			});
			return;
		}

		this.parentToAdd = this.selectedNode;
		document.getElementById('addNodeDialog').style.display = 'flex';
		document.getElementById('nodeKeyInput').value = '';
		document.getElementById('nodeNameInput').value = '';
		document.getElementById('nodeDescInput').value = '';
		document.getElementById('nodeKeyInput').focus();
	}

	/**
	 * Create the root node
	 */
	createRootNode() {
		// Save a history snapshot
		this.saveToHistory();

		const rootNode = {
			id: 'Root',
			key: 'Root',
			type: 'Root',
			name: _t('rootNode'),
			description: '',
			children: [],
			x: this.canvas.width / 2,
			y: 100
		};

		if (!this.treeData) {
			this.treeData = {
				name: 'NewBehaviorTree',
				root: rootNode
			};
			document.getElementById('treeNameInput').value = this.treeData.name;
		} else {
			this.treeData.root = rootNode;
		}

		// Select the root node
		this.selectedNode = rootNode;
		this.showNodeProperties(rootNode);
		this.render();

		vscode.postMessage({
			type: 'info',
			message: _t('rootCreated')
		});
	}

	save() {
		if (!this.treeData) return;

		vscode.postMessage({
			type: 'save',
			data: this.treeData
		});
	}

	// Save the current state to history
	saveToHistory() {
		if (this.isUndoRedoing) return;
		if (!this.treeData) return;

		// Deep-copy the current tree data
		const snapshot = JSON.parse(JSON.stringify(this.treeData));

		// If not at the last state, remove the history that follows
		if (this.historyIndex < this.history.length - 1) {
			this.history = this.history.slice(0, this.historyIndex + 1);
		}

		// Add the new snapshot
		this.history.push(snapshot);

		// Limit the history size
		if (this.history.length > this.maxHistorySize) {
			this.history.shift();
		} else {
			this.historyIndex++;
		}

		console.log(`History saved. Index: ${this.historyIndex}, Total: ${this.history.length}`);
	}

	// Undo
	undo() {
		if (this.historyIndex <= 0) {
			console.log('No more undo steps');
			return;
		}

		this.historyIndex--;
		this.restoreFromHistory();
		console.log(`Undo. Index: ${this.historyIndex}`);
	}

	// Redo
	redo() {
		if (this.historyIndex >= this.history.length - 1) {
			console.log('No more redo steps');
			return;
		}

		this.historyIndex++;
		this.restoreFromHistory();
		console.log(`Redo. Index: ${this.historyIndex}`);
	}

	// Restore state from history
	restoreFromHistory() {
		if (this.historyIndex < 0 || this.historyIndex >= this.history.length) {
			return;
		}

		this.isUndoRedoing = true;

		// Deep-copy the history snapshot
		const snapshot = JSON.parse(JSON.stringify(this.history[this.historyIndex]));

		// Remember the ID of the currently selected node
		const selectedNodeId = this.selectedNode ? this.selectedNode.id : null;

		this.treeData = snapshot;
		document.getElementById('treeNameInput').value = snapshot.name || '';

		// Try to restore the selected node
		if (selectedNodeId) {
			const newSelectedNode = this.findNodeById(snapshot.root, selectedNodeId);
			if (newSelectedNode) {
				this.selectedNode = newSelectedNode;
				this.showNodeProperties(newSelectedNode);
			} else {
				this.selectedNode = null;
			}
		}

		this.render();
		this.isUndoRedoing = false;
	}

	openInTextEditor() {
		vscode.postMessage({
			type: 'openInTextEditor'
		});
	}

	deleteSelectedNode() {
		if (!this.selectedNode || this.selectedNode === this.treeData.root) {
			vscode.postMessage({
				type: 'error',
				message: _t('cannotDeleteRoot')
			});
			return;
		}

		// Save a history snapshot
		this.saveToHistory();

		// Remove from the parent node
		const removeFromParent = (parent) => {
			if (!parent.children) return false;

			const index = parent.children.findIndex(child => child === this.selectedNode);
			if (index !== -1) {
				parent.children.splice(index, 1);
				return true;
			}

			for (const child of parent.children) {
				if (removeFromParent(child)) return true;
			}

			return false;
		};

		removeFromParent(this.treeData.root);
		this.closePropertiesPanel();
		this.render();
	}

	/**
	 * Copy the selected node
	 */
	copyNode() {
		if (!this.selectedNode) {
			vscode.postMessage({
				type: 'info',
				message: _t('selectNodeToCopy')
			});
			return;
		}

		// Deep-copy the node (including all child nodes)
		this.clipboard = this.deepCopyNode(this.selectedNode);

		vscode.postMessage({
			type: 'info',
			message: _t('nodeCopied') + this.selectedNode.name
		});
	}

	/**
	 * Paste the node under the selected node
	 */
	pasteNode() {
		if (!this.clipboard) {
			vscode.postMessage({
				type: 'info',
				message: _t('clipboardEmpty')
			});
			return;
		}

		if (!this.selectedNode) {
			vscode.postMessage({
				type: 'error',
				message: _t('selectParent')
			});
			return;
		}

		// Save a history snapshot
		this.saveToHistory();

		// Deep-copy the clipboard contents (to avoid reference issues)
		const newNode = this.deepCopyNode(this.clipboard);

		// Reassign IDs
		this.reassignNodeIds(newNode);

		// Add to the selected node's children
		if (!this.selectedNode.children) {
			this.selectedNode.children = [];
		}
		this.selectedNode.children.push(newNode);

		// Auto layout and render
		this.autoLayout();
		this.render();

		vscode.postMessage({
			type: 'info',
			message: _t('nodePasted') + newNode.name
		});
	}

	/**
	 * Deep-copy the node (recursive)
	 */
	deepCopyNode(node) {
		// Copy node properties, but exclude position info
		const copy = {};
		for (const key in node) {
			if (key !== 'x' && key !== 'y' && key !== 'children') {
				copy[key] = node[key];
			}
		}

		// Deep-copy child nodes
		if (node.children && node.children.length > 0) {
			copy.children = node.children.map(child => this.deepCopyNode(child));
		}

		return copy;
	}

	/**
	 * Reassign node IDs (recursive)
	 */
	reassignNodeIds(node) {
		node.id = this.generateId();

		if (node.children && node.children.length > 0) {
			for (const child of node.children) {
				this.reassignNodeIds(child);
			}
		}
	}

	/**
	 * Generate a unique ID
	 */
	generateId() {
		return 'node_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
	}

	zoomIn() {
		this.zoom = Math.min(CANVAS_CONFIG.MAX_ZOOM, this.zoom + CANVAS_CONFIG.ZOOM_STEP);
		this.render();
	}

	zoomOut() {
		this.zoom = Math.max(CANVAS_CONFIG.MIN_ZOOM, this.zoom - CANVAS_CONFIG.ZOOM_STEP);
		this.render();
	}

	fitToCanvas() {
		this.zoom = 1;
		this.offset = { x: 0, y: 0 };
		this.autoLayout();
		this.render();
	}

	// ========== Template-related methods ==========

	/**
	 * Open the template selection dialog
	 */
	openTemplateDialog() {
		if (!this.selectedNode) {
			vscode.postMessage({
				type: 'error',
				message: _t('selectParent')
			});
			return;
		}

		this.parentToAdd = this.selectedNode;

		// Request the template list
		vscode.postMessage({ type: 'getTemplates' });

		document.getElementById('templateDialog').style.display = 'flex';
	}

	/**
	 * Update the template list display
	 */
	updateTemplateList() {
		const listContainer = document.getElementById('templateList');

		if (this.templates.length === 0) {
			listContainer.innerHTML = '<p class="empty-state">' + _t('noTemplates') + '</p>';
			return;
		}

		// Get the sorted templates
		const sortedTemplates = this.getSortedTemplates();

		let html = '';
		for (const template of sortedTemplates) {
			const typeColor = NODE_TYPES[template.node.type]?.color || '#666';
			const typeLabel = NODE_TYPES[template.node.type]?.label || template.node.type;
			const childCount = this.countTemplateNodes(template.node);

			html += `
				<div class="template-item" data-type="${template.node.type}" 
					 data-name="${template.name}" 
					 data-desc="${template.description || ''}" 
					 data-key="${template.node.key}">
					<div class="template-info">
						<div class="template-name">${template.name}</div>
						<div class="template-desc">${template.description || _t('noDescription')}</div>
						<div class="template-meta">
							<span class="type-badge-inline" style="background-color: ${typeColor};">${typeLabel}</span>
							<span class="meta-divider">|</span>
							<span>${_t('keyLabel')}${template.node.key}</span>
							<span class="meta-divider">|</span>
							<span>${childCount}${_t('nodeCount')}</span>
						</div>
					</div>
					<div class="template-actions">
						<button class="btn btn-primary btn-small" onclick="editor.addNodeFromTemplate('${template.name}')">
							<i class="codicon codicon-add"></i> ${_t('useTemplate')}
						</button>
						<button class="btn btn-danger btn-small" onclick="editor.deleteTemplate('${template.name}')">
							<i class="codicon codicon-trash"></i>
						</button>
					</div>
				</div>
			`;
		}

		listContainer.innerHTML = html;

		// Apply the current filter
		this.filterTemplates();
	}

	/**
	 * Count the template's node count (computed recursively)
	 */
	countTemplateNodes(node) {
		let count = 1;
		if (node.children && node.children.length > 0) {
			for (const child of node.children) {
				count += this.countTemplateNodes(child);
			}
		}
		return count;
	}

	/**
	 * Get the sorted template list
	 */
	getSortedTemplates() {
		const select = document.getElementById('templateSortSelect');
		if (!select) return this.templates;

		const sortType = select.value;
		const sorted = [...this.templates];

		switch (sortType) {
			case 'name-asc':
				sorted.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
				break;
			case 'name-desc':
				sorted.sort((a, b) => b.name.localeCompare(a.name, 'zh-CN'));
				break;
			case 'type-asc':
				sorted.sort((a, b) => a.node.type.localeCompare(b.node.type));
				break;
			case 'date-asc':
				sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
				break;
			case 'date-desc':
				sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
				break;
		}

		return sorted;
	}

	/**
	 * Sort templates (re-render)
	 */
	sortTemplates() {
		this.updateTemplateList();
	}

	/**
	 * Toggle the type filter
	 */
	toggleTemplateType(type) {
		this.currentTypeFilter = type;

		// Update the button active state
		const buttons = document.querySelectorAll('.type-filter-btn');
		buttons.forEach(btn => {
			if (btn.getAttribute('data-type') === type) {
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
			}
		});

		this.filterTemplates();
	}

	/**
	 * Filter templates in real time
	 */
	filterTemplates() {
		const searchInput = document.getElementById('templateSearchInput');
		const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';
		this.currentSearchText = searchText;

		const allItems = document.querySelectorAll('.template-item');
		let visibleCount = 0;

		allItems.forEach(item => {
			const itemType = item.getAttribute('data-type');
			const itemName = item.getAttribute('data-name').toLowerCase();
			const itemDesc = item.getAttribute('data-desc').toLowerCase();
			const itemKey = item.getAttribute('data-key').toLowerCase();

			// Type filter
			let typeMatch = this.currentTypeFilter === 'all' || itemType === this.currentTypeFilter;

			// Search text matching (multiple fields: name, description, key, type)
			let textMatch = true;
			if (searchText !== '') {
				const keywords = searchText.split(' ').filter(k => k !== '');
				textMatch = keywords.every(keyword =>
					itemName.includes(keyword) ||
					itemDesc.includes(keyword) ||
					itemKey.includes(keyword) ||
					itemType.toLowerCase().includes(keyword)
				);
			}

			// Show/hide
			if (typeMatch && textMatch) {
				item.style.display = '';
				visibleCount++;
			} else {
				item.style.display = 'none';
			}
		});

		// Show the empty state message
		const listContainer = document.getElementById('templateList');
		const existingEmpty = listContainer.querySelector('.filter-empty-state');

		if (visibleCount === 0 && allItems.length > 0) {
			if (!existingEmpty) {
				const emptyMsg = document.createElement('p');
				emptyMsg.className = 'filter-empty-state empty-state';
				emptyMsg.textContent = _t('noMatchingTemplates');
				listContainer.appendChild(emptyMsg);
			}
		} else if (existingEmpty) {
			existingEmpty.remove();
		}
	}

	/**
	 * Clear the search
	 */
	clearTemplateSearch() {
		const searchInput = document.getElementById('templateSearchInput');
		if (searchInput) {
			searchInput.value = '';
			this.filterTemplates();
		}
	}

	/**
	 * Save the node as a template
	 */
	saveNodeAsTemplate(node) {
		console.log('saveNodeAsTemplate called with node:', node);

		// Save the current node reference for the dialog to use
		this.nodeToSaveAsTemplate = node;

		// Open the save template dialog
		document.getElementById('saveTemplateDialog').style.display = 'flex';
		document.getElementById('templateNameInput').value = node.name || '';
		document.getElementById('templateDescInput').value = node.description || '';
		document.getElementById('templateNameInput').focus();
	}

	/**
	 * Confirm saving the template
	 */
	confirmSaveTemplate() {
		const node = this.nodeToSaveAsTemplate;
		if (!node) return;

		const templateName = document.getElementById('templateNameInput').value.trim();
		const templateDesc = document.getElementById('templateDescInput').value.trim();
		const includeChildren = document.getElementById('templateIncludeChildren').checked;

		if (!templateName) {
			vscode.postMessage({ type: 'error', message: _t('enterTemplateName') });
			return;
		}

		// Copy the node data (deep copy, removing position and ID info)
		const nodeCopy = JSON.parse(JSON.stringify(node));
		delete nodeCopy.id;
		delete nodeCopy.x;
		delete nodeCopy.y;

		// If not including child nodes, delete children
		if (!includeChildren) {
			delete nodeCopy.children;
		}

		// Recursively remove child nodes' IDs and positions
		const removeIds = (n) => {
			delete n.id;
			delete n.x;
			delete n.y;
			if (n.children) {
				n.children.forEach(child => removeIds(child));
			}
		};
		removeIds(nodeCopy);

		const template = {
			name: templateName,
			description: templateDesc,
			node: nodeCopy,
			createdAt: new Date().toISOString()
		};

		console.log('Sending saveTemplate message:', template);

		// Send to the backend to save
		vscode.postMessage({
			type: 'saveTemplate',
			template: template
		});

		// Close the dialog
		closeSaveTemplateDialog();
		this.nodeToSaveAsTemplate = null;
	}

	/**
	 * Add a node from a template
	 */
	addNodeFromTemplate(templateName) {
		const template = this.templates.find(t => t.name === templateName);
		if (!template) {
			vscode.postMessage({ type: 'error', message: _t('templateNotFound') });
			return;
		}

		// Save a history snapshot
		this.saveToHistory();

		// Deep-copy the template node
		const newNode = JSON.parse(JSON.stringify(template.node));

		// Generate new IDs and positions
		const generateIds = (node, parentId) => {
			node.id = parentId ? `${parentId}_${node.key}` : node.key;
			if (node.children) {
				node.children.forEach(child => generateIds(child, node.id));
			}
		};

		generateIds(newNode, this.parentToAdd.id);

		// Set the position
		newNode.x = this.parentToAdd.x;
		newNode.y = this.parentToAdd.y + CANVAS_CONFIG.VERTICAL_SPACING;

		// Add to the parent node
		if (!this.parentToAdd.children) {
			this.parentToAdd.children = [];
		}
		this.parentToAdd.children.push(newNode);

		// Re-layout and render
		this.autoLayout();
		this.render();

		// Close the dialog
		closeTemplateDialog();
	}

	/**
	 * Delete a template
	 */
	deleteTemplate(templateName) {
		// Save the name of the template to delete
		this.templateToDelete = templateName;

		// Show the confirmation dialog
		document.getElementById('confirmMessage').textContent = _t('confirmDeleteTemplate') + `"${templateName}"?`;
		document.getElementById('confirmDialog').style.display = 'flex';
	}

	/**
	 * Confirm the delete operation
	 */
	confirmDeleteTemplate() {
		if (!this.templateToDelete) return;

		vscode.postMessage({
			type: 'deleteTemplate',
			templateName: this.templateToDelete
		});

		this.templateToDelete = null;
		closeConfirmDialog();
	}
}

// Global functions
let editor = null;

// Initialize the editor immediately
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded, initializing editor...');
	editor = new BehaviorTreeEditor();
});

function closeAddNodeDialog() {
	document.getElementById('addNodeDialog').style.display = 'none';
}

function confirmAddNode() {
	if (!editor || !editor.parentToAdd) return;

	const type = document.getElementById('nodeTypeSelect').value;
	const key = document.getElementById('nodeKeyInput').value.trim();
	const name = document.getElementById('nodeNameInput').value.trim();
	const description = document.getElementById('nodeDescInput').value.trim();

	if (!key) {
		vscode.postMessage({ type: 'error', message: _t('enterIdentifier') });
		return;
	}

	if (!name) {
		vscode.postMessage({ type: 'error', message: _t('enterDisplayName') });
		return;
	}

	// Save a history snapshot
	editor.saveToHistory();

	const newNode = {
		id: `${editor.parentToAdd.id}_${key}`,
		key: key,
		type: type,
		name: name,
		description: description || undefined,
		children: [],
		x: editor.parentToAdd.x,
		y: editor.parentToAdd.y + CANVAS_CONFIG.VERTICAL_SPACING
	};

	if (!editor.parentToAdd.children) {
		editor.parentToAdd.children = [];
	}
	editor.parentToAdd.children.push(newNode);

	editor.autoLayout();
	editor.render();
	closeAddNodeDialog();
}

// Listen for messages from the extension
window.addEventListener('message', (event) => {
	const message = event.data;
	console.log('Message received from extension:', message);

	if (message.type === 'update') {
		if (!editor) {
			console.warn('Editor not ready yet, waiting...');
			return;
		}
		editor.updateData(message.data);
	} else if (message.type === 'templatesUpdated') {
		if (editor) {
			editor.templates = message.templates || [];
			editor.updateTemplateList();
		}
	}
});

// Template dialog related functions
function closeTemplateDialog() {
	document.getElementById('templateDialog').style.display = 'none';
}

function closeSaveTemplateDialog() {
	document.getElementById('saveTemplateDialog').style.display = 'none';
}

function confirmSaveTemplate() {
	if (editor) {
		editor.confirmSaveTemplate();
	}
}

function closeConfirmDialog() {
	document.getElementById('confirmDialog').style.display = 'none';
}

function confirmAction() {
	if (editor) {
		editor.confirmDeleteTemplate();
	}
}

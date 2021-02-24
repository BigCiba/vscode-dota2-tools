const vscode = acquireVsCodeApi();
let rootElement = document.getElementById('localization-root');
let localization = {};
let language = 'schinese';
let pathFolder = {};
let rootPathFolder = '';
let textData = {};
function GetPathList(path) {
	let prefix = '\\';
	let pathListObj = pathFolder[language];
	let pathInfo = path.split('\\');
	if (pathInfo.length > 1) {
		for (let index = 0; index < pathInfo.length - 1; index++) {
			const element = pathInfo[index];
			if (pathListObj[element] != undefined) {
				pathListObj = pathListObj[element];
				prefix += element + '\\';
			}
		}
	}
	let pathList = Object.keys(pathListObj).map((iterator) => {
		return prefix + iterator;
	});
	pathList.map((item, index) => {
		if (item == path) {
			pathList.unshift(pathList.splice(index, 1)[0]);
		}
	});
	return pathList;
}
window.addEventListener('message', event => {
	const message = event.data;
	if (message.type == 'LuaText') {
		// console.log(message.data);
		let state = vscode.getState() || {};
		state.textData = message.data;
		vscode.setState(state);

		textData = message.data;
		Render();
	} else if (message.type == 'pathFolder') {
		let state = vscode.getState() || {};
		state.pathFolder = message.data;
		vscode.setState(state);

		pathFolder = message.data;
		// console.log(pathFolder);
	} else if (message.type == 'rootPathFolder') {
		let state = vscode.getState() || {};
		state.rootPathFolder = message.data;
		vscode.setState(state);

		rootPathFolder = message.data;
		// console.log(pathFolder);
	}
});

// let result = {
// 	english: {
// 		"asfa/asdfas.txt": {
// 			"DOTA_Tooltip_ability_art_death_seal": "412412",
// 			"DOTA_Tooltip_ability_art_death_seal_Description": "死亡圣印",
// 			"DOTA_Tooltip_ability_art_death_seal_Lore": "死亡圣印"
// 		}
// 	}
// };
function Render() {
	// 清空面板
	rootElement.innerHTML = "";
	let nodeData = {};
	for (const name in textData) {
		// 取出特定语言数据
		let langData = textData[name][language];
		let path = Object.keys(langData)[0];

		nodeData[name] = {
			// selectRow: undefined,	// 选中的行
			// rootNode: undefined,		// 根节点
			// listNode: undefined,		// 表节点
		};
		let contentElement = rootElement.createChild('div', { className: 'item-contents' });
		nodeData[name].rootNode = contentElement;
		contentElement.addEventListener('click', () => {
			let children = rootElement.children;
			for (let index = 0; index < children.length; index++) {
				children[index].classList.remove('selected');
			}
			contentElement.classList.add('selected');
		});
		let titleElement = contentElement.createChild('div', { className: 'item-title' });
		titleElement.createChild('span', { className: 'item-label', text: name });	//名字
		// 路径
		let showPath = path ? path.split('localization\\' + language)[1] : '';
		let selectElement = contentElement.createChild('div', { className: 'select-content' });

		let inputElement = selectElement.createInputSelectList(GetPathList(showPath), { selectIndex: 0, placeholder: '本地化路径', callback: input => { return GetPathList(input); } });


		contentElement.createChild('div', { className: 'item-modified-indicator' });	// 蓝条
		let valueElement = contentElement.createChild('div', { className: 'item-value' });
		let controlElement = valueElement.createChild('div', { className: 'item-control' });
		let listElement = controlElement.createChild('div', { className: 'list-object-widget' });
		nodeData[name].listNode = listElement;
		// 表头
		let headerElement = listElement.createChild('div', { className: 'list-row-header' });
		headerElement.createChild('div', { className: 'list-object-key', text: '项' });
		headerElement.createChild('div', { className: 'list-object-value', text: '值' });
		for (const key in langData[path]) {
			newRow(name, key, langData[path][key]);
			// rowElement.createChild('div', { className: 'list-object-edit', text: 'ok' });
			// rowElement.createChild('div', { className: 'list-object-delete', text: 'cancle' });
		}
		// 添加项按钮
		let btnRowElement = controlElement.createChild('div', { className: 'list-new-row' });
		let btnAddElement = btnRowElement.createChild('a', { className: 'monaco-text-button new-btn', text: '添加项' });
		btnAddElement.addEventListener('click', () => {
			// 取消编辑状态
			ClearRowSelect(name);
			let rowElement = listElement.createChild('div', { className: 'list-row' });
			rowElement.createChild('textarea', { className: 'list-object-key', placeholder: '键', type: 'text', rows: '1' });
			let textareaElement = rowElement.createChild('textarea', { className: 'list-object-value', placeholder: '值', type: 'text', rows: '1' });
			// textarea自适应高度
			textareaElement.addEventListener('input', (event) => {
				event.target.style.height = event.target.scrollTop + event.target.scrollHeight + "px";
			});
			contentElement.classList.toggle('edit');
			// 记录编辑的行
			nodeData[name].editNode = rowElement;
		});
		let btnConfirmElement = btnRowElement.createChild('a', { className: 'monaco-text-button new-edit-btn', text: '确认' });
		// 确认
		btnConfirmElement.addEventListener('click', () => {
			if (nodeData[name].selectRow) {
				nodeData[name].selectRow.classList.remove('selected');
			}
			if (nodeData[name].editNode) {
				let key = nodeData[name].editNode.children[0].value;
				let value = nodeData[name].editNode.children[1].value;
				nodeData[name].editNode.remove();
				// 编辑中
				if (contentElement.classList.contains('editing') == true) {
					// 修改已有键值
					nodeData[name].selectRow.children[0].innerText = key;
					nodeData[name].selectRow.children[1].innerText = value;
					contentElement.classList.toggle('editing');
					vscode.postMessage({
						type: 'edit',
						data: {
							language: language,
							path: rootPathFolder + '\\' + language + inputElement.value,
							name: name,
							key: key,
							value: value
						},
					});
				} else {
					// 新键值
					if (key != '') {
						newRow(name, key, value);
						vscode.postMessage({
							type: 'new',
							data: {
								language: language,
								path: rootPathFolder + '\\' + language + inputElement.value,
								name: name,
								key: key,
								value: value
							},
						});
					}
					contentElement.classList.toggle('edit');
				}
			}
		});
		let btnCancelElement = btnRowElement.createChild('a', { className: 'monaco-text-button new-edit-btn', text: '取消' });
		// 取消
		btnCancelElement.addEventListener('click', () => {
			if (nodeData[name].selectRow) {
				nodeData[name].selectRow.classList.remove('selected');
			}
			if (nodeData[name].editNode) {
				nodeData[name].editNode.remove();
				// 编辑中
				if (contentElement.classList.contains('editing') == true) {
					contentElement.classList.toggle('editing');
				} else {
					contentElement.classList.toggle('edit');
				}
			}
		});
		// 删除
		let btnDeleteElement = btnRowElement.createChild('a', { className: 'monaco-text-button control-btn', text: '删除' });
		btnDeleteElement.addEventListener('click', () => {
			let child = listElement.children;
			if (nodeData[name].selectRow) {
				nodeData[name].selectRow.remove();
				contentElement.classList.toggle('control');
			}
		});
		// 编辑
		let btnEditElement = btnRowElement.createChild('a', { className: 'monaco-text-button control-btn', text: '编辑' });
		btnEditElement.addEventListener('click', EditFunc(contentElement, name, listElement));
	}

	function EditFunc(contentElement, name, listElement) {
		return () => {
			// 进入编辑模式
			contentElement.classList.remove('control');
			contentElement.classList.add('editing');

			if (nodeData[name].selectRow) {
				let insert_index = 0;
				for (let index = 0; index < listElement.children.length; index++) {
					if (nodeData[name].selectRow == listElement.children[index]) {
						insert_index = index;
						break;
					}
				}
				let rowElement = listElement.createChild('div', { className: 'list-row', insert_index: insert_index });
				// rowElement.classList.remove('selected');
				rowElement.createChild('textarea', { className: 'list-object-key', placeholder: '键', type: 'text', rows: '1', text: nodeData[name].selectRow.children[0].innerText });
				let textareaElement = rowElement.createChild('textarea', { className: 'list-object-value', placeholder: '值', type: 'text', rows: '1', text: nodeData[name].selectRow.children[1].innerText });
				textareaElement.style.height = textareaElement.scrollTop + textareaElement.scrollHeight + "px";
				// textarea自适应高度
				textareaElement.addEventListener('input', (event) => {
					event.target.style.height = event.target.scrollTop + event.target.scrollHeight + "px";
				});
				// 记录编辑的行
				nodeData[name].editNode = rowElement;
			}
		};
	}

	// 添加新的键对
	function newRow(name, key, value) {
		if (key.replace(RegExp('dota_tooltip_ability_' + name, 'gi'), '') == '') {
			key = 'title';
		} else if (key.replace(RegExp('dota_tooltip_' + name, 'gi'), '') == '') {
			key = 'title';
		} else {
			key = key.replace(RegExp('dota_tooltip_ability_' + name + '_', 'gi'), '').replace(RegExp('dota_tooltip_' + name + '_', 'gi'), '');
		}
		let rowElement = nodeData[name].listNode.createChild('div', { className: 'list-row' });
		rowElement.createChild('div', { className: 'list-object-key', text: key });
		rowElement.createChild('div', { className: 'list-object-value', text: value });
		rowElement.addEventListener('click', () => {
			let children = nodeData[name].listNode.children;
			// for (let index = 0; index < children.length; index++) {
			// 	children[index].classList.remove('selected');
			// }
			if (nodeData[name].selectRow) {
				nodeData[name].selectRow.classList.remove('selected');
				// 取消编辑状态
				ClearRowSelect(name);
			}
			rowElement.classList.add('selected');
			nodeData[name].rootNode.classList.add('control');
			nodeData[name].selectRow = rowElement;
		});
		rowElement.addEventListener('dblclick', EditFunc(nodeData[name].rootNode, name, nodeData[name].listNode));
	}
	function ClearRowSelect(name) {
		// 取消编辑状态
		if (nodeData[name].editNode) {
			nodeData[name].editNode.remove();
		}
		if (nodeData[name].selectRow) {
			nodeData[name].selectRow.classList.remove('selected');
		}
		// 编辑中
		if (nodeData[name].rootNode.classList.contains('editing') == true) {
			nodeData[name].rootNode.classList.remove('editing');
		} else if (nodeData[name].rootNode.classList.contains('control') == true) {
			nodeData[name].rootNode.classList.remove('control');
		}
		else {
			nodeData[name].rootNode.classList.remove('edit');
		}
	}
}
(function () {
	const state = vscode.getState();
	if (state) {
		pathFolder = state.pathFolder;
		rootPathFolder = state.rootPathFolder;
		textData = state.textData;
		Render();
	}
}());

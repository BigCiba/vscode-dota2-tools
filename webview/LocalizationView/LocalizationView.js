const vscode = acquireVsCodeApi();
let rootElement = document.getElementById('localization-root');
// 测试数据
let testData = {
	"void_spirit_1": {
		Title: "太虚守卫",
		Description: "召唤一个镜像守卫一片区域，镜像会自动攻击周围的单位并且会模仿虚无之灵施法，守卫无法移动。",
		Lore: "无玄的存在远超时间和空间中的一个点。",
		scepter_description_2: "所有太虚守卫都会模仿虚无之灵施放太虚之径。",
		duration: "持续时间："
	},
	"modifier_void_spirit_1": {
		Title: "太虚守卫",
		Description: "召唤一个镜像守卫一片区域，镜像会自动攻击周围的单位并且会模仿虚无之灵施法，守卫无法移动。",
	},
	"modifier_void_spirit_1_debuff": {
		Title: "太虚守卫",
		Description: "召唤一个镜像守卫一片区域，镜像会自动攻击周围的单位并且会模仿虚无之灵施法，守卫无法移动。",
	},
	"modifier_void_spirit_1_shield": {
		Title: "太虚守卫",
		Description: "召唤一个镜像守卫一片区域，镜像会自动攻击周围的单位并且会模仿虚无之灵施法，守卫无法移动。",
	}
};
window.addEventListener('message', event => {
	const message = event.data;
	ShowLocalization(message);
});
HTMLElement.prototype.createChild = function (tagName, option) {
	let element = document.createElement(tagName);
	if (option) {
		for (const key in option) {
			if (key == 'class') {
				element.className = option.class;
			} else if (key == 'text') {
				element.appendChild(document.createTextNode(option.text));
			} else {
				element[key] = option[key];
			}
		}
	}
	if (option.insert_index) {
		this.insertBefore(element, this.childNodes[option.insert_index]);
	} else {
		this.appendChild(element);
	}
	return element;
};
function ShowLocalization(message) {
	rootElement.innerHTML = "";
	let nodeData = {};
	for (const name in message) {
		nodeData[name] = {
			// selectRow: undefined,	// 选中的行
			// rootNode: undefined,		// 根节点
			// listNode: undefined,		// 表节点
		};
		let contentElement = rootElement.createChild('div', { class: 'item-contents' });
		nodeData[name].rootNode = contentElement;
		contentElement.addEventListener('click', () => {
			let children = rootElement.children;
			for (let index = 0; index < children.length; index++) {
				children[index].classList.remove('selected');
			}
			contentElement.classList.add('selected');
		});
		let titleElement = contentElement.createChild('div', { class: 'item-title' });
		titleElement.createChild('span', { class: 'item-label', text: name });	//名字
		contentElement.createChild('div', { class: 'item-modified-indicator' });	// 蓝条
		let valueElement = contentElement.createChild('div', { class: 'item-value' });
		let controlElement = valueElement.createChild('div', { class: 'item-control' });
		let listElement = controlElement.createChild('div', { class: 'list-object-widget' });
		nodeData[name].listNode = listElement;
		// 表头
		let headerElement = listElement.createChild('div', { class: 'list-row-header' });
		headerElement.createChild('div', { class: 'list-object-key', text: '项' });
		headerElement.createChild('div', { class: 'list-object-value', text: '值' });
		for (const key in message[name]) {
			newRow(name, key, message[name][key]);
			// rowElement.createChild('div', { class: 'list-object-edit', text: 'ok' });
			// rowElement.createChild('div', { class: 'list-object-delete', text: 'cancle' });
		}
		// 添加项按钮
		let btnRowElement = controlElement.createChild('div', { class: 'list-new-row' });
		let btnAddElement = btnRowElement.createChild('a', { class: 'monaco-text-button new-btn', text: '添加项' });
		btnAddElement.addEventListener('click', () => {
			// 取消编辑状态
			ClearRowSelect(name);
			let rowElement = listElement.createChild('div', { class: 'list-row' });
			rowElement.createChild('textarea', { class: 'list-object-key', placeholder: '键', type: 'text', rows: '1' });
			let textareaElement = rowElement.createChild('textarea', { class: 'list-object-value', placeholder: '值', type: 'text', rows: '1' });
			// textarea自适应高度
			textareaElement.addEventListener('input', (event) => {
				event.target.style.height = event.target.scrollTop + event.target.scrollHeight + "px";
			});
			contentElement.classList.toggle('edit');
			// 记录编辑的行
			nodeData[name].editNode = rowElement;
		});
		let btnConfirmElement = btnRowElement.createChild('a', { class: 'monaco-text-button new-edit-btn', text: '确认' });
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
					console.log(key, value);
					nodeData[name].selectRow.children[0].innerText = key;
					nodeData[name].selectRow.children[1].innerText = value;
					contentElement.classList.toggle('editing');
				} else {
					if (key != '') {
						newRow(name, key, value);
					}
					contentElement.classList.toggle('edit');
				}
			}
		});
		let btnCancelElement = btnRowElement.createChild('a', { class: 'monaco-text-button new-edit-btn', text: '取消' });
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
		let btnDeleteElement = btnRowElement.createChild('a', { class: 'monaco-text-button control-btn', text: '删除' });
		btnDeleteElement.addEventListener('click', () => {
			let child = listElement.children;
			if (nodeData[name].selectRow) {
				nodeData[name].selectRow.remove();
				contentElement.classList.toggle('control');
			}
		});
		// 编辑
		let btnEditElement = btnRowElement.createChild('a', { class: 'monaco-text-button control-btn', text: '编辑' });
		btnEditElement.addEventListener('click', () => {
			// 进入编辑模式
			contentElement.classList.remove('control');
			contentElement.classList.add('editing');

			if (nodeData[name].selectRow) {
				let insert_index = 0
				for (let index = 0; index < listElement.children.length; index++) {
					if (nodeData[name].selectRow == listElement.children[index]) {
						insert_index = index;
						break;
					}
				}
				let rowElement = listElement.createChild('div', { class: 'list-row', insert_index: insert_index });
				// rowElement.classList.remove('selected');
				rowElement.createChild('textarea', { class: 'list-object-key', placeholder: '键', type: 'text', rows: '1', text: nodeData[name].selectRow.children[0].innerText });
				let textareaElement = rowElement.createChild('textarea', { class: 'list-object-value', placeholder: '值', type: 'text', rows: '1', text: nodeData[name].selectRow.children[1].innerText });
				textareaElement.style.height = textareaElement.scrollTop + textareaElement.scrollHeight + "px";
				// textarea自适应高度
				textareaElement.addEventListener('input', (event) => {
					event.target.style.height = event.target.scrollTop + event.target.scrollHeight + "px";
				});
				// 记录编辑的行
				nodeData[name].editNode = rowElement;
			}
		});
	}

	// 添加新的键对
	function newRow(name, key, value) {
		let rowElement = nodeData[name].listNode.createChild('div', { class: 'list-row' });
		rowElement.createChild('div', { class: 'list-object-key', text: key });
		rowElement.createChild('div', { class: 'list-object-value', text: value });
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
	}
	function ClearRowSelect(name) {
		// 取消编辑状态
		if (nodeData[name].editNode) {
			nodeData[name].editNode.remove();
			// 编辑中
			if (nodeData[name].rootNode.classList.contains('editing') == true) {
				nodeData[name].rootNode.classList.remove('editing');
			} else {
				nodeData[name].rootNode.classList.remove('edit');
			}
		}
	}
}
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

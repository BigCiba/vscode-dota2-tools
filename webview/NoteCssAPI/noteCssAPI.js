const vscode = acquireVsCodeApi();
let rootElement = document.querySelector('.markdown-body');
function renderCssProperty(cssProperty) {
	rootElement.innerHTML = "";
	let titleElement = rootElement.createChild('h1', { text: cssProperty.class });
	// 描述
	let descriptionTitleElement = rootElement.createChild('h1', { text: "Description" });
	let descriptionElement = rootElement.createChild('pre');
	let textareaElement = descriptionElement.createChild('textarea', { className: 'list-object-value', placeholder: '长描述', type: 'text', rows: '1', text: cssProperty.description || cssProperty.description_lite || "" });
	// textarea自适应高度
	textareaElement.addEventListener('input', (event) => {
		event.target.style.height = event.target.scrollHeight + "px";
		cssProperty.description = event.target.value;
	});
	let paramsTitleElement = rootElement.createChild('h1', { text: "Parameters" });
	// 表头
	let tableElement = rootElement.createChild('table');
	let theadElement = tableElement.createChild('thead');
	let trElement = theadElement.createChild('tr');
	trElement.createChild('th', { text: "值" });
	trElement.createChild('th', { text: "描述" });
	let tbodyElement = tableElement.createChild('tbody');
	for (const paramsName in cssProperty.value) {
		let trElement = tbodyElement.createChild('tr');
		const paramsInfo = cssProperty.value[paramsName];

		// trElement.createChild('td', { text: params_info.type });

		let typeTdElement = trElement.createChild('td');
		let typeInputElement = typeTdElement.createChild('input', { className: 'td-edit', value: paramsName });
		typeInputElement.addEventListener('input', (event) => {
			cssProperty.value[paramsName].type = event.target.value;
		});
		let descriptionTdElement = trElement.createChild('td');
		let descriptionInputElement = descriptionTdElement.createChild('input', { className: 'td-edit', value: paramsInfo.description });
		descriptionInputElement.addEventListener('input', (event) => {
			cssProperty.value[paramsName].description = event.target.value;
		});
	}
	let btnAddElement = rootElement.createChild('a', { className: 'monaco-text-button new-btn', text: '添加项' });
	btnAddElement.addEventListener('click', () => {
		let trElement = tbodyElement.createChild('tr');
		let valueTdElement = trElement.createChild('td');
		let valueInputElement = valueTdElement.createChild('input', { className: 'td-edit', value: "" });

		let descriptionTdElement = trElement.createChild('td');
		let descriptionInputElement = descriptionTdElement.createChild('input', { className: 'td-edit', value: "" });

	});
	let btnRemoveElement = rootElement.createChild('a', { className: 'monaco-text-button new-btn', text: '删除项' });
	btnRemoveElement.addEventListener('click', () => {
		tbodyElement.removeChild(tbodyElement.lastChild);
	});
	// 范例
	let exampleTitleElement = rootElement.createChild('h1', { text: "Example" });
	let exampleElement = rootElement.createChild('pre');
	exampleTextareaElement = exampleElement.createChild('textarea', { className: 'list-object-value', placeholder: '范例', type: 'text', rows: '1', text: cssProperty.example || "" });
	exampleTextareaElement.style.height = exampleTextareaElement.scrollHeight + "px";
	// textarea自适应高度
	exampleTextareaElement.addEventListener('input', (event) => {
		event.target.style.height = event.target.scrollHeight + "px";
		cssProperty.example = event.target.value;
	});
	// 确认
	let btnConfirmElement = rootElement.createChild('a', { className: 'monaco-text-button', text: '确认' });
	btnConfirmElement.addEventListener('click', () => {
		// console.log(cssProperty);
		cssProperty.value = {};
		for (let index = 0; index < tbodyElement.children.length; index++) {
			const element = tbodyElement.children[index];
			const key = element.children[0].children[0].value;
			const value = element.children[1].children[0].value;
			cssProperty.value[key] = { description: value };
		}
		vscode.postMessage({
			data: cssProperty
		});
	});
}
window.addEventListener('message', event => {
	const message = event.data;
	vscode.setState({
		data: message.data,
	});
	renderCssProperty(message.data);
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

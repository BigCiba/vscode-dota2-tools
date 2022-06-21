const vscode = acquireVsCodeApi();
let rootElement = document.querySelector('.markdown-body');
function renderFunction(funInfo) {
	console.log(funInfo);
	// 清空面板
	rootElement.innerHTML = "";
	let titleElement = rootElement.createChild('h1', { text: funInfo.function });
	let descriptionTitleElement = rootElement.createChild('h1', { text: "Function Description" });
	let descriptionElement = rootElement.createChild('pre');
	let textareaElement = descriptionElement.createChild('textarea', { className: 'list-object-value', placeholder: '值', type: 'text', rows: '1', text: funInfo.description || "" });
	// textarea自适应高度
	textareaElement.addEventListener('input', (event) => {
		event.target.style.height = event.target.scrollHeight + "px";
		funInfo.description = event.target.value;
	});

	let paramsTitleElement = rootElement.createChild('h1', { text: "Parameters" });
	// 表头
	let tableElement = rootElement.createChild('table');
	let theadElement = tableElement.createChild('thead');
	let trElement = theadElement.createChild('tr');
	trElement.createChild('th', { text: "Type" });
	trElement.createChild('th', { text: "Name" });
	trElement.createChild('th', { text: "Description" });
	let tbodyElement = tableElement.createChild('tbody');
	for (const paramsName in funInfo.params) {
		let trElement = tbodyElement.createChild('tr');
		const paramsInfo = funInfo.params[paramsName];

		// trElement.createChild('td', { text: params_info.type });

		let typeTdElement = trElement.createChild('td');
		let typeInputElement = typeTdElement.createChild('input', { className: 'td-edit', value: paramsInfo.type });
		typeInputElement.addEventListener('input', (event) => {
			funInfo.params[paramsName].type = event.target.value;
		});

		let nameTdElement = trElement.createChild('td');
		let nameInputElement = nameTdElement.createChild('input', { className: 'td-edit', value: paramsInfo.params_name });
		nameInputElement.addEventListener('input', (event) => {
			funInfo.params[paramsName].params_name = event.target.value;
		});

		let descriptionTdElement = trElement.createChild('td');
		let descriptionInputElement = descriptionTdElement.createChild('input', { className: 'td-edit', value: paramsInfo.description });
		descriptionInputElement.addEventListener('input', (event) => {
			funInfo.params[paramsName].description = event.target.value;
		});
	}
	// 返回值
	let returnTitleElement = rootElement.createChild('h1', { text: "Return" });
	let returnElement = rootElement.createChild('pre');
	returnElement.createChild('input', { className: 'td-edit', value: funInfo.return });
	returnElement.addEventListener('input', (event) => {
		funInfo.return = event.target.value;
	});
	// 范例
	let exampleTitleElement = rootElement.createChild('h1', { text: "Example" });
	let exampleElement = rootElement.createChild('pre');
	exampleTextareaElement = exampleElement.createChild('textarea', { className: 'list-object-value', placeholder: '值', type: 'text', rows: '1', text: funInfo.example || "" });
	exampleTextareaElement.style.height = exampleTextareaElement.scrollHeight + "px";
	// textarea自适应高度
	exampleTextareaElement.addEventListener('input', (event) => {
		event.target.style.height = event.target.scrollHeight + "px";
		funInfo.example = event.target.value;
	});

	// 确认
	let btnConfirmElement = rootElement.createChild('a', { className: 'monaco-text-button', text: '确认' });
	btnConfirmElement.addEventListener('click', () => {
		console.log(funInfo);
		vscode.postMessage({
			type: "function",
			data: funInfo
		});
	});
}
function renderEnum(enumInfo) {
	console.log(enumInfo);
	// 清空面板
	rootElement.innerHTML = "";
	let titleElement = rootElement.createChild('h1', { text: enumInfo.name });
	// 描述
	let descriptionTitleElement = rootElement.createChild('h1', { text: "Description" });
	let descriptionElement = rootElement.createChild('pre');
	let textareaElement = descriptionElement.createChild('textarea', { className: 'list-object-value', placeholder: '长描述', type: 'text', rows: '1', text: enumInfo.description || enumInfo.description_lite || "" });
	// textarea自适应高度
	textareaElement.addEventListener('input', (event) => {
		event.target.style.height = event.target.scrollHeight + "px";
		enumInfo.description = event.target.value;
	});
	// 简洁描述
	let descriptionLiteTitleElement = rootElement.createChild('h1', { text: "Concise Description" });
	let descriptionLiteElement = rootElement.createChild('pre');
	let textareaLiteElement = descriptionLiteElement.createChild('textarea', { className: 'list-object-value', placeholder: '简洁描述', type: 'text', rows: '1', text: enumInfo.description_lite || enumInfo.description || "" });
	// textarea自适应高度
	textareaLiteElement.addEventListener('input', (event) => {
		event.target.style.height = event.target.scrollHeight + "px";
		enumInfo.description_lite = event.target.value;
	});
	// 范例
	let exampleTitleElement = rootElement.createChild('h1', { text: "Example" });
	let exampleElement = rootElement.createChild('pre');
	exampleTextareaElement = exampleElement.createChild('textarea', { className: 'list-object-value', placeholder: '范例', type: 'text', rows: '1', text: enumInfo.example || "" });
	exampleTextareaElement.style.height = exampleTextareaElement.scrollHeight + "px";
	// textarea自适应高度
	exampleTextareaElement.addEventListener('input', (event) => {
		event.target.style.height = event.target.scrollHeight + "px";
		enumInfo.example = event.target.value;
	});

	// 确认
	let btnConfirmElement = rootElement.createChild('a', { className: 'monaco-text-button', text: '确认' });
	btnConfirmElement.addEventListener('click', () => {
		console.log(enumInfo);
		vscode.postMessage({
			type: "enum",
			data: enumInfo
		});
	});
}
function renderEnumType(enumList, enumType) {
	console.log(enumList, enumType);
	enumList.sort((a, b) => a.value - b.value);
	let enumListMD = `# ${enumType}\n`;
	enumListMD += (enumType === 'modifierfunction' ? 'Name|Value|Lua function|Description\n--|--|--|--\n' : 'Name|Value|Description\n--|--|--\n');
	for (let i = 0; i < enumList.length; i++) {
		const enumInfo = enumList[i];
		if (enumType === 'modifierfunction') {
			enumListMD += `${enumInfo.name}|${enumInfo.value}|${enumInfo.function}|${enumInfo.description_lite || enumInfo.description}\n`;
		} else {
			enumListMD += `${enumInfo.name}|${enumInfo.value}|${enumInfo.description_lite || enumInfo.description}\n`;
		}
	}
	document.querySelector('.markdown-body').innerHTML = marked(enumListMD);
}
window.addEventListener('message', event => {
	const message = event.data;
	if (message.type === 'function') {
		vscode.setState({
			data: message.data,
		});
		renderFunction(message.data);
	} else if (message.type === 'enum') {
		vscode.setState({
			data: message.data,
		});
		renderEnum(message.data);
	} else if (message.type === 'class') {
		vscode.setState({
			data: message.data,
		});
		RenderClass(message.data, message.name);
	} else if (message.type === 'enum_type') {
		vscode.setState({
			data: message.data,
		});
		renderEnumType(message.data, message.name);
	}
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

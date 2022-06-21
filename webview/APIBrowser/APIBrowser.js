const vscode = acquireVsCodeApi();

function renderFunction(funInfo) {
	console.log(funInfo);
	let funMD = '# ' + funInfo.function + '\n';
	funMD += '### ';
	// fun_md += fun_info.return + ' ';
	// if (fun_info.class !== 'Globals') {
	// 	fun_md += fun_info.class + ':';
	// }
	funMD += `<font color='#dcdcaa'>${funInfo.function}</font>` + '(';
	let count = 0;
	for (let paramsName in funInfo.params) {
		let paramsNameNote = funInfo.params[paramsName].params_name || paramsName;
		if (count === 0) {
			count++;
			funMD += `<font color='#569cd6'>${paramsNameNote}</font>: <font color='#c586c0'>${funInfo.params[paramsName].type}</font>`;
		} else {
			funMD += `, <font color='#569cd6'>${paramsNameNote}</font>: <font color='#c586c0'>${funInfo.params[paramsName].type}</font>`;
		}
	}
	funMD += ')';
	funMD += `: <font color='#c586c0'>${funInfo.return}</font>\n`;
	funMD += '\n';
	funMD += '# Class\n';
	// fun_md += '✔️ `Server: ' + fun_info.class + '`  \n';
	funMD += (funInfo.server === true ? '✔️' : '❌') + ' `Server: ' + funInfo.class + '`  \n\n';
	funMD += (funInfo.client === true ? '✔️' : '❌') + ' `Client: ' + funInfo.class_cl + '`  \n\n';
	// fun_md += '# Support\n';
	// fun_md += '> __✔️ Server__  \n';
	// fun_md += '> __' + (fun_info.client === true ? '✔️':'❌') + ' Client__  \n';
	funMD += '# Function Description\n' + funInfo.description + '\n';
	if (Object.keys(funInfo.params).length > 0) {
		funMD += '# Parameters\nType|Name|Description\n--|--|--\n';
		for (let paramsName in funInfo.params) {
			const paramsInfo = funInfo.params[paramsName];
			let paramsNameNote = paramsInfo.params_name || paramsName;
			funMD += paramsInfo.type + '|' + paramsNameNote + '|' + paramsInfo.description + '\n';
		}
	}
	// 是否有Example
	if (funInfo.example !== undefined) {
		funMD += '\n# Example\n```lua\n';
		funMD += funInfo.example + '\n```';
	}
	document.querySelector('.markdown-body').innerHTML = marked(funMD);
	// 重新渲染lua语言
	// let lua_code_block = document.querySelector('.language-lua');
	// lua_code_block.innerHTML = element.innerHTML.replace(/(function|local|end|true|false|self)/g, '<span class="hllua-keyword">$1</span>');
}
function renderEnum(enumInfo) {
	let funcName = enumInfo.function;
	let enumDetailMD = `# ${enumInfo.name}`;
	if (funcName !== undefined) {
		enumDetailMD += `
# Function
${funcName}`;
	}
	enumDetailMD += `
# Description
${enumInfo.description || enumInfo.description_lite}
`;
	if (enumInfo.example !== undefined) {
		enumDetailMD += `
# Example
\`\`\`
${enumInfo.example}
\`\`\`
`;
	}
	document.querySelector('.markdown-body').innerHTML = marked(enumDetailMD);
}
function renderClass(classInfo, className) {
	let classMD = `# ${className}
Function|Description|Client
--|--|--
`;
	for (let i = 0; i < classInfo.length; i++) {
		const funInfo = classInfo[i];
		let paramsString = '';
		let count = 0;
		for (let paramsName in funInfo.params) {
			let paramsNameNote = funInfo.params[paramsName].params_name || paramsName;
			if (count === 0) {
				count++;
				paramsString += paramsNameNote;
			} else {
				paramsString += ', ' + paramsNameNote;
			}
		}
		classMD += `<font color='#c586c0'>${funInfo.return}</font> <font color='#dcdcaa'>${funInfo.function}</font>(${paramsString})|${funInfo.description}|${(funInfo.client === true ? '✔️' : '❌')}\n`;
	}
	document.querySelector('.markdown-body').innerHTML = marked(classMD);
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
		renderClass(message.data, message.name);
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

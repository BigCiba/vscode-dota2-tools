const vscode = acquireVsCodeApi();

function RenderFunction(fun_info) {
	console.log(fun_info);
	let fun_md = '# ' + fun_info.function + '\n';
	fun_md += '```lua\n';
	fun_md += fun_info.return + ' ';
	// if (fun_info.class !== 'Globals') {
	// 	fun_md += fun_info.class + ':';
	// }
	fun_md += fun_info.function + '(';
	let count = 0;
	for (let params_name in fun_info.params) {
		let params_name_note = fun_info.params[params_name].params_name || params_name;
		if (count === 0) {
			count++;
			fun_md += params_name_note;
		} else {
			fun_md += ', ' + params_name_note;
		}
	}
	fun_md += ')\n';
	fun_md += '```\n';
	fun_md += '# Class\n';
	// fun_md += '✔️ `Server: ' + fun_info.class + '`  \n';
	fun_md += (fun_info.server === true ? '✔️' : '❌') + ' `Server: ' + fun_info.class + '`  \n\n';
	fun_md += (fun_info.client === true ? '✔️' : '❌') + ' `Client: ' + fun_info.class_cl + '`  \n\n';
	// fun_md += '# Support\n';
	// fun_md += '> __✔️ Server__  \n';
	// fun_md += '> __' + (fun_info.client === true ? '✔️':'❌') + ' Client__  \n';
	fun_md += '# Function Description\n' + fun_info.description + '\n';
	if (Object.keys(fun_info.params).length > 0) {
		fun_md += '# Parameters\nType|Name|Description\n--|--|--\n';
		for (let params_name in fun_info.params) {
			const params_info = fun_info.params[params_name];
			let params_name_note = params_info.params_name || params_name;
			fun_md += params_info.type + '|' + params_name_note + '|' + params_info.description + '\n';
		}
	}
	// 是否有Example
	if (fun_info.example !== undefined) {
		fun_md += '\n# Example\n```lua\n';
		fun_md += fun_info.example + '\n```';
	}
	document.querySelector('.markdown-body').innerHTML = marked(fun_md);
	// 重新渲染lua语言
	// let lua_code_block = document.querySelector('.language-lua');
	// lua_code_block.innerHTML = element.innerHTML.replace(/(function|local|end|true|false|self)/g, '<span class="hllua-keyword">$1</span>');
}
function RenderEnum(enum_info) {
	let funcName = enum_info.function;
	let enum_detail_md = `# ${enum_info.name}`
	if (funcName != undefined) {
		enum_detail_md += `
# Function
${funcName}`
	}
	enum_detail_md += `
# Description
${enum_info.description||enum_info.description_lite}
`;
if (enum_info.example !== undefined) {
	enum_detail_md += `
# Example
\`\`\`
${enum_info.example}
\`\`\`
`;
}
	document.querySelector('.markdown-body').innerHTML = marked(enum_detail_md);
}
function RenderClass(class_info, class_name) {
	let class_md = `# ${class_name}
Function|Description|Client
--|--|--
`;
	for (let i = 0; i < class_info.length; i++) {
		const fun_info = class_info[i];
		let params_string = '';
		let count = 0;
		for (let params_name in fun_info.params) {
			let params_name_note = fun_info.params[params_name].params_name || params_name;
			if (count === 0) {
				count++;
				params_string += params_name_note;
			} else {
				params_string += ', ' + params_name_note;
			}
		}
		class_md += `<font color='#c586c0'>${fun_info.return}</font> <font color='#dcdcaa'>${fun_info.function}</font>(${params_string})|${fun_info.description}|${(fun_info.client === true ? '✔️' : '❌')}\n`;
	}
	document.querySelector('.markdown-body').innerHTML = marked(class_md);
}
function RenderEnumType(enum_list, enum_type) {
	console.log(enum_list, enum_type);
	let enum_list_md = `# ${enum_type}\n`;
	enum_list_md += (enum_type == 'modifierfunction' ? 'Name|Value|Lua function|Description\n--|--|--|--\n':'Name|Value|Description\n--|--|--\n');
	for (let i = 0; i < enum_list.length; i++) {
		const enum_info = enum_list[i];
		if (enum_type == 'modifierfunction') {
			enum_list_md += `${enum_info.name}|${enum_info.value}|${enum_info.function}|${enum_info.description_lite || enum_info.description}\n`;
		} else {
			enum_list_md += `${enum_info.name}|${enum_info.value}|${enum_info.description_lite || enum_info.description}\n`;
		}
	}
	document.querySelector('.markdown-body').innerHTML = marked(enum_list_md);
}
window.addEventListener('message', event => {
	const message = event.data;
	if (message.type == 'function') {
		vscode.setState({ 
			data: message.data,
		});
		RenderFunction(message.data);
	} else if (message.type == 'enum') {
		vscode.setState({ 
			data: message.data,
		});
		RenderEnum(message.data);
	} else if (message.type == 'class') {
		vscode.setState({ 
			data: message.data,
		});
		RenderClass(message.data, message.name);
	} else if (message.type == 'enum_type') {
		vscode.setState({ 
			data: message.data,
		});
		RenderEnumType(message.data, message.name);
	}
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

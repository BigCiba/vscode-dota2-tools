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
	fun_md += '✔️ `Server: ' + fun_info.class + '`  \n';
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
	let enum_detail_md = `# ${enum_info.name}
# Description
${enum_info.description||enum_info.description_lite}
# Example
\`\`\`
${enum_info.example}
\`\`\`
`;
	document.querySelector('.markdown-body').innerHTML = marked(enum_detail_md);
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
	}
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

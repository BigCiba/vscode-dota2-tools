const vscode = acquireVsCodeApi();

function RenderClass(class_info, class_name) {
	let titles = Object.keys(class_info[Object.keys(class_info)[0]]);
	let class_md = `# ${class_name}
${titles[0]}|${titles[1]}|${titles[2]}
--|--|--
`;
	for (const name in class_info) {
		const element = class_info[name];
		class_md += `${element[titles[0]]}|${element[titles[1]]}|${element[titles[2]]}\n`;
	}
	document.querySelector('.markdown-body').innerHTML = marked(class_md);
}
window.addEventListener('message', event => {
	const message = event.data;
	if (message.type == 'class') {
		vscode.setState({ 
			data: message.data,
		});
		RenderClass(message.data, message.name);
	}
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

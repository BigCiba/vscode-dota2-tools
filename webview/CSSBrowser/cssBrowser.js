const vscode = acquireVsCodeApi();

function renderCss(cssInfo) {
	console.log(cssInfo);
	let css = '';
	for (const key in cssInfo) {
		const element = cssInfo[key];
		css += `# ${key}
${element.description}
`;
		if (element.value && Object.keys(element.value).length > 0) {
			css += '## 属性值\n值|描述\n--|--\n';
			for (let value in element.value) {
				css += value.replace(/</, "\\\<").replace(/>/, "\\\>") + '|' + element.value[value].description + '\n';
			}
		}
		if (element.example) {
			css += `## 范例
\`\`\`css
${element.example}
\`\`\`
`;
		}
	}
	document.querySelector('.markdown-body').innerHTML = marked(css);
}
window.addEventListener('message', event => {
	const message = event.data;
	vscode.setState({
		data: message.data,
	});
	renderCss(message.data);
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

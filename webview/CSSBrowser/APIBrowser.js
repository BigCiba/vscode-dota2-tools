const vscode = acquireVsCodeApi();

function RenderCss(css_info) {
	let css = '';
	for (const key in css_info) {
		const element = css_info[key];
		css += `# ${key}
${element.description}
`;
		if (element.example) {
			css += `## Example
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
	RenderCss(message.data);
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

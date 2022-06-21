const vscode = acquireVsCodeApi();

function render(info) {
	document.querySelector('.markdown-body').innerHTML = marked(info);
}
window.addEventListener('message', event => {
	const message = event.data;
	vscode.setState({
		data: message.data,
	});
	render(message.data);
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

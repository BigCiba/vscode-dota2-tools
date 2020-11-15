const vscode = acquireVsCodeApi();

function Render(info) {
	document.querySelector('.markdown-body').innerHTML = marked(info);
}
window.addEventListener('message', event => {
	const message = event.data;
	vscode.setState({
		data: message.data,
	});
	Render(message.data);
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

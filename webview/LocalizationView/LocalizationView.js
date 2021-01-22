const vscode = acquireVsCodeApi();
window.addEventListener('message', event => {
	const message = event.data;
	console.log(message);
});
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

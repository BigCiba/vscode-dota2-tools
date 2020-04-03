const testMode = false; // 为true时可以在浏览器打开不报错
// vscode webview 网页和普通网页的唯一区别：多了一个acquireVsCodeApi方法
const vscode = testMode ? {} : acquireVsCodeApi();
const callbacks = {};

window.addEventListener('message', event => {
	const message = event.data;
	console.log(message);
	for (const key in message) {
		console.log(key);
	}
	// console.log(message);
	switch (message.cmd) {
		case 'vscodeCallback':
			console.log(message.data);
			(callbacks[message.cbid] || function () { })(message.data);
			delete callbacks[message.cbid];
			break;
		default: break;
	}
});
function Confirm(image) {
	vscode.postMessage(image.id);
}
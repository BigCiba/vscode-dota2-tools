const testMode = false; // 为true时可以在浏览器打开不报错
// vscode webview 网页和普通网页的唯一区别：多了一个acquireVsCodeApi方法
const vscode = testMode ? {} : acquireVsCodeApi();
const callbacks = {};

/**
 * 调用vscode原生api
 * @param data 可以是类似 {cmd: 'xxx', param1: 'xxx'}，也可以直接是 cmd 字符串
 * @param cb 可选的回调函数
 */
function callVscode(data, cb) {
	if (typeof data === 'string') {
		data = { cmd: data };
	}
	if (cb) {
		// 时间戳加上5位随机数
		const cbid = Date.now() + '' + Math.round(Math.random() * 100000);
		callbacks[cbid] = cb;
		data.cbid = cbid;
	}
	vscode.postMessage(data);
}

window.addEventListener('message', event => {
	const message = event.data;
	switch (message.cmd) {
		case 'vscodeCallback':
			console.log(message.data);
			(callbacks[message.cbid] || function () { })(message.data);
			delete callbacks[message.cbid];
			break;
		default: break;
	}
});
function Confirm() {
	var description = document.getElementById("description");
	var example = document.getElementById("example");
	var parameters = document.getElementById("parameters");
	var params = {};
	for (let row = 1; row < parameters.rows.length; row++) {
		params[parameters.rows[row].cells[0].innerText] = {
			params_name: parameters.rows[row].cells[1].children[0].value,
			description: parameters.rows[row].cells[2].children[0].value
		}
	}
	var obj = {
		description: description.value,
		example: example.value,
		params: params
	}
	vscode.postMessage(obj);
}
function ConfirmConstant() {
	var description_lite = document.getElementById("description_lite");
	var description = document.getElementById("description");
	var example = document.getElementById("example");
	var obj = {
		description_lite: description_lite.value,
		description: description.value || undefined,
		example: example.value || undefined
	}
	vscode.postMessage(obj);
}
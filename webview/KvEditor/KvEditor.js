const vscode = acquireVsCodeApi();

function render(kv) {
	kv = kv[Object.keys(kv)[0]];
	let content = `<vscode-data-grid aria-label="Basic">\n`;
	for (const key in kv) {
		const value = kv[key];
		content += `<vscode-data-grid-row>
			<vscode-data-grid-cell grid-column="1">${key}</vscode-data-grid-cell>
			<vscode-data-grid-cell grid-column="2">${value}</vscode-data-grid-cell>
		</vscode-data-grid-row>`;
	}
	content += `</vscode-data-grid>`;
	document.getElementById("markdown-body").innerHTML = content;
}

window.addEventListener('message', event => {
	const message = event.data;
	switch (message.type) {
		case 'update':
			render(message.data);
			return;
	}
});
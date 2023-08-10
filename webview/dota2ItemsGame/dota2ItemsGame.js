const vscode = acquireVsCodeApi();

function onInput() {
	const filter = document.getElementById("filter");
	let filterWord = filter.value;
	if (filterWord === "") {
		document.getElementById("markdown-body").innerHTML = "";
	} else {
		vscode.postMessage({
			type: 'query_item_data',
			text: filterWord,
		});
	}
}
function render(itemData) {
	let content = itemData.econImg != undefined ? `<img id="preview" src="data:image/jpeg;base64,${itemData.econImg}" >` : "<vscode-button disabled>设置中配置本地图片路径可以预览图片</vscode-button>";
	for (const key in itemData) {
		const value = itemData[key];
		if (key === "visuals") {
			content += `<h1 id="${key}">${value["localize"]}</h1>\n`;
			content +=
				`<vscode-panels >
				${(() => {
					let tab = "";
					let view = "";
					for (const tabid in value) {
						if (tabid !== "localize") {
							tab += `<vscode-panel-tab id="${tabid}">${tabid}</vscode-panel-tab>\n`;
							view += `<vscode-panel-view id="view-${tabid}">`;
							view += `<vscode-data-grid aria-label="Basic">
								<vscode-data-grid-row row-type="header">
									${(() => {
									let text = "";
									Object.keys(value[tabid]).map((name, index) => {
										text += `<vscode-data-grid-cell cell-type="columnheader" grid-column="${index + 1}">${name}</vscode-data-grid-cell>\n`;
									});
									return text;
								})()}
									</vscode-data-grid-row>
									<vscode-data-grid-row>
									${(() => {
									let text = "";
									Object.keys(value[tabid]).map((name, index) => {
										text += `<vscode-data-grid-cell grid-column="${index + 1}">${value[tabid][name]}</vscode-data-grid-cell>\n`;
									});
									return text;
								})()}
								</vscode-data-grid-row>
							</vscode-data-grid>`;
							view += `</vscode-panel-view>\n`;
						}
					}
					return tab + view;
				})()}
			</vscode-panels>\n`;
		} else if (key === "price_info") {
			content += `<h1 id="${key}">${value["localize"]}</h1>\n`;
			content += `<vscode-data-grid aria-label="Basic">\n`;
			content += `	<vscode-data-grid-row row-type="header">\n`;
			Object.keys(value).map((name, index) => {
				if (name === "localize") { return; }
				content += `	<vscode-data-grid-cell cell-type="columnheader" grid-column="${index + 1}">${name}</vscode-data-grid-cell>\n`;
			});
			content += `	</vscode-data-grid-row>\n`;
			content += `	<vscode-data-grid-row >\n`;
			Object.keys(value).map((name, index) => {
				if (name === "localize") { return; }
				content += `	<vscode-data-grid-cell grid-column="${index + 1}">${value[name]}</vscode-data-grid-cell>\n`;
			});
			content += `	</vscode-data-grid-row>\n`;
			content += `</vscode-data-grid>\n`;
		} else if (key === "bundle") {
			content += `<h1 id="${key}">${value["localize"]}</h1>\n`;
			content += `<vscode-data-grid aria-label="Basic" grid-template-columns="100px">\n`;
			Object.keys(value).map((name, index) => {
				if (name === "localize") { return; }
				content += `<vscode-data-grid-row row-type="header">\n`;
				content += `	<vscode-data-grid-cell grid-column="1">${name}</vscode-data-grid-cell>\n`;
				content += `	<vscode-data-grid-cell grid-column="2">${value[name]}</vscode-data-grid-cell>\n`;
				content += `</vscode-data-grid-row>\n`;
			});
			content += `</vscode-data-grid>\n`;
		} else if (key === "bundle_contain") {
			content += `<h1 id="${key}">${value["localize"]}</h1>\n`;
			content += `<vscode-data-grid aria-label="Basic" grid-template-columns="100px">\n`;
			Object.keys(value).map((name, index) => {
				if (name === "localize") { return; }
				content += `<vscode-data-grid-row row-type="header">\n`;
				content += `	<vscode-data-grid-cell grid-column="1">${name}</vscode-data-grid-cell>\n`;
				content += `	<vscode-data-grid-cell grid-column="2">${value[name]}</vscode-data-grid-cell>\n`;
				content += `</vscode-data-grid-row>\n`;
			});
			content += `</vscode-data-grid>\n`;
		} else if (key != "econImg") {
			content += `<h1 id="${key}">${key}</h1>\n<p>${value}</p>\n`;
		}
	}
	document.getElementById("markdown-body").innerHTML = content;
}
function renderList(itemList) {
	let content = `<vscode-data-grid aria-label="Basic" generate-header="sticky" grid-template-columns="100px 200px 150px">\n`;
	for (let i = 0; i < itemList.length; i++) {
		let element = itemList[i];
		if (i === 0) {
			content += `<vscode-data-grid-row row-type="header">\n`;
		} else {
			content += `<vscode-data-grid-row>\n`;
		}
		for (let j = 0; j < element.length; j++) {
			if (i === 0) {
				content += `<vscode-data-grid-cell cell-type="columnheader" grid-column="${j + 1}">${element[j] || ""}</vscode-data-grid-cell>\n`;
			} else {
				content += `<vscode-data-grid-cell grid-column="${j + 1}">${element[j] || ""}</vscode-data-grid-cell>\n`;
			}
		}
		content += `</vscode-data-grid-row>\n`;
	}
	content += `</vscode-data-grid>\n`;
	document.getElementById("markdown-body").innerHTML = content;
}
function onClear(params) {
	document.getElementById("filter").value = "";
	document.getElementById("markdown-body").innerHTML = "";
}
window.addEventListener('message', event => {
	const message = event.data;
	switch (message.type) {
		case 'query_item_data':
			render(message.data);
			return;
		case 'query_item_list_data':
			renderList(message.data);
			return;
	}
});
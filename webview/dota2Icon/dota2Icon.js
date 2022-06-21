// Script run within the webview itself.
const vscode = acquireVsCodeApi();
// window.addEventListener("load", main);

function onInput() {
	const filter = document.getElementById("filter");
	let filterWord = filter.value;
	let allIcon = document.querySelectorAll('.icon');
	for (const element of allIcon) {
		let filterArr = filterWord.split(" ");
		let display = "none";
		for (const word of filterArr) {
			if (word !== '' && element.id.search(word) === -1) {
				display = 'none';
			} else {
				display = '';
			}
		}
		element.style.display = display;
	}
}
function toggleType(btn) {
	let allBtn = document.querySelectorAll('.texture-type');
	for (const iterator of allBtn) {
		iterator.className = 'texture-type';
	}
	btn.className = 'texture-type selected';
	let textureContainer = document.getElementById("texture-content");
	let itemTextureContainer = document.getElementById("item-texture-content");
	if (btn.value === '技能') {
		textureContainer.style.display = 'grid';
		itemTextureContainer.style.display = 'none';
	} else if (btn.value === '物品') {
		textureContainer.style.display = 'none';
		itemTextureContainer.style.display = 'grid';
	}
}
function heroFilter(img, heroName) {
	const filter = document.getElementById("filter");
	if (heroName === 'base') {
		filter.value = '';
	} else {
		filter.value = heroName;
	}
	const heroFilter = document.getElementById("hero-filter");
	heroFilter.src = img.src;
	onInput();
}
function copyIconName(iconName) {
	vscode.postMessage({
		type: 'copy_ability_name',
		text: iconName
	});
}
function openFolder(iconName) {
	vscode.postMessage({
		type: 'copy_ability_file',
		text: iconName
	});
}
document.oncontextmenu = function (event) {
	event.preventDefault();
};
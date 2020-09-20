// Script run within the webview itself.
const vscode = acquireVsCodeApi();
const textureContainer = (document.querySelector('.texture-content'));
const itemTextureContainer = (document.querySelector('.item-texture-content'));
const dropdownContainer = (document.querySelector('.dropdown-content'));
const heroFilter = (document.querySelector('.hero-filter'));
const filter = document.getElementById("filter")

function OnInput() {
	let container = (textureContainer.style.display == 'grid' || textureContainer.style.display == '') ? textureContainer:itemTextureContainer;
	let children = container.children;
	let filter_word = filter.value;
	for (let index = 0; index < children.length; index++) {
		const element = children[index];
		if (filter_word != '' && element.id.search(filter_word) == -1) {
			element.style.display = 'none'
		} else {
			element.style.display = '';
		}
	}
	
	// vscode.postMessage(image.id);
}
function ToggleType(btn) {
	let all_btn = document.querySelectorAll('.texture-type');
	for (const iterator of all_btn) {
		iterator.className = 'texture-type';
	}
	btn.className = 'texture-type selected';
	const state = vscode.getState();
	if (state) {
		if (btn.value == '技能') {
			textureContainer.style.display = 'grid';
			itemTextureContainer.style.display = 'none';
			// updateContent(state.texture_data, state.spellicons_uri, state.heroes_data, state.heroes_icon_uri);
		} else if (btn.value == '物品') {
			textureContainer.style.display = 'none';
			itemTextureContainer.style.display = 'grid';
			if (itemTextureContainer.bInit == undefined) {
				itemTextureContainer.bInit = true
				InitItemContent(state.icons_data);
			}
		}
	}
}
function InitAbilityContent(icons_data) {
	textureContainer.innerHTML = '';
	// 加载技能图标
	let spellicons_data = icons_data.spellicons;
	let root_path = spellicons_data.path;
	let data = spellicons_data.data;
	for (const id in data || []) {
		const img = document.createElement('input');
		img.id = id;
		img.type = 'image';
		img.className = 'texture-icon';
		img.src = data[id];
		img.addEventListener('click', () => {
			vscode.postMessage(id);
		});

		textureContainer.appendChild(img);
	}
	// 加载自定义技能图标
	let custom_spellicons_data = icons_data.custom_spellicons;
	for (let index = 0; index < custom_spellicons_data.length; index++) {
		const spellicons_data = custom_spellicons_data[index];
		const root_path = spellicons_data.path;
		const data = spellicons_data.data;
		for (const id in data || []) {
			const img = document.createElement('input');
			img.id = id;
			img.type = 'image';
			img.className = 'texture-icon';
			img.src = data[id];
			img.addEventListener('click', () => {
				vscode.postMessage(id);
			});
	
			textureContainer.appendChild(img);
		}
	}
}
function InitItemContent(icons_data) {
	itemTextureContainer.innerHTML = '';
	// 加载物品图标
	let items_data = icons_data.items;
	let root_path = items_data.path;
	let data = items_data.data;
	for (const id in data || []) {
		const img = document.createElement('input');
		img.id = id;
		img.type = 'image';
		img.className = 'item-texture-icon';
		img.src = data[id];
		img.addEventListener('click', () => {
			vscode.postMessage(id);
		});

		itemTextureContainer.appendChild(img);
	}
	// 加载自定义物品图标
	let custom_items_data = icons_data.custom_items;
	for (let index = 0; index < custom_items_data.length; index++) {
		const items_data = custom_items_data[index];
		const root_path = items_data.path;
		const data = items_data.data;
		for (const id in data || []) {
			const img = document.createElement('input');
			img.id = id;
			img.type = 'image';
			img.className = 'item-texture-icon';
			img.src = data[id];
			img.addEventListener('click', () => {
				vscode.postMessage(id);
			});
	
			itemTextureContainer.appendChild(img);
		}
	}
}
function InitHeroFilter(icons_data) {
	let heroes_data = icons_data.heroes
	let root_path = heroes_data.path;
	let data = heroes_data.data;
	console.log(data);
	for (const key in data) {
		const img = document.createElement('input');
		img.id = key;
		img.type = 'image';
		img.className = 'hero-icon';
		img.src = data[key];
		img.addEventListener('click', () => {
			if (key == 'default') {
				filter.value = '';
			} else {
				filter.value = key;
			}
			heroFilter.src = img.src;
			OnInput();
		});
		dropdownContainer.appendChild(img);
	}
}
window.addEventListener('message', event => {
	const message = event.data;
	switch (message.type) {
		case 'update':
			const icons_data = message.icons_data;
			InitAbilityContent(icons_data);
			InitHeroFilter(icons_data);
			
			// updateContent(texture_data, spellicons_uri, heroes_data, heroes_icon_uri,custom_spellicons_data,custom_spellicons_uri);
			// Then persist state information.
			// This state is returned in the call to `vscode.getState` below when a webview is reloaded.
			vscode.setState({ 
				icons_data,
			});

			return;
	}
});
(function () {
	const state = vscode.getState();
	if (state) {
		InitAbilityContent(icons_data);
		InitHeroFilter(icons_data);
		InitItemContent(icons_data);
		// updateContent(state.texture_data, state.spellicons_uri, state.heroes_data, state.heroes_icon_uri, state.custom_spellicons_data, state.custom_spellicons_uri);
	}
}());
// Script run within the webview itself.
const vscode = acquireVsCodeApi();
const textureContainer = (document.querySelector('.texture-content'));
const itemTextureContainer = (document.querySelector('.item-texture-content'));
const dropdownContainer = (document.querySelector('.dropdown-content'));
const heroFilter = (document.querySelector('.hero-filter'));
const filter = document.getElementById("filter")
let TextureType = 'ability';

function updateContent(texture_data, spellicons_uri, heroes_data, heroes_icon_uri,custom_spellicons_data,custom_spellicons_uri) {
	textureContainer.innerHTML = '';
	for (const id in texture_data || []) {
		const img = document.createElement('input');
		img.id = id;
		img.type = 'image';
		img.className = 'texture-icon';
		img.src = spellicons_uri + '/' + texture_data[id];
		img.addEventListener('click', () => {
			vscode.postMessage(id);
		});

		textureContainer.appendChild(img);
	}
	console.log(heroes_data);
	
	for (const key in heroes_data) {
		const img = document.createElement('input');
		img.id = key;
		img.type = 'image';
		img.className = 'hero-icon';
		img.src = heroes_icon_uri + '/' + heroes_data[key];
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

function OnInput() {
	let container = textureContainer.style.display == 'grid' ? textureContainer:itemTextureContainer;
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
				InitItemContent(state.icons_data.items);
			}
		}
	}
}
function InitAbilityContent(spellicons_data) {
	let root_path = spellicons_data.path;
	let data = spellicons_data.data;
	textureContainer.innerHTML = '';
	for (const id in data || []) {
		const img = document.createElement('input');
		img.id = id;
		img.type = 'image';
		img.className = 'texture-icon';
		img.src = root_path + '/' + data[id];
		img.addEventListener('click', () => {
			vscode.postMessage(id);
		});

		textureContainer.appendChild(img);
	}
}
function InitItemContent(items_data) {
	let root_path = items_data.path;
	let data = items_data.data;
	itemTextureContainer.innerHTML = '';
	for (const id in data || []) {
		const img = document.createElement('input');
		img.id = id;
		img.type = 'image';
		img.className = 'item-texture-icon';
		img.src = root_path + '/' + data[id];
		img.addEventListener('click', () => {
			vscode.postMessage(id);
		});

		itemTextureContainer.appendChild(img);
	}
}
function InitHeroFilter(heroes_data) {
	let root_path = heroes_data.path;
	let data = heroes_data.data;
	for (const key in data) {
		const img = document.createElement('input');
		img.id = key;
		img.type = 'image';
		img.className = 'hero-icon';
		img.src = root_path + '/' + data[key];
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
			InitAbilityContent(icons_data.spellicons);
			InitHeroFilter(icons_data.heroes)
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
		// updateContent(state.texture_data, state.spellicons_uri, state.heroes_data, state.heroes_icon_uri, state.custom_spellicons_data, state.custom_spellicons_uri);
	}
}());
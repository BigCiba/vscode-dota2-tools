// Script run within the webview itself.
const vscode = acquireVsCodeApi();
const textureContainer = (document.querySelector('.texture-content'));
const dropdownContainer = (document.querySelector('.dropdown-content'));
const heroFilter = (document.querySelector('.hero-filter'));
const filter = document.getElementById("filter")

function updateContent(text, uri, heroes_data, heroUri) {
	let filter_word = filter.value;

	textureContainer.innerHTML = '';
	for (const id in text || []) {
		const img = document.createElement('input');
		img.id = id;
		img.type = 'image';
		img.className = 'texture-icon';
		img.src = uri + '/' + text[id];
		
		if (filter_word != '' && id.search(filter_word) == -1) {
			img.style.display = "none"
		}
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
		img.src = heroUri + '/' + heroes_data[key];
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
			const text = message.text;
			const uri = message.uri;
			const heroes_data = message.heroes_data;
			const heroUri = message.heroUri;
			

			updateContent(text, uri, heroes_data, heroUri);
			// Then persist state information.
			// This state is returned in the call to `vscode.getState` below when a webview is reloaded.
			vscode.setState({ text, uri, heroes_data, heroUri });

			return;
	}
});
function OnInput() {
	let children = textureContainer.children;
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
(function () {
	const state = vscode.getState();
	if (state) {
		updateContent(state.text, state.uri, state.heroes_data, state.heroUri);
	}
}());
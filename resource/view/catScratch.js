// Script run within the webview itself.
(function () {

	// Get a reference to the VS Code webview api.
	// We use this API to post messages back to our extension.

	// @ts-ignore
	const vscode = acquireVsCodeApi();


	const notesContainer = /** @type {HTMLElement} */ (document.querySelector('.active-list'));

	// const addButtonContainer = document.querySelector('.add-button');
	// addButtonContainer.querySelector('button').addEventListener('click', () => {
	// 	vscode.postMessage({
	// 		type: 'add'
	// 	});
	// })

	const errorContainer = document.createElement('div');
	document.body.appendChild(errorContainer);
	errorContainer.className = 'error'
	errorContainer.style.display = 'none'

	/**
	 * Render the document in the webview.
	 */
	function updateContent(/** @type {string} */ text, uri) {
		
		let json;
		try {
			json = JSON.parse(text);
		} catch {
			notesContainer.style.display = 'none';
			errorContainer.innerText = 'Error: Document is not valid json';
			errorContainer.style.display = '';
			return;
		}
		notesContainer.style.display = '';
		errorContainer.style.display = 'none';
		
		// Render the scratches
		notesContainer.innerHTML = '';
		console.log(json.CustomHeroList);
		
		for (const note in json.CustomHeroList || []) {
			const img = document.createElement('input');
			img.type = 'image';
			img.className = 'hero-icon';
			img.src = uri + '/' + note +'_png.png';
			img.addEventListener('click', () => {
				vscode.postMessage({ type: 'change', id: note, });
				
			});
			
			if (json.CustomHeroList[note] == 0) {
				img.className = 'hero-icon disable';
			}
			notesContainer.appendChild(img);
		}

		// notesContainer.appendChild(addButtonContainer);
	}

	// Handle messages sent from the extension to the webview
	window.addEventListener('message', event => {
		const message = event.data; // The json data that the extension sent
		switch (message.type) {
			case 'update':
				const text = message.text;
				const uri = message.uri;

				// Update our webview's content
				
				updateContent(text, uri);

				// Then persist state information.
				// This state is returned in the call to `vscode.getState` below when a webview is reloaded.
				vscode.setState({ text, uri });

				return;
		}
	});

	// Webviews are normally torn down when not visible and re-created when they become visible again.
	// State lets us save information across these re-loads
	const state = vscode.getState();
	if (state) {
		updateContent(state.text, state.uri);
	}
}());
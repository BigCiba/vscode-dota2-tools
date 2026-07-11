// @ts-nocheck
(function () {
	const vscode = acquireVsCodeApi();
	const listEl = document.getElementById('list');
	const countEl = document.getElementById('count');
	const filterEl = document.getElementById('filter');

	let allSounds = [];
	const MAX_ROWS = 400;

	function render() {
		const q = (filterEl.value || '').toLowerCase().trim();
		// Split on whitespace and require every word to appear (in the event name or file),
		// so multi-word queries like "hero death" match instead of failing on the space.
		const words = q ? q.split(/\s+/) : [];
		let filtered = allSounds;
		if (words.length) {
			filtered = allSounds.filter((s) => {
				const hay = ((s.description || '') + ' ' + (s.label || '')).toLowerCase();
				return words.every((w) => hay.indexOf(w) !== -1);
			});
		}

		const shown = filtered.slice(0, MAX_ROWS);
		countEl.textContent =
			filtered.length +
			' sound' +
			(filtered.length === 1 ? '' : 's') +
			(filtered.length > MAX_ROWS ? ' — showing first ' + MAX_ROWS + ', refine your search' : '');

		const frag = document.createDocumentFragment();
		for (const s of shown) {
			const row = document.createElement('div');
			row.className = 'row';
			row.title = 'Click to insert "' + (s.description || s.label) + '"';

			const ev = document.createElement('div');
			ev.className = 'event';
			ev.textContent = s.description || s.label;
			row.appendChild(ev);

			if (s.label && s.label !== s.description) {
				const file = document.createElement('div');
				file.className = 'file';
				file.textContent = s.label;
				row.appendChild(file);
			}

			row.addEventListener('click', () => {
				vscode.postMessage({ type: 'insert_sound', text: s.description || s.label });
			});
			frag.appendChild(row);
		}
		listEl.innerHTML = '';
		listEl.appendChild(frag);
	}

	filterEl.addEventListener('input', render);

	window.addEventListener('message', (event) => {
		const message = event.data;
		if (message && message.type === 'sound_list') {
			allSounds = Array.isArray(message.data) ? message.data : [];
			render();
		}
	});

	render();
})();

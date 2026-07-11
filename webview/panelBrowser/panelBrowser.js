// @ts-nocheck
(function () {
	const vscode = acquireVsCodeApi();
	const listEl = document.getElementById('list');
	const countEl = document.getElementById('count');
	const filterEl = document.getElementById('filter');

	let panels = [];

	function renderMarkdown(md) {
		try {
			if (typeof marked !== 'undefined') {
				return marked.parse ? marked.parse(md) : marked(md);
			}
		} catch (e) { /* fall through */ }
		const div = document.createElement('div');
		const pre = document.createElement('pre');
		pre.textContent = md;
		div.appendChild(pre);
		return div.innerHTML;
	}

	function render() {
		const q = (filterEl.value || '').toLowerCase().trim();
		const words = q ? q.split(/\s+/) : [];
		let filtered = panels;
		if (words.length) {
			filtered = panels.filter((p) => {
				const hay = p.name.toLowerCase();
				return words.every((w) => hay.indexOf(w) !== -1);
			});
		}

		countEl.textContent = filtered.length + ' panel' + (filtered.length === 1 ? '' : 's');

		const frag = document.createDocumentFragment();
		for (const p of filtered) {
			const item = document.createElement('div');
			item.className = 'panel-item';

			const head = document.createElement('div');
			head.className = 'panel-head';
			head.appendChild(document.createTextNode(p.name));

			const doc = document.createElement('div');
			doc.className = 'panel-doc';
			doc.style.display = 'none';

			let rendered = false;
			head.addEventListener('click', () => {
				const willOpen = doc.style.display === 'none';
				doc.style.display = willOpen ? 'block' : 'none';
				item.classList.toggle('open', willOpen);
				if (willOpen && !rendered) {
					doc.innerHTML = renderMarkdown(p.md || '');
					rendered = true;
				}
			});

			item.appendChild(head);
			item.appendChild(doc);
			frag.appendChild(item);
		}
		listEl.innerHTML = '';
		listEl.appendChild(frag);
	}

	filterEl.addEventListener('input', render);

	window.addEventListener('message', (event) => {
		const message = event.data;
		if (message && message.type === 'panel_list') {
			panels = Array.isArray(message.data) ? message.data : [];
			render();
		}
	});

	render();
})();

const vscode = acquireVsCodeApi();

// Navigation history stack
const navigationHistory = [];
// Current view mode: "list" or "grid" (default: grid / blocks)
let viewMode = "grid";
// Current UI language (set by the extension)
let uiLang = "en";
// Last received list data (used to re-render when switching views)
let lastListData = null;
// KV selection mode
let selectedItems = []; // [{id, name}]

const i18n = {
	"en": {
		placeholder: "Enter ID / item name / hero name / model / particle / icon path",
		clearTitle: "Clear search results",
		backTitle: "Back",
		listTitle: "List view",
		gridTitle: "Grid view",
		noIcon: "No icon",
		selectedCount: (n) => `${n} item(s) selected`,
		copyKv: "Copy KV Block",
		cancelSelection: "Cancel",
		kvCopied: "KV block copied to clipboard!",
		bundleCopyKv: "Copy as KV",
		bundleCopied: "Copied!",
		hintRightClick: "Tip: Right-click items in grid/list view to select them and generate an AttachWearables KV block"
	},
	"zh-cn": {
		placeholder: "Enter ID / item name / hero name / model / particle / icon path",
		clearTitle: "Clear search results",
		backTitle: "Back",
		listTitle: "List view",
		gridTitle: "Grid view",
		noIcon: "No icon",
		selectedCount: (n) => `${n} item(s) selected`,
		copyKv: "Copy KV Block",
		cancelSelection: "Cancel",
		kvCopied: "KV block copied to clipboard!",
		bundleCopyKv: "Copy as KV",
		bundleCopied: "Copied!",
		hintRightClick: "Tip: Right-click items in grid/list view to select them and generate an AttachWearables KV block"
	}
};

function t() { return i18n[uiLang] || i18n["en"]; }

// ===================== Copy helpers (models / particles / paths) =====================

function escAttr(s) {
	return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/** Heuristic: does this value look like a resource path (model / particle / etc.)? */
function looksLikePath(v) {
	if (typeof v !== 'string') return false;
	return /[\\/]/.test(v) || /\.(vmdl|vpcf|vmat|vtex|vsndevts|vsnd)\b/i.test(v);
}

/** Small inline copy button; the value is carried in a data attribute (no escaping headaches). */
function copyBtnHtml(value) {
	return ` <button class="copy-btn" data-copy="${escAttr(value)}" title="Copy"><span class="codicon codicon-copy"></span></button>`;
}

// One delegated handler for every copy button (present and future), so it keeps working after re-renders.
document.addEventListener('click', (e) => {
	const btn = e.target && e.target.closest ? e.target.closest('.copy-btn') : null;
	if (!btn) return;
	e.stopPropagation(); // don't trigger row navigation
	const val = btn.getAttribute('data-copy') || '';
	navigator.clipboard.writeText(val).then(() => {
		btn.classList.add('copied');
		setTimeout(() => btn.classList.remove('copied'), 1000);
	});
});

function applyLanguage(lang) {
	uiLang = lang;
	const tr = t();
	const filter = document.getElementById("filter");
	if (filter) {
		filter.setAttribute("placeholder", tr.placeholder);
		const clearBtn = filter.querySelector('[slot="end"]');
		if (clearBtn) { clearBtn.setAttribute("title", tr.clearTitle); }
	}
	const backBtn = document.getElementById("back-btn");
	if (backBtn) { backBtn.setAttribute("title", tr.backTitle); }
	const listBtn = document.getElementById("view-list-btn");
	if (listBtn) { listBtn.setAttribute("title", tr.listTitle); }
	const gridBtn = document.getElementById("view-grid-btn");
	if (gridBtn) { gridBtn.setAttribute("title", tr.gridTitle); }
	const hintEl = document.getElementById("hint-text");
	if (hintEl) { hintEl.textContent = tr.hintRightClick; }
}

function onInput() {
	const filter = document.getElementById("filter");
	let filterWord = filter.value;
	if (filterWord === "") {
		document.getElementById("markdown-body").innerHTML = "";
		lastListData = null;
	} else {
		vscode.postMessage({
			type: 'query_item_data',
			text: filterWord,
		});
	}
}

/** Navigate to the given item ID and push the current state onto the history stack */
function navigateToItem(itemId) {
	const currentContent = document.getElementById("markdown-body").innerHTML;
	const currentSearch = document.getElementById("filter").value;
	if (currentContent) {
		navigationHistory.push({
			content: currentContent,
			search: currentSearch,
			scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
			listData: lastListData,
			viewMode: viewMode
		});
	}
	updateBackButton();
	vscode.postMessage({
		type: 'query_item_by_id',
		text: String(itemId),
	});
}

/** Go back to the previous view */
function onBack() {
	if (navigationHistory.length > 0) {
		const prev = navigationHistory.pop();
		document.getElementById("markdown-body").innerHTML = prev.content;
		document.getElementById("filter").value = prev.search;
		lastListData = prev.listData || null;
		if (prev.viewMode) { setViewMode(prev.viewMode, true); }
		reattachNavigationHandlers();
		reattachContextMenuHandlers();
		setTimeout(() => {
			document.documentElement.scrollTop = prev.scrollTop;
			document.body.scrollTop = prev.scrollTop;
		}, 50);
	}
	updateBackButton();
}

function updateBackButton() {
	const btn = document.getElementById("back-btn");
	if (btn) {
		if (navigationHistory.length > 0) {
			btn.removeAttribute("disabled");
		} else {
			btn.setAttribute("disabled", "");
		}
	}
}

function reattachNavigationHandlers() {
	document.querySelectorAll("[data-item-id]").forEach(el => {
		el.onclick = function() {
			navigateToItem(this.getAttribute("data-item-id"));
		};
	});
}

/** Set the view mode and re-render if needed */
function setViewMode(mode, skipRerender) {
	viewMode = mode;
	const listBtn = document.getElementById("view-list-btn");
	const gridBtn = document.getElementById("view-grid-btn");
	if (listBtn) { listBtn.classList.toggle("active", mode === "list"); }
	if (gridBtn) { gridBtn.classList.toggle("active", mode === "grid"); }
	if (!skipRerender && lastListData) {
		renderList(lastListData);
	}
}

// ===================== KV block selection =====================

/** Right-click a list/grid item to toggle selection */
function onRowContextMenu(e) {
	e.preventDefault();
	const row = e.currentTarget;
	const itemId = row.getAttribute("data-item-id");
	const itemName = row.getAttribute("data-item-name") || "";
	if (!itemId) return;

	const idx = selectedItems.findIndex(s => s.id === itemId);
	if (idx >= 0) {
		selectedItems.splice(idx, 1);
		row.classList.remove("selected-row");
	} else {
		selectedItems.push({ id: itemId, name: itemName });
		row.classList.add("selected-row");
	}
	updateSelectionBar();
}

/** Attach right-click handlers to all elements with data-item-id */
function reattachContextMenuHandlers() {
	document.querySelectorAll("[data-item-id]").forEach(el => {
		el.oncontextmenu = onRowContextMenu;
	});
	// Re-highlight previously selected items
	selectedItems.forEach(s => {
		const el = document.querySelector(`[data-item-id="${s.id}"]`);
		if (el) { el.classList.add("selected-row"); }
	});
}

/** Show/update/hide the floating selection bar */
function updateSelectionBar() {
	let bar = document.getElementById("kv-selection-bar");
	if (selectedItems.length === 0) {
		if (bar) { bar.remove(); }
		const preview = document.getElementById("kv-preview");
		if (preview) { preview.remove(); }
		return;
	}
	const tr = t();
	if (!bar) {
		bar = document.createElement("div");
		bar.id = "kv-selection-bar";
		bar.className = "kv-selection-bar";
		const body = document.getElementById("markdown-body");
		body.parentNode.insertBefore(bar, body);
	}
	bar.innerHTML = `<span class="kv-count">${tr.selectedCount(selectedItems.length)}</span>`
		+ `<vscode-button appearance="primary" onclick="copyKvBlock()">${tr.copyKv}</vscode-button>`
		+ `<vscode-button appearance="secondary" onclick="cancelSelection()">${tr.cancelSelection}</vscode-button>`;
	// Preview pane
	let preview = document.getElementById("kv-preview");
	if (!preview) {
		preview = document.createElement("div");
		preview.id = "kv-preview";
		preview.className = "kv-preview";
		bar.parentNode.insertBefore(preview, bar.nextSibling);
	}
	preview.textContent = buildKvBlock();
}

/** Build the KV text block of the selected items */
function buildKvBlock() {
	const lines = [];
	lines.push('"AttachWearables"');
	lines.push('{');
	selectedItems.forEach((item, idx) => {
		const comment = item.name ? ` // ${item.name}` : "";
		lines.push(`\t"${idx + 1}" { "ItemDef" "${item.id}" }${comment}`);
	});
	lines.push('}');
	return lines.join('\n');
}

/** Copy the KV block to the clipboard */
function copyKvBlock() {
	const text = buildKvBlock();
	navigator.clipboard.writeText(text).then(() => {
		const bar = document.getElementById("kv-selection-bar");
		if (bar) {
			const countEl = bar.querySelector(".kv-count");
			if (countEl) { countEl.textContent = t().kvCopied; }
			setTimeout(() => updateSelectionBar(), 1500);
		}
	});
}

/** Cancel all selections */
function cancelSelection() {
	selectedItems = [];
	document.querySelectorAll(".selected-row").forEach(el => el.classList.remove("selected-row"));
	updateSelectionBar();
}

// Store the last rendered item data for bundle copying
let lastItemData = null;

/** Copy bundle items as a KV block */
function copyBundleKv(bundleType) {
	if (!lastItemData || !lastItemData[bundleType]) return;
	const bundle = lastItemData[bundleType];
	const lines = [];
	lines.push('"AttachWearables"');
	lines.push('{');
	let idx = 1;
	for (const itemIndex in bundle) {
		if (itemIndex === "localize") continue;
		const name = bundle[itemIndex].name || "";
		const comment = name ? ` // ${name}` : "";
		lines.push(`\t"${idx}" { "ItemDef" "${itemIndex}" }${comment}`);
		idx++;
	}
	lines.push('}');
	const text = lines.join('\n');
	navigator.clipboard.writeText(text).then(() => {
		const tr = t();
		const btns = document.querySelectorAll('.bundle-copy-btn');
		btns.forEach(btn => {
			if (btn.onclick && btn.onclick.toString().includes(bundleType)) {
				const orig = btn.textContent;
				btn.textContent = tr.bundleCopied;
				setTimeout(() => { btn.textContent = orig; }, 1500);
			}
		});
	});
}

// ===================== Render functions =====================

function render(itemData) {
	lastListData = null;
	lastItemData = itemData;
	let content = "";
	if (itemData.econImg) {
		content += `<div class="item-header">`;
		content += `<img class="item-preview" src="data:image/png;base64,${itemData.econImg}" />`;
		content += `</div>`;
	}

	content += `<div class="item-props">`;
	content += `<vscode-data-grid aria-label="Properties">\n`;
	for (const key in itemData) {
		const value = itemData[key];
		if (key === "visuals" || key === "price_info" || key === "bundle" || key === "bundle_contain" || key === "econImg") {
			continue;
		}
		const showCopy = value && (key === "model_player" || looksLikePath(value));
		content += `<vscode-data-grid-row>\n`;
		content += `  <vscode-data-grid-cell cell-type="columnheader" grid-column="1">${key}</vscode-data-grid-cell>\n`;
		content += `  <vscode-data-grid-cell grid-column="2">${value || ""}${showCopy ? copyBtnHtml(value) : ""}</vscode-data-grid-cell>\n`;
		content += `</vscode-data-grid-row>\n`;
	}
	content += `</vscode-data-grid>\n`;
	content += `</div>`;

	// Bundle section
	if (itemData["bundle"]) {
		const bundle = itemData["bundle"];
		const tr = t();
		content += `<div class="bundle-header"><h2>${bundle["localize"]}</h2>`;
		content += `<vscode-button appearance="secondary" class="bundle-copy-btn" onclick="copyBundleKv('bundle')">${tr.bundleCopyKv}</vscode-button></div>\n`;
		content += `<vscode-data-grid aria-label="Bundle" grid-template-columns="72px 80px 1fr">\n`;
		for (const itemIndex in bundle) {
			if (itemIndex === "localize") continue;
			const bundleItem = bundle[itemIndex];
			const hasIcon = !!bundleItem.icon;
			const icon = hasIcon ? `<img src="data:image/png;base64,${bundleItem.icon}" class="list-icon" />` : "";
			const iconClass = hasIcon ? ' class="icon-cell"' : '';
			const safeName = (bundleItem.name || '').replace(/"/g, '&quot;');
			content += `<vscode-data-grid-row class="clickable-row" data-item-id="${itemIndex}" data-item-name="${safeName}">\n`;
			content += `  <vscode-data-grid-cell grid-column="1"${iconClass}>${icon}</vscode-data-grid-cell>\n`;
			content += `  <vscode-data-grid-cell grid-column="2">${itemIndex}</vscode-data-grid-cell>\n`;
			content += `  <vscode-data-grid-cell grid-column="3">${bundleItem.name || ""}</vscode-data-grid-cell>\n`;
			content += `</vscode-data-grid-row>\n`;
		}
		content += `</vscode-data-grid>\n`;
	}

	// Bundle contain section
	if (itemData["bundle_contain"]) {
		const bundle = itemData["bundle_contain"];
		const tr = t();
		content += `<div class="bundle-header"><h2>${bundle["localize"]}</h2>`;
		content += `<vscode-button appearance="secondary" class="bundle-copy-btn" onclick="copyBundleKv('bundle_contain')">${tr.bundleCopyKv}</vscode-button></div>\n`;
		content += `<vscode-data-grid aria-label="Bundle Contain" grid-template-columns="72px 80px 1fr">\n`;
		for (const itemIndex in bundle) {
			if (itemIndex === "localize") continue;
			const bundleItem = bundle[itemIndex];
			const hasIcon = !!bundleItem.icon;
			const icon = hasIcon ? `<img src="data:image/png;base64,${bundleItem.icon}" class="list-icon" />` : "";
			const iconClass = hasIcon ? ' class="icon-cell"' : '';
			const safeName = (bundleItem.name || '').replace(/"/g, '&quot;');
			content += `<vscode-data-grid-row class="clickable-row" data-item-id="${itemIndex}" data-item-name="${safeName}">\n`;
			content += `  <vscode-data-grid-cell grid-column="1"${iconClass}>${icon}</vscode-data-grid-cell>\n`;
			content += `  <vscode-data-grid-cell grid-column="2">${itemIndex}</vscode-data-grid-cell>\n`;
			content += `  <vscode-data-grid-cell grid-column="3">${bundleItem.name || ""}</vscode-data-grid-cell>\n`;
			content += `</vscode-data-grid-row>\n`;
		}
		content += `</vscode-data-grid>\n`;
	}

	// Visuals (AssetModifiers) - merged table
	if (itemData["visuals"]) {
		const visuals = itemData["visuals"];
		content += `<h2>${visuals.localize}</h2>\n`;
		const rows = visuals.rows || [];
		if (rows.length > 0) {
			const allKeys = new Set();
			rows.forEach(row => {
				Object.keys(row).forEach(k => { if (k !== "_key") allKeys.add(k); });
			});
			const columns = Array.from(allKeys);

			// Size each column to its longest VALUE (not its header), so a long header like
			// "apply_when_equipped_in_ability_effects_slot" stays as narrow as its values
			// (e.g. "0"/"1") — the header is ellipsised with a tooltip (see .visuals-grid CSS).
			// A column with any path value (models / particles) gets a wide flexible width.
			const colInfo = columns.map(col => {
				let maxLen = 0;
				let isPath = false;
				rows.forEach(row => {
					const v = row[col];
					if (v !== undefined && v !== null) {
						const s = String(v);
						if (s.length > maxLen) { maxLen = s.length; }
						if (looksLikePath(s)) { isPath = true; }
					}
				});
				return { col, maxLen, isPath };
			});
			// First column holds the _key (e.g. "asset_modifier_Repeat1"); size it to fit so it
			// does not wrap one character per line.
			let keyMax = 1;
			rows.forEach(row => { const k = String(row._key || "").length; if (k > keyMax) { keyMax = k; } });
			const widths = [`${Math.min(Math.max(keyMax, 4), 26) + 1}ch`].concat(colInfo.map(ci => {
				if (ci.isPath) { return "minmax(140px, 2fr)"; }
				const w = Math.min(Math.max(ci.maxLen, 2), 18);
				return `${w + 1}ch`;
			}));

			content += `<vscode-data-grid class="visuals-grid" aria-label="Asset Modifiers" grid-template-columns="${widths.join(' ')}">\n`;
			content += `<vscode-data-grid-row row-type="header">\n`;
			content += `  <vscode-data-grid-cell cell-type="columnheader" grid-column="1">#</vscode-data-grid-cell>\n`;
			colInfo.forEach((ci, idx) => {
				content += `  <vscode-data-grid-cell cell-type="columnheader" grid-column="${idx + 2}" title="${escAttr(ci.col)}">${ci.col}</vscode-data-grid-cell>\n`;
			});
			content += `</vscode-data-grid-row>\n`;
			rows.forEach(row => {
				content += `<vscode-data-grid-row>\n`;
				content += `  <vscode-data-grid-cell grid-column="1">${row._key || ""}</vscode-data-grid-cell>\n`;
				colInfo.forEach((ci, idx) => {
					const raw = row[ci.col];
					const val = raw !== undefined && raw !== null ? String(raw) : "";
					// Copy button only on actual asset paths (.vpcf/.vmdl/…), not on values like "ALL"/"gun".
					const copy = looksLikePath(val) ? copyBtnHtml(val) : "";
					content += `  <vscode-data-grid-cell grid-column="${idx + 2}">${val}${copy}</vscode-data-grid-cell>\n`;
				});
				content += `</vscode-data-grid-row>\n`;
			});
			content += `</vscode-data-grid>\n`;
		}
	}

	// Price info
	if (itemData["price_info"]) {
		const priceInfo = itemData["price_info"];
		content += `<h2>${priceInfo["localize"]}</h2>\n`;
		content += `<vscode-data-grid aria-label="Price Info">\n`;
		content += `<vscode-data-grid-row row-type="header">\n`;
		let colIdx = 1;
		for (const name in priceInfo) {
			if (name === "localize") continue;
			content += `  <vscode-data-grid-cell cell-type="columnheader" grid-column="${colIdx}">${name}</vscode-data-grid-cell>\n`;
			colIdx++;
		}
		content += `</vscode-data-grid-row>\n`;
		content += `<vscode-data-grid-row>\n`;
		colIdx = 1;
		for (const name in priceInfo) {
			if (name === "localize") continue;
			content += `  <vscode-data-grid-cell grid-column="${colIdx}">${priceInfo[name]}</vscode-data-grid-cell>\n`;
			colIdx++;
		}
		content += `</vscode-data-grid-row>\n`;
		content += `</vscode-data-grid>\n`;
	}

	document.getElementById("markdown-body").innerHTML = content;
	reattachNavigationHandlers();
	reattachContextMenuHandlers();
	updateBackButton();
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
}

function renderList(itemList) {
	lastListData = itemList;
	if (viewMode === "grid") {
		renderGrid(itemList);
		return;
	}
	// Detect if any data row has an icon
	let hasAnyIcon = false;
	for (let i = 1; i < itemList.length; i++) {
		if (itemList[i][0] && itemList[i][0].indexOf("<img") !== -1) {
			hasAnyIcon = true;
			break;
		}
	}
	const iconColWidth = hasAnyIcon ? "72px" : "32px";

	let content = `<vscode-data-grid aria-label="Results" generate-header="sticky" grid-template-columns="${iconColWidth} 80px 1fr 120px 120px 1fr">\n`;
	for (let i = 0; i < itemList.length; i++) {
		let element = itemList[i];
		if (i === 0) {
			content += `<vscode-data-grid-row row-type="header">\n`;
			for (let j = 0; j < element.length; j++) {
				content += `<vscode-data-grid-cell cell-type="columnheader" grid-column="${j + 1}">${element[j] || ""}</vscode-data-grid-cell>\n`;
			}
			content += `</vscode-data-grid-row>\n`;
		} else {
			const itemId = element[1];
			const itemName = element[2] || "";
			const rowHasIcon = element[0] && element[0].indexOf("<img") !== -1;
			const safeName = itemName.replace(/"/g, '&quot;');
			content += `<vscode-data-grid-row class="clickable-row" data-item-id="${itemId}" data-item-name="${safeName}">\n`;
			for (let j = 0; j < element.length; j++) {
				const iconCellClass = (j === 0 && rowHasIcon) ? ' class="icon-cell"' : '';
				content += `<vscode-data-grid-cell grid-column="${j + 1}"${iconCellClass}>${element[j] || ""}</vscode-data-grid-cell>\n`;
			}
			content += `</vscode-data-grid-row>\n`;
		}
	}
	content += `</vscode-data-grid>\n`;
	document.getElementById("markdown-body").innerHTML = content;
	reattachNavigationHandlers();
	reattachContextMenuHandlers();
	updateBackButton();
}

/** Render the search results as a grid of icon cards */
function renderGrid(itemList) {
	let content = `<div class="grid-container">\n`;
	const tr = t();
	for (let i = 1; i < itemList.length; i++) {
		const element = itemList[i];
		const iconHtml = element[0];
		const itemId = element[1];
		const itemName = element[2] || "";

		let imgSrc = "";
		const srcMatch = iconHtml && iconHtml.match(/src="([^"]+)"/);
		if (srcMatch) { imgSrc = srcMatch[1]; }

		const isSelected = selectedItems.some(s => s.id === String(itemId));
		const selClass = isSelected ? " selected-row" : "";
		const safeName = itemName.replace(/"/g, '&quot;');

		content += `<div class="grid-card${selClass}" data-item-id="${itemId}" data-item-name="${safeName}">\n`;
		if (imgSrc) {
			content += `  <img class="grid-icon" src="${imgSrc}" />\n`;
		} else {
			content += `  <div class="grid-icon-placeholder">${tr.noIcon}</div>\n`;
		}
		content += `  <div class="grid-label" title="${safeName} (${itemId})">${itemName}</div>\n`;
		content += `  <div class="grid-id">#${itemId}</div>\n`;
		content += `</div>\n`;
	}
	content += `</div>\n`;
	document.getElementById("markdown-body").innerHTML = content;
	reattachNavigationHandlers();
	reattachContextMenuHandlers();
	updateBackButton();
}

function onClear() {
	document.getElementById("filter").value = "";
	document.getElementById("markdown-body").innerHTML = "";
	navigationHistory.length = 0;
	lastListData = null;
	cancelSelection();
	updateBackButton();
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
		case 'set_language':
			applyLanguage(message.data);
			return;
	}
});

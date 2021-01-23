const vscode = acquireVsCodeApi();
let root = document.getElementById('localization-root');
window.addEventListener('message', event => {
	const message = event.data;
	console.log(message);
	ShowLocalization();
});
function ShowLocalization() {
	
	document.getElementById('localization-root').innerHTML(`
	<div class="item-contents">
		<div class="item-title">
			<span class="item-label">modifier_contract_monster_commander</span>
		</div>
		<div class="item-modified-indicator"></div>
		<div class="item-value">
			<div class="item-control">
				<div role="list" class="list-object-widget">
					<div class="list-row-header">
						<div class="list-object-key">项</div>
						<div class="list-object-value">值</div>
					</div>
					<div class="list-row">
						<div class="list-object-key">title</div>
						<div class="list-object-value">巨兽领袖</div>
					</div>
					<div class="list-row">
						<div class="list-object-key">description</div>
						<div class="list-object-value">
							分散阵容诱导怪物分流；在怪物比较少的回合登场（精英boss关）分散阵容诱导怪物分流；在怪物比较少的回合登场（精英boss关）</div>
					</div>
				</div>
				<div class="list-new-row"><a class="monaco-text-button">添加项</a></div>
			</div>
		</div>
	</div>
	`)
}
(function () {
	const state = vscode.getState();
	if (state) {
	}
}());

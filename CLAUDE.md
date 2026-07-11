# VS Code Dota2 Tools – Copilot Instructions

## Quick Start (Read This First)

**Architecture in one sentence**: `src/extension.ts` boots localization + status bar, then `src/init.ts` loads modules from `moduleList` sequentially—each module must tolerate repeated initialization triggered by workspace/config changes.

**Essential dev commands**:
- `npm run watch` (Task `npm: 0`) – watch-mode compilation via webpack
- `npm run watch-tests` (Task `npm: 1`) – TypeScript type checking (no runtime tests)
- `npm run compile` – production build

**Critical conventions**:
- **Event bus**: Use `EventManager.listenToEvent<EventType>(type, callback)` from `Class/event.ts` instead of direct VS Code event listeners—prevents duplicate registrations across module reloads
- **Module lifecycle**: Add init functions to `moduleList` in `src/init.ts`; user-toggleable modules go in `skipModuleList` mapped to `dota2-tools.A1.module_list` config keys in `package.json`
- **Localization**: All UI strings via `localize(key)` from `utils/localize.ts`; define in both `package.nls.json` (EN) and `package.nls.zh-cn.json` (CN)
- **Async path ops**: Always use `getPathInfo()`, `makeDir()`, `dirExists()` from `utils/pathUtils.ts`—never assume paths exist

**Adding features checklist**:
1. New command → register in `src/extension.ts` + add to `package.json` `contributes.commands`
2. New module → add init function to `moduleList` in `src/init.ts` + optionally to `skipModuleList` + config in `package.json`
3. New webview → HTML in `webview/<name>/<name>.html`, load via `getWebviewContent()` from `utils/getWebViewContent.ts`
4. New strings → add to both `package.nls.json` and `package.nls.zh-cn.json`

---

## Project Architecture

**Folder structure**:
- `src/command/` – one-shot command handlers (e.g., `cmdExcel2KV.ts`, `cmdLocalization.ts`)
- `src/module/` – long-lived services, webview controllers, tree providers (e.g., `kvEditor.ts`, `sheet_cloud.ts`)
- `src/listener/` – file watchers using `node-watch` (e.g., `listenerAbilityExcel.ts` auto-converts CSV→KV)
- `src/CustomTextEditorProvider/` – custom editors: `kvEditorProvider.ts` (table editor), `behaviorTreeProvider.ts` (visual tree), `lazayboyProvider.ts` (external app launcher)
- `src/TreeDataProvider/` – tree view implementations for API browsers and error logs
- `src/Class/` – core services: `EventManager` (event bus), `FeiShu` (cloud sync client)
- `src/utils/` – shared helpers: `kvUtils.ts` (KV↔JS conversion), `pathUtils.ts`, `localize.ts`
- `webview/` – HTML/CSS/JS for webviews (peer to `src/`, NOT inside `src/`); e.g., `webview/KvEditor/KvEditor.html`
- `resource/` – static data: API dumps (JSON), localization templates, KV editor configs (`kv_editor_field_options.json`)
- `images/` – icon assets organized by type (`spellicons/`, `items/`, `heroes_icon/`)
- `docs/` – feature documentation (e.g., `behavior-tree-editor.md`, `row-copy-paste-feature.md`)

**VS Code integration**:
- `package.json` contributes 3 activity bar containers (`dota2api`, `dota2kv`, `dota2logs`), 100+ commands, 3 custom editors
- Always sync `package.json` contributions with implementation modules
- Module init functions in `src/init.ts` must match localization keys in `package.nls*.json` (e.g., `"luaApiInit": "lua tree document"`)

**Data flow examples**:
```typescript
// Typical module init pattern (from src/module/treeApi.ts)
export async function luaApiInit(context: vscode.ExtensionContext) {
  // Load static data from resource/
  const apiData = JSON.parse(fs.readFileSync(context.asAbsolutePath('resource/dota_script_help2.json'), 'utf8'));
  
  // Register tree provider
  const provider = new LuaApiProvider(apiData);
  vscode.window.registerTreeDataProvider('dota2apiExplorer', provider);
  
  // Listen to config changes via EventManager (not direct VS Code listener!)
  EventManager.listenToEvent<vscode.ConfigurationChangeEvent>(
    EventType.EVENT_ON_DID_CHANGE_CONFIGURATION,
    (event) => { if (event.affectsConfiguration('dota2-tools.A1.module_list.lua_api_tree')) provider.refresh(); }
  );
}
```

**Workspace assumptions**:
- Extension targets Dota 2 addon workspaces
- `module/addonInfo.ts` auto-discovers `game`/`content` folders by searching for `addoninfo.txt` via `findFile()`
- Falls back to manual `dota2-tools.addon_path` config if auto-detection fails
- **Critical**: Users must keep maps under `maps/` folder for discovery to work
- Get addon roots via `getGameDir()`/`getContentDir()` from `module/addonInfo.ts`—never hardcode paths


## Development Workflows

**Build & watch**:
- `npm run watch` (Task `npm: 0`): Webpack watch mode, compiles `src/**/*.ts` → `dist/extension.js`
- `npm run watch-tests` (Task `npm: 1`): `tsc -w` for type checking only (no runtime tests exist)
- `npm run compile`: Production build (optimized webpack bundle)
- `publish_patch.js`: Incremental publish script (Task `$(cloud-upload) 增量更新`)

**User feedback pattern** (all long-running ops MUST use this):
```typescript
import { showStatusBarMessage, refreshStatusBarMessage } from 'module/statusBar';

// Show progress in status bar + tooltip + output channel
const msgIndex = showStatusBarMessage('Syncing Feishu...', 20); // 20s timeout
await doWork();
refreshStatusBarMessage(msgIndex, 'Sync complete', 5); // update existing message
```

**Webview loading pattern**:
```typescript
import { getWebviewContent } from 'utils/getWebViewContent';

// HTML files MUST be in webview/<name>/ (not src/webview/)
const panel = vscode.window.createWebviewPanel('myView', 'Title', vscode.ViewColumn.One, { enableScripts: true });
panel.webview.html = getWebviewContent(panel.webview, context.extensionUri, 'myWebview');
// Expects: webview/myWebview/myWebview.html
```

**Webview communication** (standard postMessage pattern):
```typescript
// Extension → Webview
panel.webview.postMessage({ type: 'update', payload: data });

// Webview → Extension
panel.webview.onDidReceiveMessage((message) => {
  switch (message.type) {
    case 'save': handleSave(message.payload); break;
  }
});
```

**Module lifecycle** (every module init function MUST follow this):
```typescript
// src/module/myModule.ts
let disposables: vscode.Disposable[] = [];

export async function myModuleInit(context: vscode.ExtensionContext) {
  // Clean up previous instance (init can be called multiple times!)
  disposables.forEach(d => d.dispose());
  disposables = [];
  
  // Register resources
  const provider = new MyProvider();
  disposables.push(vscode.window.registerTreeDataProvider('myView', provider));
  
  // Listen to config changes via EventManager (NOT direct VS Code listener)
  const eventId = EventManager.listenToEvent<vscode.ConfigurationChangeEvent>(
    EventType.EVENT_ON_DID_CHANGE_CONFIGURATION,
    (event) => { if (event.affectsConfiguration('dota2-tools.myConfig')) provider.refresh(); }
  );
  disposables.push({ dispose: () => EventManager.stopListenToEvent(EventType.EVENT_ON_DID_CHANGE_CONFIGURATION, eventId) });
}
```

**Performance notes**:
- Never use `fs.readFileSync` for large files in `activate()`—defer to module `init()` functions
- Many modules parse multi-MB JSON files (API dumps, items_game.txt)—acceptable in lazy-loaded modules only
- Use `showStatusBarMessage()` for progress feedback during heavy operations


## Key Conventions & Patterns

**Event bus** (prevents duplicate listeners during module reloads):
```typescript
// DON'T: Direct VS Code listener (registers duplicate on each init call)
vscode.workspace.onDidChangeConfiguration((event) => { ... });

// DO: Use EventManager
EventManager.listenToEvent<vscode.ConfigurationChangeEvent>(
  EventType.EVENT_ON_DID_CHANGE_CONFIGURATION,
  (event) => { if (event.affectsConfiguration('dota2-tools.myKey')) doSomething(); }
);
```

**Module toggles**: Users disable features via `dota2-tools.A1.module_list.*` config:
```typescript
// In src/init.ts
const skipModuleList = {
  "myModuleInit": "my_module_key", // maps to package.json config
};

// In package.json
"dota2-tools.A1.module_list": {
  "my_module_key": { "type": "boolean", "default": true }
}

// In package.nls*.json
"myModuleInit": "My Module Display Name"
```

**Localization** (all user-facing strings):
```typescript
import { localize } from 'utils/localize';
vscode.window.showInformationMessage(localize('myKey')); // NOT hardcoded English!

// Add to package.nls.json:
"myKey": "English text"
// Add to package.nls.zh-cn.json:
"myKey": "中文文本"
```

**Path handling** (async-safe, error-tolerant):
```typescript
import { getGameDir, getContentDir } from 'module/addonInfo';
import { getPathInfo, makeDir, dirExists } from 'utils/pathUtils';

const gameDir = getGameDir(); // auto-discovered or from config
const csvPath = path.join(gameDir, 'csv');
if (await dirExists(csvPath)) { /* safe to use */ }
await makeDir(outputPath); // creates intermediate dirs
```

**KV parsing** (Dota's custom format):
```typescript
import { readKeyValue2, writeKeyValue, readKeyValueWithBase } from 'utils/kvUtils';

const kvText = fs.readFileSync(kvPath, 'utf8');
const obj = readKeyValue2(kvText); // KV → JS object
// Modify obj...
const newKV = writeKeyValue(obj, 0); // JS object → KV text
fs.writeFileSync(kvPath, newKV);

// For files with #base includes:
const objWithBases = readKeyValueWithBase(kvPath, baseDir);
```

**CSV workflows** (Excel → CSV → KV pipeline):
- Users edit Excel workbooks that auto-export to `csv/` subfolders
- `listener/listenerAbilityExcel.ts` watches CSV files via `node-watch`
- On CSV change, auto-converts to KV via `csvUtils.ts` (`abilityCSV2KV`, `unitCSV2KV`)
- Controlled by `dota2-tools.A3.listener` and `A4.AbilityExcel`/`A4.UnitExcel` configs
- Entry point: `command/cmdExcel2KV.ts`'s `eachExcelConfig(config, callback)` iterator

**Localization merging** (auto-combines split files):
- `listener/listenerLocalization.ts` watches `game/resource/localization/<lang>/` folders
- Auto-merges all `.txt` files → `addon_<lang>.txt` in parent directory
- Output naming is hardcoded—don't create custom merge logic


## Key Modules & Services

**Feishu integration** (`module/sheet_cloud.ts` + `Class/FeiShu.ts`):
- Syncs cloud spreadsheets from Feishu (Lark)
- Caches tenant access tokens (auto-refresh, 2h expiry)—always call `await updateTenantAccessToken()` before API requests
- Commands: `dota2tools.fetch_all_sheet`, `dota2tools.sheet_cloud_show_branch`
- Uses timers (`setInterval`) for polling—clean them up in disposal
- Config: `dota2-tools.A8.FeiShu` (App ID/Secret, Branch Folder, per-language sheet IDs)

**API explorers** (`module/treeApi.ts`, `TreeDataProvider/*ApiProvider.ts`):
- Builds tree views for Lua/JS/CSS/Panel APIs
- Data from static JSONs in `resource/` (e.g., `dota_script_help2.json`, `cl_panorama_script_help_2.json`)
- Each tree provider expects localized labels via `localize(<moduleName>)`

**Custom editors**:
- `kvEditorProvider.ts` + `module/kvEditor.ts`: Full-featured KV table editor for `.kv`/`.txt` files (priority: option)
  - Column dropdown options in `resource/kv_editor_field_options.json` (supports `multiple: true/false`, custom `separator`)
  - Webview: `webview/KvEditor/KvEditor.html` + `KvEditor.js` (complex table rendering with frozen columns, AbilityValues editor)
- `behaviorTreeProvider.ts`: Visual behavior tree editor for `.btree` files (priority: default). See `docs/behavior-tree-*.md`
- `lazayboyProvider.ts`: Launches external app (e.g., Lazyboy model viewer) via `exec`, then disposes webview

**Error logs** (`module/errorLogs.ts`, `TreeDataProvider/ErrorLogProvider.ts`):
- Parses Dota 2 error logs from user-configured directories
- Displays in `dota2Logs` tree view
- Config: `dota2-tools.A9.logs`

**Status bar** (`module/statusBar.ts`):
- Owns global status items + output channel
- `getStatusBarItem()` for main item, `showStatusBarMessage(text, timeout)` for temporary messages
- Tooltip shows last 20 messages as Markdown

**Asset pickers** (`command/cmdDota2IconPanel.ts`, `cmdVsndPicker.ts`, `module/dota2itemsGame.ts`):
- Shared pattern: prepare data in module (e.g., index icons from `images/spellicons`), render picker in webview HTML (`webview/dota2Icon/`), communicate via `postMessage`
- Users click to copy paths


## Integration Notes

**Feishu setup**:
- Requires config at `dota2-tools.A8.FeiShu`: `app_id`, `app_secret`, `branch_folder`, per-language sheet IDs (`schinese_id`, `english_id`)
- `Class/FeiShu` refreshes tenant tokens automatically (2h expiry); always call `await updateTenantAccessToken()` before API requests

**Excel → KV pipeline**:
- Users edit Excel workbooks, which auto-export to `csv/` subfolders (via Excel macros)
- Extension watches CSVs, converts to KV
- Entry point: `command/cmdExcel2KV.ts`'s `eachExcelConfig(config, callback)` iterator
- New CSV features should hook into this instead of duplicating traversal

**Localization I/O**:
- Commands in `command/cmdLocalization.ts` (`localizationBackup`, `localizationImportTool`, `localizationCompare`) expect Dota KV `lang` blocks
- Always use `readKeyValue2`/`writeKeyValue` from `kvUtils` for parsing

**Performance note**:
- Many modules use synchronous `fs.readFileSync` on large resource files (APIs, items_game.txt)
- Keep heavy ops out of `activate()` function—lazy-load in module `init` functions to avoid blocking extension startup

**Webview HTML location**:
- Webview HTML files live in `webview/<name>/` folder (peer to `src/`), NOT `src/webview/`
- TypeScript for webviews can be in `src/webview/` for bundling, but HTML/CSS must be in `webview/` for `getWebViewContent` to resolve paths correctly

## Adding New Features Checklist

1. **New command**: Add to `src/extension.ts`, register in `package.json` under `contributes.commands`
2. **New module**: Add init function to `moduleList` in `src/init.ts`. If user-toggleable, add to `skipModuleList` and `package.json` config
3. **New webview**: Create `webview/<name>/<name>.html`, use `getWebviewContent()` helper. TypeScript goes in `src/webview/`
4. **New localization string**: Add to both `package.nls.json` (English) and `package.nls.zh-cn.json` (Chinese)
5. **New custom editor**: Register in `package.json` under `contributes.customEditors`, implement provider in `CustomTextEditorProvider/`


# Changelog

## 2.0.3
- Recompile Resource: fixed images (png/jpg/tga/psd) failing with "Failed to find compiler" — they now compile through a temporary `<name>_<ext>.vtex` descriptor (RGBA8888, no mips), producing the `<name>_png.vtex_c` panorama expects; a hand-written `.vtex` next to the image is used as-is
- Recompile Resource: multi-select works — all selected files compile in a single resourcecompiler run

## 2.0.2
- API search: results group under their class header like on the ModDota site — e.g. "find mod" shows a `CDOTA_BaseNPC` block with only the matching methods, then `CEntities` with its own
- API search: searching a class by name (or by its global instance — `GameRules` finds `CDOTAGameRules`, `CustomNetTables` finds `CCustomNetTableManager`) shows the class with its full member list
- API search: qualified queries work — `GameRules.GetGameTime` or `gamerules pause` find the method inside the class
- API search: enum blocks filter to the matching members (e.g. `DOTA_ABILITY_BEHAVIOR_HIDDEN` shows just that member)
- API: class headers show the global instance name (`CDOTAGameRules` → `instance GameRules`)
- New: "Recompile Resource" in the explorer context menu for files under `content/` — runs `resourcecompiler.exe -fshallow` (found via the Dota 2 install path setting or derived from the file path; mklink junctions are resolved), output goes to the extension output channel

## 2.0.1
- API sidebar: signature badges (s/c, GitHub) now sit to the right of the declaration, not below
- API sidebar: function signatures with many arguments wrap per-argument instead of breaking mid-token
- API search: enum types (e.g. `DOTA_ABILITY_BEHAVIOR`) render as a single block, still findable by member name
- API search: clicking a type/element link keeps the current source filter instead of jumping to "All"
- API: removed the Google/magnifier badge and the non-functional `#` link; removed `#` under Panorama CSS properties
- API: GitHub search now builds a correct query for Panorama (drops the C++ binding-class prefix)
- Localization: new tab reusing the ModDota site browser, grouped by entity (hero / ability / item / modifier) with display-name headers
- Localization: language blocks on top (RU / EN / ZH only); removed "Collapse all" and the search clear button
- Icons: removed the broken hero-filter thumbnail from the search bar
- Abilities: added a button to copy just the ability's internal name (site + extension)
- JS completions: fixed `$.M` + Tab inserting a duplicated prefix (`$.$.Msg(...)`)
- Debug: fixed the `npm: watch` task problem matcher so F5 no longer prompts about a missing problemMatcher

## 2.0.0
- Rewrote the API browsers into a single activity-bar sidebar reusing the ModDota site's React components
- Tabs: API search, Panels, Icons, items_game, Music

## 1.0.0
- Fork from BigCiba/vscode-dota2-tools
- Remove Excel/CSV, cloud sheets, and translate features
- Add VPK sync scripts for extracting images and data from Dota 2
- Rename extension to dota2tools (publisher: iwasinminedream)
- Remove bundled images from repo (users extract locally)

# KvEditor V2

KvEditor V2 is the Solid + TypeScript implementation of the Dota 2 KV custom
editor. The legacy editor remains available while V2 is being validated.

## Enable or switch versions

Use **Dota2 Tools: KvEditor: Switch Legacy / V2** from the Command Palette, or
set:

```json
{
  "dota2-tools.A10.kv_editor.version": "v2"
}
```

Reopen the KV file after changing the setting. Set the value back to
`legacy` at any time to use the original editor.

## V2 behavior

- Rows are identified by their KV ID; filtering never changes the identity
  sent to the extension Host.
- Only visible rows plus a small overscan are mounted in the DOM.
- Scalar edits, ID renames, row deletion/reordering, and ordinary column
  insertion/deletion/reordering use source ranges instead of serializing the
  complete file. Comments, `#base`, blank lines, unknown content, and line
  endings outside the edited range are preserved.
- Each Webview command contains a request ID and source document version.
  Stale commands are rejected and return a fresh snapshot.
- Save, dirty state, auto-save timing, and undo are managed by VS Code.
- Filters, selection, and scroll position are restored with Webview state.

## Table operations

V2 supports cell and row selection, Shift/Ctrl row selection, keyboard
navigation, filters, virtual scrolling, row and column insertion/deletion,
drag reordering, row copy/paste, frozen columns, column widths/descriptions,
single and multi-select options, compact mode, and localized display.

The fill action supports copy, arithmetic sequence, geometric sequence, and
safe-formula sequence modes. The complete fill is submitted as one command and
one document edit.

## Safe formulas

V2 formulas do not execute JavaScript. Supported constructs include:

- A1 references, including `$A$1`, `A$1`, and `$A1`;
- `rowId`, `rowIndex`, `rowNumber`, and direct row field names;
- numeric/string/boolean literals, arithmetic, comparison, logic, and ternary
  expressions;
- whitelisted functions such as `ROUND`, `MIN`, `MAX`, `NUMBER`,
  `STRING`, `LOWER`, `UPPER`, `TRIM`, `LEN`, `CONCAT`, and `IF`.

The Host validates syntax, detects circular references, applies a computation
budget, and materializes only successful results. Legacy JavaScript formulas
are shown as legacy formulas and are not executed.

## Specialized editors

- AbilityValues supports scalar/object entries, ordering, modifiers,
  validation, and localized descriptions.
- AbilityTextureName provides inline previews and a cached spell/item picker.
- ScriptFile opens the associated Lua/TypeScript file and uses the existing
  confirmation flow before creating a missing file.
- Localization settings support language, VDF path, automatic import, column
  mappings, localized display, and export after the KV document is saved.

## Workspace files

V2 reads the existing configuration files without rewriting them on open:

- `.vscode/kv_editor_setting.json`
- `.vscode/kv_editor_user_setting.json`

Built-in defaults are merged with workspace/folder-type settings and then
file-level overrides.

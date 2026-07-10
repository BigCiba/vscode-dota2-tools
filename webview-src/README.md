# Solid Webview development

This directory contains the source code for framework-based Webviews. Existing
files under `webview/` are legacy pages and remain supported during migration.

## Commands

- `npm run build:webview` builds every Webview into `dist/webview/`.
- `npm run watch:webview` rebuilds Webviews when source files change.
- `npm run typecheck:webview` checks Solid and shared message types.
- `npm run compile` checks and builds both the extension host and Webviews.

After pressing F5, run the command `Dota2 Tools: 打开 Solid Webview 示例` in
the Extension Development Host to verify the complete flow.
F5 performs a fresh Webview build before starting the Extension Development
Host. Keep `npm run watch:webview` running in a terminal while editing a page.


## Add a Webview entry

Create a directory with an `index.html` file:

```text
webview-src/
  my-page/
    index.html
    main.tsx
    App.tsx
    styles.css
```

`vite.config.ts` discovers all direct child directories that contain
`index.html`, so no Vite configuration change is required.

In the extension host, load the entry using:

```ts
panel.webview.html = await getBundledWebviewContent(
  panel.webview,
  context.extensionUri,
  'my-page',
);
```

Set `localResourceRoots` to `dist/webview` and keep all host/Webview
communication behind typed `postMessage` unions under `src/types/`.

import React from "react";

// In the website this renders the top navigation bar + theme toggle. Inside the VS Code
// sidebar webview the navigation is replaced by the extension's bottom icon tab bar and a
// theme toggle in the search row, so this is stubbed out to render nothing. Kept as a
// module so the vendored page components can keep importing { NavBar } unchanged.
export function NavBar() {
  return null;
}

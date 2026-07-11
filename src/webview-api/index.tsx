import React from "react";
import { createRoot } from "react-dom/client";
import { SearchPage, ThemeToggle } from "./vendor/components/api/pages/SearchPage";
import { LocalizationPage } from "./vendor/components/api/pages/LocalizationPage";

// ── Theme ────────────────────────────────────────────────────────────────────────
// The vendored global.css keys dark mode off `data-theme="dark"` on <html>. Honor a
// previously chosen theme (localStorage), otherwise follow the VS Code color theme the
// host applies as a body class. The in-page toggle (ThemeToggle) overrides afterwards.
function initTheme() {
  let theme: string | null = null;
  try {
    theme = localStorage.getItem("theme");
  } catch {
    /* webview storage may be unavailable */
  }
  if (!theme) {
    const isDark =
      document.body.classList.contains("vscode-dark") ||
      document.body.classList.contains("vscode-high-contrast");
    theme = isDark ? "dark" : "light";
  }
  if (theme === "dark") document.documentElement.setAttribute("data-theme", "dark");
  else document.documentElement.removeAttribute("data-theme");
}

// ── URL normalization ──────────────────────────────────────────────────────────────
// The vendored search/router logic reads window.location (?search=…). The webview boots
// with its own vscode-webview://…?id=… URL; normalize it to a clean /api/search path so
// getSearchFromUrl() starts empty and replaceState updates stay same-origin.
function normalizeUrl() {
  try {
    history.replaceState({}, "", "/api/search");
  } catch {
    /* ignore — some webview origins disallow path replaceState */
  }
}

// ── Internal-link → search ───────────────────────────────────────────────────────────
// API declaration cards contain internal links: type references (e.g. a return type that
// links to its class), the "#" element link, and the "N references" link. In the unified
// sidebar these should drive the search box. We intercept any internal /api link in the
// capture phase (and stopPropagation so the vendored pushState handlers don't also run),
// derive the target type/declaration name from the href, and dispatch `dota:navigate`;
// SearchPage listens and runs it as a search.
const KNOWN_ROOTS = new Set([
  "api", "vscripts", "events", "panorama", "css", "modifiers", "convars", "abilities", "search", "localization", "changelog",
]);

function termFromUrl(url: URL): string {
  const search = url.searchParams.get("search");
  if (search) return search.replace(/^type:/i, "").trim(); // "N references" links use ?search=type:X
  const segments = url.pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (!last || KNOWN_ROOTS.has(last)) return ""; // a bare nav/root link, not a specific type
  return last;
}

function installLinkInterceptor() {
  document.addEventListener(
    "click",
    (event) => {
      const anchor = (event.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // Let external links (new-tab Google/GitHub search etc.) work normally.
      if (anchor.target === "_blank" || /^https?:\/\//.test(href)) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || !url.pathname.includes("/api")) return;

      // Capture phase + stopPropagation: prevent navigation AND the vendored React onClick
      // handlers (pushState) from firing — we drive the search ourselves.
      event.preventDefault();
      event.stopPropagation();

      const term = termFromUrl(url);
      if (term) {
        window.dispatchEvent(new CustomEvent("dota:navigate", { detail: { term } }));
      }
    },
    true,
  );
}

// Surface any runtime error into the page instead of failing to a blank panel.
function showError(message: string) {
  const el = document.getElementById("root");
  if (el) {
    el.innerHTML =
      '<div style="padding:16px;font-family:monospace;font-size:12px;color:var(--color-text,#ccc);white-space:pre-wrap;word-break:break-word">' +
      "Dota2 API failed to load:\n\n" +
      message.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string)) +
      "</div>";
  }
}
window.addEventListener("error", (e) => showError((e.error && e.error.stack) || e.message));
window.addEventListener("unhandledrejection", (e) => showError(String((e as PromiseRejectionEvent).reason)));

// ── Top tab bar (Search ⇆ Localization) ─────────────────────────────────────────────
// Mirrors the site's API NavBar tabs, trimmed to the two views the sidebar exposes. The
// light/dark toggle lives here so it stays reachable on both tabs.
type View = "search" | "localization";

function TabButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        borderBottom: active ? "2px solid var(--color-highlight)" : "2px solid transparent",
        color: active ? "var(--color-text)" : "var(--color-text-faded, #888)",
        fontWeight: active ? 600 : "normal",
        fontSize: 13,
        padding: "5px 10px 6px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function App() {
  const [view, setView] = React.useState<View>("search");
  // Mount the localization page lazily (and keep it mounted afterwards) so its ~10MB language
  // file is only fetched once the user actually opens the tab, not on every API-tab open.
  const [locVisited, setLocVisited] = React.useState(false);

  // An internal type/element link (dispatched by installLinkInterceptor) drives the unified
  // search — surface it by switching back to the Search view.
  React.useEffect(() => {
    const toSearch = () => setView("search");
    window.addEventListener("dota:navigate", toSearch);
    return () => window.removeEventListener("dota:navigate", toSearch);
  }, []);

  const open = (v: View) => {
    setView(v);
    if (v === "localization") setLocVisited(true);
  };

  return (
    <div style={{ display: "flex", flexFlow: "column", flex: 1, minHeight: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "3px 6px 0", flexShrink: 0 }}>
        <TabButton label="Search" active={view === "search"} onClick={() => open("search")} />
        <TabButton label="Localization" active={view === "localization"} onClick={() => open("localization")} />
        <div style={{ flex: 1 }} />
        <ThemeToggle />
      </div>
      <div style={{ display: view === "search" ? "flex" : "none", flexFlow: "column", flex: 1, minHeight: 0 }}>
        <SearchPage />
      </div>
      {locVisited && (
        <div style={{ display: view === "localization" ? "flex" : "none", flexFlow: "column", flex: 1, minHeight: 0 }}>
          <LocalizationPage />
        </div>
      )}
    </div>
  );
}

try {
  initTheme();
  normalizeUrl();
  installLinkInterceptor();

  const container = document.getElementById("root");
  if (container) {
    createRoot(container).render(<App />);
  }
} catch (err) {
  showError(err instanceof Error ? err.stack || err.message : String(err));
}

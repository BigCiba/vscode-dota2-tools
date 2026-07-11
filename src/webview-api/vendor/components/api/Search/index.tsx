import React, { useCallback, useEffect, useRef, useState, createContext, useContext } from "react";
import { translitRuToEn } from "../../../utils/keyboardTranslit";

export type AvailabilityFilters = {
  serverEnabled: boolean;
  clientEnabled: boolean;
};

export const AvailabilityFiltersContext = createContext<AvailabilityFilters>({
  serverEnabled: true,
  clientEnabled: true,
});

export function useAvailabilityFilters() {
  return useContext(AvailabilityFiltersContext);
}

export function getSearchFromUrl(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("search") ?? "";
}

// Fired when the in-page search query changes. We use a dedicated event instead of
// a synthetic `popstate` so Astro's ClientRouter doesn't treat a live-search update
// as a navigation and reload/remount the page (which would reset the search input).
export const SEARCH_CHANGE_EVENT = "moddota:search-change";

export function notifySearchChange(): void {
  window.dispatchEvent(new Event(SEARCH_CHANGE_EVENT));
}

// Re-run `handler` on in-page search changes and on real browser back/forward.
// Returns an unsubscribe function.
export function subscribeToSearchChange(handler: () => void): () => void {
  window.addEventListener(SEARCH_CHANGE_EVENT, handler);
  window.addEventListener("popstate", handler);
  return () => {
    window.removeEventListener(SEARCH_CHANGE_EVENT, handler);
    window.removeEventListener("popstate", handler);
  };
}

export function useCtrlFHook<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (ref.current && event.ctrlKey && event.key === "f") {
        if (document.activeElement !== ref.current) event.preventDefault();
        ref.current.focus();
      }
    };
    document.addEventListener("keydown", listener);
    return () => document.removeEventListener("keydown", listener);
  }, [ref.current]);
  return ref;
}

export function SearchBox({
  baseUrl,
  className,
  showAvailabilityFilters = false,
  serverEnabled = true,
  clientEnabled = true,
  onServerToggle,
  onClientToggle,
}: {
  baseUrl: string;
  className?: string;
  showAvailabilityFilters?: boolean;
  serverEnabled?: boolean;
  clientEnabled?: boolean;
  onServerToggle?: () => void;
  onClientToggle?: () => void;
}) {
  const [search, setSearch] = useState(() => getSearchFromUrl());
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const s = getSearchFromUrl();
    setSearch(s);
  }, []);

  useEffect(
    () => () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    },
    [],
  );

  // Commit the query to the URL (which drives every page's filtering). Uses
  // replaceState so live typing doesn't create a history entry per keystroke.
  const commitSearch = useCallback(
    (query: string) => {
      const base = document.querySelector("base")?.getAttribute("href") || "/";
      if (query === "") {
        window.history.replaceState({}, "", `${base}api${baseUrl}`);
      } else {
        window.history.replaceState({}, "", `${base}api${baseUrl}?search=${encodeURIComponent(query)}`);
      }
      notifySearchChange();
    },
    [baseUrl],
  );

  // Update the input immediately, but debounce the (potentially expensive) filtering.
  // Cyrillic typed on a Russian layout is transliterated to QWERTY so the user doesn't
  // have to switch keyboard language to search the English-only API.
  const handleChange = useCallback(
    (rawQuery: string) => {
      const query = translitRuToEn(rawQuery);
      setSearch(query);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => commitSearch(query), 180);
    },
    [commitSearch],
  );

  const commitNow = useCallback(
    (query: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      commitSearch(query);
    },
    [commitSearch],
  );

  const handleKey = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") commitNow(search);
    },
    [search, commitNow],
  );

  const ref = useCtrlFHook<HTMLInputElement>();

  // Auto-focus the search input once the island hydrates so the user can start
  // typing immediately. preventScroll avoids the page jumping to the input.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexFlow: "row",
        flexShrink: 0,
        alignItems: "center",
        backgroundColor: "var(--color-searchbox-bg)",
        border: "var(--color-searchbox-border)",
        borderRadius: 32,
        padding: "0 6px",
        margin: 6,
      }}
    >
      <button
        onClick={() => commitNow(search)}
        onMouseDown={(e) => e.preventDefault()}
        title="Search"
        style={{
          border: "none",
          backgroundColor: "var(--color-searchbox-button)",
          cursor: "pointer",
          padding: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg width={16} height={16} viewBox="0 0 16 16">
          <circle cx="7" cy="7" r="5" fill="none" stroke="var(--color-searchbox-button-fill)" strokeWidth="2" />
          <line
            x1="11"
            y1="11"
            x2="14"
            y2="14"
            stroke="var(--color-searchbox-button-fill)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <input
        ref={ref}
        placeholder="Search..."
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        onKeyUp={handleKey}
        aria-label="Search"
        style={{
          flex: 1,
          padding: 8,
          background: "none",
          border: "none",
          outline: "none",
          color: "var(--color-text)",
          fontSize: 14,
        }}
      />

      {showAvailabilityFilters && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginLeft: 8,
            paddingLeft: 8,
            borderLeft: "1px solid var(--color-group-border)",
          }}
        >
          <AvailabilityFilterButton color="#5b82ee" active={serverEnabled} onClick={onServerToggle} label="s" />
          <AvailabilityFilterButton color="#59df37" active={clientEnabled} onClick={onClientToggle} label="c" />
        </div>
      )}
    </div>
  );
}

function AvailabilityFilterButton({
  color,
  active,
  onClick,
  label,
}: {
  color: string;
  active: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      title={`Click to ${active ? "hide" : "show"} ${label === "s" ? "server" : "client"}-side functions`}
      style={{
        boxSizing: "border-box",
        fontSize: 16,
        lineHeight: 1,
        width: 24,
        height: 24,
        textAlign: "center",
        userSelect: "none",
        background: `radial-gradient(${color}, ${color}88)`,
        color: "white",
        borderRadius: 3,
        fontWeight: "bold",
        textShadow: "1px 1px 1px black",
        boxShadow: active ? "1px 1px 1px #00000030" : "inset 0 0 10px rgba(0,0,0,0.7)",
        border: "none",
        cursor: "pointer",
        filter: active ? "none" : "saturate(10%)",
        opacity: active ? 1 : 0.4,
        transition: "all 0.15s ease",
      }}
    >
      {label}
    </button>
  );
}

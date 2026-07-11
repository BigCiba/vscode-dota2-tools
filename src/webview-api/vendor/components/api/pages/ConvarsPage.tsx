import React, { useMemo, useState, useEffect } from "react";
import convarsData from "@moddota/dota-data/files/convars.json";
import { ScrollableList, LazyList } from "../Lists";
import { SearchBox, getSearchFromUrl, subscribeToSearchChange } from "../Search";
import { NavBar } from "../layout/NavBar";

type ConvarData = { default: string; flags: string[]; description: string };
const convars = convarsData as Record<string, ConvarData>;

const flagFilters = [
  { key: "all", label: "All" }, { key: "sv", label: "Server (sv)" }, { key: "cl", label: "Client (cl)" },
  { key: "cheat", label: "Cheat" }, { key: "rep", label: "Replicated" }, { key: "release", label: "Release" },
  { key: "a", label: "Archive (a)" }, { key: "cmd", label: "Commands" },
];

export const allConvars = Object.entries(convars)
  .map(([name, data]) => ({ name, default: data.default, flags: data.flags, description: data.description }))
  .sort((a, b) => a.name.localeCompare(b.name));

const flagCounts = flagFilters.map((f) => ({
  ...f,
  count: f.key === "all" ? allConvars.length : f.key === "cmd" ? allConvars.filter((c) => c.default === "cmd").length : allConvars.filter((c) => c.flags.includes(f.key)).length,
}));

const flagColors: Record<string, { bg: string; color: string }> = {
  sv: { bg: "#1e3a5f", color: "#60a5fa" }, cl: { bg: "#3f1e5f", color: "#c084fc" },
  cheat: { bg: "#5f1e1e", color: "#f87171" }, rep: { bg: "#1e5f3a", color: "#4ade80" },
  release: { bg: "#5f5f1e", color: "#facc15" }, a: { bg: "#4a3f2f", color: "#d4a574" },
};

type ConvarEntry = { name: string; default: string; flags: string[]; description: string };

export function renderItem(convar: ConvarEntry, style?: React.CSSProperties) {
  return (
    <div style={{ padding: 6, ...style }} key={convar.name}>
      <div style={{ backgroundColor: "var(--color-group)", border: "1px solid var(--color-group-border)", borderRadius: 4, boxShadow: "2px 2px 6px var(--color-group-shadow)", padding: "6px 10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <code style={{ fontWeight: 600, color: "var(--color-highlight)" }}>{convar.name}</code>
          {convar.default !== "cmd" && <code style={{ fontSize: 12, color: "var(--color-text-faded)" }}>= {convar.default}</code>}
          {convar.flags.map((flag) => (
            <span key={flag} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, backgroundColor: flagColors[flag]?.bg || "var(--color-sidebar)", color: flagColors[flag]?.color || "var(--color-text-faded)", fontWeight: 500 }}>{flag}</span>
          ))}
        </div>
        {convar.description && <div style={{ marginTop: 4, paddingTop: 4, borderTop: "1px solid var(--color-group-separator)", fontSize: 13, color: "var(--color-text)" }}>{convar.description}</div>}
      </div>
    </div>
  );
}

export function ConvarsPage() {
  const [search, setSearch] = useState(() => getSearchFromUrl());
  const [selectedFlag, setSelectedFlag] = useState(() => {
    if (typeof window === "undefined") return "all";
    return new URLSearchParams(window.location.search).get("flag") || "all";
  });

  useEffect(() => {
    const handler = () => { setSearch(getSearchFromUrl()); setSelectedFlag(new URLSearchParams(window.location.search).get("flag") || "all"); };
    return subscribeToSearchChange(handler);
  }, []);

  const filtered = useMemo(() => {
    let f = allConvars;
    if (selectedFlag !== "all") { f = selectedFlag === "cmd" ? f.filter((c) => c.default === "cmd") : f.filter((c) => c.flags.includes(selectedFlag)); }
    if (search) { const q = search.toLowerCase(); f = f.filter((c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)); }
    return f;
  }, [selectedFlag, search]);

  const isSearching = !!search || selectedFlag !== "all";
  const base = typeof window !== "undefined" ? document.querySelector("base")?.getAttribute("href") || "" : "";

  return (
    <>
      <NavBar />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }} className="api-page-content">
        <div style={{ width: 340, height: "100%", overflowY: "scroll", padding: "2px 12px" }} className="api-sidebar">
          {flagCounts.map((flag) => (
            <a key={flag.key} href={`${base}api/convars${flag.key === "all" ? "" : `?flag=${flag.key}`}`} style={{
              background: selectedFlag === flag.key ? "var(--color-sidebar-hover)" : "var(--color-sidebar)",
              borderBottom: selectedFlag === flag.key ? "3px solid var(--color-highlight)" : "3px solid transparent",
              borderRadius: 3, padding: "2px 4px 0 4px", textDecoration: "none", color: "var(--color-text)",
              fontWeight: selectedFlag === flag.key ? 600 : "normal", display: "flex", alignItems: "center", gap: 4, fontSize: 13, marginBottom: 3,
            }}>{flag.label} <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--color-text-faded)" }}>({flag.count})</span></a>
          ))}
        </div>
        <main style={{ flex: 1, display: "flex", flexFlow: "column", minHeight: 0, overflowY: "auto", padding: "0 0 0 24px" }}>
          <SearchBox baseUrl="/convars" />
          {!search && selectedFlag === "all" ? (
            <>
              <div style={{ marginTop: 50, alignSelf: "center", fontSize: 24, textAlign: "center", color: "var(--color-text-faded)" }}>
                Use the search bar or select a filter from the sidebar
              </div>
            </>
          ) : filtered.length > 0 ? (
            isSearching ? <LazyList data={filtered} render={renderItem} /> : <ScrollableList data={filtered} render={renderItem} />
          ) : (
            <div style={{ marginTop: 50, alignSelf: "center", fontSize: 42, textAlign: "center" }}>No results found</div>
          )}
        </main>
      </div>
      <style>{`
        @media (max-width: 1100px) { .api-sidebar { width: 200px !important; } }
        @media (max-width: 768px) { .api-sidebar { width: 100% !important; max-height: 40vh; border-bottom: 1px solid var(--color-group-border); } .api-page-content { flex-direction: column; } }
      `}</style>
    </>
  );
}

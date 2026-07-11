import React, { useMemo, useState, useRef, useEffect } from "react";
import { vscriptsScope } from "../../../data/vscripts-data";
import { eventsScope } from "../../../data/events-data";
import { panoramaScope } from "../../../data/panorama-api-data";
import { panoramaCssScope } from "../../../data/panorama-css-data";
import { panoramaEventsScope } from "../../../data/panorama-events-data";
import { fuzzyMatch } from "../../../utils/fuzzySearch";
import { translitRuToEn } from "../../../utils/keyboardTranslit";
import { ScrollableList } from "../Lists";
import { DeclarationsContext, type DeclarationsContextType } from "../Docs/DeclarationsContext";
import { ClassDeclaration } from "../Docs/ClassDeclaration";
import { FunctionDeclaration } from "../Docs/FunctionDeclaration";
import { Enum } from "../Docs/Enum";
import { Constant } from "../Docs/Constant";
import { CssProperty } from "../Docs/CssProperty";
import { allAbilities, AbilityItem } from "./AbilitiesPage";
import { allConvars, renderItem as renderConvarItem } from "./ConvarsPage";
import { allModifiers, renderItem as renderModifierItem } from "./ModifiersPage";

// ─── Sources ──────────────────────────────────────────────────────────────────

type DeclScopeKey = "lua" | "event" | "panoramaApi" | "panoramaCss" | "panoramaEvent";
type SourceKey = DeclScopeKey | "ability" | "modifier" | "convar";

interface SourceMeta {
  label: string;
  color: string;
}

const SOURCES: Record<SourceKey, SourceMeta> = {
  lua: { label: "Lua API", color: "#8fbf3f" },
  event: { label: "Game Event", color: "#e0a13a" },
  panoramaApi: { label: "Panorama API", color: "#5b82ee" },
  panoramaCss: { label: "Panorama CSS", color: "#c084fc" },
  panoramaEvent: { label: "Panorama Event", color: "#3aa0c0" },
  ability: { label: "Ability", color: "#d97706" },
  modifier: { label: "Modifier", color: "#10b981" },
  convar: { label: "Convar", color: "#ef6b6b" },
};

const SOURCE_KEYS = Object.keys(SOURCES) as SourceKey[];

const DECL_SCOPES: Record<DeclScopeKey, DeclarationsContextType> = {
  lua: vscriptsScope,
  event: eventsScope,
  panoramaApi: panoramaScope,
  panoramaCss: panoramaCssScope,
  panoramaEvent: panoramaEventsScope,
};

// Each result is rendered with its own page's card; keep enough info to do that.
type Entry =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { source: SourceKey; name: string; kind: "decl"; scopeKey: DeclScopeKey; decl: any; context?: string; searchNames?: string[] }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { source: SourceKey; name: string; kind: "ability"; ability: any }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { source: SourceKey; name: string; kind: "convar"; convar: any }
  | { source: SourceKey; name: string; kind: "modifier"; modifier: { name: string; category: string } };

function pushDeclScope(out: Entry[], scopeKey: DeclScopeKey, source: SourceKey) {
  for (const d of DECL_SCOPES[scopeKey].declarations) {
    if (!d?.name) continue;
    if (d.kind === "class") {
      // One entry per class; members are matched dynamically at query time (matchEntry),
      // so hits inside a class group under its header like on the site. `searchNames`
      // includes the global instance (GameRules → CDOTAGameRules) and the client-side
      // name so instance queries find the class too.
      const classNames = [d.name];
      if (d.instance && d.instance !== d.name) classNames.push(d.instance);
      if (d.clientName && d.clientName !== d.name) classNames.push(d.clientName);
      out.push({ source, name: d.name, kind: "decl", scopeKey, decl: d, searchNames: classNames });
    } else if (d.kind === "enum") {
      // One block per enum, like the site's Lua API page — member matching also happens
      // at query time, so DOTA_ABILITY_BEHAVIOR_HIDDEN shows the block filtered to it.
      out.push({ source, name: d.name, kind: "decl", scopeKey, decl: d });
    } else {
      out.push({
        source,
        name: d.name,
        kind: "decl",
        scopeKey,
        decl: d,
        context: d.kind === "function" ? "functions" : undefined,
      });
    }
  }
}

// Built once; sorted by name for the immediate (empty-query) view.
const ENTRIES: Entry[] = (() => {
  const out: Entry[] = [];
  pushDeclScope(out, "lua", "lua");
  pushDeclScope(out, "event", "event");
  pushDeclScope(out, "panoramaApi", "panoramaApi");
  pushDeclScope(out, "panoramaCss", "panoramaCss");
  pushDeclScope(out, "panoramaEvent", "panoramaEvent");
  for (const a of allAbilities) out.push({ source: "ability", name: a.name, kind: "ability", ability: a });
  for (const m of allModifiers) out.push({ source: "modifier", name: m.name, kind: "modifier", modifier: m });
  for (const c of allConvars) out.push({ source: "convar", name: c.name, kind: "convar", convar: c });
  out.sort((a, b) => a.name.localeCompare(b.name));
  return out;
})();

const COUNTS: Record<SourceKey, number> = (() => {
  const c = Object.fromEntries(SOURCE_KEYS.map((k) => [k, 0])) as Record<SourceKey, number>;
  for (const e of ENTRIES) c[e.source]++;
  return c;
})();

const BY_SOURCE: Record<SourceKey, Entry[]> = (() => {
  const g = Object.fromEntries(SOURCE_KEYS.map((k) => [k, [] as Entry[]])) as Record<SourceKey, Entry[]>;
  for (const e of ENTRIES) g[e.source].push(e); // ENTRIES is already name-sorted
  return g;
})();

// Round-robin across sources so the no-query view shows a representative mix
// instead of a wall of whichever source sorts first alphabetically.
const INTERLEAVED: Entry[] = (() => {
  const out: Entry[] = [];
  const lists = SOURCE_KEYS.map((k) => BY_SOURCE[k]);
  const max = Math.max(...lists.map((l) => l.length));
  for (let i = 0; i < max; i++) for (const l of lists) if (i < l.length) out.push(l[i]);
  return out;
})();

interface DisplayEntry {
  entry: Entry;
  /** Class/enum members that matched the query — the card renders filtered to them, like the site. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  members?: any[];
}

// Match one entry against the query. Class and enum members are searched too, so a hit
// inside a class groups under its header (the site's search behaviour: CDOTA_BaseNPC card
// with only the matching methods). Class methods additionally match through qualified
// names (CDOTAGameRules.IsGamePaused / GameRules.IsGamePaused) so "gamerules pause"-style
// queries work; when the query is really just the class name (every member "matches"
// through the prefix alone) it degrades to a plain name match instead.
function matchEntry(entry: Entry, query: string): { score: number; members?: any[] } | undefined {
  const names = "searchNames" in entry && entry.searchNames ? entry.searchNames : [entry.name];
  let nameScore = Infinity;
  for (const n of names) {
    const s = fuzzyMatch(n, query);
    if (s < nameScore) nameScore = s;
  }

  const decl = entry.kind === "decl" ? entry.decl : undefined;
  if (decl && (decl.kind === "class" || decl.kind === "enum") && Array.isArray(decl.members) && decl.members.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plain: any[] = [];
    let bestPlain = Infinity;
    for (const m of decl.members) {
      if (!m?.name) continue;
      const s = fuzzyMatch(m.name, query);
      if (isFinite(s)) {
        plain.push(m);
        if (s < bestPlain) bestPlain = s;
      }
    }
    if (plain.length > 0) {
      return { score: Math.min(bestPlain, nameScore), members: plain };
    }
    if (decl.kind === "class") {
      const prefixes = [decl.name];
      if (decl.instance && decl.instance !== decl.name) prefixes.push(decl.instance);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const qualified: any[] = [];
      let bestQualified = Infinity;
      for (const m of decl.members) {
        if (!m?.name) continue;
        let s = Infinity;
        for (const p of prefixes) {
          const qs = fuzzyMatch(`${p}.${m.name}`, query);
          if (qs < s) s = qs;
        }
        if (isFinite(s)) {
          qualified.push(m);
          if (s < bestQualified) bestQualified = s;
        }
      }
      if (qualified.length > 0 && qualified.length < decl.members.length) {
        return { score: Math.min(bestQualified, nameScore), members: qualified };
      }
      if (qualified.length > 0 && !isFinite(nameScore)) {
        return { score: bestQualified, members: decl.members };
      }
    }
  }

  if (!isFinite(nameScore)) return undefined;
  // A class/enum found by its own name carries the full member list — the sidebar's
  // equivalent of opening the class page on the site.
  if (decl && (decl.kind === "class" || decl.kind === "enum") && Array.isArray(decl.members)) {
    return { score: nameScore, members: decl.members };
  }
  return { score: nameScore };
}

function fuzzyFilter(pool: Entry[], q: string): DisplayEntry[] {
  // Strip whitespace so multi-word queries match (e.g. "add modifier" → "addmodifier"
  // subsequence-matches "AddNewModifier"); API names contain no spaces.
  const query = q.replace(/\s+/g, "");
  if (!query) return pool.map((entry) => ({ entry }));
  const scored: { display: DisplayEntry; score: number }[] = [];
  for (const entry of pool) {
    const match = matchEntry(entry, query);
    if (match) scored.push({ display: { entry, members: match.members }, score: match.score });
  }
  scored.sort((a, b) => a.score - b.score || a.display.entry.name.localeCompare(b.display.entry.name));
  return scored.map((s) => s.display);
}

// Cap rendered rows so broad/empty queries stay responsive (cards aren't virtualized
// because abilities expand in place, which a virtualized row would clip). Grouped
// classes render one card per matched member, so query results are also capped by the
// total member-card count, not just the row count.
const MAX_RESULTS = 200;
const MAX_CARDS = 400;

// A class/enum card rendered with exactly the members the query matched — the site's
// grouped search result (the CDOTA_BaseNPC block for "find mod"); a class-name match
// carries the full member list, like opening the class page on the site. When browsing
// without a query (`matched` undefined) a class renders as a compact header, small ones
// (Panorama interfaces etc.) fully.
const AUTO_EXPAND_MEMBERS = 8;

function GroupCard({
  declaration,
  matched,
  render,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  declaration: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  matched?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (decl: any) => React.ReactNode;
}) {
  const total = Array.isArray(declaration.members) ? declaration.members.length : 0;
  const shown = useMemo(() => {
    if (matched !== undefined) {
      return matched.length === total ? declaration : { ...declaration, members: matched };
    }
    return total <= AUTO_EXPAND_MEMBERS ? declaration : { ...declaration, members: [] };
  }, [declaration, matched, total]);
  return <>{render(shown)}</>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderEntry(entry: Entry, matchedMembers?: any[]): React.ReactNode {
  switch (entry.kind) {
    case "decl": {
      const scope = DECL_SCOPES[entry.scopeKey];
      const d = entry.decl;
      let inner: React.ReactNode = null;
      switch (d.kind) {
        case "class":
          inner = <GroupCard declaration={d} matched={matchedMembers} render={(decl) => <ClassDeclaration declaration={decl} />} />;
          break;
        case "enum":
          inner = matchedMembers ? (
            <GroupCard declaration={d} matched={matchedMembers} render={(decl) => <Enum element={decl} />} />
          ) : (
            <Enum element={d} />
          );
          break;
        case "constant":
          inner = <Constant element={d} />;
          break;
        case "function":
          inner = <FunctionDeclaration declaration={d} context={entry.context} />;
          break;
        case "cssProperty":
          inner = <CssProperty element={d} />;
          break;
      }
      return <DeclarationsContext.Provider value={scope}>{inner}</DeclarationsContext.Provider>;
    }
    case "ability":
      return <AbilityItem ability={entry.ability} />;
    case "convar":
      return renderConvarItem(entry.convar);
    case "modifier":
      return renderModifierItem(entry.modifier);
  }
}

// ─── Component ──────────────────────────────────────────────────────────────────

export function SearchPage() {
  const [search, setSearch] = useState("");
  // Default to Lua only; the user can pick "All" or another source from the chips.
  const [selected, setSelected] = useState<SourceKey | null>("lua");

  // Clicking a type / element link in a declaration card searches for it (dispatched by the
  // index.tsx link interceptor). Keep the current source chip selected — most type references
  // point within the same source, and the user asked not to be bounced to "All".
  useEffect(() => {
    const handler = (e: Event) => {
      const term = (e as CustomEvent<{ term?: string }>).detail?.term;
      if (typeof term === "string" && term) {
        setSearch(term);
      }
    };
    window.addEventListener("dota:navigate", handler);
    return () => window.removeEventListener("dota:navigate", handler);
  }, []);

  const allResults = useMemo<DisplayEntry[]>(() => {
    const q = search.trim();
    if (selected) return q ? fuzzyFilter(BY_SOURCE[selected], q) : BY_SOURCE[selected].map((entry) => ({ entry }));
    // No source picked: fuzzy across everything, or a representative mix when idle.
    return q ? fuzzyFilter(ENTRIES, q) : INTERLEAVED.map((entry) => ({ entry }));
  }, [search, selected]);

  const results = useMemo(() => {
    const out: DisplayEntry[] = [];
    let cards = 0;
    for (const r of allResults) {
      if (out.length >= MAX_RESULTS || cards >= MAX_CARDS) break;
      out.push(r);
      cards += r.members ? Math.max(1, r.members.length) : 1;
    }
    return out;
  }, [allResults]);

  const renderRow = ({ entry, members }: DisplayEntry) => {
    const meta = SOURCES[entry.source];
    return (
      <div
        key={`${entry.source}-${"context" in entry && entry.context ? entry.context + "." : ""}${entry.name}`}
        style={{ display: "flex", alignItems: "stretch", gap: 8, padding: "3px 6px" }}
      >
        <span style={{ flexShrink: 0, width: 3, borderRadius: 2, background: meta.color }} />
        <div style={{ flex: 1, minWidth: 0 }}>{renderEntry(entry, members)}</div>
      </div>
    );
  };

  // Single narrow column (the VS Code sidebar): search row on top, a wrapping
  // source-chip row (no horizontal scrollbar), then the page-like results. The
  // website's 260px left source sidebar is replaced by these chips.
  return (
    <div style={{ display: "flex", flexFlow: "column", flex: 1, minHeight: 0 }}>
      <style>{`
        .search-source-chip:hover { filter: brightness(1.08); }
      `}</style>

      <SearchInput value={search} onChange={setSearch} />

      <div
        className="search-chip-row"
        style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "0 8px 6px 8px", flexShrink: 0 }}
      >
        <SourceChip label="All" color="var(--color-highlight)" active={selected === null} onClick={() => setSelected(null)} />
        {SOURCE_KEYS.map((key) => (
          <SourceChip
            key={key}
            label={SOURCES[key].label}
            color={SOURCES[key].color}
            active={selected === key}
            onClick={() => setSelected((s) => (s === key ? null : key))}
          />
        ))}
      </div>

      <div style={{ fontSize: 12, color: "var(--color-text-faded, #999)", padding: "0 8px 4px 8px", flexShrink: 0 }}>
        {allResults.length} result{allResults.length === 1 ? "" : "s"}
        {results.length < allResults.length && ` — showing first ${results.length}, refine your search`}
      </div>

      {results.length > 0 ? (
        <ScrollableList data={results} render={renderRow} />
      ) : (
        <div style={{ marginTop: 60, textAlign: "center", fontSize: 28, color: "var(--color-text-faded)" }}>
          No results found
        </div>
      )}
    </div>
  );
}

// ─── Instant search input (local state, no URL round-trip, Cyrillic→QWERTY translit) ──

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row",
        alignItems: "center",
        backgroundColor: "var(--color-searchbox-bg)",
        borderRadius: 32,
        padding: "0 6px",
        margin: 6,
      }}
    >
      <svg width={16} height={16} viewBox="0 0 16 16" style={{ flexShrink: 0, margin: "0 4px" }}>
        <circle cx="7" cy="7" r="5" fill="none" stroke="var(--color-searchbox-button-fill)" strokeWidth="2" />
        <line x1="11" y1="11" x2="14" y2="14" stroke="var(--color-searchbox-button-fill)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        ref={ref}
        placeholder="Search..."
        value={value}
        // Update immediately on every keystroke (no debounce); transliterate Cyrillic typed
        // on a Russian layout to QWERTY so the English-only API is searchable without switching.
        onChange={(e) => onChange(translitRuToEn(e.target.value))}
        aria-label="Search"
        style={{ flex: 1, padding: 8, background: "none", border: "none", outline: "none", color: "var(--color-text)", fontSize: 14 }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          onMouseDown={(e) => e.preventDefault()}
          title="Clear"
          style={{ border: "none", background: "none", cursor: "pointer", color: "var(--color-searchbox-button-fill)", fontSize: 18, lineHeight: 1, padding: "0 4px" }}
        >
          ×
        </button>
      )}
    </div>
  );
}

// ─── Source filter chip (horizontal, replaces the website's left sidebar) ──────────

function SourceChip({
  label,
  color = "var(--color-highlight)",
  active,
  onClick,
}: {
  label: string;
  color?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="search-source-chip"
      title={label}
      style={{
        flexShrink: 0,
        whiteSpace: "nowrap",
        background: active ? "var(--color-sidebar-hover)" : "var(--color-sidebar)",
        border: active ? `1px solid ${color}` : "1px solid transparent",
        borderRadius: 12,
        padding: "3px 10px",
        cursor: "pointer",
        color: "var(--color-text)",
        fontWeight: active ? 600 : "normal",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
      {label}
    </button>
  );
}

// ─── Light/dark toggle (the website keeps this in the NavBar; here it lives in the
//     search row). Flips the data-theme attribute the vendored global.css keys off. ──

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark",
  );

  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* webview storage may be unavailable */
    }
  };

  return (
    <button
      onClick={toggle}
      title={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-label="Toggle theme"
      style={{
        flexShrink: 0,
        marginRight: 6,
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "1px solid var(--color-group-border)",
        background: "var(--color-searchbox-bg)",
        cursor: "pointer",
        fontSize: 14,
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {dark ? "🌜" : "🌞"}
    </button>
  );
}

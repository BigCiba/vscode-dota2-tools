import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { dotaLanguagesData, type DotaLanguage } from "@moddota/dota-data/lib/localization/languages";
import { LazyList } from "../Lists";
import { useCtrlFHook } from "../Search";

// ─── Data loading ───────────────────────────────────────────────────────────────
// Localization files are large (~10MB each) and there are 28 of them, so they are fetched
// at runtime per-language instead of being bundled. In the VS Code webview there is no dev
// server, so we fetch the same raw files the site uses (the dota-data repo on GitHub). A
// provider may override the source by setting window.__LOCALIZATION_BASE__ (e.g. to a local
// webview-resource folder) for offline use.
const LOCALIZATION_BASE: string =
  (typeof window !== "undefined" && (window as any).__LOCALIZATION_BASE__) ||
  "https://raw.githubusercontent.com/iwasinminedream/dota-data/master/files/localization";

const DEFAULT_LANGUAGE: DotaLanguage = "russian";

// The extension exposes only these three localizations, shown as blocks with their official
// abbreviation (RU / EN / ZH). The other ~25 Dota languages are intentionally dropped.
const LANGUAGES: DotaLanguage[] = ["russian", "english", "schinese"];

// Official short code for a language block label, e.g. russian → "RU", schinese → "ZH".
function langCode(lang: DotaLanguage): string {
  return (dotaLanguagesData[lang]?.code ?? lang).split("-")[0].toUpperCase();
}

interface LocalizationEntry {
  key: string;
  value: string;
  keyLower: string;
  valueLower: string;
  group: string;
  // The display name of the entity this token belongs to (e.g. "Anti-Mage", "Blink Dagger"),
  // taken from the value of the group's anchor key. Empty for synthetic prefix groups.
  groupTitle: string;
}

interface Block {
  id: string;
  title: string;
  entries: LocalizationEntry[];
}

// Cache parsed + grouped entries per language so switching back is instant.
const entryCache = new Map<DotaLanguage, LocalizationEntry[]>();

// Strip Dota's grammatical-case suffix (":n", ":p", ":g", …) so a name token like
// `npc_dota_hero_antimage:n` lines up as the prefix of `npc_dota_hero_antimage_hype`.
function stripGrammatical(keyLower: string): string {
  const i = keyLower.indexOf(":");
  return i === -1 ? keyLower : keyLower.slice(0, i);
}

// Group every token under the *entity* it belongs to — the hero, ability, item or modifier
// whose name is the shortest existing key that prefixes it. We walk the parent chain to the
// root (shortest prefix) rather than stopping at the immediate parent, so e.g. all
// `..._mana_thirst*` modifier tokens stay in one block instead of `_vision` and
// `_vision_Description` splitting off. Stripping the grammatical suffix first is what makes
// `npc_dota_hero_<hero>` tokens cluster by hero (their name key carries a `:n`).
function assignGroups(entries: LocalizationEntry[]): void {
  // Map stripped-lower key -> first actual key, so prefix matching is case- and suffix-insensitive.
  const keyByStripped = new Map<string, string>();
  for (const e of entries) {
    const s = stripGrammatical(e.keyLower);
    if (!keyByStripped.has(s)) keyByStripped.set(s, e.key);
  }

  // Immediate parent = the longest strict prefix (by "_" segment) existing as another key,
  // or a grammatical sibling (same stripped key, different actual key, e.g. the `:p` of a `:n`).
  const immediateParent = new Map<string, string | null>();
  for (const e of entries) {
    const s = stripGrammatical(e.keyLower);
    const parts = s.split("_");
    let parent: string | null = null;
    for (let i = parts.length - 1; i >= 1; i--) {
      const actual = keyByStripped.get(parts.slice(0, i).join("_"));
      if (actual && actual !== e.key) {
        parent = actual;
        break;
      }
    }
    if (!parent) {
      const sibling = keyByStripped.get(s);
      if (sibling && sibling !== e.key) parent = sibling;
    }
    immediateParent.set(e.key, parent);
  }

  // Resolve each key to its root anchor by following the parent chain (memoised). Parents are
  // always strictly shorter, so the walk terminates; a `seen` set guards against any cycle.
  const rootCache = new Map<string, string>();
  const rootOf = (key: string): string => {
    const path: string[] = [];
    const seen = new Set<string>();
    let cur = key;
    while (true) {
      const cached = rootCache.get(cur);
      if (cached !== undefined) {
        for (const k of path) rootCache.set(k, cached);
        return cached;
      }
      if (seen.has(cur)) break;
      seen.add(cur);
      const p = immediateParent.get(cur) ?? null;
      if (!p) break;
      path.push(cur);
      cur = p;
    }
    for (const k of path) rootCache.set(k, cur);
    rootCache.set(cur, cur);
    return cur;
  };

  const roots = new Map<string, string>();
  const hasChildren = new Set<string>();
  for (const e of entries) {
    const r = rootOf(e.key);
    roots.set(e.key, r);
    if (r !== e.key) hasChildren.add(r);
  }

  const valueByKey = new Map<string, string>();
  for (const e of entries) valueByKey.set(e.key, e.value);

  for (const e of entries) {
    const r = roots.get(e.key)!;
    let group: string;
    if (r !== e.key) {
      group = r; // a field of some entity → that entity
    } else if (hasChildren.has(e.key)) {
      group = e.key; // this key *is* the entity anchor (a name with fields under it)
    } else {
      // A lone token with no family: cluster flat families (e.g. `dota_ability_variable_*`)
      // by dropping the last segment, as before.
      const idx = e.key.lastIndexOf("_");
      group = idx > 0 ? e.key.slice(0, idx) : e.key;
    }
    e.group = group;
    e.groupTitle = valueByKey.get(group) ?? "";
  }
}

function prepareEntries(raw: Record<string, string>): LocalizationEntry[] {
  const entries = Object.entries(raw)
    .map(([key, value]): LocalizationEntry => {
      const str = typeof value === "string" ? value : String(value);
      return {
        key,
        value: str,
        keyLower: key.toLowerCase(),
        valueLower: str.toLowerCase(),
        group: key,
        groupTitle: "",
      };
    })
    .sort((a, b) => a.key.localeCompare(b.key));
  assignGroups(entries);
  return entries;
}

async function loadLanguage(language: DotaLanguage): Promise<LocalizationEntry[]> {
  const cached = entryCache.get(language);
  if (cached) return cached;
  const response = await fetch(`${LOCALIZATION_BASE}/${language}.json`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const raw = (await response.json()) as Record<string, string>;
  const entries = prepareEntries(raw);
  entryCache.set(language, entries);
  return entries;
}

// ─── Search ───────────────────────────────────────────────────────────────────--

type SearchScope = "both" | "key" | "value";

const scopeOptions: { key: SearchScope; label: string }[] = [
  { key: "both", label: "Both" },
  { key: "key", label: "Keys" },
  { key: "value", label: "Values" },
];

function filterEntries(entries: LocalizationEntry[], query: string, scope: SearchScope): LocalizationEntry[] {
  const q = query.toLowerCase();
  const matchKey = scope !== "value";
  const matchValue = scope !== "key";
  return entries.filter(
    (e) => (matchKey && e.keyLower.includes(q)) || (matchValue && e.valueLower.includes(q)),
  );
}

// Group a (possibly filtered) entry list into ordered blocks. Entry `group` is precomputed
// over the full key set, so grouping is consistent regardless of filtering.
function buildBlocks(entries: LocalizationEntry[]): Block[] {
  const map = new Map<string, LocalizationEntry[]>();
  for (const e of entries) {
    let arr = map.get(e.group);
    if (!arr) {
      arr = [];
      map.set(e.group, arr);
    }
    arr.push(e);
  }
  const blocks: Block[] = [];
  for (const [id, es] of map) {
    es.sort((a, b) => {
      if (a.key === id) return -1; // the base/name key heads the block
      if (b.key === id) return 1;
      return a.key.localeCompare(b.key);
    });
    blocks.push({ id, title: es[0]?.groupTitle ?? "", entries: es });
  }
  blocks.sort((a, b) => a.id.localeCompare(b.id));
  return blocks;
}

// Highlight the first occurrence of the query inside the text.
function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "var(--color-highlight)", color: "#000", borderRadius: 2, padding: "0 1px" }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ─── Clipboard ──────────────────────────────────────────────────────────────────

function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  }
  fallbackCopy(text);
  return Promise.resolve();
}

function fallbackCopy(text: string): void {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    /* ignore */
  }
  document.body.removeChild(ta);
}

// Re-escape control characters back to their KV-file form. The localization JSON stores them
// as real characters (vdf unescaped \n, \r, \t when parsing), so for a faithful KV-file
// appearance and valid copy output we turn them back into escapes.
function escapeKvValue(value: string): string {
  return value.replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
}

const kvLine = (e: LocalizationEntry) => `"${e.key}"\t\t"${escapeKvValue(e.value)}"`;
const kvBlock = (block: Block) => block.entries.map(kvLine).join("\n");

// ─── Flat rows for virtualization ─────────────────────────────────────────────--

type Row =
  | { kind: "header"; block: Block; collapsed: boolean }
  | { kind: "line"; entry: LocalizationEntry; first: boolean; last: boolean };

// ─── Spinner ──────────────────────────────────────────────────────────────────--

const spinnerKeyframes = `@keyframes loc-spin { to { transform: rotate(360deg); } }`;

function Spinner() {
  return (
    <div
      style={{
        width: 24,
        height: 24,
        border: "3px solid var(--color-group-border, #333)",
        borderTopColor: "var(--color-highlight, #4af)",
        borderRadius: "50%",
        animation: "loc-spin 1s linear infinite",
        marginRight: 12,
      }}
    />
  );
}

// ─── Row rendering ──────────────────────────────────────────────────────────────

function CopyButton({ label, title, onCopy }: { label: string; title: string; onCopy: () => void }) {
  return (
    <button
      className="loc-copy-btn"
      title={title}
      onClick={(e) => {
        e.stopPropagation();
        onCopy();
      }}
      style={{
        border: "1px solid var(--color-group-border)",
        background: "var(--color-sidebar)",
        color: "var(--color-text-faded)",
        borderRadius: 3,
        fontSize: 11,
        padding: "1px 6px",
        cursor: "pointer",
        lineHeight: 1.6,
      }}
    >
      {label}
    </button>
  );
}

function makeRenderRow(
  query: string,
  scope: SearchScope,
  searching: boolean,
  copy: (text: string, message: string) => void,
  toggleBlock: (id: string) => void,
) {
  return function renderRow(row: Row, style?: React.CSSProperties) {
    if (row.kind === "header") {
      const { block, collapsed } = row;
      const idNode = searching ? highlight(block.id, query) : block.id;
      const hasTitle = block.title && block.title !== block.id;
      return (
        <div style={{ padding: "6px 6px 0", ...style }} key={`h:${block.id}`}>
          <div
            className="loc-block-header"
            onClick={() => !searching && toggleBlock(block.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 10px",
              background: "var(--color-group)",
              border: "1px solid var(--color-group-border)",
              borderRadius: collapsed ? 4 : "4px 4px 0 0",
              cursor: searching ? "default" : "pointer",
              userSelect: "none",
            }}
          >
            {!searching && (
              <span
                style={{
                  fontSize: 9,
                  color: "var(--color-text-faded)",
                  transition: "transform 0.15s",
                  display: "inline-block",
                  transform: collapsed ? "rotate(0deg)" : "rotate(90deg)",
                  width: 10,
                }}
              >
                {"▶"}
              </span>
            )}
            {/* Group by entity NAME: show the hero/ability/item/modifier name, with the raw
                key underneath. Falls back to just the key for synthetic (nameless) groups. */}
            {hasTitle ? (
              <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontWeight: 700, fontSize: 12.5, color: "var(--color-text)", wordBreak: "break-word" }}>
                  {block.title}
                </span>
                <code style={{ fontSize: 10.5, color: "var(--color-highlight)", wordBreak: "break-all" }}>{idNode}</code>
              </span>
            ) : (
              <code style={{ fontWeight: 700, fontSize: 12, color: "var(--color-highlight)", wordBreak: "break-all", flex: 1 }}>
                {idNode}
              </code>
            )}
            <span style={{ fontSize: 11, color: "var(--color-text-faded)" }}>({block.entries.length})</span>
            <CopyButton label="Copy block" title="Copy the whole block as KV" onCopy={() => copy(kvBlock(block), "Block copied")} />
          </div>
        </div>
      );
    }

    const { entry, last } = row;
    return (
      <div style={{ padding: "0 6px", ...style }} key={`l:${entry.key}`}>
        <div
          className="loc-kv-line"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            padding: "3px 10px",
            background: "var(--color-group)",
            borderLeft: "1px solid var(--color-group-border)",
            borderRight: "1px solid var(--color-group-border)",
            borderBottom: last ? "1px solid var(--color-group-border)" : "none",
            borderRadius: last ? "0 0 4px 4px" : 0,
            marginBottom: last ? 4 : 0,
          }}
        >
          <code style={{ fontSize: 12.5, fontFamily: "monospace", flex: 1, minWidth: 0, wordBreak: "break-word" }}>
            <span style={{ color: "var(--color-text-faded)" }}>"</span>
            <span style={{ color: "var(--color-syntax-key, var(--color-highlight))" }}>
              {scope === "value" ? entry.key : highlight(entry.key, query)}
            </span>
            <span style={{ color: "var(--color-text-faded)" }}>"</span>
            {"  "}
            <span style={{ color: "var(--color-text-faded)" }}>"</span>
            <span style={{ color: "var(--color-text)", whiteSpace: "pre-wrap" }}>
              {scope === "key" ? escapeKvValue(entry.value) : highlight(escapeKvValue(entry.value), query)}
            </span>
            <span style={{ color: "var(--color-text-faded)" }}>"</span>
          </code>
          <span className="loc-kv-actions" style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            <CopyButton label="key" title="Copy key" onCopy={() => copy(entry.key, "Key copied")} />
            <CopyButton label="value" title="Copy value" onCopy={() => copy(entry.value, "Value copied")} />
            <CopyButton label="kv" title="Copy as KV line" onCopy={() => copy(kvLine(entry), "KV line copied")} />
          </span>
        </div>
      </div>
    );
  };
}

// ─── Main component ─────────────────────────────────────────────────────────────

const EMPTY_SET: ReadonlySet<string> = new Set();

export function LocalizationPage() {
  const [language, setLanguage] = useState<DotaLanguage>(DEFAULT_LANGUAGE);
  const [entries, setEntries] = useState<LocalizationEntry[]>([]);
  const [loadingState, setLoadingState] = useState<"loading" | "idle" | "error">("loading");
  const [rawSearch, setRawSearch] = useState("");
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState<SearchScope>("both");
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(EMPTY_SET);
  const [copiedMsg, setCopiedMsg] = useState<string | null>(null);

  const requestRef = useRef(0);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const requestId = ++requestRef.current;
    setLoadingState("loading");
    loadLanguage(language)
      .then((loaded) => {
        if (requestRef.current !== requestId) return;
        setEntries(loaded);
        setCollapsed(EMPTY_SET);
        setLoadingState("idle");
      })
      .catch(() => {
        if (requestRef.current !== requestId) return;
        setEntries([]);
        setLoadingState("error");
      });
  }, [language]);

  // Debounce the search so typing doesn't filter ~100k entries on every keystroke.
  useEffect(() => {
    const id = setTimeout(() => setSearch(rawSearch.trim()), 180);
    return () => clearTimeout(id);
  }, [rawSearch]);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );

  const copy = useCallback((text: string, message: string) => {
    copyText(text).then(() => {
      setCopiedMsg(message);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedMsg(null), 1300);
    });
  }, []);

  const toggleBlock = useCallback((id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const searching = search.length > 0;

  const blocks = useMemo(() => {
    const shown = searching ? filterEntries(entries, search, scope) : entries;
    return buildBlocks(shown);
  }, [entries, search, scope, searching]);

  const matchedCount = useMemo(() => blocks.reduce((sum, b) => sum + b.entries.length, 0), [blocks]);

  const rows = useMemo(() => {
    const effectiveCollapsed = searching ? EMPTY_SET : collapsed;
    const result: Row[] = [];
    for (const block of blocks) {
      const isCollapsed = effectiveCollapsed.has(block.id);
      result.push({ kind: "header", block, collapsed: isCollapsed });
      if (!isCollapsed) {
        block.entries.forEach((entry, i) =>
          result.push({ kind: "line", entry, first: i === 0, last: i === block.entries.length - 1 }),
        );
      }
    }
    return result;
  }, [blocks, collapsed, searching]);

  const renderRow = useMemo(
    () => makeRenderRow(search, scope, searching, copy, toggleBlock),
    [search, scope, searching, copy, toggleBlock],
  );

  const searchRef = useCtrlFHook<HTMLInputElement>();
  // Auto-focus the search input on mount so the user can type immediately.
  useEffect(() => {
    searchRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <style>{`
        ${spinnerKeyframes}
        .loc-lang-block:hover { filter: brightness(1.08); }
        .loc-block-header:hover { filter: brightness(1.06); }
        .loc-kv-line:hover { background: var(--color-group-highlight, rgba(128,128,128,0.10)) !important; }
        .loc-kv-actions { opacity: 0; transition: opacity 0.12s; }
        .loc-kv-line:hover .loc-kv-actions { opacity: 1; }
        .loc-copy-btn:hover { color: var(--color-highlight) !important; border-color: var(--color-highlight) !important; }
        @media (max-width: 768px) { .loc-kv-actions { opacity: 1; } }
      `}</style>
      {/* Language blocks (official codes) on top — replaces the old left sidebar. */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "6px 8px 2px", flexShrink: 0 }}>
        {LANGUAGES.map((lang) => {
          const data = dotaLanguagesData[lang];
          const selected = lang === language;
          return (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className="loc-lang-block"
              title={`${data.native} — ${data.english}`}
              style={{
                border: selected ? "1px solid var(--color-highlight)" : "1px solid var(--color-group-border)",
                background: selected ? "var(--color-highlight)" : "var(--color-sidebar)",
                color: selected ? "#000" : "var(--color-text)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.5px",
                padding: "5px 16px",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {langCode(lang)}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", flexFlow: "column", flex: 1, minHeight: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, margin: 6, flexWrap: "wrap" }}>
            <div
              style={{
                display: "flex",
                flex: 1,
                minWidth: 160,
                alignItems: "center",
                backgroundColor: "var(--color-searchbox-bg)",
                border: "var(--color-searchbox-border)",
                borderRadius: 32,
                padding: "0 6px",
              }}
            >
              <svg width={16} height={16} viewBox="0 0 16 16" style={{ margin: "0 4px", flexShrink: 0 }}>
                <circle cx="7" cy="7" r="5" fill="none" stroke="var(--color-searchbox-button-fill)" strokeWidth="2" />
                <line x1="11" y1="11" x2="14" y2="14" stroke="var(--color-searchbox-button-fill)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                ref={searchRef}
                placeholder="Search localization tokens..."
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                aria-label="Search localization"
                style={{ flex: 1, padding: 8, background: "none", border: "none", outline: "none", color: "var(--color-text)", fontSize: 14 }}
              />
            </div>
            <div style={{ display: "flex", gap: 2, borderRadius: 6, overflow: "hidden", border: "1px solid var(--color-group-border)" }}>
              {scopeOptions.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setScope(opt.key)}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "6px 10px",
                    fontSize: 13,
                    fontWeight: scope === opt.key ? 600 : "normal",
                    background: scope === opt.key ? "var(--color-highlight)" : "var(--color-sidebar)",
                    color: scope === opt.key ? "#000" : "var(--color-text)",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {loadingState === "idle" && (
            <div style={{ fontSize: 12, color: "var(--color-text-faded)", margin: "0 12px 4px" }}>
              {searching
                ? `${matchedCount.toLocaleString()} of ${entries.length.toLocaleString()} tokens in ${blocks.length.toLocaleString()} blocks`
                : `${entries.length.toLocaleString()} tokens in ${blocks.length.toLocaleString()} blocks`}
            </div>
          )}

          {loadingState === "loading" ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40, color: "var(--color-text-faded)" }}>
              <Spinner /> Loading {dotaLanguagesData[language].english} localization...
            </div>
          ) : loadingState === "error" ? (
            <div style={{ padding: 20, textAlign: "center", color: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.1)", borderRadius: 4, margin: 6 }}>
              Failed to load {dotaLanguagesData[language].english} localization.
            </div>
          ) : rows.length > 0 ? (
            <LazyList data={rows} render={renderRow} />
          ) : (
            <div style={{ marginTop: 50, alignSelf: "center", fontSize: 24, textAlign: "center", color: "var(--color-text-faded)" }}>
              No results found
            </div>
          )}
      </div>

      {copiedMsg && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--color-group)",
            border: "1px solid var(--color-highlight)",
            color: "var(--color-text)",
            padding: "8px 16px",
            borderRadius: 6,
            boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
            fontSize: 13,
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          {"✓ "}
          {copiedMsg}
        </div>
      )}
    </>
  );
}

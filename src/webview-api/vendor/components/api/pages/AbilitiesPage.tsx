import React, { useCallback, useMemo, useState, useEffect } from "react";
import abilitiesData from "@moddota/dota-data/files/abilities.json";
import heroMapData from "@moddota/dota-data/files/ability-hero-map.json";
import modifiersData from "@moddota/dota-data/files/vscripts/modifier_list.json";
import { ScrollableList } from "../Lists";
import { SearchBox, getSearchFromUrl, subscribeToSearchChange, notifySearchChange } from "../Search";
import { fuzzyMatch } from "../../../utils/fuzzySearch";
import { NavBar } from "../layout/NavBar";

type KVValue = string | number | KVObject;
type KVObject = { [key: string]: KVValue };

const abilities = abilitiesData as Record<string, KVValue>;
const heroMap = heroMapData as Record<string, string>;
const allModifiers: string[] = Object.values(modifiersData as Record<string, string[]>).flat();

function getBaseUrl(): string {
  // In the VS Code webview the asset base is the webview URI of the extension root
  // (injected by the provider as window.__ASSET_BASE__) so `${base}images/spellicons/...`
  // resolves to the extension's bundled icon assets. Falls back to "/" if unset.
  return (typeof window !== "undefined" && (window as any).__ASSET_BASE__) || "/";
}

function findModifiers(abilityName: string): string[] {
  // Items: match modifier_<itemBase> or modifier_<itemFull>
  if (abilityName.startsWith("item_")) {
    const itemBase = abilityName.replace("item_", "");
    return allModifiers.filter(
      (m) => m.includes(`modifier_${itemBase}`) || m.includes(`modifier_${abilityName}`),
    );
  }

  // Hero abilities: try the full ability name AND the suffix without the
  // hero prefix (e.g. "ancient_apparition_ice_blast" → also match "modifier_ice_blast").
  const candidates: string[] = [`modifier_${abilityName}`];
  const hero = heroMap[abilityName];
  if (hero && abilityName.startsWith(hero + "_")) {
    const suffix = abilityName.substring(hero.length + 1);
    if (suffix.length >= 4) candidates.push(`modifier_${suffix}`);
  }

  return allModifiers.filter((m) =>
    candidates.some((c) => m === c || m.startsWith(c + "_") || m.endsWith("_" + c)),
  );
}

const modifierCache = new Map<string, string[]>();
function getModifiers(abilityName: string): string[] {
  if (!modifierCache.has(abilityName)) modifierCache.set(abilityName, findModifiers(abilityName));
  return modifierCache.get(abilityName)!;
}

interface AbilityEntry {
  name: string;
  category: string;
  kv: KVObject | string;
}

const specialCategories = ["items", "talents", "generic", "seasonal", "other"];

export const allAbilities: AbilityEntry[] = Object.entries(abilities)
  .map(([name, kv]) => {
    let category: string;
    if (name.startsWith("special_bonus_")) category = "talents";
    else if (name.startsWith("item_")) category = "items";
    else if (name.startsWith("seasonal_")) category = "seasonal";
    else if (name.startsWith("ability_") || name === "default_attack" || name === "attribute_bonus") category = "generic";
    else if (name.startsWith("dota_base") || name.startsWith("dota_empty")) category = "generic";
    else if (heroMap[name]) category = heroMap[name];
    else category = "other";
    return { name, category, kv: kv as KVObject | string };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const categoryMap = new Map<string, number>();
for (const a of allAbilities) categoryMap.set(a.category, (categoryMap.get(a.category) || 0) + 1);

const categories = Array.from(categoryMap.entries())
  .map(([name, count]) => ({ name, count, isHero: !specialCategories.includes(name) }))
  .sort((a, b) => {
    if (a.isHero !== b.isHero) return a.isHero ? 1 : -1;
    return a.name.localeCompare(b.name);
  });

function formatCategoryName(name: string): string {
  return name
    .replace(/^npc_dota_hero_/, "")
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getAbilityIconUrl(abilityName: string): string {
  const base = getBaseUrl();
  if (abilityName.startsWith("item_")) {
    const itemName = abilityName.replace(/^item_/, "");
    return `${base}images/items/${itemName}_png.png`;
  }
  return `${base}images/spellicons/${abilityName}_png.png`;
}

function getHeroIconUrl(heroName: string): string {
  const base = getBaseUrl();
  return `${base}images/heroes/${heroName}.png`;
}

// --- KV Display (flat key-value rows, nested expand/collapse) ---

function KVValueRenderer({ value, depth = 0 }: { value: KVValue; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1);

  if (typeof value === "string" || typeof value === "number") {
    return <span style={{ color: "var(--color-text)", fontFamily: "monospace", fontSize: 12, wordBreak: "break-all" }}>{String(value)}</span>;
  }

  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value);
    if (entries.length === 0) return <span style={{ color: "var(--color-text)", fontFamily: "monospace", fontSize: 12 }}>{"{}"}</span>;

    return (
      <div>
        <span
          onClick={() => setExpanded(!expanded)}
          style={{ cursor: "pointer", color: "var(--color-highlight)", fontSize: 11, marginLeft: 4, userSelect: "none" }}
        >
          {expanded ? "[-]" : `[+] (${entries.length} fields)`}
        </span>
        {expanded && (
          <div style={{ marginLeft: 16, paddingLeft: 8, borderLeft: "1px solid var(--color-group-border)" }}>
            {entries.map(([k, v]) => (
              <div
                key={k}
                className="kv-row"
                style={{ display: "flex", padding: "2px 0", alignItems: "baseline" }}
              >
                <span style={{ color: "var(--color-text-faded)", minWidth: 220, flexShrink: 0, fontWeight: 500, fontFamily: "monospace", fontSize: 12 }}>
                  {k}
                </span>
                <KVValueRenderer value={v} depth={depth + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return <span style={{ color: "var(--color-text)", fontFamily: "monospace", fontSize: 12 }}>{String(value)}</span>;
}

// --- Copy Button ---

function CopyButton({ text, label, title }: { text: string; label?: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleCopy();
      }}
      title={title ?? (copied ? "Copied!" : "Copy KV to clipboard")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        width: label ? "auto" : 20,
        height: 20,
        padding: label ? "0 7px" : 0,
        background: copied ? "rgba(80, 200, 120, 0.2)" : "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 3,
        cursor: "pointer",
        color: copied ? "#50c878" : "var(--color-text-faded)",
        fontSize: 11,
        fontFamily: "monospace",
        transition: "all 0.15s ease",
        flexShrink: 0,
      }}
    >
      {label ? (
        copied ? "✓ copied" : label
      ) : copied ? (
        <svg width={10} height={10} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 8 7 12 13 4" />
        </svg>
      ) : (
        <svg width={10} height={10} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="5" width="9" height="9" rx="1" />
          <path d="M3 11V3a1 1 0 011-1h8" />
        </svg>
      )}
    </button>
  );
}

// --- KV to text for clipboard ---

function kvToText(obj: KVValue, indent: number = 0): string {
  const pad = "\t".repeat(indent);
  if (typeof obj === "string" || typeof obj === "number") return `"${obj}"`;
  if (typeof obj !== "object" || obj === null) return `"${obj}"`;
  const lines: string[] = ["{"];
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      lines.push(`${pad}\t"${key}"`);
      lines.push(`${pad}\t${kvToText(value, indent + 1)}`);
    } else {
      lines.push(`${pad}\t"${key}"\t\t"${value}"`);
    }
  }
  lines.push(`${pad}}`);
  return lines.join("\n");
}

// --- Ability Item ---

export function AbilityItem({ ability }: { ability: AbilityEntry }) {
  const [expanded, setExpanded] = useState(false);
  const kv = ability.kv;
  const isItem = ability.name.startsWith("item_");

  const copyText = useMemo(() => {
    if (typeof kv === "object") return `"${ability.name}"\n${kvToText(kv, 0)}`;
    return `"${ability.name}"\t\t"${kv}"`;
  }, [ability.name, kv]);

  const iconUrl = getAbilityIconUrl(ability.name);
  const modifiers = expanded ? getModifiers(ability.name) : [];

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        backgroundColor: "#1a1a2e",
        border: "1px solid var(--color-group-border)",
        borderRadius: 4,
        boxShadow: "2px 2px 6px var(--color-group-shadow)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          padding: "8px 12px",
          userSelect: "none",
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--color-text-faded)",
            flexShrink: 0,
            width: 16,
            textAlign: "center",
            fontFamily: "monospace",
          }}
        >
          {expanded ? "\u25BC" : "\u25B6"}
        </span>

        <img
          src={iconUrl}
          alt=""
          style={{
            width: 24,
            height: 24,
            borderRadius: isItem ? 2 : 3,
            flexShrink: 0,
            background: "#0e0e1a",
            objectFit: "cover",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />

        <code
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--color-highlight)",
            wordBreak: "break-word",
          }}
        >
          {ability.name}
        </code>

        <CopyButton text={ability.name} label="name" title="Copy ability name" />
        <CopyButton text={copyText} title="Copy KV to clipboard" />
      </div>

      {/* Expanded content */}
      {expanded && (
        <div
          style={{
            padding: "0 12px 10px 12px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Modifiers */}
          {modifiers.length > 0 && (
            <div style={{ marginTop: 8, marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--color-text-faded)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Modifiers
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
                {modifiers.map((m) => (
                  <div key={m} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <code
                      style={{
                        fontSize: 11,
                        padding: "2px 8px",
                        borderRadius: 3,
                        background: "rgba(255,255,255,0.06)",
                        color: "#abb2bf",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {m}
                    </code>
                    <CopyButton text={m} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KV data */}
          {typeof kv === "object" && (() => {
            // Keys rendered as their own collapsible-style KV block (raw KV text + copy),
            // the way AbilityValues is — instead of inline flat rows.
            const blockKeys = new Set(["AbilityValues", "ItemRequirements"]);
            const isBlock = ([key, value]: [string, KVValue]) =>
              blockKeys.has(key) && typeof value === "object" && value !== null;
            const entries = Object.entries(kv);
            const blocks = entries.filter(isBlock);
            const rest = entries.filter((entry) => !isBlock(entry));
            return (
              <div style={{ marginTop: 6, overflowX: "auto" }}>
                {rest.map(([k, v]) => (
                  <div
                    key={k}
                    className="kv-row"
                    style={{ display: "flex", padding: "2px 0", alignItems: "baseline" }}
                  >
                    <span style={{ color: "var(--color-text-faded)", minWidth: 220, flexShrink: 0, fontWeight: 500, fontFamily: "monospace", fontSize: 12 }}>
                      {k}
                    </span>
                    <KVValueRenderer value={v} depth={0} />
                  </div>
                ))}
                {blocks.map(([key, value]) => (
                  <div key={key} style={{ marginTop: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <span style={{ color: "var(--color-text-faded)", fontWeight: 500, fontFamily: "monospace", fontSize: 12 }}>
                        {key}
                      </span>
                      <CopyButton text={kvToText(value, 0)} />
                    </div>
                    <pre style={{ margin: 0, fontFamily: "monospace", fontSize: 12, color: "var(--color-text)", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                      {kvToText(value, 0)}
                    </pre>
                  </div>
                ))}
              </div>
            );
          })()}

          {typeof kv === "string" && (
            <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--color-text)", marginTop: 6 }}>
              {kv}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- Sidebar Link ---

function SidebarLink({
  href,
  active,
  children,
  icon,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  icon?: string;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState({}, "", href);
        notifySearchChange();
      }}
      style={{
        background: active ? "var(--color-sidebar-hover)" : "var(--color-sidebar)",
        borderBottom: active ? "3px solid var(--color-highlight)" : "3px solid transparent",
        borderRadius: 3,
        padding: "2px 4px 0 4px",
        textDecoration: "none",
        color: "var(--color-text)",
        fontWeight: active ? 600 : "normal",
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        marginBottom: 3,
      }}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          style={{
            width: 20,
            height: 20,
            borderRadius: 2,
            flexShrink: 0,
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      {children}
    </a>
  );
}

// --- Main Page ---

export function AbilitiesPage() {
  const [search, setSearch] = useState(() => getSearchFromUrl());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("category");
  });

  useEffect(() => {
    const handler = () => {
      setSearch(getSearchFromUrl());
      setSelectedCategory(new URLSearchParams(window.location.search).get("category"));
    };
    return subscribeToSearchChange(handler);
  }, []);

  const filteredAbilities = useMemo(() => {
    let filtered = allAbilities;
    if (selectedCategory) filtered = filtered.filter((a) => a.category === selectedCategory);
    if (search) {
      const query = search.replace(/\s+/g, "");
      filtered = filtered
        .map((a) => ({
          item: a,
          score: Math.min(fuzzyMatch(a.name, query), fuzzyMatch(a.category, query)),
        }))
        .filter((x) => isFinite(x.score))
        .sort((a, b) => a.score - b.score)
        .map((x) => x.item);
    }
    return filtered;
  }, [selectedCategory, search]);

  const base = getBaseUrl();

  return (
    <>
      <NavBar />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }} className="api-page-content">
        {/* Sidebar */}
        <div
          style={{
            width: 340,
            height: "100%",
            overflowY: "scroll",
            padding: "2px 12px",
            flexShrink: 0,
          }}
          className="api-sidebar"
        >
          {/* All */}
          <SidebarLink
            href={`${base}api/abilities`}
            active={!selectedCategory}
          >
            <span style={{ flex: 1 }}>All</span>
            <span style={{ fontSize: 11, color: "var(--color-text-faded)", flexShrink: 0 }}>
              {allAbilities.length}
            </span>
          </SidebarLink>

          {/* Special categories */}
          {categories
            .filter((c) => !c.isHero)
            .map((cat) => (
              <SidebarLink
                key={cat.name}
                href={`${base}api/abilities?category=${cat.name}`}
                active={selectedCategory === cat.name}
              >
                <span style={{ flex: 1 }}>{formatCategoryName(cat.name)}</span>
                <span style={{ fontSize: 11, color: "var(--color-text-faded)", flexShrink: 0 }}>
                  {cat.count}
                </span>
              </SidebarLink>
            ))}

          {/* Divider */}
          <div
            style={{
              borderTop: "1px solid var(--color-group-border)",
              margin: "8px 0",
            }}
          />

          {/* Hero categories with icons */}
          {categories
            .filter((c) => c.isHero)
            .map((cat) => (
              <SidebarLink
                key={cat.name}
                href={`${base}api/abilities?category=${cat.name}`}
                active={selectedCategory === cat.name}
                icon={getHeroIconUrl(cat.name)}
              >
                <span style={{ flex: 1 }}>{formatCategoryName(cat.name)}</span>
                <span style={{ fontSize: 11, color: "var(--color-text-faded)", flexShrink: 0 }}>
                  {cat.count}
                </span>
              </SidebarLink>
            ))}
        </div>

        {/* Main content */}
        <main
          className="api-content-main"
          style={{
            flex: 1,
            display: "flex",
            flexFlow: "column",
            minHeight: 0,
            overflowY: "auto",
            padding: "0 0 0 24px",
          }}
        >
          <div style={{ padding: "0 12px" }}>
            <SearchBox baseUrl="/abilities" />
          </div>

          {/* Category header when filtered */}
          {selectedCategory && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 18px",
                borderBottom: "1px solid var(--color-group-border)",
              }}
            >
              {categories.find((c) => c.name === selectedCategory)?.isHero && (
                <img
                  src={getHeroIconUrl(selectedCategory)}
                  alt=""
                  style={{ width: 32, height: 32, borderRadius: 3 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <span style={{ fontSize: 18, fontWeight: 700, color: "var(--color-text)" }}>
                {formatCategoryName(selectedCategory)}
              </span>
              <span style={{ fontSize: 13, color: "var(--color-text-faded)" }}>
                {filteredAbilities.length} abilities
              </span>
            </div>
          )}

          {!search && !selectedCategory ? (
            <>
              <div style={{ marginTop: 50, alignSelf: "center", fontSize: 24, textAlign: "center", color: "var(--color-text-faded)" }}>
                Use the search bar or select a category from the sidebar
              </div>
            </>
          ) : filteredAbilities.length > 0 ? (
            <ScrollableList
              data={filteredAbilities}
              render={(a) => (
                <div key={a.name} style={{ padding: "4px 12px" }}>
                  <AbilityItem ability={a} />
                </div>
              )}
            />
          ) : (
            <div style={{ marginTop: 50, alignSelf: "center", fontSize: 42, textAlign: "center" }}>
              No results found
            </div>
          )}
        </main>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .api-sidebar { width: 200px !important; }
        }
        @media (max-width: 768px) {
          .api-sidebar {
            width: 100% !important;
            max-height: 40vh;
            border-bottom: 1px solid var(--color-group-border);
          }
          .api-page-content { flex-direction: column; }
        }
        .kv-row:hover {
          background: var(--color-sidebar);
          border-radius: 2px;
        }
        @media (max-width: 768px) {
          .kv-row > span:first-child { min-width: 120px !important; }
        }
      `}</style>
    </>
  );
}

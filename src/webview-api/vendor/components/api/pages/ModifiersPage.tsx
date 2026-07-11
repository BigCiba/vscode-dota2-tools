import React, { useMemo, useState, useEffect } from "react";
import modifiersData from "@moddota/dota-data/files/vscripts/modifier_list.json";
import { ScrollableList, LazyList } from "../Lists";
import { SearchBox, getSearchFromUrl, subscribeToSearchChange } from "../Search";
import { NavBar } from "../layout/NavBar";

const modifiers = modifiersData as Record<string, string[]>;
const specialCategories = ["generic", "neutral", "event", "items", "other", "special_bonus", "roshan", "rune"];

const categories = Object.entries(modifiers)
  .map(([name, items]) => ({ name, count: items.length, isHero: !specialCategories.includes(name) }))
  .sort((a, b) => { if (a.isHero !== b.isHero) return a.isHero ? 1 : -1; return a.name.localeCompare(b.name); });

export const allModifiers = Object.entries(modifiers)
  .flatMap(([category, names]) => names.map((name) => ({ name, category })))
  .sort((a, b) => a.name.localeCompare(b.name));

function getIconUrl(category: string, base: string): string | null {
  if (category === "other") return null;
  return `${base}images/heroes/${category}.png`;
}

function formatCategoryName(name: string): string {
  return name.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export function renderItem(modifier: { name: string; category: string }, style?: React.CSSProperties) {
  return (
    <div style={{ padding: 6, ...style }} key={`${modifier.category}-${modifier.name}`}>
      <div style={{ backgroundColor: "var(--color-group)", border: "1px solid var(--color-group-border)", borderRadius: 4, boxShadow: "2px 2px 6px var(--color-group-shadow)", padding: "6px 10px" }}>
        <code style={{ fontSize: 14, fontWeight: 600 }}>{modifier.name}</code>
      </div>
    </div>
  );
}

export function ModifiersPage() {
  const [search, setSearch] = useState(() => getSearchFromUrl());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("category");
  });

  useEffect(() => {
    const handler = () => { setSearch(getSearchFromUrl()); setSelectedCategory(new URLSearchParams(window.location.search).get("category")); };
    return subscribeToSearchChange(handler);
  }, []);

  const filtered = useMemo(() => {
    let f = allModifiers;
    if (selectedCategory) f = f.filter((m) => m.category === selectedCategory);
    if (search) { const q = search.toLowerCase(); f = f.filter((m) => m.name.toLowerCase().includes(q)); }
    return f;
  }, [search, selectedCategory]);

  const isSearching = !!search || !!selectedCategory;
  // Webview asset base (extension root) injected by the provider; only used for the
  // hero-icon sidebar that the all-search view doesn't render, so any value is harmless.
  const base = (typeof window !== "undefined" && (window as any).__ASSET_BASE__) || "/";

  return (
    <>
      <NavBar />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }} className="api-page-content">
        <div style={{ width: 340, height: "100%", overflowY: "scroll", padding: "2px 12px" }} className="api-sidebar">
          <SidebarLink href={`${base}api/modifiers`} active={!selectedCategory}>All <Badge>{allModifiers.length}</Badge></SidebarLink>
          {categories.filter((c) => !c.isHero).map((cat, i, arr) => {
            const iconUrl = getIconUrl(cat.name, base);
            return (
              <React.Fragment key={cat.name}>
                <SidebarLink href={`${base}api/modifiers?category=${cat.name}`} active={selectedCategory === cat.name}>
                  {iconUrl && <HeroIcon src={iconUrl} />}
                  {formatCategoryName(cat.name)} <Badge>{cat.count}</Badge>
                </SidebarLink>
                {i === arr.length - 1 && <div style={{ borderTop: "1px solid var(--color-group-border)", margin: "6px 0" }} />}
              </React.Fragment>
            );
          })}
          {categories.filter((c) => c.isHero).map((cat) => {
            const iconUrl = getIconUrl(cat.name, base);
            return (
              <SidebarLink key={cat.name} href={`${base}api/modifiers?category=${cat.name}`} active={selectedCategory === cat.name}>
                {iconUrl && <HeroIcon src={iconUrl} />}
                {formatCategoryName(cat.name)} <Badge>{cat.count}</Badge>
              </SidebarLink>
            );
          })}
        </div>
        <main style={{ flex: 1, display: "flex", flexFlow: "column", minHeight: 0, overflowY: "auto", padding: "0 0 0 24px" }}>
          <SearchBox baseUrl="/modifiers" />
          {!search && !selectedCategory ? (
            <>
              <div style={{ marginTop: 50, alignSelf: "center", fontSize: 24, textAlign: "center", color: "var(--color-text-faded)" }}>
                Use the search bar or select a category from the sidebar
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

function HeroIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      style={{
        width: 20,
        height: 20,
        objectFit: "contain",
        borderRadius: 2,
        flexShrink: 0,
      }}
    />
  );
}

function SidebarLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return <a href={href} style={{ background: active ? "var(--color-sidebar-hover)" : "var(--color-sidebar)", borderBottom: active ? "3px solid var(--color-highlight)" : "3px solid transparent", borderRadius: 3, padding: "2px 4px 0 4px", textDecoration: "none", color: "var(--color-text)", fontWeight: active ? 600 : "normal", display: "flex", alignItems: "center", gap: 4, fontSize: 13, marginBottom: 3 }}>{children}</a>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--color-text-faded)", fontWeight: "normal" }}>{children}</span>;
}

import React, { useCallback, useEffect, useRef } from "react";
import { notifySearchChange } from "./Search";

export function HashScrollHandler() {
  const didScroll = useRef(false);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== "#") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView();
    }
    didScroll.current = true;
  }, []);

  useEffect(() => {
    const handler = () => {
      const hash = window.location.hash;
      if (hash && hash !== "#") {
        document.querySelector(hash)?.scrollIntoView();
      }
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return null;
}

export function useLinkedElement(root: string, { scope, hash }: { scope?: string; hash?: string }) {
  const urlHash = hash ? `#${hash}` : "";
  const path = typeof window !== "undefined" ? window.location.pathname : "";
  const currentHash = typeof window !== "undefined" ? window.location.hash : "";
  // Match on the scope part of the URL
  return scope !== undefined && path.endsWith(`/${scope}`) && currentHash === urlHash;
}

export function ElementLink({ root, scope, hash }: { root: string; scope: string; hash?: string }) {
  const base = typeof window !== "undefined" ? document.querySelector("base")?.getAttribute("href") || "" : "";
  const urlHash = hash ? `#${hash}` : "";
  const href = `${base}api${root}/${scope}${urlHash}`;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      window.history.pushState({}, "", href);
      notifySearchChange();
    },
    [href],
  );

  return (
    <a
      href={href}
      onClick={handleClick}
      title="Link"
      style={{
        marginRight: 2,
        fontSize: 24,
        lineHeight: 1,
        textDecoration: "none",
        color: "var(--color-text)",
        userSelect: "none",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      #
    </a>
  );
}

import React from "react";

export type ColoredSyntaxKind = "literal" | "interface" | "parameter" | "nil";

const cssVarMap: Record<ColoredSyntaxKind, string> = {
  literal: "var(--color-syntax-literal)",
  interface: "var(--color-syntax-interface)",
  parameter: "var(--color-syntax-parameter)",
  nil: "var(--color-syntax-nil)",
};

export function getSyntaxColorFor(kind: ColoredSyntaxKind): string {
  return cssVarMap[kind];
}

export function ColoredSyntax({ kind, children }: { kind: ColoredSyntaxKind; children: React.ReactNode }) {
  return <span style={{ color: cssVarMap[kind] }}>{children}</span>;
}

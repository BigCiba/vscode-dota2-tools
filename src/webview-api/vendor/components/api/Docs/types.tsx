import * as api from "./api";
import React, { useMemo, useContext, useCallback } from "react";
import { ColoredSyntax, getSyntaxColorFor } from "../ColoredSyntax";
import type { ColoredSyntaxKind } from "../ColoredSyntax";
import { assertNever, intersperse } from "../../../utils/types";
import { DeclarationsContext } from "./DeclarationsContext";
import { notifySearchChange } from "../Search";

export const Types: React.FC<{ types: api.Type[] }> = ({ types }) => (
  <>
    {intersperse(
      types.map((type, index) => <Type key={index} type={type} />),
      " | ",
    )}
  </>
);

const Type: React.FC<{ type: api.Type }> = ({ type }) => {
  if (typeof type === "string") return <ReferenceType name={type} />;
  switch (type.kind) {
    case "array":
      return <ArrayType type={type} />;
    case "function":
      return <FunctionType type={type} />;
    case "literal":
      return <LiteralType type={type} />;
    case "table":
      return <TableType type={type} />;
    default:
      assertNever(type);
  }
};

const ReferenceType: React.FC<{ name: string }> = ({ name }) => {
  const { declarations } = useContext(DeclarationsContext);
  const [kind, scope, hash] = useMemo((): [ColoredSyntaxKind, string?, string?] => {
    if (name === "nil") return ["nil"];

    const type = declarations.find((declaration) => declaration.name == name);
    if (!type) return ["literal"];

    return [
      "interface",
      type.kind === "class" || type.kind === "enum"
        ? name
        : type.kind === "constant"
          ? "constants"
          : type.kind === "function"
            ? "functions"
            : undefined,
      type.kind === "constant" || type.kind === "function" ? name : undefined,
    ];
  }, [name]);

  const urlHash = hash ? `#${hash}` : "";
  const style: React.CSSProperties = { textDecorationColor: getSyntaxColorFor(kind) };
  const { root } = useContext(DeclarationsContext);
  const base = typeof window !== "undefined" ? document.querySelector("base")?.getAttribute("href") || "" : "";
  const href = `${base}api${root}/${scope}${urlHash}`;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      window.history.pushState({}, "", href);
      notifySearchChange();
    },
    [href],
  );

  return scope ? (
    <a href={href} onClick={handleClick} style={{ fontWeight: 600, ...style }}>
      <ColoredSyntax kind={kind}>{name}</ColoredSyntax>
    </a>
  ) : (
    <span style={{ fontWeight: 600 }}>
      <ColoredSyntax kind={kind}>{name}</ColoredSyntax>
    </span>
  );
};

const LiteralType: React.FC<{ type: api.LiteralType }> = ({ type: { value } }) => (
  <span style={{ fontWeight: 600 }}>
    <ColoredSyntax kind="literal">{value}</ColoredSyntax>
  </span>
);

const ArrayType: React.FC<{ type: api.ArrayType }> = ({ type: { types } }) => (
  <span style={{ fontWeight: 600 }}>
    [<Types types={types} />]
  </span>
);

const TableType: React.FC<{ type: api.TableType }> = ({ type: { key, value } }) => (
  <span style={{ fontWeight: 600 }}>
    {"{"} [<Types types={key} />]: <Types types={value} /> {"}"}
  </span>
);

const FunctionType: React.FC<{ type: api.FunctionType }> = ({ type: { args, returns } }) => (
  <span style={{ fontWeight: 600 }}>
    <FunctionParameters args={args} /> → <Types types={returns} />
  </span>
);

export function FunctionParameters({ args }: { args: api.FunctionParameter[] }) {
  return (
    // The card wrapper sets word-break:break-all so long identifiers don't overflow, but for a
    // many-argument signature that shreds names mid-word. Reset it here so the line wraps at the
    // ", " between arguments instead; each "name: type" stays intact thanks to the &nbsp;.
    <span style={{ wordBreak: "normal", overflowWrap: "break-word" }}>
      (
      {intersperse(
        args.map((arg) => <FunctionParameter key={arg.name} {...arg} />),
        ", ",
      )}
      )
    </span>
  );
}

const FunctionParameter: React.FC<{ name: string; types: api.Type[] }> = ({ name, types }) => (
  <span style={{ fontWeight: "normal" }}>
    <ColoredSyntax kind="parameter">{name}</ColoredSyntax>:&nbsp;
    <Types types={types} />
  </span>
);

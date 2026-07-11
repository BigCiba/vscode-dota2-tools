import * as api from "./api";
import React, { useMemo, useContext } from "react";
import { getReferencesForFunction } from "./utils/filtering";
import { ObjectType } from "./ObjectType";
import { KindIcon, SearchOnGitHub, useLinkedElement } from "./utils/components";
import { CommonGroupWrapper, CommonGroupHeader, CommonGroupSignature, ElementBadges, OptionalDescription } from "./utils/styles";
import { FunctionParameters, Types } from "./types";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { DeclarationsContext } from "./DeclarationsContext";

export const FunctionDeclaration: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  context?: string;
  declaration: api.ClassMethod;
}> = ({ className, style, context, declaration }) => {
  const { root } = useContext(DeclarationsContext);
  const isPanorama = root.includes("/panorama");
  const searchPath = isPanorama ? "panorama" : "vscripts";

  const objectReferences = useMemo(
    () => getReferencesForFunction(declaration).map((x) => <ObjectType key={x.name} declaration={x} />),
    [declaration],
  );

  const parameterDescriptions = useMemo(
    () =>
      declaration.args
        .filter((arg) => arg.description)
        .map((arg) => (
          <li key={arg.name} style={{ listStyle: "none", marginLeft: 20, marginBottom: 6, padding: 2, fontSize: 13 }}>
            <span style={{ fontWeight: 600 }}>{arg.name}</span>: {arg.description}
          </li>
        )),
    [declaration],
  );

  const isLinked = useLinkedElement({ scope: context, hash: declaration.name });

  return (
    <CommonGroupWrapper className={className} style={{ padding: "2px 5px", ...style }} id={declaration.name} isLinked={isLinked}>
      <CommonGroupHeader>
        <CommonGroupSignature style={{ marginBottom: 3 }}>
          <KindIcon kind="function" size="big" />
          {declaration.broken && (
            <span
              style={{ color: "#e8912d", fontWeight: "bold", cursor: "help" }}
              title="This property may not work"
            >
              *{" "}
            </span>
          )}
          {declaration.name}
          {declaration.abstract && (
            <span title="Abstract: this method does not exist on the class, but it can be implemented on subclass">?</span>
          )}
          <FunctionParameters args={declaration.args} />
          :&nbsp;
          <Types types={declaration.returns} />
        </CommonGroupSignature>
        <ElementBadges>
          {declaration.available && <AvailabilityBadge available={declaration.available} />}
          <SearchOnGitHub name={declaration.name} searchPath={searchPath} />
        </ElementBadges>
      </CommonGroupHeader>
      {objectReferences.length > 0 && (
        <div style={{ margin: "8px 25px 7px 25px" }}>
          {objectReferences.map((ref, i) => (
            <div key={i} style={{ marginBottom: 7 }}>{ref}</div>
          ))}
        </div>
      )}
      <OptionalDescription
        description={
          (declaration.description || parameterDescriptions.length > 0) && (
            <>
              {parameterDescriptions}
              {declaration.description}
            </>
          )
        }
      />
    </CommonGroupWrapper>
  );
};

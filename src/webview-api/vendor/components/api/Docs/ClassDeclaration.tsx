import * as api from "./api";
import React from "react";
import { Field } from "./Field";
import { FunctionDeclaration } from "./FunctionDeclaration";
import { KindIcon, useLinkedElement } from "./utils/components";
import { CommonGroupWrapper, CommonGroupHeader, CommonGroupSignature, CommonGroupMembers, ElementBadges, OptionalDescription } from "./utils/styles";
import { Types } from "./types";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { ReferencesLink } from "./ReferencesLink";

export const ClassDeclaration: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  declaration: api.ClassDeclaration;
}> = ({ className, style, declaration }) => {
  const isLinked = useLinkedElement({ scope: declaration.name });
  return (
  <CommonGroupWrapper className={className} style={style} id={declaration.name} isLinked={isLinked}>
    <CommonGroupHeader style={{ padding: 5 }}>
      <CommonGroupSignature>
        <KindIcon kind="class" size="big" />
        <span style={{ fontSize: 24, fontWeight: 600 }}>{declaration.name}</span>
        &nbsp;
        {declaration.instance && declaration.instance !== declaration.name && (
          <span style={{ fontSize: 14, fontWeight: "normal", color: "var(--color-text-dim)" }}>
            instance{" "}
            <span style={{ fontFamily: "monospace", color: "var(--color-text)" }}>{declaration.instance}</span>
            &nbsp;
          </span>
        )}
        {declaration.extend && (
          <span style={{ fontSize: 14, fontWeight: "normal", color: "var(--color-text-dim)" }}>
            extends <Types types={[declaration.extend]} />
          </span>
        )}
      </CommonGroupSignature>
      <ElementBadges>
        <ReferencesLink name={declaration.name} />
        <AvailabilityBadge available={declaration.clientName != null ? "both" : "server"} />
      </ElementBadges>
    </CommonGroupHeader>
    <OptionalDescription description={declaration.description} />
    {declaration.members.some((m) => m.kind === "function" && (m as api.ClassMethod).broken) && (
      <div style={{ padding: "4px 10px", fontSize: 12, color: "var(--color-text-dim)", fontStyle: "italic" }}>
        Property marked with * may not work
      </div>
    )}
    {declaration.members.length > 0 && (
      <CommonGroupMembers style={{ padding: 8 }}>
        {declaration.members.map((member) => (
          <div key={member.name} style={{ marginBottom: 14 }}>
            {member.kind === "field" ? (
              <Field element={member} context={declaration.name} />
            ) : (
              <FunctionDeclaration declaration={member} context={declaration.name} />
            )}
          </div>
        ))}
      </CommonGroupMembers>
    )}
  </CommonGroupWrapper>
  );
};

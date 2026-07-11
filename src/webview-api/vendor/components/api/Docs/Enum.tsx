import * as api from "./api";
import React from "react";
import { ColoredSyntax } from "../ColoredSyntax";
import { KindIcon, useLinkedElement } from "./utils/components";
import { CommonGroupWrapper, CommonGroupHeader, CommonGroupSignature, CommonGroupMembers, ElementBadges, OptionalDescription } from "./utils/styles";
import { ReferencesLink } from "./ReferencesLink";

const EnumMember: React.FC<api.EnumMember> = (props) => (
  <CommonGroupWrapper style={{ padding: "2px 5px" }}>
    <CommonGroupHeader>
      <CommonGroupSignature>
        {props.broken && (
          <span
            style={{ color: "#e8912d", fontWeight: "bold", cursor: "help" }}
            title="This property may not work"
          >
            *{" "}
          </span>
        )}
        {props.overflow && (
          <span
            style={{ color: "#e8912d", fontWeight: "bold", cursor: "help" }}
            title="Value exceeds 2^31. In Lua this is 0 — use the enum name in KV files instead."
          >
            *{" "}
          </span>
        )}
        {props.name} = <ColoredSyntax kind="literal">{props.value}</ColoredSyntax>
      </CommonGroupSignature>
    </CommonGroupHeader>
    <OptionalDescription description={props.description} />
  </CommonGroupWrapper>
);

export const Enum: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  element: api.Enum;
}> = ({ className, style, element }) => {
  const isLinked = useLinkedElement({ scope: element.name });
  return (
  <CommonGroupWrapper className={className} style={style} id={element.name} isLinked={isLinked}>
    <CommonGroupHeader style={{ padding: 5 }}>
      <CommonGroupSignature>
        <KindIcon kind="enum" size="big" />
        {element.name}
      </CommonGroupSignature>
      <ElementBadges>
        <ReferencesLink name={element.name} />
      </ElementBadges>
    </CommonGroupHeader>
    <OptionalDescription description={element.description} />
    {element.members.some((m) => m.broken) && (
      <div style={{ padding: "4px 10px", fontSize: 12, color: "var(--color-text-dim)", fontStyle: "italic" }}>
        Property marked with * may not work
      </div>
    )}
    {element.members.length > 0 && (
      <CommonGroupMembers>
        {element.members.map((member) => (
          <div key={member.name} style={{ marginBottom: 1 }}>
            <EnumMember {...member} />
          </div>
        ))}
      </CommonGroupMembers>
    )}
  </CommonGroupWrapper>
  );
};

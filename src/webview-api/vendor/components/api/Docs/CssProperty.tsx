import * as api from "./api";
import React from "react";
import { KindIcon, useLinkedElement } from "./utils/components";
import { CommonGroupWrapper, CommonGroupHeader, CommonGroupSignature, OptionalDescription } from "./utils/styles";

export const CssProperty: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  element: api.CssProperty;
}> = ({ className, style, element }) => {
  const isLinked = useLinkedElement({ scope: "properties", hash: element.name });

  return (
    <CommonGroupWrapper className={className} style={{ padding: "2px 5px", ...style }} id={element.name} isLinked={isLinked}>
      <CommonGroupHeader>
        <CommonGroupSignature style={{ marginBottom: 3 }}>
          <KindIcon kind="function" size="big" />
          {element.name}
        </CommonGroupSignature>
      </CommonGroupHeader>
      <OptionalDescription description={element.description} />
      {element.examples.length > 0 && (
        <div
          style={{
            margin: "4px 0 0 28px",
            padding: "6px 0",
            borderTop: "1px solid var(--color-group-separator)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {element.examples.map((example, i) => (
            <code
              key={i}
              style={{
                display: "block",
                fontSize: 13,
                color: "var(--color-text)",
                backgroundColor: "var(--color-group-members)",
                padding: "4px 8px",
                borderRadius: 3,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {example}
            </code>
          ))}
        </div>
      )}
    </CommonGroupWrapper>
  );
};

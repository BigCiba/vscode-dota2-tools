import * as api from "./api";
import React from "react";
import { KindIcon, useLinkedElement } from "./utils/components";
import { CommonGroupWrapper, CommonGroupHeader, CommonGroupSignature, OptionalDescription } from "./utils/styles";

export function Constant({
  className,
  style,
  element,
}: {
  className?: string;
  style?: React.CSSProperties;
  element: api.Constant;
}) {
  const isLinked = useLinkedElement({ scope: "constants", hash: element.name });
  return (
    <CommonGroupWrapper className={className} style={{ padding: 5, ...style }} id={element.name} isLinked={isLinked}>
      <CommonGroupHeader>
        <CommonGroupSignature style={{ fontSize: 20 }}>
          <KindIcon kind="constant" size="medium" />
          {element.name}:&nbsp;{element.value}
        </CommonGroupSignature>
      </CommonGroupHeader>
      <OptionalDescription description={element.description} />
    </CommonGroupWrapper>
  );
}

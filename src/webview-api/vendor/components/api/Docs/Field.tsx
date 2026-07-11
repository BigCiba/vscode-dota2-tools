import * as api from "./api";
import apiTypes from "@moddota/dota-data/files/vscripts/api-types";
import React from "react";
import { KindIcon, useLinkedElement } from "./utils/components";
import { CommonGroupWrapper, CommonGroupHeader, CommonGroupSignature } from "./utils/styles";
import { Types } from "./types";

export const Field: React.FC<{
  className?: string;
  context?: string;
  element: api.Field | apiTypes.ObjectField;
}> = ({ className, context, element }) => {
  const isLinked = useLinkedElement({ scope: context, hash: element.name });
  return (
    <CommonGroupWrapper className={className} id={element.name} isLinked={isLinked} style={{ padding: 4 }}>
      <CommonGroupHeader>
        <CommonGroupSignature>
          <KindIcon kind="field" size="small" />
          {element.name}
          {element.types.includes("nil") && "?"}: <Types types={element.types.filter((x) => x !== "nil")} />
        </CommonGroupSignature>
      </CommonGroupHeader>
    </CommonGroupWrapper>
  );
};

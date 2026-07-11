import apiTypes from "@moddota/dota-data/files/vscripts/api-types";
import React from "react";
import { Field } from "./Field";
import { KindIcon } from "./utils/components";
import { CommonGroupWrapper, CommonGroupMembers } from "./utils/styles";

export const ObjectType: React.FC<{
  className?: string;
  declaration: apiTypes.Object;
}> = ({ className, declaration }) => (
  <CommonGroupWrapper className={className}>
    <div style={{ fontSize: 12, padding: 4 }}>
      <KindIcon kind="interface" size="small" />
      <span style={{ fontWeight: 600 }}>{declaration.name}</span>
      {declaration.extend && <> extends {declaration.extend.join(", ")}</>}
    </div>
    {declaration.description && <div style={{ fontSize: 14, margin: "5px 20px" }}>{declaration.description}</div>}
    {declaration.fields.length > 0 && (
      <CommonGroupMembers style={{ fontSize: 12 }}>
        {declaration.fields.map((field) => (
          <div key={field.name} style={{ marginBottom: 3 }}>
            <Field element={field} />
          </div>
        ))}
      </CommonGroupMembers>
    )}
  </CommonGroupWrapper>
);

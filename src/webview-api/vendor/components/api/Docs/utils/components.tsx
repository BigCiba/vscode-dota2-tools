import React, { useContext } from "react";
import { ElementLink as RawElementLink, useLinkedElement as useLinkedElementRaw } from "../../ElementLink";
import { KindIcon as UnstyledKindIcon } from "../../KindIcon";
import { DeclarationsContext } from "../DeclarationsContext";

export function useLinkedElement(options: { scope?: string; hash?: string }) {
  const { root } = useContext(DeclarationsContext);
  return useLinkedElementRaw(root, options);
}

export function ElementLink({ scope, hash }: { scope: string; hash?: string }) {
  const { root } = useContext(DeclarationsContext);
  return <RawElementLink root={root} scope={scope} hash={hash} />;
}

export const KindIcon: React.FC<{
  className?: string;
  kind: React.ComponentProps<typeof UnstyledKindIcon>["kind"];
  size: React.ComponentProps<typeof UnstyledKindIcon>["size"];
}> = (props) => <UnstyledKindIcon {...props} style={{ marginBottom: -4, marginRight: 4 }} />;

const searchWrapperStyle: React.CSSProperties = {
  display: "block",
  borderRadius: 3,
  backgroundColor: "#e6e6e6",
  lineHeight: 1,
  width: 20,
  height: 20,
  boxShadow: "1px 1px 1px #00000030",
  textAlign: "center",
};

export const SearchOnGitHub: React.FC<{ name: string; className?: string; searchPath?: string }> = ({
  name,
  className: cls,
  searchPath = "vscripts",
}) => {
  const searchTerm = cls ? `${cls}.${name}` : name;
  const query = encodeURIComponent(`${searchTerm} path:${searchPath}`);
  const href = `https://github.com/search?q=${query}&type=Code`;
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" title="Search on GitHub" style={searchWrapperStyle}>
      <svg width={16} height={16} viewBox="0 0 16 16" style={{ margin: 2 }}>
        <path
          fill="#333"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
    </a>
  );
};

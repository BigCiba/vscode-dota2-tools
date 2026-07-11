import React from "react";

const commonGroupBase: React.CSSProperties = {
  display: "flex",
  flexFlow: "column",
  backgroundColor: "var(--color-group)",
  border: "1px solid var(--color-group-border)",
  borderTopColor: "color-mix(in srgb, var(--color-group-border) 80%, white)",
  borderRadius: 4,
  boxShadow: "2px 2px 6px var(--color-group-shadow)",
  padding: 1,
  wordBreak: "break-all",
};

const linkedStyles: React.CSSProperties = {
  border: "3px solid var(--color-highlight)",
  boxShadow: "2px 2px 12px var(--color-group-shadow)",
  background: "linear-gradient(to right, color-mix(in srgb, var(--color-highlight) 15%, var(--color-group)), var(--color-group))",
};

export const CommonGroupWrapper: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  isLinked?: boolean;
  children: React.ReactNode;
}> = ({ className, style, id, isLinked, children }) => (
  <div
    className={className}
    id={id}
    style={{
      ...commonGroupBase,
      ...(isLinked ? linkedStyles : {}),
      ...style,
    }}
  >
    {children}
  </div>
);

export const CommonGroupMembers: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ className, style, children }) => (
  <div
    className={`group-members ${className || ""}`}
    style={{
      backgroundColor: "var(--color-group-members)",
      padding: "8px 8px 8px 30px",
      ...style,
    }}
  >
    {children}
  </div>
);

export const CommonGroupHeader: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ className, style, children }) => (
  <div
    className={`api-group-header ${className || ""}`}
    style={{
      display: "flex",
      ...style,
    }}
  >
    {children}
  </div>
);

export const CommonGroupSignature: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ className, style, children }) => (
  <div
    className={className}
    style={{
      flex: 1,
      fontWeight: 600,
      ...style,
    }}
  >
    {children}
  </div>
);

export const OptionalDescription: React.FC<{
  className?: string;
  description?: React.ReactNode;
}> = ({ className, description }) =>
  description ? (
    <div
      className={className}
      style={{
        margin: "4px 0 0 28px",
        padding: "6px 0",
        borderTop: "1px solid var(--color-group-separator)",
      }}
    >
      {description}
    </div>
  ) : null;

export const ElementBadges: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <div
    style={{
      alignSelf: "flex-start",
      display: "flex",
      alignItems: "center",
      gap: 5,
    }}
  >
    {children}
  </div>
);

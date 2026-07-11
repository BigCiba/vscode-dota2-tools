import React from "react";

export type IconKind = "class" | "enum" | "constant" | "field" | "interface" | "function" | "cssProperty";

// VS Code IntelliSense-style SVG icons (from old codebase)
const classSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><style>.a{opacity:0;fill:#f6f6f6}.b{fill:#f6f6f6}.c{fill:#c27d1a}</style><path class="a" d="M16 16H0V0h16v16z"/><path class="b" d="M16 6.586l-3-3L11.586 5H9.414l1-1-4-4h-.828L0 5.586v.828l4 4L6.414 8H7v5h1.586l3 3h.828L16 12.414v-.828L13.914 9.5 16 7.414v-.828z"/><path class="c" d="M13 10l2 2-3 3-2-2 1-1H8V7H6L4 9 1 6l5-5 3 3-2 2h5l1-1 2 2-3 3-2-2 1-1H9v4l2.999.002L13 10z"/></svg>`;

const enumItemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><style>.a{opacity:0;fill:#f6f6f6}.b{fill:#f6f6f6}.c{fill:#f0eff1}.d{fill:#00539c}</style><path class="a" d="M16 16H0V0h16v16z"/><path class="b" d="M0 15V6h6V2.586L7.585 1h6.829L16 2.586v5.829L14.414 10H10v5H0zm3-6z"/><path class="c" d="M8 3v3h5v1h-3v1h4V3H8zm5 2H9V4h4v1zM2 8v5h6V8H2zm5 3H3v-1h4v1z"/><path class="d" d="M10 6h3v1h-3V6zM9 4v1h4V4H9zm5-2H8L7 3v3h1V3h6v5h-4v1h4l1-1V3l-1-1zm-7 8H3v1h4v-1zm2-3v7H1V7h8zM8 8H2v5h6V8z"/></svg>`;

const fieldSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><style>.a{opacity:0;fill:#f6f6f6}.b{fill:#f6f6f6}.c{fill:#f0eff1}.d{fill:#00539c}</style><path class="a" d="M16 16H0V0h16v16z"/><path class="b" d="M0 10.736V4.5L9 0l7 3.5v6.236l-9 4.5-7-3.5z"/><path class="d" d="M9 1L1 5v5l6 3 8-4V4L9 1zM7 6.882L3.236 5 9 2.118 12.764 4 7 6.882z"/><path class="c" d="M9 2.118L12.764 4 7 6.882 3.236 5 9 2.118z"/></svg>`;

const interfaceSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><style>.a{opacity:0;fill:#f6f6f6}.b{fill:#f6f6f6}.c{fill:#f0eff1}.d{fill:#00539c}</style><path class="a" d="M16 16H0V0h16v16z"/><path class="b" d="M11.5 12c-1.915 0-3.602-1.241-4.228-3h-1.41a3.11 3.11 0 0 1-2.737 1.625C1.402 10.625 0 9.223 0 7.5s1.402-3.125 3.125-3.125c1.165 0 2.201.639 2.737 1.625h1.41c.626-1.759 2.313-3 4.228-3C13.981 3 16 5.019 16 7.5S13.981 12 11.5 12z"/><path class="c" d="M11.5 9A1.501 1.501 0 1 1 13 7.5c0 .826-.673 1.5-1.5 1.5z"/><path class="d" d="M11.5 4a3.49 3.49 0 0 0-3.45 3H5.185A2.122 2.122 0 0 0 1 7.5a2.123 2.123 0 1 0 4.185.5H8.05a3.49 3.49 0 0 0 3.45 3 3.5 3.5 0 1 0 0-7zm0 5c-.827 0-1.5-.673-1.5-1.5S10.673 6 11.5 6s1.5.673 1.5 1.5S12.327 9 11.5 9z"/></svg>`;

const methodSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><style>.a{opacity:0;fill:#f6f6f6}.b{fill:#f6f6f6}.c{fill:#f0eff1}.d{fill:#652d90}</style><path class="a" d="M16 16H0V0h16v16z"/><path class="b" d="M15 3.349v8.403L8.975 16H8.07L1 11.582V3.327L7.595 0h1.118L15 3.349z"/><path class="c" d="M12.715 4.398L8.487 7.02 3.565 4.272l4.578-2.309 4.572 2.435zM3 5.102l5 2.792v5.705l-5-3.125V5.102zm6 8.434V7.878l4-2.48v5.317l-4 2.821z"/><path class="d" d="M8.156.837L2 3.942v7.085L8.517 15.1 14 11.233V3.95L8.156.837zm4.559 3.561L8.487 7.02 3.565 4.272l4.578-2.309 4.572 2.435zM3 5.102l5 2.792v5.705l-5-3.125V5.102zm6 8.434V7.878l4-2.48v5.317l-4 2.821z"/></svg>`;

const iconSvgMap: Record<IconKind, string> = {
  class: classSvg,
  enum: enumItemSvg,
  constant: enumItemSvg,
  field: fieldSvg,
  interface: interfaceSvg,
  function: methodSvg,
  cssProperty: fieldSvg,
};

export const KindIcon: React.FC<{
  className?: string;
  kind: IconKind;
  size: "small" | "medium" | "big";
  style?: React.CSSProperties;
}> = React.memo(({ className, kind, size, style }) => {
  const s = size === "small" ? 16 : size === "medium" ? 20 : 24;
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: s,
        height: s,
        verticalAlign: kind === "interface" ? "middle" : "baseline",
        ...style,
      }}
      dangerouslySetInnerHTML={{ __html: iconSvgMap[kind] }}
    />
  );
});

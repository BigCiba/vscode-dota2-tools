import React from "react";
import type { Availability } from "./api";

function Badge({ color, active, label }: { color: string; active: boolean; label: string }) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        fontSize: 16,
        lineHeight: 1,
        width: 20,
        height: 20,
        textAlign: "center",
        userSelect: "none",
        background: `radial-gradient(${color}, ${color}88)`,
        color: "white",
        borderRadius: 3,
        fontWeight: "bold",
        textShadow: "1px 1px 1px black",
        boxShadow: active ? "1px 1px 1px #00000030" : "inset 0 0 10px rgba(0,0,0,0.7)",
        filter: active ? "none" : "saturate(10%)",
        opacity: active ? 1 : 0.4,
      }}
      title={`${active ? "Available" : "Unavailable"} on ${label === "s" ? "server" : "client"}-side Lua`}
    >
      {label}
    </div>
  );
}

export const AvailabilityBadge: React.FC<{ available: Availability }> = ({ available }) => {
  const onServer = available === "server" || available === "both";
  const onClient = available === "client" || available === "both";
  return (
    <>
      <Badge color="#5b82ee" active={onServer} label="s" />
      <Badge color="#59df37" active={onClient} label="c" />
    </>
  );
};

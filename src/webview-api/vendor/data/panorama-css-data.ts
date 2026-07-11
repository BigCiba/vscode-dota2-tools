import panoramaCss from "@moddota/dota-data/files/panorama/css";
import type { DeclarationsContextType } from "../components/api/Docs/DeclarationsContext";

export const panoramaCssScope: DeclarationsContextType = {
  root: "/panorama/css",
  declarations: Object.entries(panoramaCss)
    .map(([name, property]) => ({
      kind: "cssProperty" as const,
      name: name,
      description: property.description,
      isStarred: false,
      examples: property.examples || [],
    }))
    .sort((a, b) => a.name.localeCompare(b.name)),
};

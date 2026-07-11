import panoramaEvents from "@moddota/dota-data/files/panorama/events";
import type { DeclarationsContextType } from "../components/api/Docs/DeclarationsContext";

export const panoramaEventsScope: DeclarationsContextType = {
  root: "/panorama/events",
  declarations: Object.entries(panoramaEvents)
    .map(([name, event]) => ({
      kind: "function" as const,
      name: name,
      description: event.description,
      isStarred: false,
      args: event.args.map((arg) => ({
        name: arg.name,
        types: [arg.type],
      })),
      returns: ["void"],
    }))
    .sort((a, b) => a.name.localeCompare(b.name)),
};

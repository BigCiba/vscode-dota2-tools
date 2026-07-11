import { allData } from "@moddota/dota-data/lib/helpers/vscripts";
import type { DeclarationsContextType } from "../components/api/Docs/DeclarationsContext";

export const vscriptsScope: DeclarationsContextType = {
  root: "/vscripts",
  declarations: allData
    .map((declaration) => ({ ...declaration, isStarred: false }))
    .sort((a, b) => a.name.localeCompare(b.name)),
};

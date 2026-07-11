import panoramaApi from "@moddota/dota-data/files/panorama/api";
import panoramaEnums from "@moddota/dota-data/files/panorama/enums";
import type { DeclarationsContextType } from "../components/api/Docs/DeclarationsContext";

const getPanoramaApiOrder = (name: string) => (name === "$" ? -1 : name.startsWith("C") ? 0 : 1);
const cleanArgName = (name: string) => name.replace(/^_arg_/, "arg");

export const panoramaScope: DeclarationsContextType = {
  root: "/panorama/api",
  declarations: (() => {
    const apiDeclarations = panoramaApi.map((iface) => ({
      kind: "class" as const,
      name: iface.name,
      description: iface.description,
      isStarred: false,
      _order: getPanoramaApiOrder(iface.name),
      members: iface.members.map((member) => ({
        kind: "function" as const,
        name: member.name,
        description: member.description,
        args: member.args.map((arg) => ({
          name: cleanArgName(arg.name),
          types: arg.type ? [arg.type] : ["any"],
        })),
        returns: member.returns ? [member.returns] : ["void"],
      })),
    }));

    const enumDeclarations = panoramaEnums.map((declaration) => ({
      kind: "enum" as const,
      name: declaration.name,
      isStarred: false,
      _order: 2,
      members: declaration.members.map((member) => ({
        name: member.name,
        description: member.description,
        value: member.value,
      })),
    }));

    return [...apiDeclarations, ...enumDeclarations].sort((a, b) => {
      if (a._order !== b._order) return a._order - b._order;
      return a.name.localeCompare(b.name);
    });
  })(),
};

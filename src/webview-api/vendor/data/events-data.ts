import vscriptsEvents from "@moddota/dota-data/files/events";
import type { DeclarationsContextType } from "../components/api/Docs/DeclarationsContext";

const starredEventNames = [
  "dota_hero_inventory_item_change",
  "dota_player_update_selected_unit",
  "dota_player_update_query_unit",
  "dota_player_kill",
  "dota_ability_channel_finished",
  "dota_illusions_created",
  "dota_item_combined",
  "dota_item_picked_up",
  "dota_item_purchased",
  "dota_non_player_used_ability",
  "dota_npc_goal_reached",
  "dota_player_begin_cast",
  "dota_player_gained_level",
  "dota_player_learned_ability",
  "dota_player_pick_hero",
  "dota_player_selected_custom_team",
  "dota_player_take_tower_damage",
  "dota_player_used_ability",
  "dota_rune_activated_server",
  "dota_team_kill_credit",
  "dota_tower_kill",
  "entity_hurt",
  "entity_killed",
  "game_rules_state_change",
  "last_hit",
  "npc_spawned",
  "player_chat",
  "player_connect",
  "player_connect_full",
  "player_disconnect",
  "player_reconnected",
  "tree_cut",
];

export const eventsScope: DeclarationsContextType = {
  root: "/events",
  declarations: vscriptsEvents
    .map((event) => ({
      kind: "function" as const,
      name: event.name,
      description: event.description,
      args: event.fields.map((field) => ({
        name: field.name,
        description: field.description,
        types: [field.type],
      })),
      isStarred: starredEventNames.includes(event.name),
      returns: ["void"],
    }))
    .sort((a, b) => {
      if (a.isStarred !== b.isStarred) return b.isStarred ? 1 : -1;
      return a.name.localeCompare(b.name);
    }),
};

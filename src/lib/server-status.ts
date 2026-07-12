import { siteConfig } from "@/config/site";
export type ServerStatus = { online: boolean; players: number; maxPlayers: number; queue: number; restart: string; version: string; discordMembers: number | null; updatedAt: string };
// Replace this fallback with a server-only API fetch later; the site never depends on a live endpoint.
export function getFallbackServerStatus(): ServerStatus {
  return { online: false, players: 0, maxPlayers: siteConfig.maxPlayers, queue: 0, restart: "Schedule pending", version: "Season One", discordMembers: null, updatedAt: "Live API pending" };
}

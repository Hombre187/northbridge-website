import { siteConfig } from "@/config/site";
export type ServerStatus = { online: boolean; players: number; maxPlayers: number; updatedAt: string };
// Replace this fallback with a server-only API fetch later; the site never depends on a live endpoint.
export function getFallbackServerStatus(): ServerStatus {
  return { online: false, players: 0, maxPlayers: siteConfig.maxPlayers, updatedAt: "Status API not connected" };
}

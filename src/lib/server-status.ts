import { siteConfig } from "@/config/site";

export type ServerStatus = {
  online: boolean;
  hostname: string;
  players: number;
  maxPlayers: number;
  version: "Season One";
  queue: number | null;
  nextRestart: string | null;
  lastUpdated: string;
};

export function getFallbackServerStatus(): ServerStatus {
  return {
    online: false,
    hostname: "NorthBridge RP",
    players: 0,
    maxPlayers: siteConfig.maxPlayers,
    version: "Season One",
    queue: null,
    nextRestart: null,
    lastUpdated: "",
  };
}

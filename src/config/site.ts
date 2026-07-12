// Public production details. Keep private server credentials out of this client-safe file.
// Never put server keys, Tebex secrets, or other private credentials in this file.
export const siteConfig = {
  name: "NorthBridge RP",
  description: "An 18+ serious FiveM roleplay community built around player-driven stories and premium custom systems.",
  url: "https://northbridgerp.com",
  discordUrl: "https://discord.gg/d9hTSbc4qU",
  storeUrl: "https://northbridge-rp.tebex.io/",
  connectUrl: "fivem://connect/205.209.113.90:30120",
  supportUrl: "https://discord.gg/d9hTSbc4qU",
  serverAddress: "205.209.113.90:30120",
  maxPlayers: 128,
  socials: { discord: "https://discord.gg/d9hTSbc4qU" },
} as const;

export const navigation = [
  ["Home", "/"], ["About", "/about"], ["Rules", "/rules"], ["Departments", "/departments"],
  ["Businesses", "/businesses"], ["Gallery", "/gallery"], ["Join", "/join"], ["Contact", "/contact"],
] as const;

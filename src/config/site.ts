// Public production details. Replace the remaining Discord/Tebex placeholders before launch.
// Never put server keys, Tebex secrets, or other private credentials in this file.
export const siteConfig = {
  name: "NorthBridge RP",
  description: "An 18+ serious FiveM roleplay community built around player-driven stories and premium custom systems.",
  url: "https://northbridgerp.com",
  discordUrl: "https://discord.gg/replace-me",
  storeUrl: "https://northbridgerp.tebex.io",
  connectUrl: "fivem://connect/205.209.113.90:30120",
  supportUrl: "https://discord.gg/replace-me",
  serverAddress: "205.209.113.90:30120",
  maxPlayers: 128,
  socials: { discord: "https://discord.gg/replace-me" },
} as const;

export const navigation = [
  ["Home", "/"], ["About", "/about"], ["Rules", "/rules"], ["Departments", "/departments"],
  ["Businesses", "/businesses"], ["Gallery", "/gallery"], ["Join", "/join"], ["Contact", "/contact"],
] as const;

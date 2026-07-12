// Replace these safe placeholders before launch. Never put server secrets here.
export const siteConfig = {
  name: "NorthBridge RP",
  description: "An 18+ serious FiveM roleplay community built around player-driven stories and premium custom systems.",
  url: "https://northbridgerp.com",
  discordUrl: "https://discord.gg/replace-me",
  storeUrl: "https://northbridgerp.tebex.io",
  connectUrl: "https://cfx.re/join/replace",
  supportUrl: "https://discord.gg/replace-me",
  serverAddress: "cfx.re/join/replace",
  maxPlayers: 64,
  socials: { discord: "https://discord.gg/replace-me" },
} as const;

export const navigation = [
  ["Home", "/"], ["About", "/about"], ["Rules", "/rules"], ["Departments", "/departments"],
  ["Businesses", "/businesses"], ["Gallery", "/gallery"], ["Join", "/join"],
] as const;

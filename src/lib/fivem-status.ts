import type { ServerStatus } from "./server-status";

const FALLBACK_ENDPOINT = "205.209.113.90:30120";
const FALLBACK_MAX_PLAYERS = 128;
const TIMEOUT_MS = 4_500;

type Fetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;
type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeEndpoint(endpoint: string): string {
  return endpoint.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
}

function offlineStatus(): ServerStatus {
  return {
    online: false,
    hostname: "NorthBridge RP",
    players: 0,
    maxPlayers: FALLBACK_MAX_PLAYERS,
    version: "Season One",
    queue: null,
    nextRestart: null,
    lastUpdated: new Date().toISOString(),
  };
}

async function fetchJson(url: string, signal: AbortSignal, fetcher: Fetcher): Promise<UnknownRecord> {
  const response = await fetcher(url, { cache: "no-store", signal });
  if (!response.ok) throw new Error("FiveM endpoint unavailable");
  const value: unknown = await response.json();
  if (!isRecord(value)) throw new Error("Invalid FiveM response");
  return value;
}

export async function getFiveMServerStatus(options: { endpoint?: string; timeoutMs?: number; fetcher?: Fetcher } = {}): Promise<ServerStatus> {
  const endpoint = normalizeEndpoint(options.endpoint ?? process.env.FIVEM_SERVER_ENDPOINT ?? FALLBACK_ENDPOINT);
  if (!endpoint) return offlineStatus();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? TIMEOUT_MS);

  try {
    const baseUrl = `http://${endpoint}`;
    const [dynamicResult, infoResult] = await Promise.allSettled([
      fetchJson(`${baseUrl}/dynamic.json`, controller.signal, options.fetcher ?? fetch),
      fetchJson(`${baseUrl}/info.json`, controller.signal, options.fetcher ?? fetch),
    ]);

    if (dynamicResult.status !== "fulfilled") return offlineStatus();

    const dynamic = dynamicResult.value;
    const players = typeof dynamic.clients === "number" ? dynamic.clients : Number.NaN;
    const maxPlayers = typeof dynamic.sv_maxclients === "number" || typeof dynamic.sv_maxclients === "string"
      ? Number(dynamic.sv_maxclients)
      : Number.NaN;

    if (!Number.isInteger(players) || players < 0 || !Number.isInteger(maxPlayers) || maxPlayers <= 0) {
      return offlineStatus();
    }

    const info = infoResult.status === "fulfilled" ? infoResult.value : null;
    const vars = info && isRecord(info.vars) ? info.vars : null;
    const hostname = typeof dynamic.hostname === "string" && dynamic.hostname.trim()
      ? dynamic.hostname.trim()
      : typeof vars?.sv_projectName === "string" && vars.sv_projectName.trim()
        ? vars.sv_projectName.trim()
        : "NorthBridge RP";

    return {
      online: true,
      hostname,
      players,
      maxPlayers,
      version: "Season One",
      queue: null,
      nextRestart: null,
      lastUpdated: new Date().toISOString(),
    };
  } catch {
    return offlineStatus();
  } finally {
    clearTimeout(timeout);
  }
}

"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { getFallbackServerStatus, type ServerStatus as ServerStatusData } from "@/lib/server-status";
import { Badge, Button, Card } from "./ui";

const REFRESH_MS = 45_000;

function formatUpdatedAt(value: string): string {
  if (!value) return "Checking live status…";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Status time unavailable";
  return `Updated ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

export function ServerStatus() {
  const [status, setStatus] = useState<ServerStatusData>(getFallbackServerStatus);
  const [isUpdating, setIsUpdating] = useState(true);
  const [isStale, setIsStale] = useState(false);
  const hasGoodValue = useRef(false);
  const lastRequestAt = useRef(0);

  useEffect(() => {
    let disposed = false;
    let activeController: AbortController | null = null;

    const refresh = async () => {
      if (document.hidden || activeController) return;
      lastRequestAt.current = Date.now();
      activeController = new AbortController();
      setIsUpdating(true);

      try {
        const response = await fetch("/api/server-status", { cache: "no-store", signal: activeController.signal });
        const nextStatus: unknown = await response.json();
        if (disposed || typeof nextStatus !== "object" || nextStatus === null || !("online" in nextStatus)) return;

        const normalized = nextStatus as ServerStatusData;
        if (normalized.online) {
          hasGoodValue.current = true;
          setStatus(normalized);
          setIsStale(false);
        } else if (!hasGoodValue.current) {
          setStatus(normalized);
          setIsStale(false);
        } else {
          setIsStale(true);
        }
      } catch (error) {
        if (!disposed && !(error instanceof DOMException && error.name === "AbortError")) setIsStale(hasGoodValue.current);
      } finally {
        activeController = null;
        if (!disposed) setIsUpdating(false);
      }
    };

    const onVisibilityChange = () => {
      if (!document.hidden && Date.now() - lastRequestAt.current >= REFRESH_MS) void refresh();
    };

    void refresh();
    const interval = window.setInterval(() => void refresh(), REFRESH_MS);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      disposed = true;
      activeController?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const metrics = [
    ["Players", `${status.players} / ${status.maxPlayers}`],
    ["Queue", status.queue === null ? "—" : String(status.queue)],
    ["Next restart", status.nextRestart ?? "—"],
    ["Version", status.version],
    ["Discord", "Coming soon"],
  ];

  return <Card className="status-dock mx-auto max-w-6xl" interactive={false}><div className="flex flex-col gap-7"><div className="flex flex-wrap items-center justify-between gap-4"><div><div className="flex flex-wrap items-center gap-3"><span className={`h-2.5 w-2.5 rounded-full ${status.online ? "bg-emerald-400 shadow-[0_0_16px_#34d399]" : "bg-red-500"}`}/><h2 className="text-xl font-black">{status.hostname}</h2><Badge tone={status.online ? "success" : "accent"}>{status.online ? "Online" : "Offline"}</Badge>{isUpdating && <span className="text-xs text-zinc-500">Updating…</span>}{isStale && !isUpdating && <span className="text-xs text-amber-400">Update delayed</span>}</div><p className="mt-2 text-xs text-zinc-500">{formatUpdatedAt(status.lastUpdated)} · {siteConfig.serverAddress}</p></div><Button href={siteConfig.connectUrl}>Connect</Button></div><div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/8 bg-white/8 sm:grid-cols-5">{metrics.map(([label,value])=><div className="bg-[#111] p-4" key={label}><p className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">{label}</p><p className="mt-2 text-base font-black text-zinc-100">{value}</p></div>)}</div></div></Card>;
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/config/site";
import { getFallbackServerStatus } from "@/lib/server-status";
import { Badge, Button, Container } from "./ui";

export function Navbar() {
  const [open, setOpen] = useState(false); const [solid, setSolid] = useState(false);
  const status = getFallbackServerStatus();
  useEffect(() => { const onScroll = () => setSolid(window.scrollY > 24); onScroll(); addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition ${solid || open ? "border-white/10 bg-[#08080af2] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
    <Container className="flex h-20 items-center justify-between"><Link href="/" className="flex items-center gap-3" aria-label="NorthBridge RP home"><Image src="/branding/nb-mark.svg" alt="" width={42} height={42} priority/><span className="font-black tracking-[.12em]">NORTHBRIDGE <span className="text-red-500">RP</span></span></Link>
      <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">{navigation.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-zinc-300 transition hover:text-white">{label}</Link>)}<Badge tone="neutral">{status.players}/{status.maxPlayers}</Badge><Button href={siteConfig.discordUrl} size="sm">Discord</Button><Button href={siteConfig.storeUrl} variant="ghost" size="sm">Store</Button></nav>
      <button className="rounded border border-white/15 p-2 xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><span className="sr-only">Toggle navigation</span><span className="block text-xl">{open ? "×" : "☰"}</span></button>
    </Container>{open && <nav id="mobile-menu" className="border-t border-white/10 px-5 py-5 xl:hidden" aria-label="Mobile navigation">{navigation.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="block border-b border-white/5 py-3 font-semibold text-zinc-200">{label}</Link>)}<div className="mt-5 grid grid-cols-2 gap-3"><Button href={siteConfig.discordUrl}>Discord</Button><Button href={siteConfig.storeUrl} variant="ghost">Store</Button></div></nav>}
  </header>;
}

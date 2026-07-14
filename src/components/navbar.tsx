"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/config/site";
import { getFallbackServerStatus } from "@/lib/server-status";
import { Badge, Button, Container } from "./ui";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const status = getFallbackServerStatus();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  return <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
    <Container className={`nav-shell flex h-[68px] max-w-[calc(100vw-1.5rem)] items-center justify-between rounded-2xl px-4 transition-all duration-300 sm:max-w-7xl sm:px-5 ${solid || open ? "nav-shell-solid" : ""}`}>
      <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="NorthBridge RP Home"><Image src="/branding/nb-logo.webp" alt="NorthBridge RP" width={717} height={479} priority fetchPriority="high" sizes="(max-width: 639px) 40px, 52px" className="h-9 w-10 shrink-0 object-contain sm:h-11 sm:w-12"/><span className="truncate text-xs font-black tracking-[.08em] min-[380px]:text-sm sm:text-base sm:tracking-[.11em]">NORTHBRIDGE <span className="text-[#ed2939]">RP</span></span></Link>
      <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">{navigation.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`rounded-lg px-2.5 py-2 text-[13px] font-semibold transition ${pathname === href ? "bg-white/8 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>{label}</Link>)}<span className="mx-2 h-5 w-px bg-white/10"/><Badge tone="neutral"><span className={`mr-2 h-1.5 w-1.5 rounded-full ${status.online ? "bg-emerald-400" : "bg-zinc-500"}`}/>{status.players}/{status.maxPlayers}</Badge><Button href={siteConfig.discordUrl} size="sm">Discord</Button><Button href={siteConfig.storeUrl} variant="ghost" size="sm">Store</Button></nav>
      <button className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-xl xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><span className="sr-only">Toggle navigation</span><span aria-hidden="true" className="block leading-none">{open ? "\u00d7" : "\u2630"}</span></button>
    </Container>
    {open && <nav id="mobile-menu" className="nav-shell-solid mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 px-5 py-5 xl:hidden" aria-label="Mobile navigation">{navigation.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="block border-b border-white/5 py-3 font-semibold text-zinc-200">{label}</Link>)}<div className="mt-5 grid grid-cols-2 gap-3"><Button href={siteConfig.discordUrl}>Discord</Button><Button href={siteConfig.storeUrl} variant="ghost">Store</Button></div></nav>}
  </header>;
}

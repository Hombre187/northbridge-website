"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navigation, siteConfig } from "@/config/site";
import { Button, Container } from "./ui";

export function Navbar() {
  const [open, setOpen] = useState(false); const [solid, setSolid] = useState(false);
  useEffect(() => { const onScroll = () => setSolid(window.scrollY > 24); onScroll(); addEventListener("scroll", onScroll, { passive: true }); return () => removeEventListener("scroll", onScroll); }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition ${solid || open ? "border-white/10 bg-[#08080af2] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
    <Container className="flex h-20 items-center justify-between"><Link href="/" className="flex items-center gap-3" aria-label="NorthBridge RP home"><Image src="/branding/nb-mark.svg" alt="" width={42} height={42} priority/><span className="font-black tracking-[.12em]">NORTHBRIDGE <span className="text-red-500">RP</span></span></Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">{navigation.map(([label, href]) => <Link key={href} href={href} className="text-sm font-semibold text-zinc-300 transition hover:text-white">{label}</Link>)}<Button href={siteConfig.discordUrl}>Discord</Button></nav>
      <button className="rounded border border-white/15 p-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><span className="sr-only">Toggle navigation</span><span className="block text-xl">{open ? "×" : "☰"}</span></button>
    </Container>{open && <nav id="mobile-menu" className="border-t border-white/10 px-5 py-5 lg:hidden" aria-label="Mobile navigation">{navigation.map(([label, href]) => <Link onClick={() => setOpen(false)} key={href} href={href} className="block border-b border-white/5 py-3 font-semibold text-zinc-200">{label}</Link>)}<Button href={siteConfig.discordUrl} className="mt-5 w-full">Discord</Button></nav>}
  </header>;
}

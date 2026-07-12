"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { heroMedia } from "@/data/media";
import { Button, Container } from "./ui";

export function Hero() {
  const [active, setActive] = useState(0);
  const [loadedCount, setLoadedCount] = useState(1);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rotationTimer = window.setInterval(() => setActive((current) => (current + 1) % heroMedia.length), 8000);
    const lazyLoadTimer = window.setInterval(() => setLoadedCount((count) => Math.min(count + 1, heroMedia.length)), 7000);
    return () => { window.clearInterval(rotationTimer); window.clearInterval(lazyLoadTimer); };
  }, []);
  return <section className="relative isolate min-h-[100svh] overflow-hidden">
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">{heroMedia.slice(0, loadedCount).map((item, index) => <div className={`hero-frame absolute inset-0 ${index === active ? "hero-frame-active" : ""}`} key={item.src}><Image src={item.src} alt="" fill priority={index === 0} loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "low"} sizes="100vw" style={{ objectPosition: item.position }} className="object-cover"/></div>)}</div>
    <div className="hero-vignette pointer-events-none absolute inset-0 z-10" aria-hidden="true"/>
    <div className="relative z-20 flex min-h-[100svh] items-center justify-center opacity-100 visible">
      <Container className="pb-24 pt-36 text-center"><div className="mx-auto max-w-4xl"><h1 className="text-gradient text-6xl font-black leading-[.88] tracking-[-.06em] sm:text-8xl lg:text-[7rem]">NORTHBRIDGE RP</h1><p className="mt-7 text-2xl font-bold leading-tight sm:text-4xl">Your Story. Your City. Your Legacy.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Button href={siteConfig.connectUrl} size="lg">Join Server</Button><Button href={siteConfig.discordUrl} variant="secondary" size="lg">Discord</Button></div></div></Container>
    </div>
    <a href="#discover" className="scroll-cue absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center text-[10px] font-bold uppercase tracking-[.3em] text-zinc-300"><span className="mb-2 block">Explore</span><span className="mx-auto block h-8 w-px bg-gradient-to-b from-red-500 to-transparent"/></a>
  </section>;
}

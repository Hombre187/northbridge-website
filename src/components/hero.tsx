"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { heroMedia } from "@/data/media";
import { Button, Container } from "./ui";

function DiscordIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M19.54 5.34A16.3 16.3 0 0 0 15.44 4l-.5 1.03a15.1 15.1 0 0 0-5.88 0L8.55 4a16.8 16.8 0 0 0-4.1 1.34C1.86 9.2 1.16 12.96 1.5 16.67a16.5 16.5 0 0 0 5.03 2.55l1.23-1.67a10.6 10.6 0 0 1-1.58-.75l.39-.3c3.05 1.4 7.31 1.4 10.33 0l.4.3c-.5.3-1.04.55-1.59.76l1.23 1.66a16.4 16.4 0 0 0 5.03-2.55c.4-4.3-.68-8.02-2.93-11.33ZM8.58 14.4c-.98 0-1.78-.9-1.78-2s.78-2 1.78-2c1 0 1.8.9 1.78 2 0 1.1-.78 2-1.78 2Zm6.84 0c-.98 0-1.78-.9-1.78-2s.78-2 1.78-2c1 0 1.8.9 1.78 2 0 1.1-.78 2-1.78 2Z"/></svg>;
}

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
    <div className="hero-beam pointer-events-none absolute inset-0 z-10" aria-hidden="true"/>
    <div className="relative z-20 flex min-h-[100svh] items-center justify-center">
      <Container className="pb-36 pt-36 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="hero-kicker mx-auto mb-7 w-fit max-w-full"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-400 shadow-[0_0_12px_#ef4444]"/>18+ Serious Roleplay <span className="text-white/25">/</span> Season One</div>
          <h1 className="hero-title text-[2.75rem] font-black leading-[.86] tracking-[-.06em] min-[420px]:text-5xl sm:text-8xl lg:text-[6.6rem]"><span className="block text-white">NORTHBRIDGE</span><span className="text-gradient block">ROLEPLAY</span></h1>
          <p className="mt-7 text-lg font-bold tracking-[-.02em] text-white sm:text-3xl">Your Story. Your City. Your Legacy.</p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">Step into a living city shaped by its people. Build a name, create lasting stories, and find your place in a serious roleplay community.</p>
          <p className="mt-5 text-[10px] font-bold uppercase tracking-[.28em] text-zinc-500">The next chapter starts here</p>
          <div className="mx-auto mt-8 flex max-w-64 flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"><Button href={siteConfig.discordUrl} size="lg" className="gap-2"><DiscordIcon/>Get Started</Button><Button href="/rules" variant="secondary" size="lg" className="gap-2">Read Rules <span aria-hidden="true">&#8594;</span></Button></div>
        </div>
      </Container>
    </div>
    <a href="#discover" className="scroll-cue absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center text-[9px] font-bold uppercase tracking-[.3em] text-zinc-400"><span className="mb-2 block">Explore</span><span className="mx-auto block h-7 w-px bg-gradient-to-b from-red-500 to-transparent"/></a>
  </section>;
}

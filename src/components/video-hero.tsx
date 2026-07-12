import { existsSync } from "node:fs";
import Image from "next/image";
import { Button, Container } from "./ui";
import { siteConfig } from "@/config/site";

export function VideoHero() {
  const webm = existsSync(`${process.cwd()}/public/videos/northbridge-hero.webm`);
  const mp4 = existsSync(`${process.cwd()}/public/videos/northbridge-hero.mp4`);
  const hasVideo = webm || mp4;
  return <section className="relative flex min-h-[100svh] items-center overflow-hidden">
    {hasVideo ? <video className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" autoPlay muted loop playsInline poster="/images/hero/city.svg" aria-hidden="true">{webm && <source src="/videos/northbridge-hero.webm" type="video/webm"/>}{mp4 && <source src="/videos/northbridge-hero.mp4" type="video/mp4"/>}</video> : <Image src="/images/hero/city.svg" alt="Abstract NorthBridge city skyline placeholder" fill priority className="object-cover"/>}
    {hasVideo && <Image src="/images/hero/city.svg" alt="Abstract NorthBridge city skyline placeholder" fill priority className="hidden object-cover motion-reduce:block"/>}
    <div className="hero-vignette absolute inset-0"/><Container className="relative pb-24 pt-36"><div className="reveal max-w-4xl"><p className="eyebrow mb-5">18+ serious roleplay · Qbox</p><h1 className="text-gradient text-6xl font-black leading-[.88] tracking-[-.06em] sm:text-8xl lg:text-[7rem]">NORTHBRIDGE<br/>RP</h1><p className="mt-7 text-2xl font-bold leading-tight sm:text-4xl">Your Story. <span className="text-zinc-500">Your City.</span> Your Legacy.</p><p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">A premium 18+ serious roleplay community built around immersive storytelling, player-owned businesses, custom systems, and long-term progression.</p><div className="mt-9 flex flex-wrap gap-3"><Button href={siteConfig.connectUrl} size="lg">Join Server</Button><Button href={siteConfig.discordUrl} variant="secondary" size="lg">Discord</Button><Button href={siteConfig.storeUrl} variant="ghost" size="lg">Store</Button></div></div></Container>
    <a href="#discover" className="scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-[10px] font-bold uppercase tracking-[.3em] text-zinc-400"><span className="mb-2 block">Explore</span><span className="mx-auto block h-8 w-px bg-gradient-to-b from-red-500 to-transparent"/></a>
  </section>;
}

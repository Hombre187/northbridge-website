import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHero, SectionHeading } from "@/components/ui";
import { northBridgeMedia, type MediaCategory } from "@/data/media";

export const metadata: Metadata = { title: "Gallery", description: "Official scenes, vehicles, businesses, and roleplay moments from NorthBridge RP." };
const categories: MediaCategory[] = ["Businesses", "Departments", "Criminal roleplay", "Vehicles"];

export default function Gallery() {
  return <><PageHero eyebrow="City archive" title="Moments from NorthBridge." copy="Official NorthBridge scenes spanning city businesses, public service, criminal stories, and automotive culture."/>
    {categories.map((category) => { const images = northBridgeMedia.filter((item) => item.category === category); return <section className="py-16 first:pt-20" key={category}><Container><SectionHeading eyebrow="NorthBridge media" title={category}/><div className="columns-1 gap-4 sm:columns-2 lg:columns-3">{images.map((item) => <figure className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-zinc-950" key={item.src}><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.025]"/><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"/><figcaption className="absolute inset-x-0 bottom-0 p-5 text-sm leading-5 text-zinc-200 opacity-90">{item.alt}</figcaption></figure>)}</div></Container></section>; })}
  </>;
}

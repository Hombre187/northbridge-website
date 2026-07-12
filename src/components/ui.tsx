import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>; }
export function Button({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "ghost"; className?: string }) {
  const styles = variant === "primary" ? "bg-[#c81729] hover:bg-[#e02437] border-[#ed3144]" : variant === "secondary" ? "bg-white/8 hover:bg-white/14 border-white/15" : "bg-transparent hover:bg-white/5 border-white/10";
  const classes = `inline-flex min-h-11 items-center justify-center rounded-sm border px-5 py-2.5 text-sm font-bold tracking-wide transition duration-200 hover:-translate-y-0.5 ${styles} ${className}`;
  return href.startsWith("/") ? <Link className={classes} href={href}>{children}</Link> : <a className={classes} href={href} target="_blank" rel="noreferrer">{children}</a>;
}
export function Badge({ children }: { children: ReactNode }) { return <span className="rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-bold text-red-300">{children}</span>; }
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`glass rounded-lg p-6 transition duration-300 hover:-translate-y-1 hover:border-red-500/25 ${className}`}>{children}</div>; }
export function SectionHeading({ eyebrow, title, copy, center = false }: { eyebrow: string; title: string; copy?: string; center?: boolean }) { return <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""}`}><p className="eyebrow mb-3">{eyebrow}</p><h2 className="text-3xl font-black tracking-tight sm:text-5xl">{title}</h2>{copy && <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">{copy}</p>}</div>; }
export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <section className="relative overflow-hidden border-b border-white/5 pb-20 pt-36"><div className="absolute inset-0 grid-lines opacity-20" /><Container className="relative"><p className="eyebrow mb-4">{eyebrow}</p><h1 className="max-w-4xl text-5xl font-black tracking-[-.04em] sm:text-7xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">{copy}</p></Container></section>; }

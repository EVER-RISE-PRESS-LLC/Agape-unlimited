import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageIntro({ name, title, children }: { name: string; title: ReactNode; children: ReactNode }) {
  return (
    <div className="page-intro section-shell">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><ChevronRight size={14} aria-hidden="true" /><span aria-current="page">{name}</span>
      </nav>
      <h1>{title}</h1>
      <div className="page-intro-copy">{children}</div>
    </div>
  );
}

export function PageCta({ title = "A stronger community starts with connection.", text = "Bring your questions, your ideas, and your willingness to help. There’s room for you here.", href = "/contact", label = "Let’s connect" }: { title?: string; text?: string; href?: string; label?: string }) {
  return (
    <section className="page-cta">
      <div className="section-shell page-cta-inner">
        <div><h2>{title}</h2><p>{text}</p></div>
        <Link href={href} className="button button-gold">{label}<ArrowUpRight size={19} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

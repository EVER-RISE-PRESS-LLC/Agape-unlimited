import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { canonicalUrl, publishedPages } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export function PageIntro({ name, title, children }: { name: (typeof publishedPages)[number]["name"]; title: ReactNode; children: ReactNode }) {
  const page = publishedPages.find((item) => item.name === name);
  return (
    <div className="page-intro section-shell">
      {page && page.path !== "/" && <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl("/") },
          { "@type": "ListItem", position: 2, name, item: canonicalUrl(page.path) },
        ],
      }} />}
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

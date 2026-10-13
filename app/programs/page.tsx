import Link from "next/link";
import { ArrowUpRight, BookOpen, HeartHandshake, UsersRound } from "lucide-react";
import { PageIntro, PageCta } from "@/components/page-intro";
import { Programs } from "@/components/programs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Our programs", "Explore Agape’s ten program areas, including education, youth mentorship, family support, accessibility, and community partnerships.", "/programs");

export default function ProgramsPage() {
  return (
    <main id="main">
      <PageIntro name="Our programs" title={<>Many ways to care.<br />One shared purpose.</>}>
        <p>Children, families, and communities need different kinds of support. These are the areas that guide the programs and partnerships we seek to build.</p>
      </PageIntro>
      <div className="program-overview section-shell">
        <div><BookOpen size={28} strokeWidth={1.5} aria-hidden="true" /><p>Room to learn.<br /><strong>Children & youth</strong></p></div>
        <div><HeartHandshake size={28} strokeWidth={1.5} aria-hidden="true" /><p>Support to move forward.<br /><strong>Families & everyday needs</strong></p></div>
        <div><UsersRound size={28} strokeWidth={1.5} aria-hidden="true" /><p>Connection to grow.<br /><strong>Community & opportunity</strong></p></div>
      </div>
      <section className="programs-section" aria-labelledby="areas-heading">
        <div className="section-shell page-programs">
          <div className="section-heading-inline"><h2 id="areas-heading">Explore our program areas.</h2><p>Choose an area. Open a topic to learn more.</p></div>
          <Programs />
        </div>
      </section>
      <section className="section-shell section-space editorial-split" aria-labelledby="support-heading">
        <h2 id="support-heading">Looking for support<br />or a way to help?</h2>
        <div className="prose"><p>Tell us what you’re looking for, or share a resource your organization can offer. A conversation helps us understand where a connection may be possible.</p><p>Program availability depends on resources and community partnerships. Contact the foundation to ask about current opportunities.</p><Link href="/contact?topic=programs" className="text-link">Ask about our programs<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </section>
      <PageCta title="Your skills could open a door." text="Share your time, connect a resource, or explore a partnership that supports children and families." href="/get-involved" label="Get involved" />
    </main>
  );
}

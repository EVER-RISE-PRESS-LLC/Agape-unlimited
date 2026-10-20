import { FoundationPhoto } from "@/components/foundation-photo";
import Link from "next/link";
import { ArrowUpRight, Heart, Sprout } from "lucide-react";
import { PageIntro, PageCta } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About us", "Learn how our community-driven mission brings education, mentorship, and practical support together for children and families in Georgia, United States.", "/about");

export default function AboutPage() {
  return (
    <main id="main">
      <PageIntro name="About us" title={<>Care is where<br />possibility begins.</>}>
        <p>We believe every child deserves to feel valued, every family deserves an opportunity to thrive, and every community deserves access to hope and support.</p>
      </PageIntro>
      <section className="section-shell story-grid" aria-labelledby="mission-heading">
        <div className="story-photo">
          <FoundationPhoto name="founder-home" alt="The foundation’s founder smiling at home, seated in his power wheelchair." sizes="(max-width: 800px) 90vw, 42vw" eager />
        </div>
        <div className="story-copy">
          <h2 id="mission-heading">Helping people move forward.</h2>
          <p>Agape Unlimited Foundation is a community-driven foundation serving children and families in Georgia, United States. Our mission brings together education, mentorship, practical resources, and community connections to help people move forward.</p>
          <p>Our work starts with listening to community needs. We aim to connect children and families with resources, relationships, and opportunities, guided by the support and partnerships available.</p>
          <Link href="/programs" className="text-link">Discover our program areas<ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
      </section>
      <section className="vision-band" aria-labelledby="vision-heading">
        <div className="section-shell vision-band-inner">
          <Sprout size={42} strokeWidth={1.25} aria-hidden="true" />
          <div><h2 id="vision-heading">The future we believe in.</h2><p>Stronger communities where every child has the opportunity to reach their full potential and every family has the support needed to create a better future.</p></div>
        </div>
      </section>
      <section className="section-shell section-space editorial-split" aria-labelledby="purpose-heading">
        <h2 id="purpose-heading">Love without limits.<br />Support with purpose.</h2>
        <div className="prose"><p>Agape means love without limits. That belief shapes how we serve: with compassion, dignity, and a commitment to seeing the potential in every person.</p><p>We don’t simply want to help. We want to create possibilities. Our work brings together education, everyday support, and community relationships to help children and families look toward a stronger tomorrow.</p><Link href="/values" className="text-link">The values behind our work<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </section>
      <section className="promise-section section-shell" aria-label="Our promise">
        <span className="promise-heart"><Heart size={32} strokeWidth={1.25} aria-hidden="true" /></span>
        <p>We may not be able to change every circumstance,<br />but we can help change what is possible.</p>
        <span>A commitment to showing up, serving with love, and building meaningful partnerships.</span>
      </section>
      <PageCta href="/get-involved" label="Find your place" />
    </main>
  );
}

import Link from "next/link";
import { ArrowUpRight, Mail, HeartHandshake } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact", "Contact Agape Unlimited Foundation about programs, volunteering, partnerships, donations, or a question you would like to share.", "/contact");

export default function ContactPage() {
  return (
    <main id="main">
      <PageIntro name="Contact" title={<>Good things begin<br />with a conversation.</>}>
        <p>A question about our work, an idea for a partnership, or a wish to help. We’d love to hear what’s on your mind.</p>
      </PageIntro>
      <div className="section-shell contact-layout">
        <aside className="contact-aside" aria-label="Ways to connect">
          <h2>Let’s connect.</h2><p>Use the form to introduce yourself and tell us how we can help. Choose a topic so your message has a little context.</p>
          {site.email && <div className="contact-email"><Mail size={21} strokeWidth={1.5} aria-hidden="true" /><div><h3>Prefer email?</h3><a href={`mailto:${site.email}`}>{site.email}</a></div></div>}
          <div className="contact-purpose"><HeartHandshake size={28} strokeWidth={1.5} aria-hidden="true" /><p>Serving with care.<br />Connecting with purpose.</p></div>
          <div className="contact-discover"><h3>Find your next step.</h3><Link href="/programs">Explore our programs<ArrowUpRight size={17} aria-hidden="true" /></Link><Link href="/get-involved">Share your time & talents<ArrowUpRight size={17} aria-hidden="true" /></Link><Link href="/donate">Support the possibilities<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        </aside>
        <section className="contact-form-panel" aria-labelledby="form-heading"><h2 id="form-heading">Send us a message.</h2><p className="form-introduction">Fields marked with an asterisk (*) are required.</p><ContactForm /></section>
      </div>
    </main>
  );
}

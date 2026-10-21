import Link from "next/link";
import { ArrowUpRight, HandHeart, Handshake, Heart } from "lucide-react";
import { PageIntro, PageCta } from "@/components/page-intro";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Get involved", "Share your time and talents, explore a community partnership, or support Agape Unlimited Foundation’s mission through giving.", "/get-involved");

const opportunities = [
  { icon: HandHeart, title: "Share your time & talents.", text: "Your care, experience, and perspective can help create new possibilities. Tell us about your interests, skills, and the time you would like to share.", examples: "Mentorship, educational support, outreach, and practical skills are all ways to start a conversation.", href: "/contact?topic=volunteering", label: "Ask about volunteering" },
  { icon: Handshake, title: "Build a community partnership.", text: "Are you part of a school, business, community group, or organization? Explore how your resources and relationships could connect with our mission.", examples: "Bring an idea, share a resource, or explore an opportunity to work together.", href: "/contact?topic=partnership", label: "Explore a partnership" },
  { icon: Heart, title: "Support the possibilities.", text: "Giving can help make education, connection, and everyday support more accessible to children and families.", examples: "Explore online giving, or contact us to discuss a gift of resources or other support.", href: "/donate", label: "Explore ways to give" },
];

export default function GetInvolvedPage() {
  return (
    <main id="main">
      <PageIntro name="Get involved" title={<>There’s a place for you<br />in this work.</>}>
        <p>A little time. A meaningful connection. A willingness to help. There are many ways to stand alongside children and families.</p>
      </PageIntro>
      <section className="section-shell involvement-rows" aria-label="Ways to get involved">
        {opportunities.map(({ icon: Icon, title, text, examples, href, label }) => (
          <article className="involvement-row" key={href}><Icon size={38} strokeWidth={1.25} aria-hidden="true" /><h2>{title}</h2><div className="prose"><p>{text}</p><p>{examples}</p><Link href={href} className="text-link">{label}<ArrowUpRight size={19} aria-hidden="true" /></Link></div></article>
        ))}
      </section>
      <section className="getting-started-band" aria-labelledby="starting-heading">
        <div className="section-shell editorial-split">
          <h2 id="starting-heading">Start with<br />a conversation.</h2>
          <div className="prose"><p>You don’t need to have everything figured out. Tell us a little about yourself, what drew you to Agape, and how you hope to contribute.</p><p>Opportunities depend on current needs, available resources, and community partnerships. The foundation can help you explore what may be a good fit.</p><Link className="button" href="/contact">Introduce yourself<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
        </div>
      </section>
      <PageCta title="Care takes many forms." text="Learn more about the mission and values that bring our work together." href="/about" label="Get to know Agape" />
    </main>
  );
}

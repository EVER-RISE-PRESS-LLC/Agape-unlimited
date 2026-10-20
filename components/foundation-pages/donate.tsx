import Link from "next/link";
import { ArrowUpRight, Heart, LockKeyhole, MoveUpRight } from "lucide-react";
import { PageIntro, PageCta } from "@/components/page-intro";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Donate", "Support Agape Unlimited Foundation’s mission to create opportunities for children and families. Explore online giving and other ways to help.", "/donate");

export default function DonatePage() {
  return (
    <main id="main">
      <div className="donation-hero section-shell">
        <div>
          <PageIntro name="Donate" title={<>Give with love.<br />Make room for<br />possibility.</>}>
            <p>Help build a future where children feel valued, families find support, and communities grow stronger together.</p>
          </PageIntro>
          <div className="donation-promise"><Heart size={23} strokeWidth={1.5} aria-hidden="true" /><p>Unlimited love.<br /><strong>Shared possibility.</strong></p></div>
        </div>
        <section className="giving-panel" aria-labelledby="giving-heading">
          <Heart className="giving-heart" size={36} strokeWidth={1.25} aria-hidden="true" />
          <h2 id="giving-heading">A gift that begins{" "}<br />with care.</h2>
          <p>Your support stands behind our mission to connect children and families with resources, relationships, and opportunity.</p>
          {site.donationUrl ? (
            <><a className="button button-gold" href={site.donationUrl} target="_blank" rel="noopener noreferrer">Continue to donate<ArrowUpRight size={19} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a><p className="giving-note"><LockKeyhole size={16} aria-hidden="true" />Complete your gift on our donation provider’s website. Amount and payment options are shown at checkout.</p></>
          ) : (
            <><div className="giving-availability"><strong>Online giving is being set up.</strong><p>We’d love to hear from you about supporting the foundation while we prepare our donation checkout.</p></div><Link className="button button-gold" href="/contact?topic=donation">Talk to us about giving<ArrowUpRight size={19} aria-hidden="true" /></Link></>
          )}
          <Link href="/contact?topic=donation" className="giving-question">Have a question about your gift?<MoveUpRight size={15} aria-hidden="true" /></Link>
        </section>
      </div>
      <section className="donation-purpose" aria-labelledby="support-heading">
        <div className="section-shell editorial-split">
          <h2 id="support-heading">Support that sees<br />the whole person.</h2>
          <div className="prose"><p>Our mission brings together education, mentorship, practical resources, and community connections. Giving supports the possibilities we seek to create across these areas.</p><ul className="support-list"><li>Learning and opportunities for children and youth.</li><li>Resources and relationships that strengthen families.</li><li>Accessible, inclusive community connections.</li></ul><Link href="/programs" className="text-link">Explore the areas that guide our work<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
        </div>
      </section>
      <section className="section-shell section-space donation-faq" aria-labelledby="giving-questions">
        <div><h2 id="giving-questions">A little more<br />about giving.</h2><p>Still have a question?<br /><Link href="/contact?topic=donation" className="text-link">Let’s talk<ArrowUpRight size={17} aria-hidden="true" /></Link></p></div>
        <div className="faq-list">
          <details><summary>How do I make an online donation?</summary><p>{site.donationUrl ? "Use the donation button above to visit the foundation’s donation provider. You’ll choose your gift amount and enter your payment information there." : "Online giving is being set up. Contact the foundation to discuss ways to give and ask about current donation arrangements."}</p></details>
          <details><summary>Can I offer resources or other support?</summary><p>Contact us with a description of what you would like to contribute. Acceptance depends on current needs and the foundation’s ability to use the resources.</p></details>
          <details><summary>Who can answer questions about a gift or receipt?</summary><p>Use the contact form and choose “Donations & giving.” For an existing gift, include the date and the name of the donation provider. Please keep card numbers and payment details out of your message.</p></details>
          <details><summary>Are there other ways to help?</summary><p>Yes. Explore volunteering and community partnerships on our <Link href="/get-involved">Get Involved page</Link>. Your time, talents, and connections can also support our mission.</p></details>
        </div>
      </section>
      <PageCta title="Every connection holds possibility." text="Share your time, bring your ideas, or explore a community partnership." href="/get-involved" label="More ways to help" />
    </main>
  );
}

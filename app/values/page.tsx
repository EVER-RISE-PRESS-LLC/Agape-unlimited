import Image from "next/image";
import { PageIntro, PageCta } from "@/components/page-intro";
import { values } from "@/lib/values";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Our values", "Compassion, empowerment, opportunity, integrity, inclusion, and community guide how Agape Unlimited Foundation serves children and families.", "/values");

export default function ValuesPage() {
  return (
    <main id="main">
      <PageIntro name="Our values" title={<>Love without limits.<br />In everything we do.</>}>
        <p>Agape is more than our name. It’s how we choose to show up for children, families, and one another.</p>
      </PageIntro>
      <section className="section-shell values-editorial" aria-label="Our six core values">
        {values.map(({ name, text, detail }) => (
          <article className="value-row" key={name}><h2>{name}</h2><div><p className="value-statement">{text}</p><p>{detail}</p></div></article>
        ))}
      </section>
      <section className="values-community section-shell" aria-labelledby="together-heading">
        <div className="values-community-photo"><Image src="/images/founder-community.jpeg" alt="The foundation’s founder attending a gathering with other community members." fill sizes="(max-width: 800px) 90vw, 50vw" /></div>
        <div><h2 id="together-heading">People at the heart<br />of possibility.</h2><p>When a child is given an opportunity, a family is given hope. And when families become stronger, communities become stronger.</p></div>
      </section>
      <PageCta title="Put care into action." text="Bring your compassion, your experience, and your ideas. Together, we can make room for possibility." href="/get-involved" label="Get involved" />
    </main>
  );
}

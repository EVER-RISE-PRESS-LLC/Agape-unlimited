import { FoundationPhoto } from "@/components/foundation-photo";
import {
  ArrowUpRight,
  Heart,
  Sprout,
  UsersRound,
  BookOpen,
  HandHeart,
  Handshake,
  Check,
  MoveUpRight,
} from "lucide-react";
import { Programs } from "@/components/programs";
import Link from "next/link";
import { values } from "@/lib/values";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { social } from "@/lib/social";
import { organizationGraph } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Agape Unlimited Foundation | Unlimited Love. Unlimited Possibilities.",
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name, description: social.description, url: "/",
    type: "website", locale: "en_US", siteName: site.name,
    images: [{ url: "/opengraph-image", ...social.imageSize, alt: social.imageAlt }],
  },
  twitter: {
    card: "summary_large_image", title: site.name, description: social.description,
    images: [{ url: "/opengraph-image", ...social.imageSize, alt: social.imageAlt }],
  },
};

export default function Home() {
  return (
    <>
      <StructuredData data={organizationGraph} />
      <main id="main">
        <section
          className="hero section-shell"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <div className="intro-label">
              <span /> Love without limits
            </div>
            <h1 id="hero-title">
              Unlimited love.
              <br />
              Unlimited
              <br className="desktop-break" /> possibilities.
            </h1>
            <p className="hero-description">
              Every child deserves to feel valued.
              <br />
              Every family deserves the opportunity to thrive.
              <br />
              Together, we can help make that possible.
            </p>
            <div className="hero-actions">
              <Link href="/programs" className="button">
                Discover our work <ArrowUpRight size={19} aria-hidden="true" />
              </Link>
              <Link className="text-link" href="/about">
                Get to know us <ArrowUpRight size={23} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-footnote">
              <span className="small-heart">
                <Heart size={18} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span>
                Serving children. Strengthening families.
                <br />
                Building a better tomorrow.
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-arch">
              <FoundationPhoto
                name="founder-home"
                alt="The foundation’s founder smiling at home, seated in his power wheelchair."
                sizes="(max-width: 800px) 90vw, 42vw"
                eager
              />
            </div>
            <div className="portrait-caption">
              <span className="caption-mark">
                <Sprout size={30} strokeWidth={1.3} aria-hidden="true" />
              </span>
              <div>
                Possibility begins
                <br />
                <strong>with people.</strong>
              </div>
            </div>
            <div className="photo-note">A foundation built on care.</div>
          </div>
        </section>
        <div className="commitment-strip">
          <div className="section-shell commitments">
            <div>
              <BookOpen aria-hidden="true" />
              <span>Serving children</span>
            </div>
            <div>
              <Heart aria-hidden="true" />
              <span>Strengthening families</span>
            </div>
            <div>
              <UsersRound aria-hidden="true" />
              <span>Building communities</span>
            </div>
          </div>
        </div>
        <section
          className="mission-section section-shell section-space"
          id="mission"
          aria-labelledby="mission-title"
        >
          <div className="section-intro">
            <span className="section-kicker">Our mission</span>
            <h2 id="mission-title">
              A little support can
              <br />
              open a world of possibility.
            </h2>
          </div>
          <div className="mission-copy">
            <p className="lead">
              We’re here to help children and families move forward.
            </p>
            <p>
              Agape Unlimited Foundation is committed to empowering underserved
              children and families by providing access to resources, education,
              mentorship, supportive programs, and opportunities that strengthen
              individuals and communities.
            </p>
            <p>
              We believe every child deserves to feel valued, every family
              deserves an opportunity to thrive, and every community deserves
              access to hope and support.
            </p>
            <div className="vision">
              <Sprout size={24} aria-hidden="true" />
              <div>
                <h3>The future we believe in</h3>
                <p>
                  Stronger communities where every child has the opportunity to
                  reach their full potential and every family has the support
                  needed to create a better future.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="programs-section"
          id="programs"
          aria-labelledby="programs-title"
        >
          <div className="section-shell section-space">
            <div className="programs-heading">
              <div>
                <span className="section-kicker">What we do</span>
                <h2 id="programs-title">
                  Many ways to care.
                  <br />
                  One shared purpose.
                </h2>
              </div>
              <p>
                Meeting people where they are.
                <br />
                Helping them see what could be next.
                <br />
                Explore the areas that guide our work.
              </p>
            </div>
            <Programs />
          </div>
        </section>
        <section
          className="purpose-section"
          id="purpose"
          aria-labelledby="purpose-title"
        >
          <div className="section-shell purpose-grid">
            <div className="community-photo">
              <FoundationPhoto
                name="founder-community"
                alt="The foundation’s founder attending a gathering with other community members."
                sizes="(max-width: 800px) 90vw, 40vw"
              />
              <span>Connection makes us stronger.</span>
            </div>
            <div className="purpose-copy">
              <span className="section-kicker">The heart of Agape</span>
              <h2 id="purpose-title">
                We don’t simply
                <br />
                want to help.
                <br />
                We want to create
                <br />
                possibilities.
              </h2>
              <p>
                We work to identify barriers affecting underserved children and
                families and connect them with meaningful resources,
                relationships, and opportunities that can change the trajectory
                of their lives.
              </p>
              <div className="purpose-promise">
                <Heart size={22} aria-hidden="true" />
                <p>
                  We may not be able to change every circumstance, but we can
                  help change what is possible.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="values-section section-shell section-space"
          id="values"
          aria-labelledby="values-title"
        >
          <div className="values-heading">
            <div>
              <span className="section-kicker">Our core values</span>
              <h2 id="values-title">
                Agape means
                <br />
                love without limits.
              </h2>
            </div>
            <p>
              It’s more than our name.
              <br />
              It’s how we choose to show up.
            </p>
          </div>
          <div className="values-grid">
            {values.map(({ name, text }) => (
              <article key={name}>
                <span className="value-mark">
                  <Check size={18} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3>{name}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="promise-section section-shell"
          aria-label="Our promise"
        >
          <span className="promise-heart">
            <Heart size={32} strokeWidth={1.25} aria-hidden="true" />
          </span>
          <p>
            When a child is given an opportunity,
            <br />a family is given hope.
          </p>
          <span>
            And when families become stronger, communities become stronger.
          </span>
        </section>
        <section
          className="involvement-section section-shell section-space"
          id="involved"
          aria-labelledby="involved-title"
        >
          <div className="involvement-heading">
            <span className="section-kicker">Make room for possibility</span>
            <h2 id="involved-title">
              There’s a place for you
              <br />
              in this work.
            </h2>
            <p>
              We will continue to show up, serve with love, build meaningful
              partnerships, and create opportunities for children and families
              who too often find themselves overlooked.
            </p>
          </div>
          <div className="involvement-options">
            <article>
              <HandHeart size={27} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>Share your time & talents</h3>
                <p>
                  Bring your care, experience, and perspective to our mission.
                </p>
                <Link href="/get-involved" className="text-link">
                  Explore getting involved{" "}
                  <MoveUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
            <article>
              <Handshake size={27} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>Become a community partner</h3>
                <p>
                  Connect resources and opportunities with the people who need
                  them.
                </p>
                <Link href="/contact?topic=partnership" className="text-link">
                  Start a conversation{" "}
                  <MoveUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
            <article>
              <Heart size={27} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <h3>Support the possibilities</h3>
                <p>
                  Help make education, connection, and everyday support more
                  accessible.
                </p>
                <Link className="text-link" href="/donate">
                  Make a donation <MoveUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </section>
        <section
          className="connect-section"
          id="connect"
          aria-labelledby="connect-title"
        >
          <div className="section-shell connect-inner">
            <div>
              <h2 id="connect-title">Stronger, together.</h2>
              <p>For questions, partnership ideas, or ways to get involved, let’s connect.</p>
            </div>
            <Link className="button button-gold" href="/contact">
              Contact the foundation <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

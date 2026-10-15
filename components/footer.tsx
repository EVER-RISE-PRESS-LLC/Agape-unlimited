import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-main">
        <Link className="brand" href="/" aria-label="Agape Unlimited Foundation home">
          <Image src="/images/agape-seal-186.png" width={62} height={58} alt="" />
          <span>Agape Unlimited<span className="brand-sub">Foundation</span></span>
        </Link>
        <p>Unlimited love. Unlimited possibilities.</p>
        <a href="#main" className="back-top">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <Link href="/about">About us</Link>
        <Link href="/programs">Our programs</Link>
        <Link href="/values">Our values</Link>
        <Link href="/get-involved">Get involved</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/donate">Donate</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Agape Unlimited Foundation</span>
        <span>Serving children. Strengthening families. Building communities.</span>
      </div>
    </footer>
  );
}

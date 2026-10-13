import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <main id="main" className="section-shell not-found"><p className="not-found-code">404</p><h1>Let’s find your way back.</h1><p>The page you’re looking for couldn’t be found. Our mission, programs, and ways to get involved are just a step away.</p><div className="hero-actions"><Link href="/" className="button">Back to home<ArrowUpRight size={19} aria-hidden="true" /></Link><Link href="/contact" className="text-link">Contact us<ArrowUpRight size={19} aria-hidden="true" /></Link></div></main>;
}

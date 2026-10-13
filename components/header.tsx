"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
const links = [
  ["Our mission", "/about"],
  ["What we do", "/programs"],
  ["Our values", "/values"],
  ["Get involved", "/get-involved"],
  ["Contact", "/contact"],
] as const;
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node))
        setOpen(false);
    };
    const resize = () => {
      if (window.innerWidth > 960) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header
      className="site-header"
      ref={header}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="nav-shell">
        <Link
          className="brand"
          href="/"
          aria-label="Agape Unlimited Foundation home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/agape-seal.png"
            width={62}
            height={58}
            alt=""
            priority
          />
          <span>
            Agape Unlimited<span className="brand-sub">Foundation</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button button-small button-gold header-cta" href="/donate" aria-current={pathname === "/donate" ? "page" : undefined}>
          <Heart size={16} aria-hidden="true" /> Donate
        </Link>
        <button
          ref={trigger}
          className="menu-toggle icon-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        data-open={open}
        inert={!open}
        aria-label="Mobile navigation"
      >
        {links.map(([label, href]) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link className="mobile-donate" href="/donate" onClick={() => setOpen(false)} aria-current={pathname === "/donate" ? "page" : undefined}>
          Donate <Heart size={16} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}

"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Collection" },
  { href: "#process", label: "Process" },
  { href: "#testimonials", label: "Clients" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " nav-scrolled" : ""}${open ? " nav-open" : ""}`}>
      <a href="#top" className="logo" onClick={() => setOpen(false)}>
        {profile.brand}
        <span>.</span>
      </a>
      <nav>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
          Book a Consultation
        </a>
      </nav>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>
    </header>
  );
}

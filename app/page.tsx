import { existsSync } from "fs";
import path from "path";
import AutoVideo from "@/components/AutoVideo";
import ContactForm from "@/components/ContactForm";
import Gallery from "@/components/Gallery";
import HeroVideos from "@/components/HeroVideos";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { heroClips, marquee, media, profile, services, stats, steps, testimonials } from "@/data/portfolio";

export default function Home() {
  const clips = heroClips.filter((c) => existsSync(path.join(process.cwd(), "public", c.src)));
  const wa = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(
    "Hi! I saw your portfolio and would like to book a consultation."
  )}`;

  return (
    <>
      <Nav />
      <Reveal />

      <main id="top">
        {/* ───────── Hero ───────── */}
        <section className="hero">
          <div className="hero-bg">
            {clips.length > 0 && <HeroVideos clips={clips} />}
            <div className="hero-shade" />
          </div>

          <div className="hero-content">
            <p className="hero-badge">
              {profile.available && <span className="pulse" />}
              {profile.available ? "Now booking new commissions" : profile.role}
            </p>
            <h1>
              {profile.headline[0]}
              <br />
              <em>{profile.headline[1]}</em>
            </h1>
            <p className="tagline">{profile.tagline}</p>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                Explore the Collection
              </a>
              <a href="#contact" className="btn btn-ghost">
                Book a Consultation
              </a>
            </div>
          </div>

          <div className="hero-footer">
            <span>
              {profile.name} — {profile.role}
            </span>
            <span className="scroll-hint">Scroll</span>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marquee, ...marquee].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>

        {/* ───────── About ───────── */}
        <section id="about" className="section about">
          <div className="about-media reveal">
            <AutoVideo src={media.about.video} poster={media.about.poster} />
            <div className="about-badge">
              <strong>Est. {profile.since}</strong>
              <span>Handmade in {profile.city}</span>
            </div>
          </div>
          <div className="about-text reveal">
            <p className="eyebrow">About the Designer</p>
            <h2>
              Every stitch, <em>by my own hands.</em>
            </h2>
            <p className="lead">{profile.intro}</p>
            <p>{profile.about}</p>
            <p className="signature">{profile.name}</p>
            <div className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── Services ───────── */}
        <section id="services" className="section">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Services</p>
              <h2>
                From sketch <em>to final stitch.</em>
              </h2>
            </div>
            <p>
              Twelve crafts, one studio. Every stage of your garment happens under one roof, by one pair of hands, so
              quality and fit are never left to chance.
            </p>
          </div>
          <div className="services">
            {services.map((s, i) => (
              <article key={s.title} className="service reveal" style={{ transitionDelay: `${(i % 4) * 90}ms` }}>
                <AutoVideo src={s.video} poster={s.poster} className="service-video" />
                <div className="service-body">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ───────── Collection ───────── */}
        <section id="work" className="section">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">The Collection</p>
              <h2>
                Selected <em>work.</em>
              </h2>
            </div>
            <p>A selection of bridal, evening, formal and editorial pieces. Tap any look to see it in motion.</p>
          </div>
          <Gallery />
        </section>

        {/* ───────── Process ───────── */}
        <section id="process" className="section">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">The Process</p>
              <h2>
                How your outfit <em>comes to life.</em>
              </h2>
            </div>
            <p>A simple, personal process with you involved at every step, from the first chat to the final fitting.</p>
          </div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="step-dot" />
                <span className="num">Step {String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ───────── Testimonials ───────── */}
        <section id="testimonials" className="section">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">Kind Words</p>
              <h2>
                Loved by <em>my clients.</em>
              </h2>
            </div>
          </div>
          <div className="testimonials">
            {testimonials.map((t, i) => (
              <figure key={t.name} className="testimonial reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </span>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <span className="avatar">{t.name[0]}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.detail}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ───────── CTA band ───────── */}
        <section className="cta">
          <AutoVideo src={media.cta.video} poster={media.cta.poster} className="cta-video" />
          <div className="cta-inner reveal">
            <p className="eyebrow">Your Moment</p>
            <h2>
              Your dream outfit,
              <br />
              <em>made to measure.</em>
            </h2>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Book a Consultation
              </a>
              <a href={wa} className="btn btn-ghost" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ───────── Contact ───────── */}
        <section id="contact" className="section contact">
          <div className="contact-info reveal">
            <p className="eyebrow">Contact</p>
            <h2>
              Let&apos;s create <em>something beautiful.</em>
            </h2>
            <p>Tell me about your occasion and I&apos;ll get back to you within 24 hours.</p>
            <ul>
              <li>
                <span>Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span>WhatsApp</span>
                <a href={wa} target="_blank" rel="noreferrer">
                  {profile.phone}
                </a>
              </li>
              <li>
                <span>Studio</span>
                <p>{profile.studio}</p>
              </li>
              <li>
                <span>Hours</span>
                <p>{profile.hours}</p>
              </li>
            </ul>
          </div>
          <div className="reveal">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="logo">
              {profile.brand}
              <span>.</span>
            </a>
            <p>{profile.role}. Bespoke pieces designed, cut and stitched by hand in {profile.city}.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#work">Collection</a>
            <a href="#process">Process</a>
          </div>
          <div>
            <h4>Services</h4>
            {services.slice(0, 6).map((s) => (
              <a key={s.title} href="#services">
                {s.title}
              </a>
            ))}
          </div>
          <div>
            <h4>Follow</h4>
            <a href={profile.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={profile.pinterest} target="_blank" rel="noreferrer">
              Pinterest
            </a>
            <a href={wa} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

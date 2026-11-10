"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import AutoVideo, { prepareForAutoplay } from "@/components/AutoVideo";
import { categories, works, type Category } from "@/data/portfolio";

const PER_PAGE = 8;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");
  const [page, setPage] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const visible = active === "All" ? works : works.filter((w) => w.category === active);
  const pages = Array.from({ length: Math.ceil(visible.length / PER_PAGE) }, (_, i) =>
    visible.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE)
  );
  const go = useCallback((p: number) => setPage((p + pages.length) % pages.length), [pages.length]);
  const open = openIndex === null ? null : visible[openIndex];
  const step = useCallback(
    (d: number) => setOpenIndex((i) => (i === null ? i : (i + d + visible.length) % visible.length)),
    [visible.length]
  );

  // Sliding pill behind the active category tab.
  const tabsRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      const el = tabsRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  useEffect(() => setPage(0), [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, step]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <div className="collection-bar">
        <div className="tabs" role="tablist" aria-label="Collection categories" ref={tabsRef}>
          <span className="tabs-pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} />
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              className={active === c ? "tab tab-active" : "tab"}
              onClick={() => setActive(c)}
            >
              {c}
              <sup>{c === "All" ? works.length : works.filter((w) => w.category === c).length}</sup>
            </button>
          ))}
        </div>
        <p className="collection-range">
          Showing <strong>{page * PER_PAGE + 1}–{Math.min((page + 1) * PER_PAGE, visible.length)}</strong> of{" "}
          {visible.length} pieces
        </p>
      </div>

      <div
        className="slider"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || pages.length < 2) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(page + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <div className="slider-track" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((items, pi) => (
            <div
              key={`${active}-${pi}`}
              className={`bento slider-page${pi === page ? " is-active" : ""}${pi % 2 ? " is-flipped" : ""}`}
              aria-hidden={pi !== page}
            >
              {items.map((w, i) => {
                const index = pi * PER_PAGE + i;
                const kind = i === 0 ? " card-feature" : i === 5 ? " card-wide" : "";
                return (
                  <button
                    key={w.id}
                    className={`card${kind}`}
                    style={{ ["--i" as string]: i }}
                    onClick={() => setOpenIndex(index)}
                    tabIndex={pi === page ? 0 : -1}
                    aria-label={`View ${w.title}`}
                  >
                    {w.video ? (
                      <AutoVideo src={w.video} poster={w.image} className="card-video" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img className="card-video" src={w.image} alt={w.title} loading="lazy" />
                    )}
                    <span className="card-tag">{w.category}</span>
                    <span className="card-no">{pad(index + 1)}</span>
                    <span className="card-play" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="18" height="18">
                        <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                      </svg>
                    </span>
                    <div className="card-info">
                      <p className="card-meta">
                        {w.fabric} · {w.year}
                      </p>
                      <h3>{w.title}</h3>
                      {i === 0 && w.note && <p className="card-note">{w.note}</p>}
                      {i === 0 && <span className="card-cta">View the piece →</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 && (
        <div className="slider-nav">
          <div className="slider-count">
            <strong>{pad(page + 1)}</strong>
            <span>/ {pad(pages.length)}</span>
          </div>
          <div className="slider-progress">
            {pages.map((_, i) => (
              <button
                key={i}
                className={i === page ? "slider-seg is-active" : i < page ? "slider-seg is-done" : "slider-seg"}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="slider-arrows">
            <button className="slider-arrow" onClick={() => go(page - 1)} aria-label="Previous page">
              ←
            </button>
            <button className="slider-arrow slider-arrow-next" onClick={() => go(page + 1)} aria-label="Next page">
              →
            </button>
          </div>
        </div>
      )}

      {open && openIndex !== null && (
        <div className="lightbox" onClick={() => setOpenIndex(null)} role="dialog" aria-modal="true" aria-label={open.title}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()} key={open.id}>
            <button className="close" onClick={() => setOpenIndex(null)} aria-label="Close">
              ×
            </button>
            <div className="lightbox-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="lightbox-backdrop" src={open.image} alt="" aria-hidden="true" />
              {open.videoHd || open.video ? (
                <video
                  ref={(v) => {
                    if (!v) return;
                    prepareForAutoplay(v);
                    v.play().catch(() => {});
                  }}
                  src={open.videoHd || open.video}
                  poster={open.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={open.image} alt={open.title} />
              )}
            </div>
            <div className="lightbox-text">
              <span className="eyebrow">
                {open.category} · {open.year}
              </span>
              <h3>{open.title}</h3>
              {open.note && <p>{open.note}</p>}
              <dl>
                <div>
                  <dt>Fabric</dt>
                  <dd>{open.fabric}</dd>
                </div>
                <div>
                  <dt>Made by</dt>
                  <dd>Designed, cut & stitched in-house</dd>
                </div>
              </dl>
              <a href="#contact" className="btn btn-primary" onClick={() => setOpenIndex(null)}>
                Request a similar piece
              </a>
              <div className="lightbox-nav">
                <button onClick={() => step(-1)} aria-label="Previous piece">
                  ← Prev
                </button>
                <span>
                  {pad(openIndex + 1)} / {pad(visible.length)}
                </span>
                <button onClick={() => step(1)} aria-label="Next piece">
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

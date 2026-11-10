"use client";

import { useEffect, useRef } from "react";

// Mobile browsers (iOS Safari, Chrome Android) only allow autoplay when the video is
// muted *as an HTML attribute*. React sets `muted` only as a property, so we force both.
export function prepareForAutoplay(v: HTMLVideoElement) {
  v.muted = true;
  v.defaultMuted = true;
  v.setAttribute("muted", "");
  v.setAttribute("playsinline", "");
  v.setAttribute("webkit-playsinline", "");
}

// If autoplay is still blocked (e.g. iOS Low Power Mode), start on the first touch/click.
export function playWithFallback(v: HTMLVideoElement) {
  const p = v.play();
  if (!p) return;
  p.catch(() => {
    const retry = () => {
      v.play().catch(() => {});
      window.removeEventListener("touchstart", retry);
      window.removeEventListener("click", retry);
    };
    window.addEventListener("touchstart", retry, { once: true, passive: true });
    window.addEventListener("click", retry, { once: true });
  });
}

// A muted, looping background video that only loads and plays while it's on screen.
export default function AutoVideo({ src, poster, className }: { src: string; poster?: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    prepareForAutoplay(v);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? playWithFallback(v) : v.pause()),
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}

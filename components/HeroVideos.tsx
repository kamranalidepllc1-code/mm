"use client";

import { useEffect, useRef, useState } from "react";
import type { HeroClip } from "@/data/portfolio";

// Plays the hero clips one after another (e.g. Cutting → Stitching → Ready for the shoot)
// with a cross-fade, a caption and a progress bar for each scene.
const SCENE_SECONDS = 8; // longest time each clip plays before moving on
export default function HeroVideos({ clips }: { clips: HeroClip[] }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  const next = () => setActive((a) => (a + 1) % clips.length);

  return (
    <>
      {clips.map((c, i) => (
        <video
          key={c.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`hero-video hero-clip${i === active ? " is-active" : ""}`}
          src={c.src}
          poster={c.poster || undefined}
          muted
          playsInline
          preload={i === active ? "auto" : "metadata"}
          autoPlay={i === 0}
          loop={clips.length === 1}
          onTimeUpdate={(e) => {
            if (i !== active) return;
            const v = e.currentTarget;
            const length = Math.min(v.duration || SCENE_SECONDS, SCENE_SECONDS);
            setProgress(Math.min(v.currentTime / length, 1));
            if (clips.length > 1 && v.currentTime >= SCENE_SECONDS) next();
          }}
          onEnded={next}
        />
      ))}

      {clips.length > 1 && (
        <div className="hero-scenes" aria-label="Video scenes">
          {clips.map((c, i) => (
            <button
              key={c.src}
              className={`hero-scene${i === active ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="hero-scene-bar">
                <span style={{ transform: `scaleX(${i === active ? progress : i < active ? 1 : 0})` }} />
              </span>
              <span className="hero-scene-num">0{i + 1}</span>
              <span className="hero-scene-label">{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import Preloader from "@/components/sections/Preloader";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";

export default function Home() {
  const signalRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [starsOpacity, setStarsOpacity] = useState(1);

  // Signal Lost fade in
  useEffect(() => {
    const el = signalRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      el.style.opacity = String(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stars fade out before About, pitch black during, fade back in after
  useEffect(() => {
    const onScroll = () => {
      const aboutEl = aboutRef.current;
      if (!aboutEl) return;

      const rect = aboutEl.getBoundingClientRect();
      const vh = window.innerHeight;

      // well before About — full stars
      if (rect.top > vh * 1.5) {
        setStarsOpacity(1);
        return;
      }

      // inside About — pitch black
      if (rect.top <= 0 && rect.bottom >= vh) {
        setStarsOpacity(0);
        return;
      }

      // approaching About — fade out
      if (rect.top > 0 && rect.top <= vh * 1.5) {
        setStarsOpacity(rect.top / (vh * 1.5));
        return;
      }

      // About leaving top — fade back in
      if (rect.bottom < vh && rect.bottom > 0) {
        setStarsOpacity(1 - rect.bottom / vh);
        return;
      }

      // fully past About
      if (rect.bottom <= 0) {
        setStarsOpacity(1);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-space-void">
      {/* Stars with scroll-driven opacity */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: starsOpacity }}
      >
        <StarsBackground className="absolute inset-0" />
      </div>

      <ShootingStars
        starColor="#c8e000"
        trailColor="#7ab804"
        minSpeed={8}
        maxSpeed={20}
        minDelay={800}
        maxDelay={2400}
      />

      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <Hero />

        {/* Signal Lost void */}
        <div className="relative w-full h-[300vh] z-10">
          <div
            ref={signalRef}
            className="sticky top-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
            style={{ opacity: 0, marginTop: "200vh" }}
          >
            <p className="font-mono text-xs tracking-[0.8em] text-hud-text opacity-60 mb-4">
              SIGNAL LOST · TAU CETI · 11.9 LY
            </p>
            <h2 className="font-display text-3xl md:text-5xl tracking-[0.2em] text-astrophage-core text-center">
              DARKNESS BETWEEN STARS
            </h2>
            <div className="mt-8 w-px h-16 bg-gradient-to-b from-astrophage-core to-transparent opacity-40" />
          </div>
        </div>

        <Work />
        <Skills />

        {/* About wrapper for star opacity tracking */}
        <div ref={aboutRef}>
          <About />
        </div>

      </div>
    </main>
  );
}
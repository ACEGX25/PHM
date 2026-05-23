// src/components/sections/Preloader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const FULL_NAME = "GEETESH KARJAVKAR";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>?/|\\";
const CYCLES_PER_LETTER = 8;   // random scrambles before a letter resolves
const TICK_MS = 40;            // ms between scramble frames
const STAGGER_MS = 60;         // ms between each letter starting to resolve

interface PreloaderProps {
  onComplete?: () => void;     // called after exit animation finishes
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [displayed, setDisplayed] = useState<string[]>(
  FULL_NAME.split("").map((c) => (c === " " ? " " : "?"))
);

  // -- Scramble effect -------------------------------------------------------
  useEffect(() => {
    const letters = FULL_NAME.split("");
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    letters.forEach((targetChar, i) => {
      if (targetChar === " ") return; // skip spaces

      const startDelay = i * STAGGER_MS;

      let cycle = 0;
      let interval: ReturnType<typeof setInterval>;

      const t = setTimeout(() => {
        interval = setInterval(() => {
          setDisplayed((prev) => {
            const next = [...prev];
            next[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            return next;
          });

          cycle++;
          if (cycle >= CYCLES_PER_LETTER) {
            clearInterval(interval);
            setDisplayed((prev) => {
              const next = [...prev];
              next[i] = targetChar;
              return next;
            });
          }
        }, TICK_MS);
      }, startDelay);

      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // -- Exit animation after scramble resolves --------------------------------
  const totalScrambleDuration =
    FULL_NAME.length * STAGGER_MS + CYCLES_PER_LETTER * TICK_MS + 400; // buffer

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: totalScrambleDuration / 1000 });

      // flash the name once
      tl.to(lettersRef.current, {
        opacity: 0,
        stagger: 0.03,
        duration: 0.15,
        ease: "power2.in",
      })
        .to(lettersRef.current, {
          opacity: 1,
          stagger: 0.03,
          duration: 0.15,
          ease: "power2.out",
        })
        // fade entire container out
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          delay: 0.3,
          onComplete: () => onComplete?.(),
        });
    },
    { scope: containerRef }
  );

  // ---------------------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-void"
    >
      {/* Scrambled name */}
      <h1 className="font-display text-4xl md:text-6xl tracking-[0.3em] text-astrophage-core">
        {displayed.map((char, i) => (
          <span
            key={i}
            ref={(el) => { lettersRef.current[i] = el; }}
            className={char === " " ? "inline-block w-6" : "inline-block"}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* HUD sub-label */}
      <p className="font-mono text-xs tracking-[0.5em] text-hud-text mt-6 opacity-60">
        INITIALISING SYSTEMS
      </p>

      {/* Thin progress bar */}
      <div className="absolute bottom-12 w-48 h-px bg-astrophage-deep/30">
        <div
          className="h-full bg-astrophage-core origin-left"
          style={{
            animation: `preloader-bar ${totalScrambleDuration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}
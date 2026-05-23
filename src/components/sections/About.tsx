// src/components/sections/About.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { Vortex } from "@/components/ui/vortex";

const SKILLS = [
  { label: "FRONTEND DEV", value: 88 },
  { label: "BACKEND DEV", value: 78 },
  { label: "UI/UX DESIGN", value: 72 },
  { label: "DEVOPS", value: 65 },
  { label: "MOTION & GSAP", value: 70 },
];

type Phase = "warning" | "burst" | "content";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("warning");
  const [hasTriggered, setHasTriggered] = useState(false);

  // Trigger sequence when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          setPhase("warning");

          // warning holds for 2s → burst
          setTimeout(() => setPhase("burst"), 2000);

          // burst holds for 1.2s → content
          setTimeout(() => setPhase("content"), 3200);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
     {/* Only mount vortex when burst or content phase */}
{phase !== "warning" && (
  <div
  className="absolute inset-0 transition-opacity duration-1000"
  style={{ opacity: (phase === "burst" || phase === "content") ? 1 : 0 }}
>
  <Vortex
    particleCount={800}
    baseHue={15}
    baseSpeed={phase === "burst" ? 6 : 0.2}
    rangeSpeed={phase === "burst" ? 3 : 0.5}
    baseRadius={1.5}
    rangeRadius={2}
    rangeY={600}
    backgroundColor="transparent"
    containerClassName="absolute inset-0 w-full h-full"
    className="w-full h-full"
  />
</div>
)}

    

      {/* ── Phase 1: IR Warning ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center transition-opacity duration-500"
        style={{ opacity: phase === "warning" ? 1 : 0, pointerEvents: "none" }}
      >
        {/* Scanline flicker border */}
        <div
          className="border border-ir-hot/60 px-10 py-6 flex flex-col items-center gap-3"
          style={{
            boxShadow: "0 0 40px rgba(255,107,26,0.3), inset 0 0 40px rgba(255,107,26,0.05)",
            animation: "ir-flicker 0.15s infinite alternate",
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.6em] text-ir-hot/60">
            ⚠ SYSTEM ALERT ⚠
          </p>
          <h3 className="font-display text-2xl md:text-4xl tracking-[0.2em] text-ir-hot text-center">
            CAUTION
          </h3>
          <div className="w-full h-px bg-ir-hot/30" />
          <p className="font-mono text-sm tracking-[0.4em] text-ir-peak text-center">
            SWITCHING TO IR SPECTRUM
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-ir-hot/50 mt-1">
            ASTROPHAGE SIGNATURE DETECTED · SECTOR 7
          </p>
        </div>

        {/* Corner brackets */}
        {["top-8 left-8", "top-8 right-8", "bottom-8 left-8", "bottom-8 right-8"].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} w-6 h-6`}
            style={{
              borderTopWidth: i < 2 ? "1px" : "0",
              borderBottomWidth: i >= 2 ? "1px" : "0",
              borderLeftWidth: i % 2 === 0 ? "1px" : "0",
              borderRightWidth: i % 2 === 1 ? "1px" : "0",
              borderColor: "rgba(255,107,26,0.4)",
            }}
          />
        ))}
      </div>

      {/* ── Phase 3: About Content ── */}
      <div
        className="relative z-20 w-full min-h-screen flex items-center justify-center px-8 md:px-16 transition-opacity duration-700"
        style={{ opacity: phase === "content" ? 1 : 0, pointerEvents: phase === "content" ? "auto" : "none" }}
      >
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — Mission Brief */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.6em] text-ir-hot opacity-70 mb-2">
                04 · MISSION BRIEF
              </p>
              <h2 className="font-display text-4xl md:text-5xl tracking-[0.1em] text-white">
                ABOUT THE<br />
                <span className="text-astrophage-core">OPERATOR</span>
              </h2>
            </div>

            <div className="w-12 h-px bg-astrophage-core opacity-40" />

            <p className="font-mono text-sm text-white/60 leading-relaxed">
              Designer and developer operating at the intersection of
              motion, systems thinking, and deep-space aesthetics.
              Obsessed with interfaces that feel alive — where every
              pixel has intent and every interaction has weight.
            </p>

            <p className="font-mono text-sm text-white/40 leading-relaxed">
              Currently accepting missions. Based on Earth,
              reachable across 11.9 light years.
            </p>

            <div className="flex gap-4 mt-2">
              <span className="font-mono text-[10px] tracking-[0.3em] text-astrophage-deep border border-astrophage-deep/30 px-3 py-1">
                AVAILABLE FOR HIRE
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-ir-hot/60 border border-ir-hot/20 px-3 py-1">
                OPEN TO COLLAB
              </span>
            </div>
          </div>

          {/* Right — Systems Status */}
          <div className="flex flex-col gap-6">
            <p className="font-mono text-[10px] tracking-[0.6em] text-hud-text opacity-60">
              SYSTEMS STATUS · SKILL READOUT
            </p>

            <div className="flex flex-col gap-5">
              {SKILLS.map((skill) => (
                <div key={skill.label} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-hud-text">
                      {skill.label}
                    </span>
                    <span className="font-mono text-[10px] text-astrophage-core opacity-60">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="w-full h-px bg-white/10">
                    <div
                      className="h-full bg-astrophage-core transition-all duration-1000"
                      style={{
                        width: phase === "content" ? `${skill.value}%` : "0%",
                        boxShadow: "0 0 8px rgba(200,224,0,0.6)",
                        transitionDelay: `${SKILLS.indexOf(skill) * 150}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* HUD coordinates */}
            <div className="mt-4 border border-white/5 p-4 flex flex-col gap-1">
              <p className="font-mono text-[9px] tracking-[0.4em] text-hud-text/40">
                OPERATOR COORDINATES
              </p>
              <p className="font-mono text-xs text-hud-text/60">
                18°31'N 73°51'E · PUNE, INDIA
              </p>
              <p className="font-mono text-[9px] text-white/20 mt-1">
                SIGNAL STRENGTH: OPTIMAL
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
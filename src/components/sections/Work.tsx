// src/components/sections/Work.tsx
"use client";

import { useRef } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Timeline } from "@/components/ui/timeline";

// ---------------------------------------------------------------------------
// Project data — swap in your real projects here
// ---------------------------------------------------------------------------
function ProjectVisual({
  label,
  accent,
  index,
}: {
  label: string;
  accent: string;
  index: number;
}) {
  const patterns = [
    // grid
    "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(200,224,0,0.08) 39px,rgba(200,224,0,0.08) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(200,224,0,0.08) 39px,rgba(200,224,0,0.08) 40px)",
    // diagonal
    "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,107,26,0.07) 20px,rgba(255,107,26,0.07) 21px)",
    // concentric
    "radial-gradient(circle at 50% 50%,rgba(122,184,4,0.12) 0%,transparent 40%,rgba(122,184,4,0.06) 41%,transparent 60%)",
    // scanlines
    "repeating-linear-gradient(180deg,transparent,transparent 3px,rgba(255,34,0,0.05) 3px,rgba(255,34,0,0.05) 4px)",
  ];

  return (
    <div
      className="relative w-full h-full min-h-[320px] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center"
      style={{ background: "#0d1103", backgroundImage: patterns[index] }}
    >
      {/* Corner brackets */}
      {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map(
        (pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} w-4 h-4 border-white/20`}
            style={{
              borderTopWidth: i < 2 ? "1px" : "0",
              borderBottomWidth: i >= 2 ? "1px" : "0",
              borderLeftWidth: i % 2 === 0 ? "1px" : "0",
              borderRightWidth: i % 2 === 1 ? "1px" : "0",
            }}
          />
        )
      )}

      {/* Center glow orb */}
      <div
        className="absolute w-32 h-32 rounded-full opacity-20 blur-3xl"
        style={{ background: accent }}
      />

      {/* Label */}
      <p
        className="font-mono text-xs tracking-[0.4em] z-10"
        style={{ color: accent }}
      >
        {label}
      </p>

      {/* Bottom status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
      />
    </div>
  );
}
const projects = [
  {
    title: "PROJECT ARES",
    description:
      "A mission-critical dashboard for tracking deep-space telemetry. Built for speed, designed for darkness. Real-time data streams rendered at 60fps with zero compromises.",
    stack: ["Next.js", "WebGL", "Rust", "WebSockets"],
    year: "2024",
    status: "DEPLOYED",
    link: "#",
    content: (
      <ProjectVisual
        label="ARES · TELEMETRY DASH"
        accent="#c8e000"
        index={0}
      />
    ),
  },
  {
    title: "PROJECT LYRA",
    description:
      "Generative identity system for a music collective. Each render is unique — seeded by the listener's coordinates and time of play. No two covers alike.",
    stack: ["Three.js", "GLSL", "p5.js", "Vercel"],
    year: "2024",
    status: "LIVE",
    link: "#",
    content: (
      <ProjectVisual
        label="LYRA · GENERATIVE ID"
        accent="#ff6b1a"
        index={1}
      />
    ),
  },
  {
    title: "PROJECT VOID",
    description:
      "E-commerce rebuilt from scratch for a zero-gravity apparel brand. Checkout in under 3 steps. Performance score: 99. Bounce rate: down 40%.",
    stack: ["Remix", "Shopify", "Framer Motion", "TypeScript"],
    year: "2023",
    status: "DEPLOYED",
    link: "#",
    content: (
      <ProjectVisual
        label="VOID · COMMERCE"
        accent="#7ab804"
        index={2}
      />
    ),
  },
  {
    title: "PROJECT TETHER",
    description:
      "Internal design system for a fintech startup. 60+ components, dark-first, fully accessible. Cut their UI build time by 70%.",
    stack: ["React", "Radix UI", "Storybook", "Figma"],
    year: "2023",
    status: "INTERNAL",
    link: "#",
    content: (
      <ProjectVisual
        label="TETHER · DESIGN SYSTEM"
        accent="#ff2200"
        index={3}
      />
    ),
  },
];

// ---------------------------------------------------------------------------
// Right-side visual panel per project
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Formatted content for StickyScroll
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
    >
      {/* Shooting stars background — fixed behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShootingStars
          starColor="#c8e000"
          trailColor="#7ab804"
          minSpeed={8}
          maxSpeed={20}
          minDelay={800}
          maxDelay={2400}
        />
      </div>

      {/* Section header */}
      <div className="relative z-10 pt-32 pb-16 px-8 md:px-16">
        <p className="font-mono text-xs tracking-[0.6em] text-hud-text opacity-60 mb-3">
          02 · MISSION LOG
        </p>
        <h2 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-white">
          SELECTED<br />
          <span className="text-astrophage-core">WORK</span>
        </h2>
      </div>

      {/* Sticky scroll */}
      <div className="relative z-10">
        <Timeline data={projects.map((p) => ({
  title: p.year,
  content: (
    <div className="space-y-4">
      <p className="font-mono text-xs tracking-[0.6em] text-hud-text opacity-60">
        {p.status}
      </p>
      <h3 className="font-display text-2xl tracking-[0.1em] text-white">
        {p.title}
      </h3>
      <p className="font-mono text-sm text-white/60 leading-relaxed">
        {p.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span key={s} className="font-mono text-[10px] tracking-widest text-astrophage-deep border border-astrophage-deep/30 px-2 py-0.5 rounded-sm">
            {s}
          </span>
        ))}
      </div>
      <a href={p.link} className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-ir-hot hover:text-ir-peak transition-colors">
        VIEW MISSION <span>→</span>
      </a>
    </div>
  ),
}))} />
      </div>
    </section>
  );
}
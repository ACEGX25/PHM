"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { testimonials } from "@/lib/testimonials";
import Link from "next/link";

gsap.registerPlugin(MotionPathPlugin);

export default function TestimonialsPage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    function createTimeline() {
      ctx?.revert();

      ctx = gsap.context(() => {
        const box = document.querySelector<HTMLElement>(".signal-box");
        if (!box) return;

        const boxStartRect = box.getBoundingClientRect();
        const containers = gsap.utils.toArray<HTMLElement>(".waypoint:not(.initial)");

        const points = containers.map(container => {
          const marker = container.querySelector<HTMLElement>(".marker") || container;
          const r = marker.getBoundingClientRect();
          return {
            x: r.left + r.width / 2 - (boxStartRect.left + boxStartRect.width / 2),
            y: r.top + r.height / 2 - (boxStartRect.top + boxStartRect.height / 2),
          };
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".waypoint.initial",
            start: "clamp(top center)",
            endTrigger: ".final-marker",
            end: "clamp(top center)",
            scrub: 1,
          },
        });

        tl.to(".signal-box", {
          duration: 1,
          ease: "none",
          motionPath: {
            path: points,
            curviness: 1.5,
          },
        });

        // Fade cards in/out at each waypoint
        testimonials.forEach((_, i) => {
          ScrollTrigger.create({
            trigger: `#waypoint-${i}`,
            start: "top center",
            end: "bottom center",
            onEnter: () => gsap.to(`#card-${i}`, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }),
            onLeave: () => gsap.to(`#card-${i}`, { opacity: 0, y: -20, duration: 0.4 }),
            onEnterBack: () => gsap.to(`#card-${i}`, { opacity: 1, y: 0, duration: 0.6 }),
            onLeaveBack: () => gsap.to(`#card-${i}`, { opacity: 0, y: 20, duration: 0.4 }),
          });
        });
      });
    }

    createTimeline();
    window.addEventListener("resize", createTimeline);

    return () => {
      ctx?.revert();
      window.removeEventListener("resize", createTimeline);
    };
  }, []);

  // Generate zigzag positions — alternating left/right
  const positions = [
    { left: "60%", top: "5%" },
    { left: "10%", top: "20%" },
    { left: "65%", top: "35%" },
    { left: "15%", top: "50%" },
    { left: "60%", top: "65%" },
    { left: "10%", top: "80%" },
    { left: "55%", top: "92%" },
  ];

  return (
    <main ref={mainRef} className="bg-space-void min-h-screen">
      {/* Stars background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Back nav */}
      <div className="fixed top-8 left-8 z-50">
        <Link
          href="/"
          className="font-mono text-[10px] tracking-[0.4em] text-white/40 hover:text-astrophage-core transition-colors"
        >
          ← BACK TO MISSION
        </Link>
      </div>

      {/* Header */}
      <div className="text-center pt-32 pb-16 px-8 relative z-10">
        <p className="font-mono text-xs tracking-[0.6em] text-hud-text opacity-60 mb-3">
          FULL ARCHIVE
        </p>
        <h1 className="font-display text-5xl md:text-7xl tracking-[0.1em] text-white">
          MISSION<br />
          <span className="text-astrophage-core">LOGS</span>
        </h1>
        <p className="font-mono text-xs tracking-[0.3em] text-white/30 mt-6">
          SCROLL TO NAVIGATE TRANSMISSIONS
        </p>
      </div>

      {/* Spacer */}
      <div className="h-[20vh]" />

      {/* Main scroll area */}
      <div
        className="relative z-10"
        style={{ height: "300vh" }}
      >
        {/* Signal box — starts at initial waypoint */}
        <div
          className="waypoint initial absolute"
          style={{ left: positions[0].left, top: positions[0].top }}
        >
          {/* The moving element */}
          <div className="signal-box absolute" style={{ width: "16px", height: "16px", zIndex: 20 }}>
            <div
              className="w-4 h-4 rounded-full bg-astrophage-core"
              style={{ boxShadow: "0 0 12px #c8e000, 0 0 24px rgba(200,224,0,0.5)" }}
            />
          </div>

          {/* Card 0 */}
          <div
            id="card-0"
            className="absolute w-80"
            style={{ opacity: 0, transform: "translateY(20px)", left: "30px", top: "-20px" }}
          >
            <TestimonialCard t={testimonials[0]} index={0} />
          </div>
        </div>

        {/* Remaining waypoints */}
        {testimonials.slice(1).map((t, i) => {
          const pos = positions[i + 1] || positions[i % positions.length];
          const isLeft = (i + 1) % 2 !== 0;
          return (
            <div
              key={t.id}
              id={`waypoint-${i + 1}`}
              className="waypoint absolute"
              style={{ left: pos.left, top: pos.top }}
            >
              {/* Marker dot */}
              <div className="marker w-4 h-4 rounded-full border border-astrophage-core/40 bg-space-void"
                style={{ boxShadow: "0 0 8px rgba(200,224,0,0.2)" }}
              />

              {/* Card */}
              <div
                id={`card-${i + 1}`}
                className="absolute w-80"
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  left: isLeft ? "30px" : "auto",
                  right: isLeft ? "auto" : "30px",
                  top: "-20px",
                }}
              >
                <TestimonialCard t={t} index={i + 1} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Final marker */}
      <div className="final-marker h-[20vh] flex items-center justify-center relative z-10">
        <p className="font-mono text-[10px] tracking-[0.6em] text-white/20">
          END OF TRANSMISSION LOG
        </p>
      </div>
    </main>
  );
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
  return (
    <div className="border border-astrophage-deep/30 bg-space-void/90 backdrop-blur-sm p-6 flex flex-col gap-4">
      <span className="font-mono text-[9px] tracking-[0.4em] text-astrophage-core/40">
        LOG {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
      </span>
      <p className="font-mono text-sm text-white/70 leading-relaxed">
        "{t.quote}"
      </p>
      <div className="w-8 h-px bg-astrophage-core opacity-40" />
      <div className="flex flex-col gap-1">
        <span className="font-display text-sm tracking-[0.2em] text-white">
          {t.name}
        </span>
        {(t.role || t.company) && (
          <span className="font-mono text-[10px] tracking-[0.3em] text-hud-text opacity-60">
            {t.role}{t.role && t.company ? " · " : ""}{t.company}
          </span>
        )}
      </div>
    </div>
  );
}
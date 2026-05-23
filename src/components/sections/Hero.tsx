"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TauCeti from "../ui/TauCeti";


export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const planetRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const moonARef = useRef<HTMLDivElement>(null);
  const moonBRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  // add this ref at the top
  const transitionTextRef = useRef<HTMLDivElement>(null);
  const nameOverlayRef = useRef<HTMLDivElement>(null);
  // Entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    tl.from(nameRef.current, {
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: "power3.out",
    }).from(subRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    }, "-=0.6");
  }, { scope: sectionRef });

  // Scroll lighting — pure CSS variable on section, no GSAP needed
useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;

  const ctx = gsap.context(() => {
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;
        section.style.setProperty("--scroll-p", String(p));

        if (overlayRef.current) {
          overlayRef.current.style.opacity = String(p * 0.92);
        }
        if (moonARef.current) moonARef.current.style.filter = `brightness(${1 - p * 0.85})`;
        if (moonBRef.current) moonBRef.current.style.filter = `brightness(${1 - p * 0.85})`;
        if (transitionTextRef.current) {
          const textOpacity = Math.max(0, (p - 0.7) / 0.3);
          transitionTextRef.current.style.opacity = String(textOpacity);
        }
      },
    });
  }, section);

  return () => ctx.revert();
}, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen"
      style={{ "--scroll-p": "0" } as React.CSSProperties}
    >

      {/* Planet wrapper */}
      <div
        ref={planetRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%]"
        style={{
          width: "min(80vw, 80vh)",
          height: "min(80vw, 80vh)",
        }}
      >
        {/* ── Planet body ── */}
        <div className="absolute inset-0 rounded-full overflow-hidden">

          {/* Light surface — driven by CSS variable */}
          <div
            className="planet-lit absolute inset-0 rounded-full"
          />

          {/* Atmosphere bands */}
          <div
            className="absolute inset-0 rounded-full opacity-40"
            style={{
              background: `repeating-linear-gradient(
                180deg,
                transparent 0%,
                rgba(200,224,0,0.15) 8%,
                transparent 16%,
                rgba(122,184,4,0.1) 24%,
                transparent 32%
              )`,
            }}
          />

          {/* Astrophage limb */}
          <div
            className="absolute inset-0 rounded-full opacity-60"
            style={{
              background: `radial-gradient(ellipse at 70% 60%, rgba(100,200,120,0.35) 0%, transparent 50%),
                           radial-gradient(ellipse at 20% 70%, rgba(122,184,4,0.25) 0%, transparent 40%)`,
            }}
          />

          {/* Depth shadow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow: "inset -8px -8px 40px rgba(0,0,0,0.8), inset 4px 4px 60px rgba(100,220,140,0.15)",
            }}
          />

          {/* Scroll darkness overlay */}
          <div
            ref={overlayRef}
            className="absolute inset-0 rounded-full bg-space-void"
            style={{ opacity: 0 }}
          />
        </div>

        {/* ── Ring BEHIND ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: "rotate(-30deg)", zIndex: 0 }}
        >
          <div
            className="absolute rounded-full border-[50px] border-white/5"
            style={{ width: "145%", height: "40%", transform: "rotateX(72deg)" }}
          />
        </div>

        {/* ── Ring FRONT ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ transform: "rotate(-30deg)", zIndex: 10 }}
        >
          <div
            className="absolute rounded-full border-[50px] border-transparent border-b-white/40"
            style={{ width: "145%", height: "40%", transform: "rotateX(72deg)" }}
          />
        </div>

        {/* ── Outer glow ── */}
        <div
          className="absolute -inset-4 rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(122,184,4,0.4) 60%, transparent 100%)",
            filter: "blur(24px)",
          }}
        />

        {/* ── Moon A — 7 o'clock ── */}
        <div
          ref={moonARef}
          className="absolute rounded-full"
          style={{
            width: "18%", height: "18%",
            bottom: "-6%", left: "8%",
            background: "radial-gradient(circle at 40% 35%, #b0c060 0%, #4a6010 60%, #1a2400 100%)",
            boxShadow: "0 0 12px rgba(122,184,4,0.25), inset -3px -3px 8px rgba(0,0,0,0.6)",
          }}
        />

        {/* ── Moon B — 2 o'clock ── */}
        <div
          ref={moonBRef}
          className="absolute rounded-full"
          style={{
            width: "9%", height: "9%",
            top: "4%", right: "6%",
            background: "radial-gradient(circle at 38% 32%, #c8d880 0%, #5a7020 55%, #1a2400 100%)",
            boxShadow: "0 0 8px rgba(200,224,0,0.2), inset -2px -2px 5px rgba(0,0,0,0.6)",
          }}
        />
      </div>

      {/* Name overlay */}
      <div
      ref={nameOverlayRef} 
      className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <h1
          ref={nameRef}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] text-white"
          style={{ textShadow: "0 0 40px rgba(200,224,0,0.4)" }}
        >
          GEETESH KARJAVKAR
        </h1>
        <p
          ref={subRef}
          className="font-mono text-sm tracking-[0.6em] text-hud-text mt-4 opacity-80"
        >
          DESIGNER · DEVELOPER · EXPLORER
        </p>
      </div>
    </section>
  );
}
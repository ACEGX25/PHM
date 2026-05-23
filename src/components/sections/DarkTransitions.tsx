// src/components/sections/DarkTransition.tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ShootingStars } from "@/components/ui/shooting-stars";

export default function DarkTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
          pin: true,
        },
      }).from(textRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Shooting stars pass through this transition */}
      <ShootingStars
        starColor="#c8e000"
        trailColor="#7ab804"
        minSpeed={8}
        maxSpeed={20}
        minDelay={800}
        maxDelay={2400}
      />

      {/* Surviving text */}
      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <p className="font-mono text-xs tracking-[0.8em] text-hud-text opacity-60 mb-4">
          SIGNAL LOST · TAU CETI · 11.9 LY
        </p>
        <h2 className="font-display text-3xl md:text-5xl tracking-[0.2em] text-astrophage-core text-center">
          DARKNESS BETWEEN STARS
        </h2>
        <div className="mt-8 w-px h-16 bg-gradient-to-b from-astrophage-core to-transparent opacity-40" />
      </div>
    </section>
  );
}
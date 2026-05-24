"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, Draggable } from "@/lib/gsap";
import { testimonials } from "@/lib/testimonials";
import Link from "next/link";

export default function Testimonials() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const dragProxyRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const cardsEl = cardsRef.current;
  const dragProxy = dragProxyRef.current;
  if (!cardsEl || !dragProxy) return;

  const cards = gsap.utils.toArray<HTMLElement>(cardsEl.querySelectorAll("li"));
  const spacing = 0.1;
  const snapTime = gsap.utils.snap(spacing);

  gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

  const animateFunc = (element: HTMLElement) => {
    const tl = gsap.timeline();
    tl.fromTo(element,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false }
    ).fromTo(element,
      { xPercent: 400 },
      { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
      0
    );
    return tl;
  };

  const buildSeamlessLoop = (items: HTMLElement[], spacing: number) => {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;
    const rawSequence = gsap.timeline({ paused: true });
    const seamlessLoop = gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat(this: gsap.core.Timeline) {
        if (this.time() === this.duration()) {
          (this as any)._tTime += this.duration() - 0.01;
        }
      },
    });
    const l = items.length + overlap * 2;
    for (let i = 0; i < l; i++) {
      const index = i % items.length;
      rawSequence.add(animateFunc(items[index]), i * spacing);
    }
    rawSequence.time(startTime);
    seamlessLoop.to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none",
    }).fromTo(rawSequence,
      { time: overlap * spacing + 1 },
      { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: "none" }
    );
    return seamlessLoop;
  };

  const seamlessLoop = buildSeamlessLoop(cards, spacing);
  const playhead = { offset: 0 };
  const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

  const scrub = gsap.to(playhead, {
    offset: 0,
    onUpdate() {
      seamlessLoop.time(wrapTime(playhead.offset));
    },
    duration: 0.5,
    ease: "power3",
    paused: true,
  });

  const scrollToOffset = (offset: number) => {
    const snapped = snapTime(offset);
    scrub.vars.offset = snapped;
    scrub.invalidate().restart();
  };

  // Auto-advance every 2.5 seconds
  const interval = setInterval(() => {
    scrollToOffset(scrub.vars.offset + spacing);
  }, 2500);

  // Expose prev/next to buttons
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");

  const onNext = () => scrollToOffset(scrub.vars.offset + spacing);
  const onPrev = () => scrollToOffset(scrub.vars.offset - spacing);

  prevBtn?.addEventListener("click", onPrev);
  nextBtn?.addEventListener("click", onNext);

  // Drag support
  Draggable.create(dragProxy, {
    type: "x",
    trigger: cardsEl,
    onPress(this: any) { this.startOffset = scrub.vars.offset; },
    onDrag(this: any) {
      scrub.vars.offset = this.startOffset + (this.startX - this.x) * 0.001;
      scrub.invalidate().restart();
    },
    onDragEnd(this: any) {
      scrollToOffset(scrub.vars.offset);
    },
  });

  return () => {
    clearInterval(interval);
    prevBtn?.removeEventListener("click", onPrev);
    nextBtn?.removeEventListener("click", onNext);
  };
}, []);

return (
  <section className="relative w-full py-24">
    {/* Header */}
    <div className="text-center mb-16 px-8">
      <p className="font-mono text-xs tracking-[0.6em] text-hud-text opacity-60 mb-3">
        05 · MISSION LOGS
      </p>
      <h2 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-white">
        CAPTAIN'S<br />
        <span className="text-astrophage-core">LOG</span>
      </h2>
    </div>

    {/* Gallery */}
    <div className="relative w-full h-[400px] overflow-hidden">
      <ul
        ref={cardsRef}
        className="absolute list-none p-0 m-0"
        style={{
          width: "380px",
          height: "280px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <li
            key={i}
            className="absolute top-0 left-0 w-full h-full border border-astrophage-deep/30 bg-space-void/80 backdrop-blur-sm p-8 flex flex-col justify-between"
            style={{ borderRadius: "4px" }}
          >
            <p className="font-mono text-sm text-white/70 leading-relaxed">
              "{t.quote}"
            </p>
            <div className="flex flex-col gap-1">
              <div className="w-8 h-px bg-astrophage-core opacity-40 mb-3" />
              <span className="font-display text-sm tracking-[0.2em] text-white">
                {t.name}
              </span>
              {(t.role || t.company) && (
                <span className="font-mono text-[10px] tracking-[0.3em] text-hud-text opacity-60">
                  {t.role}{t.role && t.company ? " · " : ""}{t.company}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div ref={dragProxyRef} className="invisible absolute" />
    </div>

    {/* Controls */}
    <div className="flex justify-center gap-6 mt-8">
      <button
        id="testimonial-prev"
        className="font-mono text-xs tracking-[0.3em] text-white/40 border border-white/20 px-6 py-2 hover:border-astrophage-core hover:text-astrophage-core transition-colors"
      >
        ← PREV
      </button>
      <button
        id="testimonial-next"
        className="font-mono text-xs tracking-[0.3em] text-white/40 border border-white/20 px-6 py-2 hover:border-astrophage-core hover:text-astrophage-core transition-colors"
      >
        NEXT →
      </button>
      
    </div>
    <div className="flex justify-center gap-6 mt-8">
    <p className="font-mono text-xs tracking-[0.6em] text-hud-text opacity-60 mb-3">
        05 · MISSION LOGS ·{" "}
        <Link href="/testimonials" className="text-astrophage-core/60 hover:text-astrophage-core transition-colors">
            VIEW ALL →
        </Link>
        </p>
    </div>
  </section>
);
}
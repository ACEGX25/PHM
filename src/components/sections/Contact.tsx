"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Animate send button
    gsap.to(".send-btn", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    // Placeholder — wire to your email service later
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 px-8"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <p className="font-mono text-xs tracking-[0.6em] text-hud-text opacity-60 mb-3">
          06 · TRANSMISSION
        </p>
        <h2 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-white">
          OPEN A<br />
          <span className="text-astrophage-core">CHANNEL</span>
        </h2>
      </div>

      {/* Form */}
      <form
        ref={formRef}
        className="w-full max-w-2xl flex flex-col gap-6"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] tracking-[0.4em] text-hud-text opacity-60">
            OPERATOR NAME
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="YOUR NAME"
            className="w-full bg-transparent border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-astrophage-core/60 transition-colors"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] tracking-[0.4em] text-hud-text opacity-60">
            SIGNAL FREQUENCY
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="YOUR EMAIL"
            type="email"
            className="w-full bg-transparent border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-astrophage-core/60 transition-colors"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[10px] tracking-[0.4em] text-hud-text opacity-60">
            TRANSMISSION CONTENT
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="YOUR MESSAGE"
            rows={6}
            className="w-full bg-transparent border border-white/10 px-4 py-3 font-mono text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-astrophage-core/60 transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={status === "sending" || status === "sent"}
          className="send-btn w-full font-mono text-xs tracking-[0.4em] py-4 border transition-colors disabled:opacity-50"
          style={{
            borderColor: status === "sent" ? "#c8e000" : "rgba(200,224,0,0.4)",
            color: status === "sent" ? "#c8e000" : "rgba(255,255,255,0.8)",
            background: status === "sent" ? "rgba(200,224,0,0.05)" : "transparent",
          }}
        >
          {status === "idle" && "TRANSMIT MESSAGE →"}
          {status === "sending" && "TRANSMITTING..."}
          {status === "sent" && "SIGNAL RECEIVED ✓"}
          {status === "error" && "TRANSMISSION FAILED — RETRY"}
        </button>

        {/* HUD footer */}
        <div className="flex justify-between items-center mt-2">
          <p className="font-mono text-[9px] tracking-[0.3em] text-white/20">
            ENCRYPTED · END-TO-END
          </p>
          <p className="font-mono text-[9px] tracking-[0.3em] text-white/20">
            RESPONSE TIME · 24-48 HRS
          </p>
        </div>
      </form>
    </section>
  );
}
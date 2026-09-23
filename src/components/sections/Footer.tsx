"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 py-16 px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Left — Name + tagline */}
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-2xl tracking-[0.2em] text-white">
              GEETESH<span className="text-astrophage-core">.</span>
            </h3>
            <p className="font-mono text-[10px] tracking-[0.4em] text-hud-text opacity-50">
              DESIGNER · DEVELOPER · EXPLORER
            </p>
          </div>

          {/* Right — Nav links */}
          <div className="flex flex-wrap gap-8">
            {[
              { label: "MISSIONS", href: "#work" },
              { label: "SYSTEMS", href: "#skills" },
              { label: "BRIEF", href: "#about" },
              { label: "LOGS", href: "#testimonials" },
              { label: "TRANSMISSION", href: "#contact" },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="font-mono text-[10px] tracking-[0.3em] text-white/30 hover:text-astrophage-core transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-astrophage-deep/40 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Left — coordinates */}
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[9px] tracking-[0.4em] text-white/20">
              OPERATOR COORDINATES
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] text-hud-text/40">
              18°31'N 73°51'E · PUNE, INDIA
            </p>
          </div>

          {/* Center — END TRANSMISSION */}
          <p className="font-mono text-[10px] tracking-[0.6em] text-white/20">
            END TRANSMISSION · GK · 2025
          </p>

          {/* Right — Socials */}
          <div className="flex gap-6">
            {[
              { label: "GITHUB", href: "https://github.com" },
              { label: "LINKEDIN", href: "https://linkedin.com" },
              { label: "TWITTER", href: "https://twitter.com" },

            ].map(s => (
            <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] tracking-[0.3em] text-white/30 hover:text-astrophage-core transition-colors"
            >
                {s.label}
            </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
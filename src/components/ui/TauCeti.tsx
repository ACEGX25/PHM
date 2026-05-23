"use client";

export default function TauCeti() {
  return (
    <svg
      viewBox="0 0 800 800"
      width="800"
      height="800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="planet-filter" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.005 0.06"
            numOctaves="3"
            seed="5"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0.3 0.9 0 0 0.2
                    0.8 1.0 0 0 0.3
                    0   0   0 0 0
                    0   0   0 1 0"
            in="noise"
            result="colored"
          />
          <feComposite
            in="colored"
            in2="SourceGraphic"
            operator="in"
            result="planet"
          />
        </filter>

        <radialGradient id="core-light" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="20%" stopColor="#fffbe0" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#e8d44d" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#c8e000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#080a04" stopOpacity="0.8" />
        </radialGradient>

        <radialGradient id="atmosphere" cx="50%" cy="50%" r="50%">
          <stop offset="75%" stopColor="transparent" />
          <stop offset="90%" stopColor="#7ab804" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c8e000" stopOpacity="0.1" />
        </radialGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <radialGradient id="callisto-grad" cx="38%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#8a9a60" />
          <stop offset="40%" stopColor="#4a5a28" />
          <stop offset="100%" stopColor="#1a2008" />
        </radialGradient>

        <radialGradient id="europa-grad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#c8d8e8" />
          <stop offset="50%" stopColor="#6a8898" />
          <stop offset="100%" stopColor="#1a2830" />
        </radialGradient>
      </defs>

      {/* Atmosphere glow */}
      <circle cx="350" cy="350" r="270" fill="url(#atmosphere)" filter="url(#glow)" />

      {/* Ring BACK */}
      <ellipse
        cx="350" cy="350"
        rx="380" ry="95"
        fill="none"
        stroke="white"
        strokeWidth="16"
        opacity="0.45"
        strokeDasharray="900 200"
        strokeDashoffset="550"
        transform="rotate(-20 350 350)"
      />

      {/* Planet body */}
      <circle cx="350" cy="350" r="250" fill="#c8e000" filter="url(#planet-filter)" />

      {/* Core light */}
      <circle cx="350" cy="350" r="250" fill="url(#core-light)" />

      {/* Limb darkening */}
      <circle cx="350" cy="350" r="250" fill="none" stroke="#080a04" strokeWidth="6" opacity="0.5" />

      {/* Ring FRONT */}
      <ellipse
        cx="350" cy="350"
        rx="380" ry="95"
        fill="none"
        stroke="white"
        strokeWidth="16"
        opacity="0.5"
        strokeDasharray="530 570"
        strokeDashoffset="0"
        transform="rotate(-20 350 350)"
      />

      {/* Callisto — 2 o'clock */}
      <circle cx="520" cy="100" r="30" fill="url(#callisto-grad)" />

      {/* Europa — 7 o'clock */}
      <circle cx="90" cy="530" r="20" fill="url(#europa-grad)" />

    </svg>
  );
}
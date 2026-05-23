"use client";
import { useRef, useEffect, useState, useCallback } from "react";
const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools", "Animation"];
import { gsap, Flip } from "@/lib/gsap";

const skills = [
  { name: "JavaScript", icon: "devicon-javascript-plain colored", category: "Frontend", x: "5%", y: "5%", r: "-3deg" },
  { name: "HTML", icon: "devicon-html5-plain colored", category: "Frontend", x: "18%", y: "2%", r: "2deg" },
  { name: "CSS", icon: "devicon-css3-plain colored", category: "Frontend", x: "32%", y: "8%", r: "-1deg" },
  { name: "React", icon: "devicon-react-original colored", category: "Frontend", x: "48%", y: "3%", r: "3deg" },
  { name: "Next.js", icon: "devicon-nextjs-plain", category: "Frontend", x: "65%", y: "6%", r: "-2deg" },
  { name: "Java", icon: "devicon-java-plain colored", category: "Backend", x: "80%", y: "2%", r: "1deg" },
  { name: "Python", icon: "devicon-python-plain colored", category: "Backend", x: "10%", y: "35%", r: "2deg" },
  { name: "C++", icon: "devicon-cplusplus-plain colored", category: "Backend", x: "28%", y: "30%", r: "-3deg" },
  { name: "Node.js", icon: "devicon-nodejs-plain colored", category: "Backend", x: "45%", y: "38%", r: "1deg" },
  { name: "Spring Boot", icon: "devicon-spring-plain colored", category: "Backend", x: "62%", y: "32%", r: "-2deg" },
  { name: "MongoDB", icon: "devicon-mongodb-plain colored", category: "Database", x: "78%", y: "36%", r: "3deg" },
  { name: "MySQL", icon: "devicon-mysql-plain colored", category: "Database", x: "5%", y: "62%", r: "-1deg" },
  { name: "PostgreSQL", icon: "devicon-postgresql-plain colored", category: "Database", x: "22%", y: "68%", r: "2deg" },
  { name: "Git", icon: "devicon-git-plain colored", category: "DevOps", x: "40%", y: "60%", r: "-3deg" },
  { name: "GitHub", icon: "devicon-github-original", category: "DevOps", x: "57%", y: "65%", r: "1deg" },
  { name: "VS Code", icon: "devicon-vscode-plain colored", category: "Tools", x: "72%", y: "58%", r: "-2deg" },
  { name: "PyCharm", icon: "devicon-pycharm-plain colored", category: "Tools", x: "85%", y: "63%", r: "3deg" },
  { name: "IntelliJ", icon: "devicon-intellij-plain colored", category: "Tools", x: "15%", y: "85%", r: "-1deg" },
  { name: "Postman", icon: "devicon-postman-plain colored", category: "Tools", x: "35%", y: "82%", r: "2deg" },
  { name: "GSAP", icon: "devicon-javascript-plain", category: "Animation", x: "55%", y: "88%", r: "-2deg" },
  { name: "Framer Motion", icon: "devicon-react-original", category: "Animation", x: "72%", y: "83%", r: "1deg" },
];

export default function Skills(){
   const [active, setActive] = useState("All");

const filtered = active === "All" 
  ? skills 
  : skills.filter(s => s.category === active);

const [gridEl, setGridEl] = useState<HTMLDivElement | null>(null);
const gridRef = useCallback((node: HTMLDivElement | null) => {
  setGridEl(node);
}, []);

const handleFilter = (cat: string) => {
  if (!gridEl) return;
  const items = gsap.utils.toArray<HTMLElement>(".skill-item", gridEl);
  const state = Flip.getState(items);

  items.forEach(item => {
    const skillName = item.getAttribute("data-skill");
    const skill = skills.find(s => s.name === skillName);
    if (!skill) return;
    item.style.display = cat === "All" || skill.category === cat ? "flex" : "none";
  });

  // disable pointer events during animation
  gridEl.style.pointerEvents = "none";

  Flip.from(state, {
  duration: 0.7,
  ease: "power1.inOut",
  stagger: 0.08,
  absolute: true,
  onEnter: elements => gsap.fromTo(elements,
    { opacity: 0, scale: 0 },
    { opacity: 0.5, scale: 1, duration: 0.7 }
  ),
  onLeave: elements => gsap.to(elements,
    { opacity: 0, scale: 0, duration: 0.5 }
  ),
  onComplete: () => {
    gridEl.style.pointerEvents = "auto";
  }
});

  setActive(cat);
};
useEffect(() => {
  const grid = gridEl;
  if (!grid) return;

  const cards = gsap.utils.toArray<HTMLElement>(".skill-item", grid);
  const radius = 200;
  const maxScale = 1.6;
  const dur = 0.35;

 const handleMouseMove = (e: MouseEvent) => {
  cards.forEach(card => {
    const r = card.getBoundingClientRect();
    const d = Math.hypot(
      e.clientX - (r.left + r.width / 2),
      e.clientY - (r.top + r.height / 2)
    );
    const p = gsap.utils.clamp(0, 1,
      gsap.utils.mapRange(0, radius, 1, 0, d)
    );
    gsap.to(card, {
      scale: 1 + (maxScale - 1) * p,
      opacity: 0.4 + 0.6 * p,
      duration: dur,
      overwrite: true,
      ease: "power2.out"
    });
  });
};

  const handleMouseLeave = () => {
    cards.forEach(card => {
      gsap.to(card, {
        scale: 1,
        opacity: 0.5,
        duration: dur * 2,
        overwrite: true,
        ease: "power2.out"
      });
    });
  };

  grid.addEventListener("mousemove", handleMouseMove);
  grid.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    grid.removeEventListener("mousemove", handleMouseMove);
    grid.removeEventListener("mouseleave", handleMouseLeave);
  };
}, [gridEl]);

return (
<section className="relative w-full min-h-screen py-32 px-8 flex flex-col items-center [overflow:clip]">
    {/* Section header */}
    <p className="font-mono text-xs tracking-[0.6em] text-hud-text opacity-60 mb-3 text-center">
      03 · SHIP SYSTEMS
    </p>
    <h2 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-white mb-16 text-center">
      SKILL<br />
      <span className="text-astrophage-core">MATRIX</span>
    </h2>

    {/* Filter buttons */}
    <div className="flex flex-wrap gap-3 mb-16 justify-center">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => handleFilter(cat)}
          className={`font-mono text-xs tracking-[0.3em] px-4 py-2 border transition-colors ${
            active === cat
              ? "border-astrophage-core text-astrophage-core"
              : "border-white/20 text-white/40 hover:border-white/40 hover:text-white/60"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>

    {/* Skills grid */}
   <div
  ref={gridRef}
  className="relative w-full max-w-5xl mx-auto flex flex-wrap gap-16 justify-center"
  style={{ minHeight: "500px" }}
>
  {skills.map((skill) => (
   <div
  key={skill.name}
  data-skill={skill.name}
  className="skill-item flex flex-col items-center gap-2 transition-none cursor-default"
  style={{
    opacity: 0.5,
    marginTop: `${(skill.name.length * 17) % 100}px`,
    rotate: skill.r,
  }}
>
      <i 
        className={`${skill.icon} text-6xl`}
        style={{ 
          filter: "brightness(0) saturate(100%) invert(78%) sepia(60%) saturate(500%) hue-rotate(30deg) brightness(110%)"
        }}
      />
      <span className="font-mono text-[10px] tracking-widest text-white/50">
        {skill.name}
      </span>
    </div>
  ))}
</div>
  </section>
);
}
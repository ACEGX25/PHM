"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";

const navItems = [
  { name: "MISSIONS", link: "#work" },
  { name: "SYSTEMS", link: "#skills" },
  { name: "BRIEF", link: "#about" },
  { name: "LOGS", link: "#testimonials" },
  { name: "TRANSMISSION", link: "#contact" },
];

export default function Navbar() {
  return (
    <FloatingNav
      navItems={navItems}
      className="bg-space-void/80 backdrop-blur-md"
    />
  );
}
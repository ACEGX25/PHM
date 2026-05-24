export type Testimonial = {
  id: number;
  name: string;
  role?: string;
  company?: string;
  quote: string;
};

// Max 7 — oldest gets pushed out when new one added
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "ARIA CHEN",
    role: "LEAD DESIGNER",
    company: "NOVA LABS",
    quote: "Working with Geetesh felt like having a co-pilot who could read the stars. Every decision had intent, every pixel had purpose.",
  },
  {
    id: 2,
    name: "MARCUS REID",
    role: "CTO",
    company: "VOID SYSTEMS",
    quote: "Shipped faster than expected, looked better than imagined. The animations alone made our investors do a double take.",
  },
  {
    id: 3,
    name: "ZARA OKAFOR",
    role: "PRODUCT MANAGER",
    quote: "Geetesh doesn't just build what you ask for — he builds what you meant to ask for.",
  },
  {
    id: 4,
    name: "THEO YAMAMOTO",
    role: "FOUNDER",
    company: "DRIFT STUDIO",
    quote: "The attention to motion and detail is unlike anything I've seen. Our bounce rate dropped 40% after the redesign.",
  },
  {
    id: 5,
    name: "LEILA SANTOS",
    role: "CREATIVE DIRECTOR",
    company: "ATLAS CREATIVE",
    quote: "He speaks both design and engineering fluently. That rare combination is what makes the difference between good and extraordinary.",
  },
  {
    id: 6,
    name: "FELIX MORGAN",
    role: "SENIOR ENGINEER",
    quote: "Clean code, clean commits, clean design. Works exactly how you'd want a collaborator to work.",
  },
  {
    id: 7,
    name: "PRIYA NAIR",
    role: "UX LEAD",
    company: "HELIX DESIGN",
    quote: "One of those rare people who makes you feel like the project is in safe hands from day one.",
  },
];

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, TextPlugin, Flip, Draggable);

export { gsap, ScrollTrigger, TextPlugin, Flip, Draggable };
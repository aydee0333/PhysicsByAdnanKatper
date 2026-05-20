import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once at module level
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

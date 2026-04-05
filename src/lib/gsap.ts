import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register standard plugins
gsap.registerPlugin(ScrollTrigger);

// Export for use throughout the app
export { gsap, ScrollTrigger };
export default gsap;

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/gsap';


interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5, // Increased for a more "viscous" feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9, // Slightly slower scroll
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(rafCallback);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
    };

  }, []);

  return <>{children}</>;
};

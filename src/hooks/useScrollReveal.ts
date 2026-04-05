import { useEffect } from 'react';
import { gsap } from '../lib/gsap';


export const useScrollReveal = (scope?: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Filter elements that haven't been revealed yet
      const revealElements = gsap.utils.toArray('.reveal-on-scroll:not([data-scroll-revealed="true"])');

      revealElements.forEach((el: any) => {
        gsap.fromTo(el,
          {
            y: 60,
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
              onEnter: () => el.setAttribute('data-scroll-revealed', 'true')
            }
          }
        );
      });

      // Staggered reveal for children
      const staggerContainers = gsap.utils.toArray('.stagger-reveal-container:not([data-scroll-revealed="true"])');
      staggerContainers.forEach((container: any) => {
        const children = container.children;
        if (children.length > 0) {
          gsap.fromTo(children,
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                onEnter: () => container.setAttribute('data-scroll-revealed', 'true')
              }
            }
          );
        }
      });
    }, scope?.current || undefined);

    return () => ctx.revert();
  }, [scope]);
};

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import '../styles/components/_hero.scss';

const CLIENTS = [
    "SPOTIFY", "DOVE", "CONVERSE", "UBER", "NÍVEA", "AMAZON PRIME VÍDEO", "LA ROCHE-POSAY",
    "INTIMUS", "VULT", "BIC SOLEIL", "ACNASE", "BANCO BMG", "ITI ITAÚ", "SKALA", "MULTILASER"
];

const HERO_IMAGES = [
    "/images/portfolio/53.webp?v=2024_HD",
    "/images/portfolio/22.webp?v=2024_HD",
    "/images/portfolio/20.webp?v=2024_HD",
    "/images/portfolio/9.webp?v=2024_HD"
];

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textTitleRef = useRef<HTMLHeadingElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // 1. Cinematic Background Sequence (Cross-fade + Zoom)
        const bgImages = bgContainerRef.current?.querySelectorAll('.hero-bg-image');
        if (bgImages && bgImages.length > 0) {
            const bgTl = gsap.timeline({ repeat: -1 });

            bgImages.forEach((img, index) => {
                const isDarkDress = index === 0;
                const textColor = isDarkDress ? "#ffffff" : "#1a1a1a";
                const subColor = isDarkDress ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)";
                const sidebarColor = isDarkDress ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)";

                if (index !== 0) {
                    gsap.set(img, { opacity: 0, scale: 1.1 });
                } else {
                    gsap.set(img, { opacity: 1, scale: 1.1 });
                }

                // Background fade
                bgTl.to(img, {
                    scale: 1,
                    duration: 8,
                    ease: "sine.inOut"
                }, index * 6)
                .to(img, {
                    opacity: 1,
                    duration: 2,
                    ease: "power2.inOut"
                }, index * 6)
                .to(img, {
                    opacity: 0,
                    duration: 2,
                    ease: "power2.inOut"
                }, (index + 1) * 6 - 0.5);

                // Typographic contrast sync
                bgTl.to('.editorial-title', { 
                    color: textColor, 
                    duration: 1.5, 
                    ease: "power2.inOut" 
                }, index * 6 + 0.5)
                .to('.editorial-subtitle', { 
                    color: subColor, 
                    duration: 1.5, 
                    ease: "power2.inOut" 
                }, index * 6 + 0.5)
                .to(['.hero-sidebar', '.hero-credits'], { 
                    color: sidebarColor, 
                    duration: 1.5, 
                    ease: "power2.inOut" 
                }, index * 6 + 0.5)
                .to('.editorial-subtitle .dot', {
                    backgroundColor: isDarkDress ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)",
                    duration: 1.5
                }, index * 6 + 0.5);
            });
        }

        // 2. Typewriter (Write/Erase) Loop
        if (textTitleRef.current) {
            const fullText = "BIA GREMION";
            const titleElement = textTitleRef.current;
            
            // SEO-friendly initialization: text is already there, we clear it for animation
            titleElement.innerHTML = '';
            
            const typewriterTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            const chars = fullText.split('').map(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.className = 'type-char';
                span.style.opacity = '0';
                titleElement.appendChild(span);
                return span;
            });

            typewriterTl.to(chars, {
                opacity: 1,
                duration: 0.05,
                stagger: 0.2,
                ease: "none"
            })
            .to({}, { duration: 5 })
            .to(chars.reverse(), {
                opacity: 0,
                duration: 0.03,
                stagger: 0.08,
                ease: "none"
            });
        }

        // 3. Editorial Details Reveal
        tl.fromTo('.hero-header-name', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=1");
        tl.fromTo('.hero-center-block', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");
        tl.fromTo(['.hero-sidebar', '.hero-credits'], { opacity: 0 }, { opacity: 1, duration: 1.5, stagger: 0.1, ease: "linear" }, "-=1.5");

        // 4. Mouse Move Parallax
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 2;
            const yPos = (clientY / window.innerHeight - 0.5) * 2;
            gsap.to(bgContainerRef.current, { x: xPos * 15, y: yPos * 15, duration: 1, ease: "power2.out" });
            gsap.to(textTitleRef.current, { x: xPos * -30, y: yPos * -20, duration: 1.2, ease: "power2.out" });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-editorial" id="home" ref={heroRef}>
      <div className="hero-sidebar left">
          <span>PORTFOLIO / 2026</span>
          <span className="divider"></span>
          <span>EDITORIAL ISSUE NO. 1</span>
      </div>


      <div className="hero-bg-container" ref={bgContainerRef}>
          {HERO_IMAGES.map((src, index) => (
              <img 
                  key={index}
                  src={src} 
                  alt={`Bia Gremion Cover ${index + 1}`} 
                  className="hero-bg-image" 
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "low"}
                  decoding="async"
              />
          ))}
          <div className="hero-vignette"></div>
      </div>

      <div className="hero-content" ref={containerRef}>
        <div className="hero-center-block">
            <div className="hero-header-name">
                <h1 className="editorial-title typewriter-title" ref={textTitleRef}>
                    BIA GREMION
                </h1>
            </div>

            <div className="editorial-subtitle">
                <span>INFLUÊNCIA</span>
                <span className="dot"></span>
                <span>MAQUIAGEM</span>
                <span className="dot"></span>
                <span>MODELO LIFESTYLE</span>
            </div>

            <div className="hero-cta-wrapper">
                <a href="#contact" className="hero-cta glass-btn">
                    TRABALHE COMIGO →
                </a>
            </div>
        </div>
      </div>

      <div className="hero-credits bottom-left">
          <span>© 2026 ALL RIGHTS RESERVED</span>
      </div>

      {/* CSS-based Marquee */}
      <div className="clients-marquee watermark">
          <div className="marquee-track">
              <div className="marquee-content" aria-hidden="true">
                  {CLIENTS.map((client, idx) => (
                      <span key={idx} className="client-name">{client}</span>
                  ))}
              </div>
              <div className="marquee-content" aria-hidden="true">
                  {CLIENTS.map((client, idx) => (
                      <span key={`dup-${idx}`} className="client-name">{client}</span>
                  ))}
              </div>
          </div>
      </div>
    </section>
  );
};

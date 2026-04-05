import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { Instagram } from 'lucide-react';
import '../styles/components/_contact.scss';

export const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgTextRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // Fade in content
        const fadeEls = sectionRef.current?.querySelectorAll('.fade-up-footer');
        if (fadeEls && fadeEls.length > 0) {
            gsap.fromTo(fadeEls,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%"
                    }
                }
            );
        }

        // Huge background text reveal
        if (bgTextRef.current) {
            gsap.fromTo(bgTextRef.current,
                { y: '50%', opacity: 0 },
                {
                    y: '0%', 
                    opacity: 0.03, // Barely visible watermark
                    duration: 2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top center"
                    }
                }
            );
        }

        // --- Magnetic Buttom Logic ---
        const magneticElements = document.querySelectorAll('.magnetic-wrap');
        
        magneticElements.forEach((el) => {
            const wrap = el as HTMLElement;
            const target = wrap.querySelector('.magnetic-target') as HTMLElement;
            
            if (!target) return;

            wrap.addEventListener('mousemove', (e: MouseEvent) => {
                const rect = wrap.getBoundingClientRect();
                const h = rect.width / 2;
                const v = rect.height / 2;
                
                // Get mouse position relative to center of element
                const x = e.clientX - rect.left - h;
                const y = e.clientY - rect.top - v;
                
                // Move the actual button a fraction of that distance
                gsap.to(target, {
                    x: x * 0.4,
                    y: y * 0.4,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            wrap.addEventListener('mouseleave', () => {
                // Snap back to center
                gsap.to(target, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });

    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id="contact" className="monumental-footer" ref={sectionRef}>
            <div className="footer-content">
                <div className="footer-grid">
                    <div className="footer-left reveal-on-scroll">
                        <p className="minimal-label">VAMOS CRIAR</p>
                        <h2 className="footer-statement">
                            ELEVE SUA<br/>PRÓXIMA<br/>CAMPANHA.
                        </h2>
                    </div>

                    <div className="footer-right stagger-reveal-container">
                        <div className="inquiry-box reveal-on-scroll">
                            <p className="box-title">CONTATO DIRETO</p>
                            
                            {/* Magnetic Button Wrapper */}
                            <div className="magnetic-wrap email-wrap">
                                <a href="mailto:contato.biagremion@gmail.com" className="email-link magnetic-target">
                                    contato.biagremion@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="social-links reveal-on-scroll">
                            <div className="magnetic-wrap icon-wrap">
                                <a href="https://instagram.com/biagremion" target="_blank" rel="noopener noreferrer" className="social-link magnetic-target">
                                    <Instagram size={24} strokeWidth={1} />
                                    <span>INSTAGRAM</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom reveal-on-scroll">
                    <div className="footer-credits">
                        <p>&copy; {new Date().getFullYear()} Bia Gremion. Todos os direitos reservados.</p>
                    </div>
                    
                    <div className="magnetic-wrap to-top-wrap">
                        <button className="back-to-top magnetic-target" onClick={scrollToTop}>
                            VOLTAR AO TOPO
                        </button>
                    </div>
                </div>
            </div>

            {/* Monumental Background Text */}
            <h1 className="bg-monumental" ref={bgTextRef}>BIA GREMION</h1>
        </section>
    );
};

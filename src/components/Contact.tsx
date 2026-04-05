import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { Instagram } from 'lucide-react';
import '../styles/components/_contact.scss';

export const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgTextRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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

            // --- Magnetic Button Logic ---
            const magneticElements = sectionRef.current?.querySelectorAll<HTMLElement>('.magnetic-wrap');
            const listeners: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

            magneticElements?.forEach((el) => {
                const target = el.querySelector<HTMLElement>('.magnetic-target');
                if (!target) return;

                const onMouseMove = (e: MouseEvent) => {
                    const { left, top, width, height } = el.getBoundingClientRect();
                    const x = e.clientX - left - width / 2;
                    const y = e.clientY - top - height / 2;
                    gsap.to(target, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: "power2.out" });
                };

                const onMouseLeave = () => {
                    gsap.to(target, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
                };

                el.addEventListener('mousemove', onMouseMove);
                el.addEventListener('mouseleave', onMouseLeave);
                listeners.push({ el, move: onMouseMove, leave: onMouseLeave });
            });

            return () => {
                listeners.forEach(({ el, move, leave }) => {
                    el.removeEventListener('mousemove', move);
                    el.removeEventListener('mouseleave', leave);
                });
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'auto' });
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

            <h1 className="bg-monumental" ref={bgTextRef}>BIA GREMION</h1>
        </section>
    );
};

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import '../styles/components/_beauty.scss';



export const Beauty = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Pinned Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=300%", // 3 screens worth of scroll
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            // 2. Background Animation (Dynamic throughout the pin)
            // Starts already dark and blurry to prioritize monumental title legibility
            tl.fromTo(backgroundRef.current,
                { filter: 'brightness(0.4) scale(1.1) blur(15px)' },
                { filter: 'brightness(0.1) scale(1.05) blur(25px)', duration: 2, ease: "power2.inOut" },
                0 // Starts immediately to ensure legibility from frame zero
            );

            // 3. Slides Sequence
            const slides = gsap.utils.toArray('.beauty-slide');
            
            slides.forEach((slide: any, i) => {
                // Fade In
                tl.fromTo(slide, 
                    { opacity: 0, y: 30 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 1, 
                        ease: "power2.out",
                        onStart: () => slide.classList.add('active'),
                    },
                    i === 0 ? 0 : ">-0.2"
                );

                // Fade Out (except the last one)
                if (i < slides.length - 1) {
                    tl.to(slide, {
                        opacity: 0,
                        y: -30,
                        duration: 1,
                        ease: "power2.in",
                        onComplete: () => slide.classList.remove('active'),
                    }, ">0.8");
                } else {
                    // Final transition
                    tl.to('.beauty-exit-overlay', {
                        opacity: 1,
                        duration: 1.5,
                        ease: "none"
                    }, ">0.5");
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="beauty" className="beauty-pinned-section" ref={sectionRef}>
            {/* Full Screen Background Image */}
            <div className="beauty-bg-wrapper">
                <img 
                    ref={backgroundRef}
                    src="/images/portfolio/43.webp" 
                    alt="Bia Gremion - Beleza, Arte e Técnica" 
                    className="beauty-full-image" 
                />
                <div className="bg-vignette"></div>
            </div>

            {/* Exit Transition Overlay */}
            <div className="beauty-exit-overlay"></div>

            <div className="container beauty-slides-container" ref={containerRef}>
                {/* SLIDE 0: HERO (The Hook) */}
                <div className="beauty-slide beauty-hero-slide">
                    <h2 className="monumental-title">
                        <span className="line-1">BELEZA, ARTE</span>
                        <span className="line-2">E TÉCNICA</span>
                    </h2>
                </div>

                {/* SLIDE 1: INTRO */}
                <div className="beauty-slide beauty-intro-slide">
                    <h2 className="minimal-title">BELEZA, ARTE<br/>E TÉCNICA.</h2>
                    <p className="beauty-intro">
                        Minha entrega nasce na intersecção entre o olhar artístico, o pensamento estratégico e a vivência real de mercado.
                    </p>
                </div>

                {/* SLIDE 2: A FORMA */}
                <div className="beauty-slide beauty-service-slide">
                    <div className="service-content">
                        <span className="slide-label">01 / A FORMA</span>
                        <h3>DIREÇÃO DE ARTE APLICADA</h3>
                        <p>Minha formação pela Escola MADRE e minha vivência pessoal refinaram meu olhar muito além do rosto. Uso a estética como ferramenta de direção de arte para qualquer segmento: da textura de skincare ao caimento de uma peça de roupa.</p>
                    </div>
                </div>

                {/* SLIDE 3: A FUNÇÃO */}
                <div className="beauty-slide beauty-service-slide">
                    <div className="service-content">
                        <span className="slide-label">02 / A FUNÇÃO</span>
                        <h3>VISÃO DE MARKETING</h3>
                        <p>Ler o mercado, decupar um briefing e respeitar a inteligência da audiência. A graduação em Marketing me permite atuar como parceira criativa das marcas, transformando objetivos de negócio em linguagem autêntica e identificação profunda.</p>
                    </div>
                </div>

                {/* SLIDE 4: O BACKSTAGE */}
                <div className="beauty-slide beauty-service-slide">
                    <div className="service-content">
                        <span className="slide-label">03 / O BACKSTAGE</span>
                        <h3>VISÃO 360º DE PRODUÇÃO</h3>
                        <p>Dos grandes sets da TV Globo ao audiovisual pop com Lia Clark, Luísa Sonza e Ludmilla. Entender a engrenagem de uma grande produção me deu agilidade e domínio de câmera para traduzir o rigor do cinema para as redes sociais.</p>
                    </div>
                </div>

                {/* SLIDE 5: A EXECUÇÃO */}
                <div className="beauty-slide beauty-service-slide">
                    <div className="service-content">
                        <span className="slide-label">04 / A EXECUÇÃO</span>
                        <h3>CONSTRUÇÃO DA NARRATIVA</h3>
                        <p>Para Dove, Pantene e CliqueBus, construo roteiros onde moda, turismo e autocuidado se integram à rotina. Publicidade que não interrompe, mas cria contexto e agrega valor real para quem assiste.</p>
                        
                        <div className="beauty-cta-block">
                            <a href="#contact" className="btn-minimal-glass">QUERO TRABALHAR COM VOCÊ →</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import '../styles/components/_body_narrative.scss';

export const BodyNarrative = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const pinnedContainerRef = useRef<HTMLDivElement>(null);
    
    // Background Video Refs
    const bgVideo1Ref = useRef<HTMLDivElement>(null);
    const bgVideo2Ref = useRef<HTMLDivElement>(null);
    const bgVideo3Ref = useRef<HTMLDivElement>(null);
    
    // Content Refs
    const content1Ref = useRef<HTMLDivElement>(null);
    const content2Ref = useRef<HTMLDivElement>(null);
    const content3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Initial state — Hide all except video 1 and title
            gsap.set([bgVideo2Ref.current, bgVideo3Ref.current], { opacity: 0 });
            gsap.set([content1Ref.current, content2Ref.current, content3Ref.current], { autoAlpha: 0, y: 50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinnedContainerRef.current,
                    start: 'top top',
                    end: '+=400%', // Reduced from 700% for better rhythm
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // PHASE 1: Sculpture Title
            tl.to(content1Ref.current, { autoAlpha: 1, y: 0, duration: 1 })
              .to({}, { duration: 1 }) // Hold
              .to(content1Ref.current, { autoAlpha: 0, y: -50, duration: 1 })
              
              // TRANSITION 1 -> 2: Switch backgrounds
              .to(bgVideo1Ref.current, { opacity: 0, duration: 1 }, '-=0.5')
              .to(bgVideo2Ref.current, { opacity: 1, duration: 1 }, '<')
              
              // PHASE 2: Motivational Message
              .to(content2Ref.current, { autoAlpha: 1, y: 0, duration: 1 })
              .to({}, { duration: 1.5 }) // Reading time
              .to(content2Ref.current, { autoAlpha: 0, y: -50, duration: 1 })

              // TRANSITION 2 -> 3: Switch to Carnaval
              .to(bgVideo2Ref.current, { opacity: 0, duration: 1 }, '-=0.5')
              .to(bgVideo3Ref.current, { opacity: 1, duration: 1 }, '<')

              // PHASE 3: Carnaval / Joy
              .to(content3Ref.current, { autoAlpha: 1, y: 0, duration: 1 })
              .to({}, { duration: 1.5 }) // Hold
              .to(content3Ref.current, { y: -20, opacity: 0.8, duration: 0.5 }); // Final state

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="body-narrative" ref={sectionRef} id="corpo">
            <div className="video-fullscreen-narrative" ref={pinnedContainerRef}>

                {/* BACKGROUND LAYERS - Switched to High-Fidelity Editorial Images */}
                <div className="bg-video-layer" ref={bgVideo1Ref}>
                    <img 
                        src="/images/portfolio/22.webp" 
                        alt="Editorial 22" 
                        className="body-bg-video" 
                    />
                    <div className="video-cinematic-overlay" />
                </div>

                <div className="bg-video-layer" ref={bgVideo2Ref}>
                    <img 
                        src="/images/portfolio/23.webp" 
                        alt="Editorial 23" 
                        className="body-bg-video" 
                    />
                    <div className="video-cinematic-overlay heavy" />
                </div>

                <div className="bg-video-layer" ref={bgVideo3Ref}>
                    <img 
                        src="/images/portfolio/24.webp" 
                        alt="Editorial 24" 
                        className="body-bg-video" 
                    />
                    <div className="video-cinematic-overlay heavy" />
                </div>

                {/* FOREGROUND CONTENT BLOCKS */}
                <div className="cinematic-content-flow">
                    
                    {/* Block 1 */}
                    <div className="content-block" ref={content1Ref}>
                        <span className="phase-label">02 · Minha Relação com o Corpo</span>
                        <h2 className="cinematic-title">NOSSO CORPO<br/>É NOSSA CASA.</h2>
                    </div>

                    {/* Block 2 */}
                    <div className="content-block center" ref={content2Ref}>
                        <p className="cinematic-quote">
                            "Existir é um ato político."
                        </p>
                        <p className="cinematic-copy">
                            Construo minha imagem como quem conquista um território. Minha relação com o corpo transbordou o estético para se tornar uma escolha política: entender meus ângulos é entender minha força. <strong>Influenciar é inspirar o outro a também não pedir licença para ser quem é.</strong>
                        </p>
                    </div>

                    {/* Block 3 */}
                    <div className="content-block center" ref={content3Ref}>
                        <p className="cinematic-quote">
                            "A presença que antecede a estética."
                        </p>
                        <p className="cinematic-copy">
                            Para marcas que entendem que conexão real não se compra, se constrói. Como modelo lifestyle, levo para cada projeto a energia de quem sabe o valor de cada espaço ocupado. Técnica, verdade e uma <strong>narrativa que permanece.</strong>
                        </p>
                        <a href="#contact" className="cinematic-cta">VAMOS CONVERSAR →</a>
                    </div>

                </div>

            </div>
        </section>
    );
};

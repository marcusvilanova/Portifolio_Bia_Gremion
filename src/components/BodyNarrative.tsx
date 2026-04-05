import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { LazyVideo } from './common/LazyVideo';
import '../styles/components/_body_narrative.scss';

// GSAP registration is now handled in ../lib/gsap.ts

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
    
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Initial state — Hide all except video 1 and title
            gsap.set([bgVideo2Ref.current, bgVideo3Ref.current], { opacity: 0 });
            gsap.set([content1Ref.current, content2Ref.current, content3Ref.current], { autoAlpha: 0, y: 50 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: pinnedContainerRef.current,
                    start: 'top top',
                    end: '+=700%', // Ample space for the full story
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

    const toggleMusic = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMusicPlaying) {
            // Fade out smoothly
            gsap.to(audio, {
                volume: 0,
                duration: 1.5,
                onComplete: () => {
                    audio.pause();
                    setIsMusicPlaying(false);
                }
            });
        } else {
            // Start silent and fade in
            audio.volume = 0;
            audio.play().catch(() => {});
            setIsMusicPlaying(true);
            
            gsap.to(audio, {
                volume: 0.4,
                duration: 4,
                ease: "power1.in"
            });
        }
    };


    return (
        <section className="body-narrative" ref={sectionRef} id="corpo">
            <audio ref={audioRef} loop>
                <source src="/audio/Emmy Meli - I AM WOMAN (Lyrics) - The Vibe Guide (youtube).mp3" type="audio/mp3" />
            </audio>


            <div className="video-fullscreen-narrative" ref={pinnedContainerRef}>

                {/* BACKGROUND LAYERS */}
                <div className="bg-video-layer" ref={bgVideo1Ref}>
                    <LazyVideo
                        className="body-bg-video"
                        autoPlay loop muted playsInline
                        src="/Vídeo - destaque para o corpo como uma escultura.mp4"
                    />
                    <div className="video-cinematic-overlay" />
                </div>

                <div className="bg-video-layer" ref={bgVideo2Ref}>
                    <LazyVideo
                        className="body-bg-video"
                        autoPlay loop muted playsInline
                        src="/Video - Mensagem Motivacional sobre aceitação.mp4"
                    />
                    <div className="video-cinematic-overlay heavy" />
                </div>

                <div className="bg-video-layer" ref={bgVideo3Ref}>
                    <LazyVideo
                        className="body-bg-video"
                        autoPlay loop muted playsInline
                        src="/Bia - vídeo de autoaceitação, muito feliz no carnaval.mp4"
                    />
                    <div className="video-cinematic-overlay heavy" />
                </div>

                {/* FOREGROUND CONTENT BLOCKS */}
                <div className="cinematic-content-flow">
                    
                    {/* Block 1 */}
                    <div className="content-block" ref={content1Ref}>
                        <span className="phase-label">02 · Minha Relação com o Corpo</span>
                        <h2 className="cinematic-title">NOSSO CORPO<br/>É NOSSA CASA.</h2>
                        <button className="music-toggle-minimal" onClick={toggleMusic}>
                            {isMusicPlaying ? '⏸ PAUSE' : '▶ PLAY'} — Emmy Meli, I Am Woman
                        </button>
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

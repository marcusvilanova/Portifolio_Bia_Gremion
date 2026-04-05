import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import '../styles/components/_fashion_film.scss';

// GSAP registration is now handled in ../lib/gsap.ts

export const FashionFilm = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Pin the film container
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: ".film-container",
                pinSpacing: true,
                anticipatePin: 1
            });

            // Parallax effect on the video itself
            gsap.fromTo(videoRef.current, 
                { yPercent: -15 },
                {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }, containerRef.current || undefined);

        return () => ctx.revert();
    }, []);


    return (
        <section className="fashion-film-section" ref={containerRef}>

            <div className="film-container">
                <video 
                    ref={videoRef}
                    className="editorial-video"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    poster="/poster-bia-video-5.webp"
                >
                    <source src="/video-final-fashion-film.mp4?v=2024_HD" type="video/mp4" />
                </video>
                
                {/* Text overlay removed as requested */}
            </div>
        </section>
    );
};

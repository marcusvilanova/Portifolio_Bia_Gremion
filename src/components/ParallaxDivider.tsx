import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { LazyVideo } from './common/LazyVideo';
import '../styles/components/_parallax_divider.scss';

interface ParallaxDividerProps {
    type: 'image' | 'video';
    src: string;
    title: string;
    subtitle?: string;
    description?: string;
    id?: string;
}

export const ParallaxDivider = ({ type, src, title, subtitle, description, id }: ParallaxDividerProps) => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sectionRef.current && bgRef.current) {
            // Parallax effect for the background
            gsap.fromTo(bgRef.current,
                { y: '-20%' },
                {
                    y: '20%',
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );

            // Fade up effect for the text
            if (textRef.current) {
                gsap.fromTo(textRef.current,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                        }
                    }
                );
            }
        }
    }, []);

    return (
        <section className="parallax-divider" ref={sectionRef} id={id}>
            <div className="pd-background" ref={bgRef}>
                <div className="pd-overlay pd-overlay-top"></div>
                {type === 'video' ? (
                    <LazyVideo 
                        src={src} 
                        className="pd-media" 
                        autoPlay loop muted playsInline 
                    />
                ) : (
                    <img 
                        src={src} 
                        className="pd-media" 
                        alt={title} 
                        decoding="async"
                    />
                )}
                <div className="pd-overlay pd-overlay-bottom"></div>
            </div>
            
            <div className="pd-content" ref={textRef}>
                {subtitle && <span className="pd-subtitle">{subtitle}</span>}
                <h2 className="pd-title">{title}</h2>
                {description && <p className="pd-description">{description}</p>}
            </div>
        </section>
    );
};

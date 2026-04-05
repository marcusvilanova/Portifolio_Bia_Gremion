import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { Play } from 'lucide-react';
import { LazyVideo } from './common/LazyVideo';
import '../styles/components/_publis.scss';

// GSAP registration is now handled in ../lib/gsap.ts

import { CAMPAIGNS } from '../data/portfolio-data';


export const Publis = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    useEffect(() => {
        const items = sectionRef.current?.querySelectorAll('.publi-item');
        if (items && items.length > 0) {
            gsap.fromTo(items,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power3.out',
                  scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
            );
        }
    }, []);

    const handleMouseEnter = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            // Check if source is actually set by LazyVideo
            if (video.src) {
                video.play().catch(e => console.log("Play failed:", e));
            }
        }
    };

    const handleMouseLeave = (index: number) => {
        const video = videoRefs.current[index];
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    };

    return (
        <section id="publis" className="publis-section" ref={sectionRef}>
            <div className="container publis-container">
                <div className="publis-header fade-up">
                    <span className="section-label">PUBLIS & CAMPANHAS</span>
                    <h2 className="minimal-title">TRABALHOS<br/>PATROCINADOS.</h2>
                </div>

                <div className="publis-grid">
                    {CAMPAIGNS.map((campaign, idx) => (
                        <div 
                            key={campaign.id} 
                            className="publi-item fade-up"
                            onMouseEnter={() => handleMouseEnter(idx)}
                            onMouseLeave={() => handleMouseLeave(idx)}
                        >
                            <div className="video-wrapper">
                                <LazyVideo 
                                    ref={(el: HTMLVideoElement | null) => { videoRefs.current[idx] = el; }}
                                    src={campaign.videoSrc}
                                    className="publi-video"
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                />
                                <div className="video-overlay">
                                    <Play className="play-icon" size={48} strokeWidth={1} />
                                </div>
                            </div>
                            <div className="publi-info">
                                <h3 className="publi-brand">{campaign.brand}</h3>
                                <p className="publi-title">{campaign.title}</p>
                                {campaign.link !== "#" && campaign.link !== null && (
                                    <a href={campaign.link || undefined} className="publi-link" target="_blank" rel="noopener noreferrer">
                                        ASSISTIR COMPLETO  →
                                    </a>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


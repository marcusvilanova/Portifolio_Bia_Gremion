import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

import { useAudio } from '../context/AudioContext';
import '../styles/components/_preloader.scss';

export const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [showButton, setShowButton] = useState(false);
    const { startAudio } = useAudio();

    const handleEnter = () => {
        startAudio();
        gsap.to(preloaderRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            onComplete: () => {
                document.body.style.overflow = 'auto';
            }
        });
    };

    useEffect(() => {
        const svgPaths = preloaderRef.current?.querySelectorAll('.monogram-path') as NodeListOf<SVGPathElement>;
        
        if (svgPaths && svgPaths.length > 0) {
            svgPaths.forEach(path => {
                const length = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    opacity: 1
                });
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    setShowButton(true);
                }
            });

            // Draw the monogram stroke
            tl.to(svgPaths, {
                strokeDashoffset: 0,
                duration: 1.8,
                stagger: 0.2,
                ease: "power2.inOut"
            })
            // Fill in
            .to(svgPaths, {
                fill: "rgba(255, 255, 255, 1)",
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4");
        }

        document.body.style.overflow = 'hidden';
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="preloader-editorial" ref={preloaderRef}>
            <div className="preloader-silhouette">
                <svg viewBox="0 0 280 120" xmlns="http://www.w3.org/2000/svg" className="silhouette-svg">
                    {/* Letter B */}
                    <path 
                        className="monogram-path"
                        d="M30,10 L30,110 L75,110 C95,110 110,98 110,85 C110,72 100,63 85,60 C97,57 105,48 105,37 C105,22 92,10 75,10 Z M50,25 L72,25 C82,25 88,31 88,38 C88,46 82,52 72,52 L50,52 Z M50,65 L75,65 C87,65 93,72 93,80 C93,89 87,95 75,95 L50,95 Z" 
                        fill="rgba(255, 255, 255, 0)" 
                        stroke="#ffffff" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                    {/* Letter G */}
                    <path 
                        className="monogram-path"
                        d="M200,15 C190,10 178,8 168,8 C138,8 118,30 118,60 C118,90 138,112 168,112 C178,112 188,109 196,103 L196,65 L165,65 L165,80 L180,80 L180,95 C176,97 172,98 168,98 C148,98 136,82 136,60 C136,38 148,22 168,22 C176,22 184,25 190,29 Z" 
                        fill="rgba(255, 255, 255, 0)" 
                        stroke="#ffffff" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            
            <div className={`preloader-interaction ${showButton ? 'is-visible' : ''}`}>
                <button className="enter-btn" onClick={handleEnter}>
                    <span className="btn-label">ENTRAR</span>
                </button>
            </div>
        </div>
    );
};


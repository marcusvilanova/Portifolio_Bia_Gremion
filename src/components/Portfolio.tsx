import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyVideo } from './common/LazyVideo';
import '../styles/components/_portfolio.scss';

import { PORTFOLIO_IMAGES } from '../data/portfolio-data';

type Category = 'All' | 'Campanhas' | 'Editorial' | 'Beleza';


export const Portfolio = () => {
    const [activeTab, setActiveTab] = useState<Category>('All');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(24);
    const containerRef = useRef<HTMLDivElement>(null);
    const lightboxRef = useRef<HTMLDivElement>(null);

    const filteredData = activeTab === 'All' 
        ? PORTFOLIO_IMAGES 
        : PORTFOLIO_IMAGES.filter(item => item.category === activeTab);

    const visibleData = filteredData.slice(0, visibleCount);

    useEffect(() => {
        const grid = containerRef.current?.querySelector('.editorial-grid');
        if (!grid) return;

        // Smart Observer: Refresh ScrollTrigger whenever the grid height changes
        // (Image loading, tab switching, or Load More)
        const observer = new ResizeObserver(() => {
            ScrollTrigger.refresh();
        });

        observer.observe(grid);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = containerRef.current?.querySelectorAll('.gallery-item');
            if (items) {
                items.forEach((item) => {
                    // Refined Animation: Scale + Fade + Suble Skew
                    gsap.fromTo(item,
                        { 
                            opacity: 0, 
                            y: 60, 
                            scale: 0.95,
                            filter: "blur(20px)"
                        },
                        {
                            opacity: 1, 
                            y: 0, 
                            scale: 1,
                            filter: "blur(0px)",
                            duration: 1.5,
                            ease: "expo.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 90%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [visibleData]);

    useEffect(() => {
        if (lightboxIndex !== null && lightboxRef.current) {
            const tl = gsap.timeline();
            tl.fromTo(lightboxRef.current, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3 }
            ).fromTo(".lightbox-media-container",
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
                "-=0.2"
            );
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
             document.body.style.overflow = 'auto';
        };
    }, [lightboxIndex]);

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 12, filteredData.length));
    };

    const closeLightbox = () => {
        if (lightboxRef.current) {
            gsap.to(lightboxRef.current, {
                opacity: 0, 
                duration: 0.3, 
                onComplete: () => setLightboxIndex(null)
            });
        } else {
             setLightboxIndex(null);
        }
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % filteredData.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + filteredData.length) % filteredData.length);
        }
    };

    return (
        <section id="portfolio" className="portfolio-minimal" ref={containerRef}>
            <div className="container">
                <div className="portfolio-header-minimal reveal-on-scroll">
                    <h2 className="section-title">Trabalhos Selecionados</h2>
                    <div className="minimal-tabs stagger-reveal-container">
                        {(['All', 'Campanhas', 'Editorial', 'Beleza'] as Category[]).map(tab => (
                            <button 
                                key={tab}
                                className={`tab-btn-minimal ${activeTab === tab ? 'active' : ''} reveal-on-scroll`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}

                    </div>
                </div>

                {/* Vertical Editorial Grid */}
                <div className="editorial-grid" ref={containerRef}>
                    {visibleData.map((media: any, idx) => (
                        <div 
                            key={media.id} 
                            className="gallery-item"
                            onClick={() => setLightboxIndex(idx)}
                        >
                            <div className="media-wrapper">
                                {media.type === 'video' ? (
                                    <LazyVideo 
                                        src={media.src} 
                                        className="gallery-media"
                                        autoPlay loop muted playsInline 
                                    />
                                ) : (
                                    <img 
                                        src={media.src} 
                                        alt={media.alt} 
                                        className="gallery-media"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                )}
                            </div>
                            <div className="gallery-caption">
                                <span>{media.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < filteredData.length && (
                    <div className="load-more-container">
                        <button className="load-more-btn" onClick={loadMore}>
                            Carregar Mais Arquivos +
                        </button>
                    </div>
                )}
            </div>

            {/* LIGHTBOX MODAL */}
            {lightboxIndex !== null && (
                <div className="lightbox-overlay" ref={lightboxRef} onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>
                        <X size={32} strokeWidth={1} />
                    </button>
                    
                    <button className="lightbox-nav prev" onClick={prevImage}>
                        <ChevronLeft size={48} strokeWidth={1} />
                    </button>

                    <div className="lightbox-media-container">
                        {filteredData[lightboxIndex].type === 'video' ? (
                            <video 
                                src={filteredData[lightboxIndex].src} 
                                className="lightbox-image" 
                                controls autoPlay playsInline
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : (
                            <img 
                                src={filteredData[lightboxIndex].src} 
                                alt={filteredData[lightboxIndex].alt} 
                                className="lightbox-image" 
                                onClick={(e) => e.stopPropagation()}
                            />
                        )}
                    </div>
                    
                    <button className="lightbox-nav next" onClick={nextImage}>
                        <ChevronRight size={48} strokeWidth={1} />
                    </button>
                    
                    <div className="lightbox-counter">
                        {lightboxIndex + 1} / {filteredData.length}
                    </div>
                </div>
            )}
        </section>
    );
};

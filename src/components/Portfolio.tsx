import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { LazyVideo } from './common/LazyVideo';
import { PORTFOLIO_IMAGES } from '../data/portfolio-data';
import '../styles/components/_portfolio.scss';

type Category = 'All' | 'Campanhas' | 'Editorial' | 'Beleza';

export const Portfolio = () => {
    const [activeTab, setActiveTab] = useState<Category>('All');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [visibleCount, setVisibleCount] = useState(24);
    
    // Core Refs
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const lightboxRef = useRef<HTMLDivElement>(null);

    // Gestures Refs
    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);

    // Memoize filtered data to prevent unnecessary recalculations
    const filteredData = activeTab === 'All' 
        ? PORTFOLIO_IMAGES 
        : PORTFOLIO_IMAGES.filter(item => item.category === activeTab);

    const visibleData = filteredData.slice(0, visibleCount);

    // Refresh ScrollTrigger when grid height changes
    useEffect(() => {
        const grid = gridRef.current;
        if (!grid) return;
        const observer = new ResizeObserver(() => ScrollTrigger.refresh());
        observer.observe(grid);
        return () => observer.disconnect();
    }, []);

    // Reveal animations for gallery items
    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gridRef.current?.querySelectorAll('.gallery-item');
            if (items) {
                items.forEach((item) => {
                    gsap.fromTo(item,
                        { opacity: 0, y: 60, filter: "blur(10px)" },
                        {
                            opacity: 1, 
                            y: 0, 
                            filter: "blur(0px)",
                            duration: 1.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 90%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                });
            }
        }, gridRef); // Scoped to gridRef for better isolation
        return () => ctx.revert();
    }, [visibleData, activeTab]);

    // Lightbox Navigation Functions
    const closeLightbox = useCallback(() => {
        if (lightboxRef.current) {
            gsap.to(lightboxRef.current, {
                opacity: 0, 
                duration: 0.3, 
                onComplete: () => setLightboxIndex(null)
            });
        } else {
            setLightboxIndex(null);
        }
    }, []);

    const nextImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        e?.stopPropagation();
        setLightboxIndex(prev => (prev !== null ? (prev + 1) % filteredData.length : null));
    }, [filteredData.length]);

    const prevImage = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
        e?.stopPropagation();
        setLightboxIndex(prev => (prev !== null ? (prev - 1 + filteredData.length) % filteredData.length : null));
    }, [filteredData.length]);

    // Keyboard & Body Scroll Lock logic
    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = 'hidden';
            
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            };
            
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = 'auto';
            };
        }
    }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

    // Touch Handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (lightboxIndex === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
        
        // Threshold for swipe: 50px horizontal, and horizontal delta > vertical delta
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > deltaY) {
            if (deltaX < 0) nextImage();
            else prevImage();
        }
    };

    const handleTabChange = (tab: Category) => {
        setActiveTab(tab);
        setVisibleCount(24); // Reset pagination on tab change
        setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    return (
        <section id="portfolio" className="portfolio-minimal" ref={sectionRef}>
            <div className="container">
                <div className="portfolio-header-minimal">
                    <h2 className="section-title">Trabalhos Selecionados</h2>
                    <div 
                        className="minimal-tabs" 
                        role="tablist" 
                        aria-label="Filtros do portfólio"
                    >
                        {(['All', 'Campanhas', 'Editorial', 'Beleza'] as Category[]).map(tab => (
                            <button 
                                key={tab}
                                role="tab"
                                aria-selected={activeTab === tab}
                                aria-controls="portfolio-grid"
                                className={`tab-btn-minimal ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => handleTabChange(tab)}
                            >
                                {tab === 'All' ? 'Todos' : tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="editorial-grid" ref={gridRef} id="portfolio-grid">
                    {visibleData.map((media, idx) => (
                        <div 
                            key={media.id} 
                            className="gallery-item"
                            onClick={() => setLightboxIndex(idx)}
                            role="button"
                            aria-label={`Ver ${media.alt}`}
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setLightboxIndex(idx)}
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
                            <div className="gallery-caption" aria-hidden="true">
                                <span>{media.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {visibleCount < filteredData.length && (
                    <div className="load-more-container">
                        <button 
                            className="load-more-btn" 
                            onClick={() => setVisibleCount(prev => prev + 12)}
                        >
                            Carregar Mais Arquivos +
                        </button>
                    </div>
                )}
            </div>

            {lightboxIndex !== null && (
                <div 
                    className="lightbox-overlay" 
                    ref={lightboxRef} 
                    onClick={closeLightbox}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Visualizador de imagens"
                >
                    <button 
                        className="lightbox-close" 
                        onClick={closeLightbox} 
                        aria-label="Fechar visualizador"
                    >
                        <X size={32} strokeWidth={1} />
                    </button>
                    
                    <button 
                        className="lightbox-nav prev" 
                        onClick={(e) => prevImage(e)} 
                        aria-label="Imagem anterior"
                    >
                        <ChevronLeft size={48} strokeWidth={1} />
                    </button>

                    <div className="lightbox-media-container" onClick={(e) => e.stopPropagation()}>
                        {filteredData[lightboxIndex].type === 'video' ? (
                            <video 
                                src={filteredData[lightboxIndex].src} 
                                className="lightbox-image" 
                                controls autoPlay playsInline
                            />
                        ) : (
                            <img 
                                src={filteredData[lightboxIndex].src} 
                                alt={filteredData[lightboxIndex].alt} 
                                className="lightbox-image" 
                            />
                        )}
                        <div className="lightbox-info">
                            <p>{filteredData[lightboxIndex].alt}</p>
                            <span className="lightbox-counter">
                                {lightboxIndex + 1} / {filteredData.length}
                            </span>
                        </div>
                    </div>
                    
                    <button 
                        className="lightbox-nav next" 
                        onClick={(e) => nextImage(e)} 
                        aria-label="Próxima imagem"
                    >
                        <ChevronRight size={48} strokeWidth={1} />
                    </button>
                </div>
            )}
        </section>
    );
};

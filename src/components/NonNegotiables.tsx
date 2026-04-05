import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { LazyVideo } from './common/LazyVideo';
import '../styles/components/_non_negotiables.scss';

import { VALUES } from '../data/portfolio-data';


const MetricBar = ({ label, value }: { label: string, value: string }) => {
    const barRef = useRef<HTMLDivElement>(null);
    const numericValue = parseFloat(value.replace('%', ''));
    
    useEffect(() => {
        if (barRef.current) {
            ScrollTrigger.create({
                trigger: barRef.current,
                start: "top 95%",
                onEnter: () => barRef.current?.classList.add('is-visible')
            });
        }
    }, [value]);

    return (
        <div className="metric-bar-container">
            <div className="metric-info">
                <span className="label">{label}</span>
                <span className="value">{value}</span>
            </div>
            <div className="bar-bg">
                <div 
                    ref={barRef}
                    className="bar-fill" 
                    style={{ width: isNaN(numericValue) ? '0%' : `${numericValue}%` }}
                ></div>
            </div>
        </div>
    );
};

const ReachMetric = ({ label, value }: { label: string, value: string }) => (
    <div className="reach-metric">
        <span className="reach-value">{value}</span>
        <span className="reach-label">{label}</span>
    </div>
);

const BrandItem = ({ name }: { name: string }) => (
    <div className="brand-item-chip">
        <span className="brand-name">{name}</span>
    </div>
);

interface DemographicItem {
    label: string;
    value: string;
}

interface DemographicsData {
    gender: DemographicItem[];
    age: DemographicItem[];
    brands: string[];
    reach: DemographicItem[];
}

const MetricsDisplay = ({ data }: { data: DemographicsData }) => {
    return (
        <div className="metrics-display-grid fade-up">
            <div className="brands-column">
                <h4 className="highlights-title">MARCAS & CLIENTES</h4>
                <div className="brands-wall">
                    {data.brands.map((brand: string, i: number) => (
                        <BrandItem key={i} name={brand} />
                    ))}
                </div>
            </div>

            <div className="data-column">
                <div className="reach-row">
                   <h4 className="highlights-title">ALCANCE MENSAL</h4>
                   <div className="reach-grid-compact">
                       {data.reach.map((item: DemographicItem, i: number) => (
                           <ReachMetric key={i} label={item.label} value={item.value} />
                       ))}
                   </div>
                </div>

                <div className="demographics-row">
                    <div className="highlights-group">
                        <h4 className="highlights-title">AUDIÊNCIA FEMININA</h4>
                        <div className="metrics-list">
                            {data.gender.filter((g: DemographicItem) => g.label === "Feminino").map((item: DemographicItem, i: number) => (
                                <MetricBar key={i} label={item.label} value={item.value} />
                            ))}
                        </div>
                    </div>
                    <div className="highlights-group">
                        <h4 className="highlights-title">FAIXA PRINCIPAL</h4>
                        <div className="metrics-list">
                            {data.age.filter((a: DemographicItem) => a.label === "18-24" || a.label === "25-34").map((item: DemographicItem, i: number) => (
                                <MetricBar key={i} label={item.label} value={item.value} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const NonNegotiables = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = stackRef.current?.querySelectorAll('.value-item');
            if (!items || items.length === 0) return;

            // Initial state: hide all items and their layers for a "Viscous Reveal"
            items.forEach((item) => {
                const number = item.querySelector('.value-background-number');
                const content = item.querySelector('.content-inner');
                const title = item.querySelector('.value-title');
                const media = item.querySelector('.editorial-media-frame');

                gsap.set(item, { autoAlpha: 0 });
                gsap.set(number, { autoAlpha: 0, scale: 0.85, yPercent: 10 });
                gsap.set(content, { autoAlpha: 0, yPercent: 20 });
                gsap.set(title, { clipPath: 'inset(100% 0 0 0)' });
                gsap.set(media, { autoAlpha: 0, scale: 1.1, skewX: 8, xPercent: 10 });
            });

            // Show first item immediately with its initial state
            const first = items[0];
            gsap.set(first, { autoAlpha: 1 });
            gsap.set(first.querySelector('.value-background-number'), { autoAlpha: 0.8, scale: 1, yPercent: 0 });
            gsap.set(first.querySelector('.content-inner'), { autoAlpha: 1, yPercent: 0 });
            gsap.set(first.querySelector('.value-title'), { clipPath: 'inset(0% 0 0 0)' });
            gsap.set(first.querySelector('.editorial-media-frame'), { autoAlpha: 1, scale: 1, skewX: 0, xPercent: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${items.length * 300}%`, // Deeper scroll for viscous feel
                    pin: true,
                    scrub: 1.2, // Smoother, more "heavy" scrub
                    anticipatePin: 1,
                }
            });

            // EXPERT MOTION: Layered Parallax Sequence
            items.forEach((item, index) => {
                if (index === 0) {
                    tl.to({}, { duration: 2 }); // Initial hold
                    return;
                };

                const prevItem = items[index - 1];
                const labelEnter = `step-enter-${index}`;
                
                // 1. EXIT: Prev Item (Layers disperse in parallax)
                tl.to(prevItem.querySelector('.value-background-number'), { autoAlpha: 0, yPercent: -20, scale: 1.1, duration: 1.5 }, labelEnter)
                  .to(prevItem.querySelector('.content-inner'), { autoAlpha: 0, yPercent: -30, duration: 1 }, labelEnter)
                  .to(prevItem.querySelector('.editorial-media-frame'), { autoAlpha: 0, xPercent: -15, scale: 0.9, skewX: -5, duration: 1.5 }, labelEnter)
                  .to(prevItem, { autoAlpha: 0, duration: 0.5 }, `${labelEnter}+=1`) // Clean clip
                
                // 2. ENTER: Current Item (Slices and skewed reveals)
                  .to(item, { autoAlpha: 1, duration: 0.1 }, labelEnter) // Reveal base
                  .to(item.querySelector('.value-background-number'), { 
                      autoAlpha: 0.8, scale: 1, yPercent: 0, 
                      duration: 2, ease: "power2.out" 
                  }, labelEnter)
                  .to(item.querySelector('.editorial-media-frame'), { 
                      autoAlpha: 1, scale: 1, skewX: 0, xPercent: 0, 
                      duration: 2, ease: "expo.out" 
                  }, `${labelEnter}+=0.2`)
                  .to(item.querySelector('.value-title'), { 
                      clipPath: 'inset(0% 0 0 0)', 
                      duration: 1.5, ease: "power4.out" 
                  }, `${labelEnter}+=0.5`)
                  .to(item.querySelector('.content-inner'), { 
                      autoAlpha: 1, yPercent: 0, 
                      duration: 1.5, ease: "power2.out" 
                  }, `${labelEnter}+=0.8`)
                
                // 3. HOLD: Viscous reading time
                  .to({}, { duration: 3 });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="non-negotiables" ref={sectionRef}>
            <div className="container nn-container">
                <header className="nn-header">
                    <div className="nn-title-wrap reveal-on-scroll">
                        <h2 className="nn-main-title">Diferenciais</h2>
                    </div>
                </header>

                <div className="values-stack" ref={stackRef}>
                    {VALUES.map((item, index) => (
                        <div 
                            key={index} 
                            className={`value-item ${item.isDemographics ? 'full-width-item' : ''} layout-${index === 0 ? 'social' : 'editorial'}`}
                        >
                            {/* EXPERT UI: Background Numbering Artifact */}
                            <div className="value-background-number">{item.number}</div>

                            <div className="value-content-side">
                                <div className="content-inner reveal-up">
                                    <span className="value-label">Diferencial {item.number}</span>
                                    <h3 className="value-title">{item.title}</h3>
                                    <p className="value-text">{item.text}</p>
                                    {item.isDemographics && item.demographics && <MetricsDisplay data={item.demographics} />}
                                </div>
                            </div>

                            <div className="value-media-side">
                                <div className="editorial-media-frame">
                                    {item.videoSrc ? (
                                        <div className="value-video-wrapper">
                                            <LazyVideo 
                                                src={item.videoSrc}
                                                className="value-gif-video"
                                                autoPlay loop muted playsInline
                                            />
                                        </div>
                                    ) : item.imageSrc ? (
                                        <div className="value-video-wrapper">
                                                <img 
                                                    src={item.imageSrc} 
                                                    alt={item.title}
                                                    className="value-gif-video"
                                                    style={{ objectFit: 'cover' }}
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="nn-cta">
                    <a href="#contact" className="cta-link">VAMOS CONVERSAR SOBRE SUA CAMPANHA →</a>
                </div>
            </div>
        </section>
    );
};

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

            // Initial state: hide all items
            gsap.set(items, { autoAlpha: 0, yPercent: 30 });
            // Show only the first one immediately
            gsap.set(items[0], { autoAlpha: 1, yPercent: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${items.length * 200}%`, // Increased scroll distance for more "hold" time
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // Iterate through items for a clean cross-fade sequence
            items.forEach((item, index) => {
                if (index === 0) {
                    // Item 0 is already visible, just add a 'hold' for it
                    tl.to({}, { duration: 1.5 }); 
                    return;
                };

                const labelEnter = `step-enter-${index}`;
                
                // 1. Fade OUT the previous item COMPLETELY
                tl.to(items[index - 1], {
                    autoAlpha: 0,
                    yPercent: -20,
                    duration: 1,
                    ease: 'power2.inOut',
                }, labelEnter)
                
                // 2. Contemporaneously, fade IN the current item
                .to(item, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: 'power2.out',
                }, labelEnter)
                
                // 3. Add a "HOLD" duration so users can read
                .to({}, { duration: 2 });
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
                        <div key={index} className={`value-item ${item.isDemographics ? 'full-width-item' : ''}`}>
                            
                            <div className="value-content-side">
                                <span className="value-number">{item.number}</span>
                                <h3 className="value-title">{item.title}</h3>
                                <p className="value-text">{item.text}</p>
                                {item.isDemographics && item.demographics && <MetricsDisplay data={item.demographics} />}
                            </div>

                            <div className="value-media-side">
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
                                                style={{ objectFit: 'contain' }}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                    </div>
                                ) : null}
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

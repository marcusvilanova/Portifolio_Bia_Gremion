import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
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

            // Initial state: hide all items and their layers
            items.forEach((item) => {
                const number = item.querySelector('.value-background-number');
                const content = item.querySelector('.content-inner');
                const title = item.querySelector('.value-title');
                const highlight = item.querySelector('.highlight-artifact');

                gsap.set(item, { autoAlpha: 0 });
                gsap.set(number, { autoAlpha: 0, scale: 0.9 });
                gsap.set(content, { autoAlpha: 0, yPercent: 15 });
                gsap.set(title, { autoAlpha: 0, yPercent: 30 });
                if (highlight) gsap.set(highlight, { autoAlpha: 0, yPercent: 20 });
            });

            // Show first item immediately
            const first = items[0];
            gsap.set(first, { autoAlpha: 1 });
            gsap.set(first.querySelector('.value-background-number'), { autoAlpha: 0.7, scale: 1 });
            gsap.set(first.querySelector('.content-inner'), { autoAlpha: 1, yPercent: 0 });
            gsap.set(first.querySelector('.value-title'), { autoAlpha: 1, yPercent: 0 });
            const firstHL = first.querySelector('.highlight-artifact');
            if (firstHL) gsap.set(firstHL, { autoAlpha: 1, yPercent: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${items.length * 250}%`,
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                }
            });

            // Layered Parallax Sequence
            items.forEach((item, index) => {
                if (index === 0) {
                    tl.to({}, { duration: 2 }); // hold
                    return;
                }

                const prevItem = items[index - 1];
                const label = `step-${index}`;
                
                // EXIT previous
                tl.to(prevItem.querySelector('.value-background-number'), { autoAlpha: 0, yPercent: -15, duration: 1.2 }, label)
                  .to(prevItem.querySelector('.highlight-artifact'), { autoAlpha: 0, yPercent: -20, duration: 1 }, label)
                  .to(prevItem.querySelector('.content-inner'), { autoAlpha: 0, yPercent: -20, duration: 1 }, label)
                  .to(prevItem, { autoAlpha: 0, duration: 0.3 }, `${label}+=0.9`)
                
                // ENTER current
                  .to(item, { autoAlpha: 1, duration: 0.1 }, label)
                  .to(item.querySelector('.value-background-number'), { 
                      autoAlpha: 0.7, scale: 1, yPercent: 0, 
                      duration: 1.8, ease: "power2.out" 
                  }, label)
                  .to(item.querySelector('.highlight-artifact'), { 
                      autoAlpha: 1, yPercent: 0, 
                      duration: 1.5, ease: "power3.out" 
                  }, `${label}+=0.2`)
                  .to(item.querySelector('.value-title'), { 
                      autoAlpha: 1, yPercent: 0, 
                      duration: 1.2, ease: "power3.out" 
                  }, `${label}+=0.4`)
                  .to(item.querySelector('.content-inner'), { 
                      autoAlpha: 1, yPercent: 0, 
                      duration: 1.2, ease: "power2.out" 
                  }, `${label}+=0.6`)
                
                // HOLD
                  .to({}, { duration: 2.5 });
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
                            className={`value-item ${item.isDemographics ? 'is-demographics-slide' : ''} data-monolith-layout`}
                        >
                            {/* EXPERT UI: Background Monumental Numbering Artifact */}
                            <div className="value-background-number">{item.number}</div>

                            <div className="value-monolith-grid">
                                <div className="highlight-column">
                                    <div className="highlight-artifact reveal-on-scroll">
                                        <span className="huge-stat">{item.highlight}</span>
                                        <span className="stat-label">{item.subHighlight}</span>
                                    </div>
                                </div>

                                <div className="content-column">
                                    <div className="content-inner reveal-up">
                                        <span className="value-label">Diferencial {item.number}</span>
                                        <h3 className="value-title">{item.title}</h3>
                                        <p className="value-text">{item.text}</p>
                                        {item.isDemographics && item.demographics && <MetricsDisplay data={item.demographics} />}
                                    </div>
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

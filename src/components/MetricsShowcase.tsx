import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import '../styles/components/_metrics_showcase.scss';

const METRIC_DATA = [
    {
        id: 1,
        image: "/images/portfolio/metrics-1.webp",
        phrase: "CONEXÃO REAL, IMPACTO MENSURÁVEL",
        bgColor: "#1a1a1a" // Deep Black for professional contrast
    },
    {
        id: 2,
        image: "/images/portfolio/metrics-2.webp",
        phrase: "AUDIÊNCIA QUALIFICADA E ENGAJADA",
        bgColor: "#A32638" // Bia's Signature Red
    },
    {
        id: 3,
        image: "/images/portfolio/metrics-3.webp",
        phrase: "REPRESENTATIVIDADE QUE CONVERTE",
        bgColor: "#2d3436" // Sophisticated Graphite
    }
];

export const MetricsShowcase = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = sectionRef.current?.querySelectorAll('.metric-showcase-item');
            if (items && items.length > 0) {
                gsap.fromTo(items,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.5,
                        stagger: 0.3,
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 70%",
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="metrics-showcase" ref={sectionRef}>
            <div className="metrics-showcase-grid">
                {METRIC_DATA.map((item) => (
                    <div 
                        key={item.id} 
                        className="metric-showcase-item"
                        style={{ backgroundColor: item.bgColor }}
                    >
                        <div className="metric-image-wrapper">
                            <img 
                                src={item.image} 
                                alt={`Métrica ${item.id}`} 
                                className="metric-image"
                                loading="lazy"
                            />
                        </div>
                        <div className="metric-text-overlay">
                            <h3 className="metric-phrase">{item.phrase}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

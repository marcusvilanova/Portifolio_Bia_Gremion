import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import '../styles/components/_archives.scss';

import { ARCHIVE_ITEMS } from '../data/portfolio-data';
// Real brands Bia Gremion worked with — sourced directly from client


export const Archives = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const items = sectionRef.current?.querySelectorAll('.archive-item');
        if (items && items.length > 0) {
            gsap.fromTo(items,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.06, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            );
        }
    }, []);

    return (
        <section className="selected-archives" ref={sectionRef}>
            <div className="container archive-container">
                <div className="archive-header">
                    <h3 className="section-label">MARCAS & CAMPANHAS</h3>
                    <p className="archive-subtitle">Empresas com quem já desenvolvi estratégias de publicidade</p>
                </div>
                
                <ul className="archive-list">
                    {ARCHIVE_ITEMS.map((item, index) => (

                        <li 
                            key={index} 
                            className="archive-item"
                        >
                            <span className="archive-type">{item.type}</span>
                            <span className="archive-title">{item.title}</span>
                            <span className="archive-year">{item.year}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};


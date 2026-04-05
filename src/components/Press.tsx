import { useRef } from 'react';

import { ArrowUpRight } from 'lucide-react';
import '../styles/components/_press.scss';
import { useScrollReveal } from '../hooks/useScrollReveal';

// GSAP registration is now handled in ../lib/gsap.ts

import { PRESS_ARTICLES } from '../data/portfolio-data';


export const Press = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);


    return (
        <section id="press" className="press-section" ref={sectionRef}>
            <div className="container press-container">
                <div className="press-header reveal-on-scroll">
                    <span className="section-label">NA MÍDIA</span>
                    <h2 className="minimal-title">IMPRENSA &<br/>DESTAQUE.</h2>
                </div>

                <div className="press-list stagger-reveal-container">
                    {PRESS_ARTICLES.map((article) => {
                        const Content = (
                            <>
                                <div className="press-source">{article.source}</div>
                                <div className="press-content">
                                    <h3 className="press-article-title">{article.title}</h3>
                                    <p className="press-desc">{article.desc}</p>
                                </div>
                                {article.link && (
                                    <div className="press-icon">
                                        <ArrowUpRight size={32} strokeWidth={1} />
                                    </div>
                                )}
                            </>
                        );

                        return article.link ? (
                            <a 
                                key={article.id} 
                                href={article.link} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="press-item reveal-on-scroll"
                            >
                                {Content}
                            </a>
                        ) : (
                            <div key={article.id} className="press-item reveal-on-scroll no-link">
                                {Content}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};


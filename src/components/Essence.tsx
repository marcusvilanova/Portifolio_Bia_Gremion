import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import '../styles/components/_essence.scss';

const PARAGRAPHS = [
    "A moda não é sobre caber, é sobre existir e reivindicar o seu espaço.",
    "Em um mercado construído sobre formas engessadas, eu escolho ser textura, força e verdade indiscutível.",
    "Meu corpo é o meu manifesto visual. Minha presença exige ser sentida não apenas pela estética, mas pelo impacto.",
    "Entregamos mais do que imagem. Entregamos essência crua e a certeza de que a beleza real não pede licença.",
    "BIA GREMION."
];

export const Essence = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const darkenRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set('.manifesto-text', { autoAlpha: 0, y: 30 });
            gsap.set(titleRef.current, { autoAlpha: 0, scale: 0.95 });
            
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=600%", // Bem longo para bastante tempo de leitura
                    pin: true,
                    scrub: 1,
                }
            });

            // 1. Transição sutil: Imagem entra ganhando nitidez (blur -> 0)
            tl.to(imageRef.current, { 
                opacity: 1, 
                filter: 'blur(0px)', 
                duration: 1.5, 
                ease: 'power2.out' 
            })
              .to(bgRef.current, { backgroundColor: '#EADCDD', duration: 1 }, "<")
              
            // 2. Escurece a tela conforme o scroll avança
              .to(darkenRef.current, { opacity: 0.8, duration: 1.2 }, "+=0.3")

            // 3. O Título entra com blur dissolve
              .to(titleRef.current, { 
                autoAlpha: 1, 
                filter: 'blur(0px)', 
                scale: 1, 
                duration: 1.5 
              })
              .to(titleRef.current, { 
                autoAlpha: 0, 
                filter: 'blur(10px)', 
                duration: 1 
              }, "+=0.5");

            // 4. Parágrafos entram um por um com o mesmo efeito de foco
            const paragraphs = gsap.utils.toArray('.manifesto-text') as HTMLElement[];
            
            paragraphs.forEach((p, index) => {
                const isLast = index === paragraphs.length - 1;
                
                tl.to(p, { 
                    autoAlpha: 1, 
                    filter: 'blur(0px)', 
                    y: 0, 
                    duration: 1.5,
                    ease: 'power2.out'
                }) 
                
                if (!isLast) {
                    tl.to(p, { 
                        autoAlpha: 0, 
                        filter: 'blur(10px)', 
                        y: -20, 
                        duration: 1 
                    }, "+=1.8"); 
                }
            });

            // 5. Segura a última palavra na tela no final do pin
            tl.to({}, {duration: 2});
        });
        return () => ctx.revert();
    }, []);

    return (
        <section className="essence-tech-section" ref={sectionRef} id="identidade">
            {/* O Fundo Que Transita Cores */}
            <div className="essence-tech-bg" ref={bgRef} />
            
            {/* Imagem Cover Otimizada para o Rosto */}
            <img 
                ref={imageRef} 
                src="/f822a6e6-8529-454c-8c72-c82b8c210f30.png" 
                alt="Bia Gremion Manifesto" 
                className="essence-tech-image" 
                loading="lazy"
            />

            {/* Overlay Escuro para Contraste Textual */}
            <div className="essence-darken-overlay" ref={darkenRef} />

            {/* O Título de Abertura Inicial */}
            <h2 className="essence-manifesto-intro" ref={titleRef}>A ESSÊNCIA.</h2>

            {/* O Conteúdo do Manifesto Sequencial (Empilhados Absolutamente, mas sem sobreposição temporal) */}
            <div className="essence-manifesto-container">
                {PARAGRAPHS.map((text, i) => (
                    <p key={i} className={`manifesto-text ${i === PARAGRAPHS.length - 1 ? 'manifesto-signature' : ''}`}>
                        {text}
                    </p>
                ))}
            </div>
        </section>
    );
};

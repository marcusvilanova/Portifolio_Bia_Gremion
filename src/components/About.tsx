import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import '../styles/components/_about.scss';

const Counter = ({ end, duration = 2 }: { end: string, duration?: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const numericEnd = parseFloat(end.replace(/[^0-9.]/g, ''));
    
    useEffect(() => {
        if (nodeRef.current) {
            const node = nodeRef.current;
            const st = ScrollTrigger.create({
                trigger: node,
                start: "top 90%",
                onEnter: () => {
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: numericEnd,
                        duration: duration,
                        ease: "power3.out",
                        onUpdate: () => {
                            if (node) {
                                if (isNaN(numericEnd)) {
                                    node.textContent = end;
                                } else {
                                    const formatted = obj.val.toFixed(numericEnd % 1 === 0 ? 0 : 1);
                                    node.textContent = `${formatted}${end.replace(/[0-9.]/g, '')}`;
                                }
                            }
                        }
                    });
                }
            });

            return () => st.kill();
        }
    }, [numericEnd, duration, end]);


    return <span ref={nodeRef} className="num">0</span>;
};

const StatBox = ({ num, desc }: { num: string, desc: string }) => {
    return (
        <div className="stat-box">
            <Counter end={num} />
            <span className="desc">{desc}</span>
        </div>
    );
};

import { useScrollReveal } from '../hooks/useScrollReveal';

export const About = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const maskEls = sectionRef.current?.querySelectorAll('.mask-inner');
            if (maskEls && maskEls.length > 0) {
                gsap.fromTo(maskEls,
                    { y: '110%' },
                    { y: '0%', duration: 1.5, stagger: 0.1, ease: "power4.out",
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
                );
            }

            const editorialImg = sectionRef.current?.querySelector('.editorial-portrait');
            if (editorialImg) {
                gsap.fromTo(editorialImg,
                    { filter: 'grayscale(100%) brightness(0.2)' },
                    { filter: 'grayscale(100%) brightness(1)', duration: 2, ease: "power2.out",
                    scrollTrigger: { trigger: editorialImg, start: 'top 85%' } }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);


    return (
        <section id="about" className="about-editorial" ref={sectionRef}>
            <div className="container editorial-container">
                
                <div className="editorial-text-content">
                    <h2 className="editorial-heading">
                        <span className="mask-reveal"><span className="mask-inner">BIA</span></span>
                        <span className="mask-reveal"><span className="mask-inner">GREMION.</span></span>
                    </h2>
                    
                    <p className="editorial-lead">
                        "A intimidade com a nossa própria verdade é o que realmente gera conexão."
                    </p>
                    
                    <div className="editorial-columns stagger-reveal-container">
                        <div className="col">
                            <p>
                                Oi, eu sou a Bia Gremion, mas pode me chamar de Bia. Sou criadora de conteúdo, maquiadora, e modelo plus size. Nascida em Saquarema (RJ), cruzei o caminho até São Paulo há 11 anos com a coragem de quem precisava escrever a própria história. Vir para cá sozinha e construir tudo do zero me fez entender que a <strong>intimidade com a nossa própria verdade</strong> é o que realmente gera conexão.
                            </p>
                            <p>
                                Como influenciadora, meu foco vai muito além de mostrar produtos; é promover uma conversa real sobre quem somos. Juntas, estamos reescrevendo o que significa ocupar espaço com orgulho e autenticidade. Quero ser a <strong>representatividade que não tive</strong>, mas sei que não faço isso sozinha. Quando digo 'juntas', celebro uma rede inteira de mulheres e vozes potentes que também estão abrindo esses caminhos.
                            </p>
                        </div>
                        <div className="col">
                            <p>
                                Em um mercado digital saturado, onde é tão fácil ser engolida por narrativas vazias, meu maior compromisso é não me desconectar de mim mesma. Filtro diariamente o que faz sentido para os meus ideais, para que a Bia influenciadora seja apenas um reflexo honesto da Bia real.
                            </p>
                            <p>
                                Mas a vontade de transformar precisa de estrutura. Minha formação pela <strong>Escola de Maquiagem MADRE</strong> e a graduação em <strong>Marketing</strong> me dão as ferramentas para unir excelência visual a uma visão estratégica. Entendo o backstage e domino a maquiagem porque sei ler o que realmente faz sentido para a nossa realidade, fora de padrões inatingíveis.
                            </p>
                            <p>
                                Acredito na moda como um meio de contarmos histórias e criarmos conexões. De publis a produções editoriais e eventos, a mensagem é a mesma: <strong>Eu posso ser o que quiser.</strong> Se você se identifica, te convido a me conhecer melhor.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="editorial-image-content reveal-on-scroll">
                    <img 
                        src="/images/portfolio/22.jpeg" 
                        alt="Bia Gremion Headshot" 
                        className="editorial-portrait" 
                        loading="lazy"
                        decoding="async"
                    />
                    <span className="image-caption">Bia Gremion. São Paulo, Brasil.</span>
                    
                    <div className="social-stats stagger-reveal-container">
                        <StatBox num="80.6K" desc="SEGUIDORES" />
                        <StatBox num="20+" desc="MARCAS" />
                        <StatBox num="SPFW" desc="PASSARELA" />
                        <StatBox num="2016" desc="DESDE" />
                    </div>
                </div>

            </div>
        </section>
    );
};

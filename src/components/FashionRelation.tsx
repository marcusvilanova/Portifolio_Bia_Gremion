import { useRef } from 'react';
import '../styles/components/_fashion_relation.scss';

import { useScrollReveal } from '../hooks/useScrollReveal';

export const FashionRelation = () => {
    const sectionRef = useRef<HTMLElement>(null);
    useScrollReveal(sectionRef);


    return (
        <section className="fashion-relation" ref={sectionRef} id="moda">
            <div className="container relation-container">
                <div className="relation-header reveal-on-scroll">
                    <span className="vertente-label">01 · Minha Relação com a Moda</span>
                </div>

                <div className="relation-grid">
                    <div className="relation-image reveal-on-scroll">
                        <img 
                            src="/images/portfolio/76.webp" 
                            alt="Bia Gremion Fashion" 
                            className="fashion-img" 
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    <div className="relation-text stagger-reveal-container">
                        <h2 className="relation-heading reveal-on-scroll">
                            A moda diz que não,<br/>mas eu provo que sim.
                        </h2>
                        <p className="relation-body reveal-on-scroll">
                            "Nosso corpo tem caimento, movimento. Eu saio da teoria e isso, para mim, é militância do começo ao fim."
                        </p>
                        <p className="relation-body reveal-on-scroll">
                            Recuso a ideia de que a moda serve para nos esconder ou nos fazer parecer 'mais magras'. Ela existe para contar histórias, expressar nossa identidade e celebrar quem somos. Pisar na passarela do São Paulo Fashion Week pela LAB, em 2016, não foi a minha estreia. Foi apenas o momento em que o mercado finalmente enxergou o que eu já sabia.
                        </p>
                        <p className="relation-body reveal-on-scroll">
                            Sei como traduzir uma mensagem, isso não muda com o valor da etiqueta ou com o peso da marca no convite. Se o seu projeto se identifica com o que construo aqui, me chama. A resposta provavelmente é sim.
                        </p>
                        <div className="relation-stat reveal-on-scroll">
                            <span className="stat-number">SPFW</span>
                            <span className="stat-desc">Pioneira Plus Size no principal desfile do país</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

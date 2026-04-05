import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Essence } from './components/Essence';
import { ParallaxDivider } from './components/ParallaxDivider';
import { Press } from './components/Press';
import { BodyNarrative } from './components/BodyNarrative';
import { NonNegotiables } from './components/NonNegotiables';
import { MetricsShowcase } from './components/MetricsShowcase';
import { Archives } from './components/Archives';
import { FashionRelation } from './components/FashionRelation';
import { FashionFilm } from './components/FashionFilm';
import { Publis } from './components/Publis';
import { Portfolio } from './components/Portfolio';
import { Beauty } from './components/Beauty';
import { Contact } from './components/Contact';
import './styles/main.scss';

import { SmoothScroll } from './components/common/SmoothScroll';
import { AudioProvider } from './context/AudioContext';
import { AudioControls } from './components/common/AudioControls';

function App() {
  return (
    <AudioProvider>
      <Preloader />
      <CustomCursor />
      
      {/* Film Grain Overlay */}
      <div className="film-grain"></div>
      
      <SmoothScroll>
        <div className="app-container">
        <Navbar />
        <AudioControls /> {/* Added AudioControls here */}
        <main>
          {/* 1. IMPACTO INICIAL */}
          <Hero />
          
          {/* 2. SOBRE */}
          <About />
          
          {/* 3. TRABALHO — Pilares profissionais */}
          <div id="trabalho">
            <Essence />
            <BodyNarrative />
            <Press />
            <FashionRelation />
            
            <Beauty />
          </div>
          
          {/* 4. CAMPANHAS — Argumento comercial + Prova social */}
          <div id="campanhas">
            <NonNegotiables />
            <MetricsShowcase />
            
            <ParallaxDivider 
              type="image" 
              src="/images/portfolio/20.webp" 
              title="AS CAMPANHAS." 
              subtitle="PROVA SOCIAL & TRABALHOS" 
            />
            <Publis />
            <Archives />
          </div>
          
          {/* 5. PORTFÓLIO — Galeria final */}
          <ParallaxDivider 
            type="video" 
            src="/Bia - vídeo de autoaceitação, muito feliz no carnaval.mp4" 
            title="O PORTFÓLIO." 
            subtitle="SELEÇÃO EDITORIAL" 
          />
          <Portfolio />
          <FashionFilm />
          
          {/* 6. CONTATO */}
          <Contact />
        </main>
        </div>
      </SmoothScroll>
    </AudioProvider>
  );
}

export default App;

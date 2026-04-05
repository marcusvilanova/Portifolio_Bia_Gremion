import { lazy, Suspense } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import './styles/main.scss';

import { SmoothScroll } from './components/common/SmoothScroll';
import { AudioProvider } from './context/AudioContext';
import { AudioControls } from './components/common/AudioControls';

// Lazy loading below-the-fold components for performance
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Essence = lazy(() => import('./components/Essence').then(m => ({ default: m.Essence })));
const ParallaxDivider = lazy(() => import('./components/ParallaxDivider').then(m => ({ default: m.ParallaxDivider })));
const Press = lazy(() => import('./components/Press').then(m => ({ default: m.Press })));
const BodyNarrative = lazy(() => import('./components/BodyNarrative').then(m => ({ default: m.BodyNarrative })));
const NonNegotiables = lazy(() => import('./components/NonNegotiables').then(m => ({ default: m.NonNegotiables })));
const MetricsShowcase = lazy(() => import('./components/MetricsShowcase').then(m => ({ default: m.MetricsShowcase })));
const Archives = lazy(() => import('./components/Archives').then(m => ({ default: m.Archives })));
const FashionRelation = lazy(() => import('./components/FashionRelation').then(m => ({ default: m.FashionRelation })));
const FashionFilm = lazy(() => import('./components/FashionFilm').then(m => ({ default: m.FashionFilm })));
const Publis = lazy(() => import('./components/Publis').then(m => ({ default: m.Publis })));
const Portfolio = lazy(() => import('./components/Portfolio').then(m => ({ default: m.Portfolio })));
const Beauty = lazy(() => import('./components/Beauty').then(m => ({ default: m.Beauty })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));

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
        <AudioControls />
        <main>
          {/* 1. IMPACTO INICIAL (Carregamento imediato) */}
          <Hero />
          
          <Suspense fallback={<div className="section-loader" />}>
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
        type="image" 
        src="/images/portfolio/53.webp" 
        title="O PORTFÓLIO." 
        subtitle="SELEÇÃO EDITORIAL" 
      />
            <Portfolio />
            <FashionFilm />
            
            {/* 6. CONTATO */}
            <Contact />
          </Suspense>
        </main>
        </div>
      </SmoothScroll>
    </AudioProvider>
  );
}

export default App;

import { useState, useEffect } from 'react';
import '../styles/components/_navbar.scss';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'trabalho', 'campanhas', 'portfolio', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={closeMenu}>
          <span className="logo-monogram">BG</span>
          <span className="logo-name">Bia Gremion</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="nav-links desktop-nav">
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>Sobre</a>
          <a href="#trabalho" className={`nav-link ${activeSection === 'trabalho' ? 'active' : ''}`}>Trabalho</a>
          <a href="#campanhas" className={`nav-link ${activeSection === 'campanhas' ? 'active' : ''}`}>Campanhas</a>
          <a href="#portfolio" className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`}>Portfólio</a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contato</a>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Nav */}
        <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <nav className="mobile-nav-links">
            <a href="#home" onClick={closeMenu}>Início</a>
            <a href="#about" onClick={closeMenu}>Sobre</a>
            <a href="#trabalho" onClick={closeMenu}>Trabalho</a>
            <a href="#campanhas" onClick={closeMenu}>Campanhas</a>
            <a href="#portfolio" onClick={closeMenu}>Portfólio</a>
            <a href="#contact" onClick={closeMenu}>Contato</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

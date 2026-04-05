import { useState, useEffect, useCallback } from 'react';
import '../styles/components/_navbar.scss';

const NAV_LINKS = [
  { href: '#home', label: 'Início', mobileOnly: true },
  { href: '#about', label: 'Sobre' },
  { href: '#trabalho', label: 'Trabalho' },
  { href: '#campanhas', label: 'Campanhas' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#contact', label: 'Contato' }
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'trabalho', 'campanhas', 'portfolio', 'contact'];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          if (scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen, closeMenu]);

  return (
    <header 
      className={`main-header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}
      role="banner"
    >
      <div className="navbar-container">
        <a href="#home" className="logo" onClick={closeMenu} aria-label="Bia Gremion Home">
          <span className="logo-monogram">BG</span>
          <span className="logo-name">Bia Gremion</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="nav-links desktop-nav" aria-label="Navegação principal">
          {NAV_LINKS.filter(link => !link.mobileOnly).map(link => (
            <a 
              key={link.href}
              href={link.href} 
              className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Backdrop for Mobile Menu */}
        <div 
          className={`mobile-nav-backdrop ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeMenu}
          aria-hidden="true"
        />

        {/* Mobile Nav Overlay */}
        <div 
          id="mobile-nav"
          className={`mobile-nav-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav className="mobile-nav-links" aria-label="Menu mobile">
            {NAV_LINKS.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                onClick={closeMenu}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

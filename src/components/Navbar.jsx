import React, { useState, useEffect } from 'react';
import { Sun, Moon, Globe2, Menu, X, Sparkles } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ t, lang, setLang, theme, setTheme, onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLang(lang === 'tr' ? 'en' : 'tr');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar glass ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, 'hero')}>
          <div className="logo-icon-wrapper">
            <Sparkles className="logo-sparkle" />
          </div>
          <span className="logo-text">
            SUDA <span className="logo-sub">DİYETİSYEN</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="nav-menu">
          <a href="#hero" className="nav-item" onClick={(e) => handleNavClick(e, 'hero')}>
            {t.navHome}
          </a>
          <a href="#about" className="nav-item" onClick={(e) => handleNavClick(e, 'about')}>
            {lang === 'tr' ? 'Hakkımda' : 'About'}
          </a>
          <a href="#services" className="nav-item" onClick={(e) => handleNavClick(e, 'services')}>
            {lang === 'tr' ? 'Diyet Paketleri' : 'Diet Packages'}
          </a>
          <a href="#showcase" className="nav-item" onClick={(e) => handleNavClick(e, 'showcase')}>
            {lang === 'tr' ? 'Tarifler & Başarılar' : 'Recipes & Success'}
          </a>
          <a href="#team" className="nav-item" onClick={(e) => handleNavClick(e, 'team')}>
            {t.navTeam}
          </a>
          <button className="nav-item btn-contact-nav" onClick={onContactClick}>
            {lang === 'tr' ? 'Randevu Al' : 'Book Appointment'}
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="nav-controls">
          <button
            className="control-btn"
            onClick={toggleTheme}
            title={theme === 'light' ? t.darkMode : t.lightMode}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            className="control-btn lang-btn"
            onClick={toggleLanguage}
            title="Switch Language"
            aria-label="Switch Language"
          >
            <Globe2 size={18} />
            <span className="lang-code">{lang.toUpperCase()}</span>
          </button>

          <button
            className="control-btn mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      <div className={`mobile-nav glass ${isOpen ? 'open' : ''}`}>
        <a href="#hero" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'hero')}>
          {t.navHome}
        </a>
        <a href="#about" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'about')}>
          {lang === 'tr' ? 'Hakkımda' : 'About'}
        </a>
        <a href="#services" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'services')}>
          {lang === 'tr' ? 'Diyet Paketleri' : 'Diet Packages'}
        </a>
        <a href="#showcase" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'showcase')}>
          {lang === 'tr' ? 'Tarifler & Başarılar' : 'Recipes & Success'}
        </a>
        <a href="#team" className="mobile-nav-item" onClick={(e) => handleNavClick(e, 'team')}>
          {t.navTeam}
        </a>
        <button
          className="mobile-nav-item mobile-contact-btn"
          onClick={() => { setIsOpen(false); onContactClick(); }}
        >
          {lang === 'tr' ? 'Randevu Al' : 'Book Appointment'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

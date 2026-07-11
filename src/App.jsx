import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Showcase from './components/Showcase';
import Team from './components/Team';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import ContactPopup from './components/ContactPopup';
import CostCalculator from './components/CostCalculator';
import Workflow from './components/Workflow';
import AdminPanel from './components/AdminPanel';
import Testimonials from './components/Testimonials';
import AIChatbot from './components/AIChatbot';
import { translations } from './utils/translations';
import './App.css';

function App() {
  const [lang, setLang] = useState('tr');
  const [allTranslations, setAllTranslations] = useState(() => {
    const stored = localStorage.getItem('suda_translations');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Defensively merge newly added testimonials keys
        if (parsed.tr && !parsed.tr.testimonialsData) {
          parsed.tr.testimonialsTitle = translations.tr.testimonialsTitle;
          parsed.tr.testimonialsSubtitle = translations.tr.testimonialsSubtitle;
          parsed.tr.testimonialsData = translations.tr.testimonialsData;
        }
        if (parsed.en && !parsed.en.testimonialsData) {
          parsed.en.testimonialsTitle = translations.en.testimonialsTitle;
          parsed.en.testimonialsSubtitle = translations.en.testimonialsSubtitle;
          parsed.en.testimonialsData = translations.en.testimonialsData;
        }
        return parsed;
      } catch (e) {
        return translations;
      }
    }
    return translations;
  });
  const [theme, setTheme] = useState('dark'); // Default to dark mode for premium colors glow
  const [contactOpen, setContactOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem('suda_admin') === 'true';
  });
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [projectsVersion, setProjectsVersion] = useState(0);

  // Custom Cursor Tracker State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle setting/changing the theme attribute in the HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Track mouse coordinates for interactive cursor
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scaling animations on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('.service-card') ||
        target.closest('.team-card') ||
        target.closest('.showcase-card') ||
        target.closest('.filter-btn') ||
        target.closest('.control-btn') ||
        target.closest('.social-btn')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Translation copy selection
  const t = allTranslations[lang];

  const handleOpenContact = () => {
    setPreselectedService('');
    setContactOpen(true);
  };

  const handleInquireService = (serviceTitle) => {
    setPreselectedService(serviceTitle);
    setContactOpen(true);
  };

  return (
    <div className="app-wrapper">
      {/* Custom Premium Agency Cursor Follower */}
      {!isMobile && (
        <>
          <div
            className={`custom-cursor ${isHovered ? 'hovered' : ''}`}
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          ></div>
          <div
            className={`custom-cursor-follower ${isHovered ? 'hovered' : ''}`}
            style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          ></div>
        </>
      )}

      {/* Background Animated Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onContactClick={handleOpenContact}
      />

      <main>
        <Hero
          t={t}
          onContactClick={handleOpenContact}
        />

        <Services
          t={t}
          onInquireService={handleInquireService}
          onOpenCalculator={() => setCalcOpen(true)}
        />

        <Workflow
          t={t}
        />

        <Showcase
          t={t}
          lang={lang}
          isAdmin={isAdmin}
          onLogout={() => {
            setIsAdmin(false);
            sessionStorage.removeItem('suda_admin');
          }}
          projectsVersion={projectsVersion}
        />

        <Testimonials
          t={t}
        />

        <Team
          t={t}
        />
      </main>

      <Footer
        t={t}
        onContactClick={handleOpenContact}
        isAdmin={isAdmin}
        onAdminLoginClick={() => setAdminLoginOpen(true)}
        onAdminLogout={() => {
          setIsAdmin(false);
          sessionStorage.removeItem('suda_admin');
        }}
      />

      {isAdmin && (
        <button
          className="admin-floating-btn"
          onClick={() => setAdminLoginOpen(true)}
          title="Yönetici Paneli"
          aria-label="Yönetici Paneli"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      )}

      <FloatingContact
        t={t}
        onOpenForm={handleOpenContact}
      />

      <AIChatbot
        t={t}
        lang={lang}
      />

      <ContactPopup
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        t={t}
        preselectedService={preselectedService}
      />

      <CostCalculator
        isOpen={calcOpen}
        onClose={() => setCalcOpen(false)}
        t={t}
        lang={lang}
      />

      <AdminPanel
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          sessionStorage.setItem('suda_admin', 'true');
        }}
        t={t}
        isAdmin={isAdmin}
        allTranslations={allTranslations}
        setAllTranslations={setAllTranslations}
        setProjectsVersion={setProjectsVersion}
      />
    </div>
  );
}

export default App;

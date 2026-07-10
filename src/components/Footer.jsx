import React from 'react';
import { Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import './Footer.css';

const Footer = ({ t, onContactClick, isAdmin, onAdminLoginClick, onAdminLogout }) => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
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

  const handlePhoneCall = () => {
    window.open('tel:05510311029', '_self');
  };

  return (
    <footer className="footer glass">
      <div className="footer-container">

        {/* Left Brand Column */}
        <div className="footer-column brand-col">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <Sparkles size={16} />
            </div>
            <span>SUDA <span className="highlight">DYNAMICS</span></span>
          </div>
          <p className="footer-description">
            {t.footerText}
          </p>
        </div>

        {/* Middle Links Column */}
        <div className="footer-column links-col">
          <h4 className="footer-title">Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>{t.navHome}</a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>{t.navServices}</a>
            </li>
            <li>
              <a href="#showcase" onClick={(e) => handleNavClick(e, 'showcase')}>{t.navShowcase}</a>
            </li>
            <li>
              <a href="#team" onClick={(e) => handleNavClick(e, 'team')}>{t.navTeam}</a>
            </li>
            <li>
              <button className="footer-contact-link" onClick={onContactClick}>{t.navContact}</button>
            </li>
          </ul>
        </div>

        {/* Right Contact Info Column */}
        <div className="footer-column contact-col">
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-contact-details">
            <li>
              <button onClick={handlePhoneCall} className="contact-info-btn">
                <Phone size={16} className="contact-icon purple" />
                <span>0551 031 10 29</span>
              </button>
            </li>
            <li>
              <button onClick={onContactClick} className="contact-info-btn">
                <MessageSquare size={16} className="contact-icon gold" />
                <span>WhatsApp Support</span>
              </button>
            </li>
            <li>
              <a href="mailto:sudadynamics@gmail.com" className="contact-info-btn email-link">
                <Mail size={16} className="contact-icon turquoise" />
                <span>sudadynamics@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Suda Dynamics. {t.footerRights}
          <span style={{ margin: '0 10px', color: 'var(--border-color)' }}>|</span>
          {isAdmin ? (
            <button
              onClick={onAdminLogout}
              className="footer-admin-link-btn"
              style={{ display: 'inline-flex', verticalAlign: 'middle', cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: 'var(--accent-red)', fontWeight: '600', fontFamily: 'inherit', fontSize: '0.85rem' }}
            >
              {t.adminLogoutBtn}
            </button>
          ) : (
            <button
              onClick={onAdminLoginClick}
              className="footer-admin-link-btn"
              style={{ display: 'inline-flex', verticalAlign: 'middle', cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: 'var(--text-secondary)', fontWeight: '600', fontFamily: 'inherit', fontSize: '0.85rem' }}
            >
              {t.adminLoginBtn}
            </button>
          )}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

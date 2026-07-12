import React from 'react';
import { Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import './Footer.css';

const Footer = ({ t, lang, onContactClick, isAdmin, onAdminLoginClick, onAdminLogout, dietitianConfig }) => {
  const profile = dietitianConfig?.profile || {};

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
    window.open(`tel:${profile.phoneRaw || '05510311029'}`, '_self');
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
            <span>SUDA <span className="highlight">DİYETİSYEN</span></span>
          </div>
          <p className="footer-description">
            {lang === 'tr' 
              ? `${profile.name} ile sağlıklı beslenmeyi sürdürülebilir bir yaşam tarzı haline getirin. Size özel hazırlanan diyet listeleri ve profesyonel takiple hedeflerinize aç kalmadan ulaşın.`
              : `Make healthy eating a sustainable lifestyle with ${profile.name}. Achieve your goals without starving with customized diet lists and professional tracking.`}
          </p>
        </div>

        {/* Middle Links Column */}
        <div className="footer-column links-col">
          <h4 className="footer-title">{lang === 'tr' ? 'Hızlı Bağlantılar' : 'Quick Links'}</h4>
          <ul className="footer-links">
            <li>
              <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>{t.navHome}</a>
            </li>
            <li>
              <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>{lang === 'tr' ? 'Hakkımda' : 'About'}</a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>{lang === 'tr' ? 'Diyet Paketleri' : 'Diet Packages'}</a>
            </li>
            <li>
              <a href="#showcase" onClick={(e) => handleNavClick(e, 'showcase')}>{lang === 'tr' ? 'Tarifler & Başarılar' : 'Recipes & Success'}</a>
            </li>
            <li>
              <button className="footer-contact-link" onClick={onContactClick}>{lang === 'tr' ? 'Randevu Al' : 'Book Appointment'}</button>
            </li>
          </ul>
        </div>

        {/* Right Contact Info Column */}
        <div className="footer-column contact-col">
          <h4 className="footer-title">{lang === 'tr' ? 'İletişim' : 'Contact'}</h4>
          <ul className="footer-contact-details">
            <li>
              <button onClick={handlePhoneCall} className="contact-info-btn">
                <Phone size={16} className="contact-icon purple" />
                <span>{profile.phone || '0551 031 10 29'}</span>
              </button>
            </li>
            <li>
              <button onClick={onContactClick} className="contact-info-btn">
                <MessageSquare size={16} className="contact-icon gold" />
                <span>{lang === 'tr' ? 'WhatsApp Desteği' : 'WhatsApp Support'}</span>
              </button>
            </li>
            <li>
              <a href={`mailto:${profile.email || 'dyt.zehraabaci@gmail.com'}`} className="contact-info-btn email-link">
                <Mail size={16} className="contact-icon turquoise" />
                <span>{profile.email || 'dyt.zehraabaci@gmail.com'}</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} SUDA-DİYETİSYEN. {t.footerRights}
          <span style={{ margin: '0 10px', color: 'var(--border-color)' }}>|</span>
          {isAdmin ? (
            <>
              <button
                onClick={onAdminLoginClick}
                className="footer-admin-link-btn"
                style={{ display: 'inline-flex', verticalAlign: 'middle', cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: 'var(--accent-purple)', fontWeight: '600', fontFamily: 'inherit', fontSize: '0.85rem', marginRight: '15px' }}
              >
                Yönetici Paneli
              </button>
              <button
                onClick={onAdminLogout}
                className="footer-admin-link-btn"
                style={{ display: 'inline-flex', verticalAlign: 'middle', cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: 'var(--accent-red)', fontWeight: '600', fontFamily: 'inherit', fontSize: '0.85rem' }}
              >
                {t.adminLogoutBtn}
              </button>
            </>
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

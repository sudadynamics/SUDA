import React from 'react';
import { Eye, Target, Zap, ShieldCheck, Award } from 'lucide-react';
import './About.css';

const About = ({ t }) => {
  const getValueIcon = (index) => {
    switch (index) {
      case 0:
        return <Zap size={24} className="value-icon gold" />;
      case 1:
        return <Award size={24} className="value-icon turquoise" />;
      case 2:
        return <ShieldCheck size={24} className="value-icon purple" />;
      default:
        return <Zap size={24} className="value-icon" />;
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <span className="badge">SUDA DYNAMICS</span>
        <h2>{t.aboutTitle}</h2>
        <p>{t.aboutSubtitle}</p>
      </div>

      <div className="about-grid">
        {/* Left Column: About Us Info */}
        <div className="about-content-card glass">
          <h3 className="about-card-title text-gradient">{t.aboutTitle}</h3>
          <p className="about-description">{t.aboutText}</p>
          <div className="about-stats-mini">
            <div className="mini-stat">
              <span className="mini-stat-num">14</span>
              <span className="mini-stat-label">Gün Maksimum Teslim</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-num">%100</span>
              <span className="mini-stat-label">Geri Ödeme Garantisi</span>
            </div>
          </div>
        </div>

        {/* Right Column: Vision & Mission */}
        <div className="vision-mission-wrapper">
          <div className="vision-card glass hover-glow">
            <div className="card-header-icon-wrapper purple-bg">
              <Eye size={24} className="card-header-icon purple" />
            </div>
            <div className="card-info">
              <h3>{t.visionTitle}</h3>
              <p>{t.visionText}</p>
            </div>
          </div>

          <div className="mission-card glass hover-glow">
            <div className="card-header-icon-wrapper gold-bg">
              <Target size={24} className="card-header-icon gold" />
            </div>
            <div className="card-info">
              <h3>{t.missionTitle}</h3>
              <p>{t.missionText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      {t.valuesData && t.valuesData.length > 0 && (
        <div className="values-container">
          <h3 className="values-title text-gradient">{t.valuesTitle}</h3>
          <div className="values-grid">
            {t.valuesData.map((val, idx) => (
              <div key={idx} className="value-card glass">
                <div className="value-icon-box">
                  {getValueIcon(idx)}
                </div>
                <h4>{val.title}</h4>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default About;

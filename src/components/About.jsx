import React from 'react';
import { Eye, Target, Zap, ShieldCheck, Award } from 'lucide-react';
import './About.css';

const About = ({ t, lang, dietitianConfig }) => {
  const profile = dietitianConfig?.profile || {};

  const valuesData = lang === 'tr' ? [
    {
      title: "Kişiye Özel Yaklaşım",
      desc: "Her metabolizma benzersizdir. Diyetiniz sosyal yaşamınıza, hedeflerinize ve kan tahlillerinize göre özel olarak planlanır."
    },
    {
      title: "Sürdürülebilirlik",
      desc: "Sert yasaklar ve açlık krizleri yok. Amacımız, sağlıklı beslenmeyi ömür boyu sürdürebileceğiniz keyifli bir alışkanlığa dönüştürmektir."
    },
    {
      title: "Bilimsel Temel",
      desc: "Popüler ama sağlıksız trendler yerine, bilimsel veriler ve tıp destekli fonksiyonel beslenme protokolleriyle çalışıyoruz."
    }
  ] : [
    {
      title: "Personalized Approach",
      desc: "Every metabolism is unique. Your diet is planned specifically according to your social life, goals, and blood test results."
    },
    {
      title: "Sustainability",
      desc: "No strict prohibitions or hunger crises. Our goal is to transform healthy eating into an enjoyable, lifelong habit."
    },
    {
      title: "Scientific Basis",
      desc: "Instead of popular but unhealthy trends, we work with scientific data and medically supported functional nutrition protocols."
    }
  ];

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
        <span className="badge">SUDA-DİYETİSYEN</span>
        <h2>{lang === 'tr' ? 'Hakkımda' : 'About Me'}</h2>
        <p>{lang === 'tr' ? 'Sağlıklı ve dengeli beslenmeyi yaşam tarzınız haline getirin.' : 'Make healthy and balanced nutrition your lifestyle.'}</p>
      </div>

      <div className="about-grid">
        {/* Left Column: About Us Info */}
        <div className="about-content-card glass">
          <h3 className="about-card-title text-gradient">{profile.name}</h3>
          <p className="about-description">{lang === 'tr' ? profile.bioTr : profile.bioEn}</p>
          <div className="about-stats-mini">
            <div className="mini-stat">
              <span className="mini-stat-num">8+ Yıl</span>
              <span className="mini-stat-label">{lang === 'tr' ? 'Klinik Deneyim' : 'Clinical Experience'}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-num">%100</span>
              <span className="mini-stat-label">{lang === 'tr' ? 'Kişiye Özel Diyet' : 'Personalized Diet'}</span>
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
              <h3>{lang === 'tr' ? 'Vizyonum' : 'My Vision'}</h3>
              <p>{lang === 'tr' ? profile.visionTr : profile.visionEn}</p>
            </div>
          </div>

          <div className="mission-card glass hover-glow">
            <div className="card-header-icon-wrapper gold-bg">
              <Target size={24} className="card-header-icon gold" />
            </div>
            <div className="card-info">
              <h3>{lang === 'tr' ? 'Misyonum' : 'My Mission'}</h3>
              <p>{lang === 'tr' ? profile.missionTr : profile.missionEn}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-container">
        <h3 className="values-title text-gradient">{lang === 'tr' ? 'Temel Değerlerim' : 'My Core Values'}</h3>
        <div className="values-grid">
          {valuesData.map((val, idx) => (
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
    </section>
  );
};

export default About;

import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageSquare, Shield, Activity, Star, Users, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = ({ t, lang, onContactClick, onOpenDietTest, dietitianConfig }) => {
  // Counters for the stats
  const [stats, setStats] = useState({ projects: 0, satisfaction: 0, weightLoss: 0, experience: 0 });
  const [currentMotivation, setCurrentMotivation] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const profile = dietitianConfig?.profile || {};

  const motivationTipsTr = [
    "Dün bitti, bugün sağlıklı beslenmek için yeni bir fırsat! 🌟",
    "Önemli olan hızlı zayıflamak değil, kalıcı alışkanlıklar edinmektir. 🍏",
    "Bedeniniz size emanet edilmiş en değerli evinizdir. Onu şifayla besleyin. 🌿",
    "Yasaklar yerine porsiyon kontrolünü seçerek özgürce zayıflayın. ✨",
    "Su hayattır! Şu an kalkıp koca bir bardak su içmeye ne dersiniz? 💧",
    "Yavaş ilerlemek, hiç ilerlememekten çok daha iyidir. Pes etmeyin! 💪",
    "Sağlıklı beslenmek bir ceza değil, bedeninize sunduğunuz bir ödüldür. ❤️"
  ];

  const motivationTipsEn = [
    "Yesterday is gone, today is a fresh chance to eat healthy! 🌟",
    "It's not about rapid weight loss, it's about building permanent habits. 🍏",
    "Your body is the only home you have to live in. Nourish it well. 🌿",
    "Choose portion control over strict bans and lose weight freely. ✨",
    "Water is life! How about standing up and drinking a big glass of water right now? 💧",
    "Progress is progress, no matter how slow. Keep going! 💪",
    "Healthy eating is not a punishment, it is a reward for your body. ❤️"
  ];

  useEffect(() => {
    setCurrentMotivation(lang === 'tr' ? motivationTipsTr[0] : motivationTipsEn[0]);
  }, [lang]);

  const shuffleMotivation = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    setTimeout(() => {
      const tips = lang === 'tr' ? motivationTipsTr : motivationTipsEn;
      let nextIndex = Math.floor(Math.random() * tips.length);
      // Ensure we get a different tip if possible
      while (tips[nextIndex] === currentMotivation && tips.length > 1) {
        nextIndex = Math.floor(Math.random() * tips.length);
      }
      setCurrentMotivation(tips[nextIndex]);
      setIsSpinning(false);
    }, 600);
  };

  useEffect(() => {
    const targetProjects = 500;
    const targetSatisfaction = 99;
    const targetWeightLoss = 2450;
    const targetExperience = 8;

    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setStats({
        projects: Math.floor((targetProjects / steps) * currentStep),
        satisfaction: Math.floor((targetSatisfaction / steps) * currentStep),
        weightLoss: Math.floor((targetWeightLoss / steps) * currentStep),
        experience: Math.floor((targetExperience / steps) * currentStep)
      });

      if (currentStep >= steps) {
        setStats({ projects: targetProjects, satisfaction: targetSatisfaction, weightLoss: targetWeightLoss, experience: targetExperience });
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [dietitianConfig]);

  const handleScrollToServices = (e) => {
    e.preventDefault();
    const element = document.getElementById('services');
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
    <section id="hero" className="hero-section">
      <div className="hero-grid">
        {/* Left Content */}
        <div className="hero-content">
          <div className="badge-wrapper animate-fade-in">
            <span className="badge">SUDA-DİYETİSYEN</span>
          </div>
          
          <h1 className="hero-title animate-slide-up">
            {lang === 'tr' ? 'Sağlıklı Yaşama Adım Atın' : 'Step Into Healthy Living'}
            <span className="text-gradient highlight-text" style={{ display: 'block', marginTop: '10px' }}>{profile.name}</span>
          </h1>

          <p className="hero-description animate-slide-up-delayed">
            {lang === 'tr' ? profile.titleTr : profile.titleEn}
            <span style={{ display: 'block', marginTop: '10px', fontSize: '1rem', opacity: 0.85, fontWeight: 400 }}>
              {lang === 'tr' ? profile.bioTr.split('.')[0] + '.' : profile.bioEn.split('.')[0] + '.'}
            </span>
          </p>

          <div className="hero-actions animate-fade-in-delayed">
            <button className="btn-primary hero-btn-main" onClick={onContactClick}>
              {lang === 'tr' ? 'Randevu Al' : 'Book Appointment'} <MessageSquare size={18} />
            </button>
            <button className="btn-secondary hero-btn-sub" onClick={onOpenDietTest}>
              {lang === 'tr' ? 'En Uygun Diyet Testi' : 'Diet Fit Test'} <Sparkles size={18} />
            </button>
            <button className="btn-secondary hero-btn-sub" onClick={handleScrollToServices}>
              {lang === 'tr' ? 'Diyet Paketleri' : 'Diet Packages'} <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Interactive Visual Graphic */}
        <div className="hero-visual">
          <div className="visual-container glass">
            {/* Interactive Grid & Circles */}
            <div className="visual-grid-bg"></div>
            
            <div className="orbital-path path-1">
              <div className="node node-turquoise"><Activity size={14} /></div>
            </div>
            <div className="orbital-path path-2">
              <div className="node node-gold"><Star size={14} /></div>
            </div>
            <div className="orbital-path path-3">
              <div className="node node-purple"><Shield size={14} /></div>
            </div>

            <div className="visual-core" style={{ overflow: 'hidden' }}>
              <div className="core-inner" style={{ background: `url(${profile.image}) center/cover no-repeat`, width: '100%', height: '100%', borderRadius: '50%' }}>
              </div>
            </div>

            {/* Glowing lines connection overlay */}
            <div className="visual-connector line-1"></div>
            <div className="visual-connector line-2"></div>
            <div className="visual-connector line-3"></div>

            {/* Float Cards */}
            <div className="float-card glass card-top">
              <div className="float-card-icon purple"><Users size={16} /></div>
              <div>
                <p className="float-card-title">{lang === 'tr' ? 'Aktif Danışan' : 'Active Clients'}</p>
                <p className="float-card-desc">150+ {lang === 'tr' ? 'Kişi' : 'People'}</p>
              </div>
            </div>

            {/* Middle Motivation Shuffle Card */}
            <div 
              className="float-card glass card-middle motivation-float-card" 
              onClick={shuffleMotivation} 
              style={{ cursor: 'pointer' }}
              title={lang === 'tr' ? 'Tıklayarak ipucunu değiştir' : 'Click to shuffle tip'}
            >
              <div className="float-card-icon gold">
                <Sparkles size={16} className={isSpinning ? 'spin-animation' : ''} />
              </div>
              <div style={{ flex: 1 }}>
                <p className="float-card-title">{lang === 'tr' ? 'Günün Motivasyonu ⚡' : 'Daily Motivation ⚡'}</p>
                <p className="float-card-desc motivation-text-tip">{currentMotivation}</p>
              </div>
            </div>

            <div className="float-card glass card-bottom">
              <div className="float-card-icon turquoise"><Activity size={16} /></div>
              <div>
                <p className="float-card-title">{lang === 'tr' ? 'Toplam Zayıflama' : 'Total Loss'}</p>
                <p className="float-card-desc">2.4 {lang === 'tr' ? 'Ton Yağ' : 'Tons of Fat'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="hero-stats-wrapper">
        <div className="hero-stats glass">
          <div className="stat-item">
            <h3 className="stat-number text-gradient">{stats.projects}+</h3>
            <p className="stat-label">{lang === 'tr' ? 'Başarılı Danışan' : 'Successful Clients'}</p>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-item">
            <h3 className="stat-number text-gradient">%{stats.satisfaction}</h3>
            <p className="stat-label">{lang === 'tr' ? 'Danışan Memnuniyeti' : 'Client Satisfaction'}</p>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-item">
            <h3 className="stat-number text-gradient">{stats.weightLoss}+ kg</h3>
            <p className="stat-label">{lang === 'tr' ? 'Kilo Kaybı' : 'Total Weight Lost'}</p>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-item">
            <h3 className="stat-number text-gradient">{stats.experience}+ Yıl</h3>
            <p className="stat-label">{lang === 'tr' ? 'Deneyim Süresi' : 'Years Experience'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

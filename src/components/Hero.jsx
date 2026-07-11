import React, { useEffect, useState } from 'react';
import { ArrowRight, MessageSquare, Shield, Activity, Star, Users } from 'lucide-react';
import './Hero.css';

const Hero = ({ t, onContactClick }) => {
  // Counters for the stats
  const [stats, setStats] = useState({ projects: 0, satisfaction: 0, uptime: 90.0, devs: 0 });

  useEffect(() => {
    const targetProjects = parseInt(t.statProjectsCount) || 120;
    const targetSatisfaction = parseInt(t.statSatisfactionPercent) || 99;
    const targetUptime = parseFloat(t.statUptimePercent) || 99.9;
    const targetDevs = parseInt(t.statDevelopersCount) || 4;

    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setStats({
        projects: Math.floor((targetProjects / steps) * currentStep),
        satisfaction: Math.floor((targetSatisfaction / steps) * currentStep),
        uptime: parseFloat((90.0 + ((targetUptime - 90.0) / steps) * currentStep).toFixed(1)),
        devs: Math.min(targetDevs, Math.floor((targetDevs / (steps / 2)) * currentStep))
      });

      if (currentStep >= steps) {
        setStats({ projects: targetProjects, satisfaction: targetSatisfaction, uptime: targetUptime, devs: targetDevs });
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [t.statProjectsCount, t.statSatisfactionPercent, t.statUptimePercent, t.statDevelopersCount]);

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
            <span className="badge">SUDA DYNAMICS v2.6</span>
          </div>
          
          <h1 className="hero-title animate-slide-up">
            {t.heroTitlePrefix}
            <span className="text-gradient highlight-text">{t.heroTitleHighlight}</span>
          </h1>

          <p className="hero-description animate-slide-up-delayed">
            {t.heroSubtitle}
          </p>

          <div className="hero-actions animate-fade-in-delayed">
            <button className="btn-primary hero-btn-main" onClick={onContactClick}>
              {t.heroCTA1} <MessageSquare size={18} />
            </button>
            <button className="btn-secondary hero-btn-sub" onClick={handleScrollToServices}>
              {t.heroCTA2} <ArrowRight size={18} />
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

            <div className="visual-core">
              <div className="core-inner">
                <span className="core-logo">SD</span>
              </div>
            </div>

            {/* Glowing lines connection overlay */}
            <div className="visual-connector line-1"></div>
            <div className="visual-connector line-2"></div>
            <div className="visual-connector line-3"></div>

            {/* Mini Float card */}
            <div className="float-card glass card-top">
              <div className="float-card-icon purple"><Users size={16} /></div>
              <div>
                <p className="float-card-title">Dev Team</p>
                <p className="float-card-desc">4 Active Creators</p>
              </div>
            </div>

            <div className="float-card glass card-bottom">
              <div className="float-card-icon turquoise"><Activity size={16} /></div>
              <div>
                <p className="float-card-title">Integrations</p>
                <p className="float-card-desc">99.9% Reliable API</p>
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
            <p className="stat-label">{t.statProjects}</p>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-item">
            <h3 className="stat-number text-gradient">%{stats.satisfaction}</h3>
            <p className="stat-label">{t.statSatisfaction}</p>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-item">
            <h3 className="stat-number text-gradient">%{stats.uptime}</h3>
            <p className="stat-label">{t.statUptime}</p>
          </div>
          <div className="stat-separator"></div>
          <div className="stat-item">
            <h3 className="stat-number text-gradient">{stats.devs}</h3>
            <p className="stat-label">{t.statDevelopers}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

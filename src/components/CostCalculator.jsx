import React, { useState } from 'react';
import { X, Cpu, GitMerge, Smartphone, Globe, Calendar, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import './CostCalculator.css';

const CostCalculator = ({ isOpen, onClose, t, lang }) => {
  const [projectType, setProjectType] = useState('web');
  const [scale, setScale] = useState('medium');
  const [urgency, setUrgency] = useState('normal');

  if (!isOpen) return null;

  // Simple logic to calculate dynamic timelines (maximum 14 days / 2 weeks)
  const getTimeline = () => {
    let days = 7;
    if (projectType === 'web') days = 7;
    if (projectType === 'mobile') days = 11;
    if (projectType === 'automation') days = 6;
    if (projectType === 'integration') days = 5;

    if (scale === 'small') days = Math.round(days * 0.6);
    if (scale === 'enterprise') days = Math.round(days * 1.3);

    if (urgency === 'fast') days = Math.round(days * 0.75);
    if (urgency === 'immediate') days = Math.round(days * 0.5);

    return Math.max(1, Math.min(14, days));
  };

  const getTimelineString = () => {
    const days = getTimeline();
    return lang === 'tr' ? `${days} Gün` : `${days} Days`;
  };

  const getEstCost = () => {
    // We can display a beautiful estimate rating or abstract scale (e.g., $$$) instead of hard numbers
    let stars = 2;
    if (projectType === 'mobile') stars += 2;
    if (projectType === 'automation') stars += 1;
    if (scale === 'small') stars -= 1;
    if (scale === 'enterprise') stars += 2;
    if (urgency === 'fast' || urgency === 'immediate') stars += 1;
    
    return "⚡".repeat(Math.max(1, Math.min(5, stars)));
  };

  const getTypeName = () => {
    switch (projectType) {
      case 'web': return t.calculatorOption2;
      case 'mobile': return t.calculatorOption1;
      case 'automation': return t.calculatorOption3;
      case 'integration': return 'API & Entegrasyon';
      default: return '';
    }
  };

  const handleWhatsAppSend = () => {
    const timelineStr = getTimelineString();
    const costRating = getEstCost();
    const msg = `*Suda Dynamics Proje Fiyat Hesaplaması* \n\n` +
                `*Proje Tipi:* ${getTypeName()}\n` +
                `*Proje Ölçeği:* ${scale.toUpperCase()}\n` +
                `*Termin Önceliği:* ${urgency.toUpperCase()}\n` +
                `*Tahmini Süre:* ~${timelineStr}\n` +
                `*Yoğunluk Derecesi:* ${costRating}\n\n` +
                `Merhaba, bu detaylara uygun bir teklif almak istiyoruz. Bizimle iletişime geçebilir misiniz?`;
                
    const url = `https://wa.me/905510311029?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content calculator-modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close Calculator">
          <X size={20} />
        </button>

        <div className="calculator-header">
          <div className="calc-badge">
            <Sparkles size={14} className="sparkle-gold" />
            <span>AI ENGINE</span>
          </div>
          <h3 className="calculator-title">{t.calculatorTitle}</h3>
        </div>

        <div className="calculator-body">
          {/* Step 1: Project Type */}
          <div className="calc-group">
            <label className="calc-group-title">{t.calculatorField1}</label>
            <div className="type-grid">
              <button 
                className={`type-card glass ${projectType === 'web' ? 'active' : ''}`}
                onClick={() => setProjectType('web')}
              >
                <Globe size={20} className="card-icon" />
                <span>{t.calculatorOption2}</span>
              </button>
              <button 
                className={`type-card glass ${projectType === 'mobile' ? 'active' : ''}`}
                onClick={() => setProjectType('mobile')}
              >
                <Smartphone size={20} className="card-icon" />
                <span>{t.calculatorOption1}</span>
              </button>
              <button 
                className={`type-card glass ${projectType === 'automation' ? 'active' : ''}`}
                onClick={() => setProjectType('automation')}
              >
                <Cpu size={20} className="card-icon" />
                <span>{t.calculatorOption3}</span>
              </button>
              <button 
                className={`type-card glass ${projectType === 'integration' ? 'active' : ''}`}
                onClick={() => setProjectType('integration')}
              >
                <GitMerge size={20} className="card-icon" />
                <span>Entegrasyon</span>
              </button>
            </div>
          </div>

          {/* Step 2: Scale */}
          <div className="calc-group">
            <label className="calc-group-title">Proje Ölçeği / Kapsamı</label>
            <div className="scale-tabs">
              <button 
                className={`scale-tab ${scale === 'small' ? 'active' : ''}`}
                onClick={() => setScale('small')}
              >
                Küçük (MVP)
              </button>
              <button 
                className={`scale-tab ${scale === 'medium' ? 'active' : ''}`}
                onClick={() => setScale('medium')}
              >
                Orta Ölçekli
              </button>
              <button 
                className={`scale-tab ${scale === 'enterprise' ? 'active' : ''}`}
                onClick={() => setScale('enterprise')}
              >
                Kurumsal (Enterprise)
              </button>
            </div>
          </div>

          {/* Step 3: Urgency */}
          <div className="calc-group">
            <label className="calc-group-title">Öncelik / Termin Hızı</label>
            <div className="scale-tabs">
              <button 
                className={`scale-tab ${urgency === 'normal' ? 'active' : ''}`}
                onClick={() => setUrgency('normal')}
              >
                Standart Süre
              </button>
              <button 
                className={`scale-tab ${urgency === 'fast' ? 'active' : ''}`}
                onClick={() => setUrgency('fast')}
              >
                Hızlı Teslimat
              </button>
              <button 
                className={`scale-tab ${urgency === 'immediate' ? 'active' : ''}`}
                onClick={() => setUrgency('immediate')}
              >
                Acil (Overtime)
              </button>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="calc-results glass">
            <div className="results-grid">
              <div className="result-card">
                <Calendar className="result-icon purple" />
                <div>
                  <p className="result-label">Tahmini Süre</p>
                  <p className="result-val">~ {getTimelineString()}</p>
                </div>
              </div>
              <div className="result-card">
                <ShieldAlert className="result-icon gold" />
                <div>
                  <p className="result-label">Ölçek Karmaşıklığı</p>
                  <p className="result-val">{getEstCost()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="calculator-footer">
          <button className="btn-primary full-width" onClick={handleWhatsAppSend}>
            Teklif Almak İçin İletişime Geç <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;

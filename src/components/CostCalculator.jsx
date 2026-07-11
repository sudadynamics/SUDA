import React, { useState } from 'react';
import { 
  X, Cpu, GitMerge, Smartphone, Globe, Calendar, ArrowRight, 
  ArrowLeft, ShieldCheck, Sparkles, DollarSign, Mail, User, Phone 
} from 'lucide-react';
import './CostCalculator.css';

const CostCalculator = ({ isOpen, onClose, t, lang, onCaptureLead }) => {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState('web');
  const [scale, setScale] = useState('medium');
  const [urgency, setUrgency] = useState('normal');

  // Add-ons state
  const [hasApi, setHasApi] = useState(false);
  const [hasMultiLang, setHasMultiLang] = useState(false);
  const [hasSeo, setHasSeo] = useState(false);

  // Client Details state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');

  if (!isOpen) return null;

  // Timeline Logic (Max 14 days)
  const getTimeline = () => {
    let days = 7;
    if (projectType === 'web') days = 7;
    if (projectType === 'mobile') days = 11;
    if (projectType === 'automation') days = 6;
    if (projectType === 'integration') days = 5;

    if (scale === 'small') days = Math.round(days * 0.6);
    if (scale === 'enterprise') days = Math.round(days * 1.4);

    if (urgency === 'fast') days = Math.round(days * 0.75);
    if (urgency === 'immediate') days = Math.round(days * 0.5);

    // Add 1-2 days for add-ons
    if (hasApi) days += 1;
    if (hasMultiLang) days += 1;
    if (hasSeo) days += 1;

    return Math.max(1, Math.min(14, days));
  };

  const getTimelineString = () => {
    const days = getTimeline();
    return lang === 'tr' ? `${days} Gün` : `${days} Days`;
  };

  // Cost Calculation Logic (₺ for TR, $ for EN)
  const calculateCost = () => {
    let basePrice = 15000; // default TR
    let basePriceUsd = 600;

    if (projectType === 'web') {
      basePrice = 15000;
      basePriceUsd = 600;
    } else if (projectType === 'mobile') {
      basePrice = 28000;
      basePriceUsd = 1200;
    } else if (projectType === 'automation') {
      basePrice = 18000;
      basePriceUsd = 800;
    } else if (projectType === 'integration') {
      basePrice = 12000;
      basePriceUsd = 500;
    }

    let multiplier = 1.0;
    if (scale === 'small') multiplier = 0.7;
    if (scale === 'enterprise') multiplier = 1.8;

    let urgencyMultiplier = 1.0;
    if (urgency === 'fast') urgencyMultiplier = 1.2;
    if (urgency === 'immediate') urgencyMultiplier = 1.5;

    let total = basePrice * multiplier * urgencyMultiplier;
    let totalUsd = basePriceUsd * multiplier * urgencyMultiplier;

    // Add-on values
    if (hasApi) {
      total += 4500;
      totalUsd += 200;
    }
    if (hasMultiLang) {
      total += 3500;
      totalUsd += 150;
    }
    if (hasSeo) {
      total += 3000;
      totalUsd += 120;
    }

    return lang === 'tr' 
      ? `₺${Math.round(total).toLocaleString('tr-TR')}` 
      : `$${Math.round(totalUsd).toLocaleString('en-US')}`;
  };

  const getTypeName = () => {
    switch (projectType) {
      case 'web': return t.calculatorOption2;
      case 'mobile': return t.calculatorOption1;
      case 'automation': return t.calculatorOption3;
      case 'integration': return lang === 'tr' ? 'API & Sistem Entegrasyonu' : 'API & System Integration';
      default: return '';
    }
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert(lang === 'tr' ? 'Lütfen tüm iletişim bilgilerini doldurun.' : 'Please fill in all contact details.');
      return;
    }

    const timelineStr = getTimelineString();
    const finalCost = calculateCost();
    
    const msg = `*Suda Dynamics Proje Fiyat ve Süre Teklifi* \n\n` +
                `*Müşteri Bilgileri:*\n` +
                `- İsim: ${clientName}\n` +
                `- E-posta: ${clientEmail}\n` +
                `- Telefon: ${clientPhone}\n\n` +
                `*Proje Konfigürasyonu:*\n` +
                `- Proje Tipi: ${getTypeName()}\n` +
                `- Ölçek: ${scale.toUpperCase()}\n` +
                `- Teslimat Hızı: ${urgency.toUpperCase()}\n` +
                `- Ek Özellikler: ${[hasApi ? 'API Entegrasyonu' : '', hasMultiLang ? 'Çoklu Dil' : '', hasSeo ? 'SEO Paketi' : ''].filter(Boolean).join(', ') || 'Yok'}\n\n` +
                `*Hesaplanan Teklif Detayları:*\n` +
                `- Tahmini Teslim Süresi: ~${timelineStr}\n` +
                `- Tahmini Bütçe: *${finalCost}*\n\n` +
                `Detayları görüşmek üzere hazırız. En kısa sürede geri dönüşünüzü bekliyoruz.`;

    if (onCaptureLead) {
      onCaptureLead({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        source: 'Calculator',
        budget: finalCost,
        details: `Type: ${getTypeName()} | Scale: ${scale.toUpperCase()} | Speed: ${urgency.toUpperCase()} | Add-ons: ${[hasApi ? 'API' : '', hasMultiLang ? 'MultiLang' : '', hasSeo ? 'SEO' : ''].filter(Boolean).join(', ') || 'None'} | Est. Timeline: ~${timelineStr}`
      });
    }

    const url = `https://wa.me/905510311029?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    
    // Reset calculator state
    setStep(1);
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    onClose();
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content calculator-modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close Calculator">
          <X size={20} />
        </button>

        {/* Step Indicator Badges */}
        <div className="calculator-header">
          <div className="calc-step-indicators">
            <span className={`step-dot ${step >= 1 ? 'active' : ''}`}>1</span>
            <span className="step-line"></span>
            <span className={`step-dot ${step >= 2 ? 'active' : ''}`}>2</span>
            <span className="step-line"></span>
            <span className={`step-dot ${step >= 3 ? 'active' : ''}`}>3</span>
          </div>
          <h3 className="calculator-title">{t.calculatorTitle}</h3>
          <p className="calculator-step-subtitle">
            {step === 1 && (lang === 'tr' ? 'Adım 1: Proje Tipi ve Ölçeği Seçimi' : 'Step 1: Choose Project Type & Scale')}
            {step === 2 && (lang === 'tr' ? 'Adım 2: Hız ve Ek Özellikler' : 'Step 2: Choose Speed & Add-ons')}
            {step === 3 && (lang === 'tr' ? 'Adım 3: İletişim Bilgileri ve Tahmini Teklif' : 'Step 3: Contact & Instant Quote')}
          </p>
        </div>

        <div className="calculator-body">
          {/* STEP 1: TYPE & SCALE */}
          {step === 1 && (
            <div className="calc-step-container animate-fade-in">
              <div className="calc-group">
                <label className="calc-group-title">{t.calculatorField1}</label>
                <div className="type-grid">
                  <button 
                    className={`type-card glass ${projectType === 'web' ? 'active' : ''}`}
                    onClick={() => setProjectType('web')}
                  >
                    <Globe size={18} className="card-icon" />
                    <span>{t.calculatorOption2}</span>
                  </button>
                  <button 
                    className={`type-card glass ${projectType === 'mobile' ? 'active' : ''}`}
                    onClick={() => setProjectType('mobile')}
                  >
                    <Smartphone size={18} className="card-icon" />
                    <span>{t.calculatorOption1}</span>
                  </button>
                  <button 
                    className={`type-card glass ${projectType === 'automation' ? 'active' : ''}`}
                    onClick={() => setProjectType('automation')}
                  >
                    <Cpu size={18} className="card-icon" />
                    <span>{t.calculatorOption3}</span>
                  </button>
                  <button 
                    className={`type-card glass ${projectType === 'integration' ? 'active' : ''}`}
                    onClick={() => setProjectType('integration')}
                  >
                    <GitMerge size={18} className="card-icon" />
                    <span>{lang === 'tr' ? 'Entegrasyon' : 'Integration'}</span>
                  </button>
                </div>
              </div>

              <div className="calc-group" style={{ marginTop: '20px' }}>
                <label className="calc-group-title">{lang === 'tr' ? 'Proje Ölçeği ve Hacmi' : 'Project Scale & Scope'}</label>
                <div className="scale-tabs">
                  <button 
                    className={`scale-tab ${scale === 'small' ? 'active' : ''}`}
                    onClick={() => setScale('small')}
                  >
                    {lang === 'tr' ? 'Küçük (MVP)' : 'Small (MVP)'}
                  </button>
                  <button 
                    className={`scale-tab ${scale === 'medium' ? 'active' : ''}`}
                    onClick={() => setScale('medium')}
                  >
                    {lang === 'tr' ? 'Orta Ölçekli' : 'Medium Scale'}
                  </button>
                  <button 
                    className={`scale-tab ${scale === 'enterprise' ? 'active' : ''}`}
                    onClick={() => setScale('enterprise')}
                  >
                    {lang === 'tr' ? 'Kurumsal' : 'Enterprise'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SPEED & ADD-ONS */}
          {step === 2 && (
            <div className="calc-step-container animate-fade-in">
              <div className="calc-group">
                <label className="calc-group-title">{lang === 'tr' ? 'Öncelik / Termin Hızı' : 'Delivery Speed & Urgency'}</label>
                <div className="scale-tabs">
                  <button 
                    className={`scale-tab ${urgency === 'normal' ? 'active' : ''}`}
                    onClick={() => setUrgency('normal')}
                  >
                    {lang === 'tr' ? 'Normal Hız' : 'Standard'}
                  </button>
                  <button 
                    className={`scale-tab ${urgency === 'fast' ? 'active' : ''}`}
                    onClick={() => setUrgency('fast')}
                  >
                    {lang === 'tr' ? 'Hızlı Teslim' : 'Express'}
                  </button>
                  <button 
                    className={`scale-tab ${urgency === 'immediate' ? 'active' : ''}`}
                    onClick={() => setUrgency('immediate')}
                  >
                    {lang === 'tr' ? 'Acil (Overtime)' : 'Immediate'}
                  </button>
                </div>
              </div>

              <div className="calc-group" style={{ marginTop: '20px' }}>
                <label className="calc-group-title">{lang === 'tr' ? 'Ekstra Özellik Eklentileri' : 'Optional Project Add-ons'}</label>
                <div className="addons-list">
                  <label className="addon-checkbox-card glass">
                    <input 
                      type="checkbox" 
                      checked={hasApi} 
                      onChange={e => setHasApi(e.target.checked)} 
                    />
                    <div className="addon-card-text">
                      <span className="addon-title">{lang === 'tr' ? 'Özel API & Veritabanı Entegrasyonu' : 'Custom API & DB Integration'}</span>
                      <span className="addon-price">{lang === 'tr' ? '+₺4,500' : '+$200'}</span>
                    </div>
                  </label>
                  <label className="addon-checkbox-card glass">
                    <input 
                      type="checkbox" 
                      checked={hasMultiLang} 
                      onChange={e => setHasMultiLang(e.target.checked)} 
                    />
                    <div className="addon-card-text">
                      <span className="addon-title">{lang === 'tr' ? 'Çoklu Dil Altyapısı (Localization)' : 'Multi-language Setup (Localization)'}</span>
                      <span className="addon-price">{lang === 'tr' ? '+₺3,500' : '+$150'}</span>
                    </div>
                  </label>
                  <label className="addon-checkbox-card glass">
                    <input 
                      type="checkbox" 
                      checked={hasSeo} 
                      onChange={e => setHasSeo(e.target.checked)} 
                    />
                    <div className="addon-card-text">
                      <span className="addon-title">{lang === 'tr' ? 'SEO ve Arama Motoru Optimizasyonu' : 'SEO & Optimization Bundle'}</span>
                      <span className="addon-price">{lang === 'tr' ? '+₺3,000' : '+$120'}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CONTACT DETAILS & ESTIMATES */}
          {step === 3 && (
            <form onSubmit={handleWhatsAppSend} className="calc-step-container animate-fade-in">
              <div className="calc-group">
                <label className="calc-group-title">{lang === 'tr' ? 'İletişim Bilgileriniz' : 'Your Contact Details'}</label>
                <div className="contact-input-grid">
                  <div className="calc-input-wrapper">
                    <User size={16} className="calc-input-icon" />
                    <input 
                      type="text" 
                      required
                      placeholder={lang === 'tr' ? 'Adınız Soyadınız' : 'Your Full Name'}
                      value={clientName} 
                      onChange={e => setClientName(e.target.value)} 
                    />
                  </div>
                  <div className="calc-input-wrapper">
                    <Mail size={16} className="calc-input-icon" />
                    <input 
                      type="email" 
                      required
                      placeholder={lang === 'tr' ? 'E-posta Adresiniz' : 'Your Email Address'}
                      value={clientEmail} 
                      onChange={e => setClientEmail(e.target.value)} 
                    />
                  </div>
                  <div className="calc-input-wrapper">
                    <Phone size={16} className="calc-input-icon" />
                    <input 
                      type="tel" 
                      required
                      placeholder={lang === 'tr' ? 'Telefon Numaranız' : 'Your Phone Number'}
                      value={clientPhone} 
                      onChange={e => setClientPhone(e.target.value)} 
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Live Quote Summary Slip */}
              <div className="calc-quote-summary glass animate-slide-up">
                <h4 className="summary-title">{lang === 'tr' ? 'Hesaplanan Proje Özeti' : 'Estimated Pricing Invoice'}</h4>
                <div className="summary-row">
                  <span>{lang === 'tr' ? 'Proje Konfigürasyonu:' : 'Project Configuration:'}</span>
                  <strong className="purple-text">{getTypeName()} ({scale.toUpperCase()})</strong>
                </div>
                <div className="summary-row">
                  <span>{lang === 'tr' ? 'Tahmini Teslim Süresi:' : 'Estimated Work Timeline:'}</span>
                  <strong>{getTimelineString()}</strong>
                </div>
                <div className="summary-row total">
                  <span>{lang === 'tr' ? 'Yaklaşık Bütçe Aralığı:' : 'Estimated Total Budget:'}</span>
                  <span className="price-tag">{calculateCost()}</span>
                </div>
                <div className="summary-promise-badge">
                  <ShieldCheck size={14} className="badge-shield-icon" />
                  <span>{lang === 'tr' ? 'Maksimum 2 Hafta Teslim Garantisi Geçerlidir' : 'Max 2-Week Handover Pledge Guaranteed'}</span>
                </div>
              </div>

              <div style={{ display: 'none' }}>
                <input type="submit" />
              </div>
            </form>
          )}
        </div>

        {/* Navigation Buttons inside footer */}
        <div className="calculator-footer">
          <div className="calc-nav-buttons">
            {step > 1 && (
              <button className="btn-secondary calc-back-btn" onClick={handlePrev}>
                <ArrowLeft size={16} /> <span>{lang === 'tr' ? 'Geri' : 'Back'}</span>
              </button>
            )}
            {step < 3 ? (
              <button className="btn-primary calc-next-btn" onClick={handleNext}>
                <span>{lang === 'tr' ? 'Devam Et' : 'Continue'}</span> <ArrowRight size={16} />
              </button>
            ) : (
              <button className="btn-primary calc-submit-btn" onClick={handleWhatsAppSend}>
                <span>{lang === 'tr' ? 'Teklifi WhatsApp ile Al' : 'Request Quotation via WhatsApp'}</span> <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;

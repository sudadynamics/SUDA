import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Send, Sparkles, HelpCircle, Activity } from 'lucide-react';
import './DietTest.css';

const DietTest = ({ isOpen, onClose, lang, dietitianConfig }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    activity: '',
    preference: '',
    obstacle: ''
  });

  const profile = dietitianConfig?.profile || {};

  if (!isOpen) return null;

  const handleSelect = (key, value) => {
    setAnswers(prev => ({
      ...prev,
      [key]: value
    }));
    // Auto-advance to next step for better user flow
    setTimeout(() => {
      setStep(prev => Math.min(5, prev + 1));
    }, 300);
  };

  const getDietResult = () => {
    const { goal, preference } = answers;
    
    if (preference === 'vegetarian' || preference === 'vejetaryen') {
      return {
        title: lang === 'tr' ? 'Bitkisel Tabanlı Akdeniz Diyeti' : 'Plant-Based Mediterranean Diet',
        desc: lang === 'tr'
          ? 'Sebzeler, zeytinyağı, baklagiller ve kuruyemişler açısından zengin, işlenmiş gıdalardan uzak bütüncül beslenme programı. Metabolik yaşınızı gençleştirir.'
          : 'A holistic nutrition program rich in vegetables, olive oil, legumes, and nuts, free from processed foods. Rejuvenates your metabolic age.',
        calories: '1600 - 1900 kcal',
        macros: lang === 'tr' ? '%55 Karbonhidrat, %15 Protein, %30 Yağ' : '55% Carbs, 15% Protein, 30% Fat'
      };
    }

    if (preference === 'low_carb' || goal === 'lose' && preference === 'low_carb') {
      return {
        title: lang === 'tr' ? 'Düşük Karbonhidrat & Ketojenik Diyet' : 'Low-Carb & Ketogenic Diet',
        desc: lang === 'tr'
          ? 'Karbonhidrat alımını kısıtlayarak vücudu yağ yakım moduna sokan, insülin direncini kırmak ve hızlı yağ yakmak için ideal program.'
          : 'Restricts carbohydrate intake to trigger fat burning mode, ideal for breaking insulin resistance and rapid fat loss.',
        calories: '1500 - 1800 kcal',
        macros: lang === 'tr' ? '%15 Karbonhidrat, %25 Protein, %60 Yağ' : '15% Carbs, 25% Protein, 60% Fat'
      };
    }

    if (goal === 'muscle' || goal === 'gain') {
      return {
        title: lang === 'tr' ? 'Yüksek Proteinli Kas Kazanım Programı' : 'High-Protein Muscle Gain Program',
        desc: lang === 'tr'
          ? 'Temiz kas kütlesi artışını destekleyen, antrenman toparlanmasını hızlandıran, kompleks karbonhidratlar ve kaliteli protein içeren atletik beslenme planı.'
          : 'An athletic nutrition plan supporting clean muscle mass increase, speeding up workout recovery, containing complex carbs and quality proteins.',
        calories: '2400 - 2800 kcal',
        macros: lang === 'tr' ? '%45 Karbonhidrat, %30 Protein, %25 Yağ' : '45% Carbs, 30% Protein, 25% Fat'
      };
    }

    // Default
    return {
      title: lang === 'tr' ? 'Akdeniz Tipi Bütüncül Beslenme' : 'Mediterranean Holistic Diet',
      desc: lang === 'tr'
        ? 'Sağlıklı yağlar, tam tahıllar ve mevsimsel besinlerle zenginleştirilmiş, yasaksız ve sürdürülebilir genel sağlıklı yaşam planı.'
        : 'Enriched with healthy fats, whole grains, and seasonal foods, a sustainable general wellness plan with no strict bans.',
      calories: '1800 - 2100 kcal',
      macros: lang === 'tr' ? '%50 Karbonhidrat, %20 Protein, %30 Yağ' : '50% Carbs, 20% Protein, 30% Fat'
    };
  };

  const result = getDietResult();

  const handleWhatsAppShare = () => {
    const goalText = {
      lose: lang === 'tr' ? 'Kilo Vermek' : 'Weight Loss',
      gain: lang === 'tr' ? 'Kilo Almak' : 'Weight Gain',
      maintain: lang === 'tr' ? 'Formu Korumak' : 'Maintain Form',
      muscle: lang === 'tr' ? 'Kas Kazanmak' : 'Gain Muscle'
    }[answers.goal];

    const prefText = {
      everything: lang === 'tr' ? 'Her Şeyi Yerim' : 'Everything',
      vegetarian: lang === 'tr' ? 'Vejetaryen / Vegan' : 'Vegetarian / Vegan',
      gluten_free: lang === 'tr' ? 'Glütensiz / Laktozsuz' : 'Gluten-Free / Lactose-Free',
      low_carb: lang === 'tr' ? 'Düşük Karbonhidrat' : 'Low-Carb'
    }[answers.preference];

    const waText = `*Merhaba ${profile.name}!* \n` +
      `*Sitenizdeki Diyet Testini çözdüm ve ön sonuçlarımı iletiyorum:*\n\n` +
      `🎯 *Ana Hedef:* ${goalText || '-'}\n` +
      `🥗 *Beslenme Tercihi:* ${prefText || '-'}\n` +
      `💪 *Önerilen Diyet Modeli:* ${result.title}\n` +
      `🔥 *Günlük Kalori Hedefi:* ${result.calories}\n\n` +
      `Kişiselleştirilmiş listem ve takibim için detaylı görüşmek istiyorum.`;

    const encoded = encodeURIComponent(waText);
    const url = `https://wa.me/${profile.whatsapp || '905510311029'}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="calculator-backdrop" onClick={onClose}>
      <div className="calculator-modal glass hover-glow diet-test-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Progress header */}
        {step <= 4 && (
          <div className="test-progress-bar-wrapper">
            <div className="test-progress-bar" style={{ width: `${step * 25}%` }}></div>
            <div className="test-step-indicator">
              <span>{lang === 'tr' ? `Soru ${step} / 4` : `Question ${step} / 4`}</span>
            </div>
          </div>
        )}

        <div className="test-content">
          {/* STEP 1: GOAL */}
          {step === 1 && (
            <div className="test-step-pane animate-fade-in">
              <h3 className="test-question">{lang === 'tr' ? 'Sağlıklı yaşam serüveninizdeki birincil hedefiniz nedir?' : 'What is your primary goal in your wellness journey?'}</h3>
              <div className="test-options-grid">
                <button className={`option-card glass ${answers.goal === 'lose' ? 'selected' : ''}`} onClick={() => handleSelect('goal', 'lose')}>
                  <span className="option-letter">A</span>
                  <span>{lang === 'tr' ? 'Sağlıklı Kilo Vermek / Yağ Yakmak' : 'Healthy Weight Loss / Fat Burning'}</span>
                </button>
                <button className={`option-card glass ${answers.goal === 'gain' ? 'selected' : ''}`} onClick={() => handleSelect('goal', 'gain')}>
                  <span className="option-letter">B</span>
                  <span>{lang === 'tr' ? 'Sağlıklı Kilo Almak / Hacim Kazanmak' : 'Healthy Weight Gain / Volume'}</span>
                </button>
                <button className={`option-card glass ${answers.goal === 'maintain' ? 'selected' : ''}`} onClick={() => handleSelect('goal', 'maintain')}>
                  <span className="option-letter">C</span>
                  <span>{lang === 'tr' ? 'Mevcut Kilomu & Formumu Korumak' : 'Maintain Current Weight & Shape'}</span>
                </button>
                <button className={`option-card glass ${answers.goal === 'muscle' ? 'selected' : ''}`} onClick={() => handleSelect('goal', 'muscle')}>
                  <span className="option-letter">D</span>
                  <span>{lang === 'tr' ? 'Kas Kütlemi Artırmak / Performans' : 'Increase Muscle Mass / Performance'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ACTIVITY */}
          {step === 2 && (
            <div className="test-step-pane animate-fade-in">
              <h3 className="test-question">{lang === 'tr' ? 'Günlük fiziksel aktivite ve hareket düzeyiniz nasıldır?' : 'What is your daily physical activity and movement level?'}</h3>
              <div className="test-options-grid">
                <button className={`option-card glass ${answers.activity === 'sedentary' ? 'selected' : ''}`} onClick={() => handleSelect('activity', 'sedentary')}>
                  <span className="option-letter">A</span>
                  <span>{lang === 'tr' ? 'Hareketsiz (Sürekli oturan, ofis çalışanı)' : 'Sedentary (Mainly sitting, office worker)'}</span>
                </button>
                <button className={`option-card glass ${answers.activity === 'active_1' ? 'selected' : ''}`} onClick={() => handleSelect('activity', 'active_1')}>
                  <span className="option-letter">B</span>
                  <span>{lang === 'tr' ? 'Hafif Aktif (Haftada 1-2 gün yürüyüş veya hafif egzersiz)' : 'Light Active (1-2 days/week walk or light exercise)'}</span>
                </button>
                <button className={`option-card glass ${answers.activity === 'active_2' ? 'selected' : ''}`} onClick={() => handleSelect('activity', 'active_2')}>
                  <span className="option-letter">C</span>
                  <span>{lang === 'tr' ? 'Orta Derecede Aktif (Haftada 3-4 gün düzenli egzersiz)' : 'Moderately Active (3-4 days/week regular exercise)'}</span>
                </button>
                <button className={`option-card glass ${answers.activity === 'athlete' ? 'selected' : ''}`} onClick={() => handleSelect('activity', 'athlete')}>
                  <span className="option-letter">D</span>
                  <span>{lang === 'tr' ? 'Çok Aktif / Atletik (Her gün ağır idman yapan sporcu)' : 'Very Active / Athletic (Heavy daily training)'}</span>
                </button>
              </div>
              <button className="back-step-btn" onClick={() => setStep(1)}>
                <ChevronLeft size={16} /> <span>Geri</span>
              </button>
            </div>
          )}

          {/* STEP 3: PREFERENCE */}
          {step === 3 && (
            <div className="test-step-pane animate-fade-in">
              <h3 className="test-question">{lang === 'tr' ? 'Beslenme düzeninizde özel bir tercihiniz var mı?' : 'Do you have any dietary preferences or restrictions?'}</h3>
              <div className="test-options-grid">
                <button className={`option-card glass ${answers.preference === 'everything' ? 'selected' : ''}`} onClick={() => handleSelect('preference', 'everything')}>
                  <span className="option-letter">A</span>
                  <span>{lang === 'tr' ? 'Her Şeyi Yerim (Kısıtlamasız beslenme)' : 'Eat Everything (No restrictions)'}</span>
                </button>
                <button className={`option-card glass ${answers.preference === 'vegetarian' ? 'selected' : ''}`} onClick={() => handleSelect('preference', 'vegetarian')}>
                  <span className="option-letter">B</span>
                  <span>{lang === 'tr' ? 'Vejetaryen / Vegan Beslenme' : 'Vegetarian / Vegan Diet'}</span>
                </button>
                <button className={`option-card glass ${answers.preference === 'gluten_free' ? 'selected' : ''}`} onClick={() => handleSelect('preference', 'gluten_free')}>
                  <span className="option-letter">C</span>
                  <span>{lang === 'tr' ? 'Glütensiz / Laktozsuz Beslenme' : 'Gluten-Free / Lactose-Free'}</span>
                </button>
                <button className={`option-card glass ${answers.preference === 'low_carb' ? 'selected' : ''}`} onClick={() => handleSelect('preference', 'low_carb')}>
                  <span className="option-letter">D</span>
                  <span>{lang === 'tr' ? 'Düşük Karbonhidrat / Ketojenik Beslenme' : 'Low-Carb / Ketogenic Diet'}</span>
                </button>
              </div>
              <button className="back-step-btn" onClick={() => setStep(2)}>
                <ChevronLeft size={16} /> <span>Geri</span>
              </button>
            </div>
          )}

          {/* STEP 4: OBSTACLE */}
          {step === 4 && (
            <div className="test-step-pane animate-fade-in">
              <h3 className="test-question">{lang === 'tr' ? 'Diyet yaparken karşılaştığınız en büyük zorluk nedir?' : 'What is the biggest challenge you face while dieting?'}</h3>
              <div className="test-options-grid">
                <button className={`option-card glass ${answers.obstacle === 'sweet' ? 'selected' : ''}`} onClick={() => handleSelect('obstacle', 'sweet')}>
                  <span className="option-letter">A</span>
                  <span>{lang === 'tr' ? 'Gece atıştırmaları ve ani tatlı krizleri' : 'Night snacks and sudden sweet cravings'}</span>
                </button>
                <button className={`option-card glass ${answers.obstacle === 'irregular' ? 'selected' : ''}`} onClick={() => handleSelect('obstacle', 'irregular')}>
                  <span className="option-letter">B</span>
                  <span>{lang === 'tr' ? 'Yoğun iş temposu ve düzensiz öğün saatleri' : 'Busy work tempo and irregular meal times'}</span>
                </button>
                <button className={`option-card glass ${answers.obstacle === 'slow' ? 'selected' : ''}`} onClick={() => handleSelect('obstacle', 'slow')}>
                  <span className="option-letter">C</span>
                  <span>{lang === 'tr' ? 'Yavaş metabolizma ve kabızlık sorunları' : 'Slow metabolism and constipation issues'}</span>
                </button>
                <button className={`option-card glass ${answers.obstacle === 'appetite' ? 'selected' : ''}`} onClick={() => handleSelect('obstacle', 'appetite')}>
                  <span className="option-letter">D</span>
                  <span>{lang === 'tr' ? 'Doygunluk hissi yaşayamama, yüksek iştah' : 'Cannot feel full, excessive appetite'}</span>
                </button>
              </div>
              <button className="back-step-btn" onClick={() => setStep(3)}>
                <ChevronLeft size={16} /> <span>Geri</span>
              </button>
            </div>
          )}

          {/* STEP 5: RESULTS SCREEN */}
          {step === 5 && (
            <div className="test-result-pane animate-scale-up">
              <div className="result-header">
                <div className="result-sparkle-box">
                  <Sparkles size={24} className="sparkle-cyan" />
                </div>
                <h3>{lang === 'tr' ? 'Diyet Analiz Sonucunuz Hazır!' : 'Your Diet Recommendation is Ready!'}</h3>
                <p>{lang === 'tr' ? 'Verdiğiniz cevaplar doğrultusunda size en uygun beslenme modeli:' : 'Based on your answers, the most suitable nutrition model for you:'}</p>
              </div>

              <div className="result-card glass-light highlight-purple">
                <h4 className="recommended-diet-title text-gradient">{result.title}</h4>
                <p className="recommended-diet-desc">{result.desc}</p>
                
                <div className="diet-result-metrics">
                  <div className="metric-box">
                    <span className="lbl">{lang === 'tr' ? 'Günlük Hedef Kalori' : 'Target Calories'}</span>
                    <span className="val">{result.calories}</span>
                  </div>
                  <div className="metric-box">
                    <span className="lbl">{lang === 'tr' ? 'Makro Besin Dengesi' : 'Target Macros'}</span>
                    <span className="val" style={{ fontSize: '0.8rem' }}>{result.macros}</span>
                  </div>
                </div>
              </div>

              <div className="result-cta-section">
                <p className="cta-info-text">
                  {lang === 'tr' 
                    ? 'Bu ön analiz sonuçlarını diyetisyeninize göndererek size özel listenizi hemen hazırlatabilirsiniz.'
                    : 'You can send this pre-analysis result to your dietitian to start preparing your custom list.'}
                </p>
                
                <div className="result-actions-row">
                  <button className="btn-primary flex-center full-width" onClick={handleWhatsAppShare}>
                    <span>{lang === 'tr' ? 'Sonuçları WhatsApp ile Gönder' : 'Submit Results via WhatsApp'}</span>
                    <Send size={16} />
                  </button>
                  
                  <button className="btn-secondary text-center" style={{ padding: '12px 20px', borderRadius: '12px' }} onClick={() => setStep(1)}>
                    {lang === 'tr' ? 'Testi Tekrar Çöz' : 'Retake Test'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietTest;

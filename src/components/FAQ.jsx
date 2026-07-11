import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = ({ t, lang }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqList, setFaqList] = useState([]);

  // Load FAQ from dynamic translations
  useEffect(() => {
    if (t && t.faqData) {
      setFaqList(t.faqData);
    } else {
      setFaqList([]);
    }
  }, [t]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!faqList || faqList.length === 0) return null;

  return (
    <section className="faq-section" id="faq">
      <div className="section-header container">
        <span className="section-badge">{lang === 'tr' ? 'Destek & Rehber' : 'Support & Guide'}</span>
        <h2 className="section-title">{t.faqTitle || 'Sıkça Sorulan Sorular'}</h2>
        <p className="section-subtitle">{t.faqSubtitle || 'Aklınıza takılan tüm sorulara yanıt bulun.'}</p>
      </div>

      <div className="faq-container container">
        <div className="faq-accordion-wrapper">
          {faqList.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={item.id || index} 
                className={`faq-accordion-item glass ${isOpen ? 'active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="faq-question-bar">
                  <div className="faq-question-title-box">
                    <HelpCircle size={18} className="faq-help-icon" />
                    <h4 className="faq-question-text">{item.question}</h4>
                  </div>
                  <button className="faq-chevron-btn" aria-label="Toggle Question">
                    <ChevronDown size={18} />
                  </button>
                </div>
                
                <div className="faq-answer-content">
                  <p className="faq-answer-text">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

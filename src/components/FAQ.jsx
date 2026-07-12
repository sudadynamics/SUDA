import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = ({ t, lang, dietitianConfig }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqList, setFaqList] = useState([]);

  // Load FAQ from dietitian configuration
  useEffect(() => {
    if (dietitianConfig && dietitianConfig.faqs) {
      setFaqList(dietitianConfig.faqs);
    } else {
      setFaqList([]);
    }
  }, [dietitianConfig]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!faqList || faqList.length === 0) return null;

  return (
    <section className="faq-section" id="faq">
      <div className="section-header container">
        <span className="section-badge">{lang === 'tr' ? 'Destek & Rehber' : 'Support & Guide'}</span>
        <h2 className="section-title">{lang === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}</h2>
        <p className="section-subtitle">{lang === 'tr' ? 'Beslenme programları ve süreçle ilgili aklınıza takılabilecek sorular.' : 'Answers to questions you might have about nutrition programs and the process.'}</p>
      </div>

      <div className="faq-container container">
        <div className="faq-accordion-wrapper">
          {faqList.map((item, index) => {
            const isOpen = activeIndex === index;
            const question = lang === 'tr' ? item.questionTr : item.questionEn;
            const answer = lang === 'tr' ? item.answerTr : item.answerEn;
            
            return (
              <div 
                key={item.id || index} 
                className={`faq-accordion-item glass ${isOpen ? 'active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="faq-question-bar">
                  <div className="faq-question-title-box">
                    <HelpCircle size={18} className="faq-help-icon" />
                    <h4 className="faq-question-text">{question}</h4>
                  </div>
                  <button className="faq-chevron-btn" aria-label="Toggle Question">
                    <ChevronDown size={18} />
                  </button>
                </div>
                
                <div className="faq-answer-content">
                  <p className="faq-answer-text">{answer}</p>
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

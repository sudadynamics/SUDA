import React from 'react';
import { Calendar, Shield, Zap, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import './Workflow.css';

const Workflow = ({ t }) => {
  const getWhyUsIcon = (index) => {
    switch (index) {
      case 0: return <Zap className="why-icon purple" size={24} />;
      case 1: return <Shield className="why-icon gold" size={24} />;
      case 2: return <Sparkles className="why-icon turquoise" size={24} />;
      default: return <CheckCircle2 className="why-icon" size={24} />;
    }
  };

  return (
    <section id="workflow" className="workflow-section">
      <div className="bg-decor-blur"></div>

      {/* Part 1: Why Us */}
      <div className="why-us-container">
        <div className="section-header">
          <span className="badge">SUDA DYNAMICS VALUES</span>
          <h2>{t.whyUsTitle}</h2>
          <p>{t.whyUsSubtitle}</p>
        </div>

        <div className="why-grid">
          {t.whyUsCards.map((card, index) => (
            <div key={index} className="why-card glass">
              <div className="why-icon-box">
                {getWhyUsIcon(index)}
              </div>
              <h3 className="why-card-title">{card.title}</h3>
              <p className="why-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Process Workflow */}
      <div className="process-container">
        <div className="section-header">
          <span className="badge">AGILE PROCESS</span>
          <h2>{t.workflowTitle}</h2>
          <p>{t.workflowSubtitle}</p>
        </div>

        <div className="process-timeline">
          <div className="timeline-connector-line"></div>
          
          <div className="process-grid">
            {t.workflowSteps.map((step, index) => (
              <div key={index} className="process-node glass" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="process-number-badge">
                  <span>0{index + 1}</span>
                </div>
                <div className="process-duration">
                  <Calendar size={12} className="duration-icon" />
                  <span>{step.time}</span>
                </div>
                <h3 className="process-node-title">{step.title}</h3>
                <p className="process-node-desc">{step.desc}</p>
                
                {index < 3 && (
                  <div className="mobile-process-arrow">
                    <ArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;

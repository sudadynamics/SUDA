import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './Services.css';

const Services = ({ t, onInquireService, onOpenCalculator }) => {
  const [activeModal, setActiveModal] = useState(null);

  // Render icon based on string name from translations
  const renderIcon = (iconName, colorClass) => {
    const IconComponent = Icons[iconName] || Icons.HelpCircle;
    return (
      <div className={`service-icon-box ${colorClass}`}>
        <IconComponent size={24} />
      </div>
    );
  };

  const openDetails = (service) => {
    setActiveModal(service);
  };

  const closeDetails = () => {
    setActiveModal(null);
  };

  const handleInquiry = (serviceTitle) => {
    closeDetails();
    onInquireService(serviceTitle);
  };

  // Assign distinct gradient color schemes to services for high premium feel
  const getColorScheme = (id) => {
    switch (id) {
      case 'automation': return 'purple-gold';
      case 'integration': return 'turquoise-purple';
      case 'mobile': return 'red-gold';
      case 'web': return 'turquoise-gold';
      default: return 'purple-gold';
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="bg-decor-circle"></div>
      
      <div className="section-header animate-slide-up">
        <span className="badge">Suda Dynamics</span>
        <h2>{t.servicesTitle}</h2>
        <p>{t.servicesSubtitle}</p>
        
        {/* Dynamic Cost Calculator Trigger Button */}
        <div className="calc-trigger-wrapper">
          <button className="btn-secondary btn-calc-trigger" onClick={onOpenCalculator}>
            <Icons.Sparkles size={16} className="sparkle-gold" />
            <span>{t.calculatorTitle}</span>
          </button>
        </div>
      </div>

      <div className="services-grid">
        {t.servicesData.map((service, index) => {
          const colorScheme = getColorScheme(service.id);
          return (
            <div 
              key={service.id} 
              className={`service-card glass card-hover-${colorScheme}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="service-card-glow"></div>
              <div className="service-card-header">
                {renderIcon(service.icon, colorScheme)}
                <h3 className="service-card-title">{service.title}</h3>
              </div>
              <p className="service-card-desc">{service.shortDesc}</p>
              
              <div className="service-card-footer">
                <button className="btn-detail-trigger" onClick={() => openDetails(service)}>
                  {t.serviceDetailBtn} <Icons.ChevronRight size={16} className="arrow-icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details Popup Modal */}
      {activeModal && (
        <div className="modal-overlay active" onClick={closeDetails}>
          <div className="modal-content service-modal glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDetails} aria-label="Close details">
              <Icons.X size={20} />
            </button>
            
            <div className="service-modal-header">
              {renderIcon(activeModal.icon, getColorScheme(activeModal.id))}
              <div>
                <span className="modal-badge">{t.servicesTitle}</span>
                <h3 className="service-modal-title">{activeModal.title}</h3>
              </div>
            </div>

            <div className="service-modal-body">
              <p className="service-modal-desc">{activeModal.fullDesc}</p>
              
              <div className="tech-stack-section">
                <h4 className="tech-title">Technologies & Tools</h4>
                <div className="tech-pills">
                  {activeModal.techs.map((tech, idx) => (
                    <span key={idx} className="tech-pill">{tech}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="service-modal-footer">
              <button className="btn-primary full-width" onClick={() => handleInquiry(activeModal.title)}>
                {t.serviceDetailCTA} <Icons.ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import './Services.css';

const Services = ({ t, lang, onInquireService, onOpenCalculator, dietitianConfig }) => {
  const [activeModal, setActiveModal] = useState(null);

  const servicesList = dietitianConfig?.services || [];

  // Render icon based on string name from translations
  const renderIcon = (iconName, colorClass) => {
    const IconComponent = Icons[iconName] || Icons.Activity;
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
      case 'online-diet': return 'turquoise-purple';
      case 'weight-management': return 'purple-gold';
      case 'sports-nutrition': return 'red-gold';
      case 'corporate-diet': return 'turquoise-gold';
      default: return 'purple-gold';
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="bg-decor-circle"></div>
      
      <div className="section-header animate-slide-up">
        <span className="badge">SUDA-DİYETİSYEN</span>
        <h2>{lang === 'tr' ? 'Hizmetlerimiz & Diyet Paketleri' : 'Our Services & Diet Packages'}</h2>
        <p>{lang === 'tr' ? 'Sağlıklı ve dengeli beslenme hedeflerinize uygun kişiselleştirilmiş programlar.' : 'Personalized programs suitable for your healthy and balanced nutrition goals.'}</p>
        
        {/* Dynamic Cost Calculator Trigger Button */}
        <div className="calc-trigger-wrapper">
          <button className="btn-secondary btn-calc-trigger" onClick={onOpenCalculator}>
            <Icons.Sparkles size={16} className="sparkle-gold" />
            <span>{lang === 'tr' ? 'Diyet Hesaplama Araçları' : 'Diet Calculator Suite'}</span>
          </button>
        </div>
      </div>

      <div className="services-grid">
        {servicesList.map((service, index) => {
          const colorScheme = getColorScheme(service.id);
          const title = lang === 'tr' ? service.titleTr : service.titleEn;
          const shortDesc = lang === 'tr' ? service.shortDescTr : service.shortDescEn;
          
          return (
            <div 
              key={service.id} 
              className={`service-card glass card-hover-${colorScheme}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="service-card-glow"></div>
              <div className="service-card-header">
                {renderIcon(service.icon, colorScheme)}
                <h3 className="service-card-title">{title}</h3>
              </div>
              <p className="service-card-desc">{shortDesc}</p>
              
              <div className="service-card-footer">
                <button className="btn-detail-trigger" onClick={() => openDetails(service)}>
                  {lang === 'tr' ? 'Detayları Gör' : 'See Details'} <Icons.ChevronRight size={16} className="arrow-icon" />
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
                <span className="modal-badge">{lang === 'tr' ? 'Diyet Paketleri' : 'Diet Packages'}</span>
                <h3 className="service-modal-title">{lang === 'tr' ? activeModal.titleTr : activeModal.titleEn}</h3>
              </div>
            </div>

            <div className="service-modal-body">
              <p className="service-modal-desc">{lang === 'tr' ? activeModal.fullDescTr : activeModal.fullDescEn}</p>
              
              {activeModal.techs && activeModal.techs.length > 0 && (
                <div className="tech-stack-section">
                  <h4 className="tech-title">{lang === 'tr' ? 'Öne Çıkan Özellikler' : 'Key Highlights'}</h4>
                  <div className="tech-pills">
                    {activeModal.techs.map((tech, idx) => (
                      <span key={idx} className="tech-pill">{tech}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="service-modal-footer">
              <button className="btn-primary full-width" onClick={() => handleInquiry(lang === 'tr' ? activeModal.titleTr : activeModal.titleEn)}>
                {lang === 'tr' ? 'Bu Paket Hakkında Randevu Al' : 'Book Appointment for this Package'} <Icons.ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

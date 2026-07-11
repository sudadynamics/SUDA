import React from 'react';
import { Star, Sparkles } from 'lucide-react';
import './Testimonials.css';

const Testimonials = ({ t }) => {
  const testimonials = t.testimonialsData || [];

  // Generate initials for avatar
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  // Helper to render rating stars
  const renderStars = (count) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={i < count ? "star-icon active" : "star-icon"} 
      />
    ));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="bg-blur-decor"></div>
      
      <div className="section-header">
        <span className="badge">
          <Sparkles size={12} style={{ marginRight: '5px' }} />
          {t.testimonialsTitle || "Müşteri Yorumları"}
        </span>
        <h2>{t.testimonialsTitle || "Müşteri Yorumları"}</h2>
        <p>{t.testimonialsSubtitle || "Değerli iş ortaklarımızın bizimle ilgili yorumları."}</p>
      </div>

      <div className="testimonials-wrapper">
        <div className="testimonials-track">
          {/* Double list items to make seamless infinite loop */}
          {[...testimonials, ...testimonials].map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="testimonial-card glass">
              <div className="card-stars">
                {renderStars(item.stars)}
              </div>
              <p className="card-quote">
                "{item.quote}"
              </p>
              <div className="card-author">
                <div className="author-avatar">
                  <span>{getInitials(item.name)}</span>
                </div>
                <div className="author-details">
                  <h4 className="author-name">{item.name}</h4>
                  <p className="author-meta">{item.role}, <span className="author-company">{item.company}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

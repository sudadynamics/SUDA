import React, { useState, useEffect } from 'react';
import { X, Send, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import './ContactPopup.css';

const ContactPopup = ({ isOpen, onClose, t, preselectedService }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, service, message } = formData;

    if (!name || !email || !phone || !message) {
      setError(t.toastError);
      return;
    }

    // Format the WhatsApp text template professionally
    const textMessage = `*Merhaba Suda Dynamics!* \n\n*İsim:* ${name}\n*E-posta:* ${email}\n*Telefon:* ${phone}\n*İlgilenilen Hizmet:* ${service || 'Belirtilmedi'}\n\n*Proje Detayları:*\n${message}`;
    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/905510311029?text=${encodedMessage}`;

    setSuccess(true);
    setError('');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSuccess(false);
      onClose();
    }, 1500);
  };

  const handleDirectCall = () => {
    window.open('tel:05510311029', '_self');
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content contact-modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close Contact Form">
          <X size={20} />
        </button>

        <div className="contact-modal-header">
          <span className="badge">{t.navContact}</span>
          <h3 className="contact-modal-title">{t.popupTitle}</h3>
          <p className="contact-modal-subtitle">{t.popupSubtitle}</p>
        </div>

        {error && (
          <div className="alert-message error">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert-message success">
            <MessageSquare size={16} className="pulse-icon" />
            <span>{t.toastSuccess}</span>
          </div>
        )}

        <form onSubmit={handleWhatsAppSubmit} className="contact-form">
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder={t.popupPlaceholderName}
              className="form-input"
              required 
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder={t.popupPlaceholderEmail}
                className="form-input"
                required 
              />
            </div>
            <div className="form-group">
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                placeholder={t.popupPlaceholderPhone}
                className="form-input"
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <select 
              name="service" 
              value={formData.service} 
              onChange={handleChange}
              className="form-select"
            >
              <option value="" disabled>{t.popupSelectServicePlaceholder}</option>
              {t.servicesData.map(s => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <textarea 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder={t.popupPlaceholderMessage}
              rows="4"
              className="form-textarea"
              required
            ></textarea>
          </div>

          <div className="contact-modal-actions">
            <button type="submit" className="btn-primary flex-center">
              {t.popupSubmitWhatsApp} <Send size={16} />
            </button>
            <button type="button" className="btn-secondary flex-center btn-call-accent" onClick={handleDirectCall}>
              {t.popupSubmitCall} <Phone size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;

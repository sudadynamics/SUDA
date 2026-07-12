import React, { useState, useEffect } from 'react';
import { X, Send, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import './ContactPopup.css';

const ContactPopup = ({ isOpen, onClose, t, lang, preselectedService, onCaptureLead, dietitianConfig }) => {
  const profile = dietitianConfig?.profile || {};
  const services = dietitianConfig?.services || [];
  const availableHours = dietitianConfig?.availableHours || [];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    healthProblem: '',
    message: '',
    appointmentDate: '',
    appointmentTime: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, goal: preselectedService }));
    }
  }, [preselectedService, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, age, height, weight, goal, healthProblem, message, appointmentDate, appointmentTime } = formData;

    if (!name || !phone || !goal || !appointmentDate || !appointmentTime) {
      setError(lang === 'tr' ? 'Lütfen Ad, Telefon, Hedef, Tarih ve Saat alanlarını doldurun.' : 'Please fill in Name, Phone, Goal, Date and Time.');
      return;
    }

    // Capture Lead in Local Storage for Admin Panel
    if (onCaptureLead) {
      const detailsObj = {
        age,
        height,
        weight,
        goal,
        healthProblem: healthProblem || 'Yok',
        message: message || '',
        appointmentDate,
        appointmentTime
      };
      
      onCaptureLead({
        name,
        contact: phone,
        email,
        source: goal,
        details: JSON.stringify(detailsObj)
      });
    }

    // Format WhatsApp message
    const waMessage = `*Merhaba ${profile.name}!* \n` +
      `*Diyet Ön Başvuru Formu doldurdum:*\n\n` +
      `*Ad Soyad:* ${name}\n` +
      `*Telefon:* ${phone}\n` +
      `*E-posta:* ${email || '-'}\n` +
      `*Yaş / Boy / Kilo:* ${age} yaş / ${height} cm / ${weight} kg\n` +
      `*Diyet Hedefi:* ${goal}\n` +
      `*Tercih Edilen Randevu:* ${appointmentDate} saat ${appointmentTime}\n` +
      `*Sağlık Problemi:* ${healthProblem || 'Yok'}\n` +
      `*Notum:* ${message || '-'}`;

    const encodedMessage = encodeURIComponent(waMessage);
    const whatsappUrl = `https://wa.me/${profile.whatsapp || '905510311029'}?text=${encodedMessage}`;

    setSuccess(true);
    setError('');

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSuccess(false);
      onClose();
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        height: '',
        weight: '',
        goal: '',
        healthProblem: '',
        message: '',
        appointmentDate: '',
        appointmentTime: ''
      });
    }, 1500);
  };

  const handleDirectCall = () => {
    window.open(`tel:${profile.phoneRaw || '05510311029'}`, '_self');
  };

  // Get current date string for min date (block past dates)
  const getMinDateStr = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-content contact-modal glass" onClick={(e) => e.stopPropagation()} style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close Contact Form">
          <X size={20} />
        </button>

        <div className="contact-modal-header">
          <span className="badge">{lang === 'tr' ? 'Diyet Başvurusu' : 'Diet Application'}</span>
          <h3 className="contact-modal-title">{lang === 'tr' ? 'Detaylı Randevu Başvurusu' : 'Detailed Booking Form'}</h3>
          <p className="contact-modal-subtitle">
            {lang === 'tr' 
              ? 'Tarih ve saatinizi belirleyin, bilgilerinizi inceleyip WhatsApp üzerinden randevunuzu onaylayalım.' 
              : 'Choose your date and time slot, we will analyze your metrics and confirm your appointment.'}
          </p>
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
            <span>{lang === 'tr' ? 'Tebrikler! WhatsApp\'a yönlendiriliyorsunuz.' : 'Congratulations! Redirecting to WhatsApp.'}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="contact-form">
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder={lang === 'tr' ? 'Adınız Soyadınız' : 'Your Full Name'}
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
                placeholder={lang === 'tr' ? 'E-posta Adresi (İsteğe bağlı)' : 'Email Address (Optional)'}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                placeholder={lang === 'tr' ? 'Telefon Numaranız' : 'Your Phone Number'}
                className="form-input"
                required 
              />
            </div>
          </div>

          {/* Diyet Analiz Grubu */}
          <div className="form-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="form-group">
              <input 
                type="number" 
                name="age" 
                value={formData.age}
                onChange={handleChange}
                placeholder={lang === 'tr' ? 'Yaşınız' : 'Age'}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="number" 
                name="height" 
                value={formData.height}
                onChange={handleChange}
                placeholder={lang === 'tr' ? 'Boy (cm)' : 'Height (cm)'}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="number" 
                name="weight" 
                value={formData.weight}
                onChange={handleChange}
                placeholder={lang === 'tr' ? 'Kilo (kg)' : 'Weight (kg)'}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* TAKVİM VE SAAT DİLİMİ ENTEGRASYONU */}
          <div className="form-grid">
            <div className="form-group">
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px', textAlign: 'left', fontWeight: '600' }}>
                {lang === 'tr' ? 'Randevu Tarihi' : 'Appointment Date'}
              </label>
              <input 
                type="date" 
                name="appointmentDate" 
                value={formData.appointmentDate}
                onChange={handleChange}
                className="form-input"
                required 
                min={getMinDateStr()}
              />
            </div>
            <div className="form-group">
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px', textAlign: 'left', fontWeight: '600' }}>
                {lang === 'tr' ? 'Randevu Saati' : 'Appointment Time'}
              </label>
              <select 
                name="appointmentTime" 
                value={formData.appointmentTime} 
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="" disabled>{lang === 'tr' ? 'Saat Seçin' : 'Select Time'}</option>
                {availableHours.map((h, i) => (
                  <option key={i} value={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <select 
              name="goal" 
              value={formData.goal} 
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>{lang === 'tr' ? 'Diyet Hedefinizi Seçin' : 'Select Diet Goal'}</option>
              {services.map(s => {
                const serviceTitle = lang === 'tr' ? s.titleTr : s.titleEn;
                return <option key={s.id} value={serviceTitle}>{serviceTitle}</option>;
              })}
              <option value="Diğer / Genel Sağlık">{lang === 'tr' ? 'Diğer / Genel Sağlık' : 'Other / General Health'}</option>
            </select>
          </div>

          <div className="form-group">
            <input 
              type="text" 
              name="healthProblem" 
              value={formData.healthProblem}
              onChange={handleChange}
              placeholder={lang === 'tr' ? 'Varsa kronik rahatsızlık veya alerjileriniz' : 'Chronic illnesses or allergies if any'}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <textarea 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder={lang === 'tr' ? 'Beslenme alışkanlıklarınız veya belirtmek istediğiniz ek notlar' : 'Your nutrition habits or additional notes'}
              rows="2"
              className="form-textarea"
            ></textarea>
          </div>

          <div className="contact-modal-actions">
            <button type="submit" className="btn-primary flex-center">
              {lang === 'tr' ? 'WhatsApp ile Başvur' : 'Apply via WhatsApp'} <Send size={16} />
            </button>
            <button type="button" className="btn-secondary flex-center btn-call-accent" onClick={handleDirectCall}>
              {lang === 'tr' ? 'Telefonla Ara' : 'Call Directly'} <Phone size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPopup;

import React, { useState } from 'react';
import { MessageSquare, Phone, Send, MessageCircle, X } from 'lucide-react';
import './FloatingContact.css';

const FloatingContact = ({ t, onOpenForm }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppDirect = () => {
    const textMessage = "Merhaba Suda Dynamics! Otomasyon, entegrasyon, mobil ve web çözümleriniz hakkında bilgi almak istiyorum.";
    const url = `https://wa.me/905510311029?text=${encodeURIComponent(textMessage)}`;
    window.open(url, '_blank');
  };

  const handlePhoneCall = () => {
    window.open('tel:05510311029', '_self');
  };

  return (
    <div className={`floating-contact-container ${isOpen ? 'active' : ''}`}>
      {/* Expanded Quick Options Menu */}
      <div className="floating-options glass">
        <button className="option-btn whatsapp-opt" onClick={handleWhatsAppDirect} title="WhatsApp">
          <MessageCircle size={18} />
          <span className="option-label">WhatsApp</span>
        </button>
        <button className="option-btn call-opt" onClick={handlePhoneCall} title="Call">
          <Phone size={18} />
          <span className="option-label">{t.popupSubmitCall}</span>
        </button>
        <button className="option-btn form-opt" onClick={() => { setIsOpen(false); onOpenForm(); }} title="Contact Form">
          <Send size={18} />
          <span className="option-label">{t.navContact}</span>
        </button>
      </div>

      {/* Primary Floating Action Button */}
      <button 
        className="primary-float-btn" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact options Menu"
      >
        <div className="pulse-wave-1"></div>
        <div className="pulse-wave-2"></div>
        <div className="float-btn-icon-wrapper">
          {isOpen ? <X size={22} className="rotate-icon" /> : <MessageSquare size={22} />}
        </div>
      </button>
    </div>
  );
};

export default FloatingContact;

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, SendHorizontal } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = ({ t, lang, onCaptureLead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Load welcome message on mount or language change
  useEffect(() => {
    const welcome = lang === 'tr' 
      ? "Merhaba! Ben Suda AI. Suda Dynamics yazılım çözümleri hakkında merak ettiğiniz her şeyi bana sorabilirsiniz. Projelerimiz, fiyatlar veya 2 haftalık teslimat garantimiz hakkında ne öğrenmek istersiniz?"
      : "Hello! I am Suda AI. You can ask me anything about Suda Dynamics software solutions. What would you like to know about our projects, prices, or 2-week delivery pledge?";
    
    setMessages([
      { id: 1, sender: 'bot', text: welcome, time: new Date().toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' }) }
    ]);
  }, [lang]);

  const handleSendMessage = async (textToSend) => {
    if (!textToSend.trim()) return;

    const userTime = new Date().toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), sender: 'user', text: textToSend, time: userTime };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic parsing for client leads (email or phone)
    const emailMatch = textToSend.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = textToSend.match(/(?:\+?90|0)?[ ]?[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{2}[ ]?[0-9]{2}/) || textToSend.match(/[0-9]{9,12}/);
    
    if ((emailMatch || phoneMatch) && onCaptureLead) {
      const contactVal = (emailMatch ? emailMatch[0] : '') + ' ' + (phoneMatch ? phoneMatch[0] : '');
      onCaptureLead({
        name: 'Chatbot Ziyaretçisi',
        contact: contactVal.trim() || textToSend,
        source: 'Chatbot',
        budget: 'Belirtilmedi',
        details: `Sohbet girdisi: "${textToSend}"`
      });
    }

    triggerHeuristicResponse(textToSend);
  };

  const triggerHeuristicResponse = (textToSend) => {
    setTimeout(() => {
      const botReply = generateBotResponse(textToSend);
      const botTime = new Date().toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply, time: botTime }]);
      setIsTyping(false);
    }, 1000);
  };

  // Rule-based client side response matching (Fallback)
  const generateBotResponse = (query) => {
    const q = query.toLowerCase();

    if (lang === 'tr') {
      if (q.includes('fiyat') || q.includes('ücret') || q.includes('maliyet') || q.includes('para') || q.includes('tutar') || q.includes('teklif')) {
        return "Suda Dynamics olarak projelerimizi tipine, ölçeğine ve teslimat hızına göre şeffaf bir şekilde fiyatlandırıyoruz. Web sitelerimiz ortalama 15.000 ₺, mobil uygulamalarımız ise 28.000 ₺'den başlamaktadır. Detaylı bütçe hesabı için sitemizdeki 'Proje Süre Hesaplayıcı' aracını kullanabilirsiniz!";
      }
      if (q.includes('süre') || q.includes('zaman') || q.includes('gün') || q.includes('ne kadar') || q.includes('teslim')) {
        return "Bizim en büyük sözümüz hızdır! Tüm otomasyon, web, mobil ve entegrasyon projelerimizi en geç 14 GÜN (2 hafta) içerisinde tam çalışır durumda teslim ediyoruz. Gecikme halinde koşulsuz iade sağlıyoruz.";
      }
      if (q.includes('hizmet') || q.includes('neler yapıyorsunuz') || q.includes('ne iş') || q.includes('uzmanlık')) {
        return "Suda Dynamics 4 ana alanda uzmanlaşmıştır: \n1. Endüstriyel & Süreç Otomasyonu (Python, Node.js)\n2. Sistem & API Entegrasyonları (REST, GraphQL, Logo ERP)\n3. Mobil Uygulama Geliştirme (React Native, Flutter)\n4. Web & E-Ticaret (Next.js, React, SEO).\nHangi alanla ilgileniyorsunuz?";
      }
      if (q.includes('ekip') || q.includes('kimler') || q.includes('çalışan') || q.includes('kurucu')) {
        return "Ekibimiz alanında uzman 4 kişiden oluşmaktadır:\n- Zehra Abacı: Kurucu & Proje Yöneticisi\n- Gizay Duru: Müşteri İlişkileri & Asistan\n- Furkan Uçar: Kıdemli Mobil & Web Geliştirici\n- Selahattin Sarıbay: Kıdemli Otomasyon & Entegrasyon Uzmanı.";
      }
      if (q.includes('iletişim') || q.includes('telefon') || q.includes('whatsapp') || q.includes('mail') || q.includes('e-posta')) {
        return `Bizimle doğrudan iletişime geçebilirsiniz:\n📞 Telefon/WhatsApp: ${t.contactPhone || '0551 031 10 29'}\n✉️ E-posta: ${t.contactEmail || 'sudadynamics@gmail.com'}\nİletişim formunu doldurarak da bize yazabilirsiniz.`;
      }
      if (q.includes('@') || q.match(/[0-9]{9,12}/)) {
        return "İletişim bilgilerinizi kaydettim! Müşteri ilişkileri yöneticimiz Gizay Duru en geç 24 saat içinde sizinle iletişime geçecektir. Teşekkür ederiz! 😊";
      }
      return "Anladım. Suda Dynamics hakkında daha spesifik bir bilgi almak isterseniz; hizmetlerimiz, teslimat süremiz (maksimum 14 gün) veya tahmini fiyatlarımız hakkında sorular sorabilirsiniz. Dilerseniz iletişim bilgilerinizi buraya yazarak bizim sizi aramamızı isteyebilirsiniz!";
    } 
    else {
      if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('how much') || q.includes('quote')) {
        return "At Suda Dynamics, we value transparency. Web projects start at $600, while mobile applications start at $1,200. You can calculate a customized breakdown using the 'Timeline Calculator' tool on our website!";
      }
      if (q.includes('time') || q.includes('how long') || q.includes('duration') || q.includes('delivery') || q.includes('days')) {
        return "Speed is our promise! We deliver all web, mobile, automation, and integration projects in 14 DAYS (2 weeks) maximum. If we fail, we offer a full refund guarantee.";
      }
      if (q.includes('service') || q.includes('expertise') || q.includes('what do you do')) {
        return "We specialize in 4 main areas:\n1. Industrial & Process Automation\n2. System & API Integrations\n3. Mobile App Development\n4. Web & E-Commerce Development.\nWhich of these matches your project needs?";
      }
      if (q.includes('team') || q.includes('who are') || q.includes('members')) {
        return "Our core team consists of 4 experts:\n- Zehra Abaci: Founder & PM\n- Gizay Duru: Client Relations & Assistant\n- Furkan Ucar: Senior Mobile & Web Developer\n- Selahattin Saribay: Senior Automation & Integration Expert.";
      }
      if (q.includes('contact') || q.includes('phone') || q.includes('whatsapp') || q.includes('email') || q.includes('mail')) {
        return `Feel free to reach us directly:\n📞 Tel/WhatsApp: ${t.contactPhone || '0551 031 10 29'}\n✉️ Email: ${t.contactEmail || 'sudadynamics@gmail.com'}\nYou can also use the contact form modal on the site.`;
      }
      if (q.includes('@') || q.match(/[0-9]{9,12}/)) {
        return "I've saved your contact details! Our customer relationship manager Gizay Duru will contact you within 24 hours. Thank you! 😊";
      }
      return "Got it. Feel free to ask about our services, the 14-day delivery pledge, pricing, or leave your phone/email here so we can get in touch with you!";
    }
  };

  const handleQuickQuestion = (question, displayLabel) => {
    handleSendMessage(displayLabel || question);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button 
        className={`chatbot-float-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Suda AI Assistant"
        aria-label="Suda AI Assistant"
      >
        {isOpen ? <X size={22} /> : <MessageSquare size={22} />}
        {!isOpen && (
          <span className="chatbot-btn-pulse"></span>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chatbot-panel glass animate-scale-up">
          {/* Header */}
          <div className="chatbot-panel-header">
            <div className="bot-info">
              <div className="bot-avatar">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="bot-title">Suda AI</h4>
                <p className="bot-status"><span className="status-dot"></span> Online</p>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Logs Area */}
          <div className="chatbot-messages-body">
            {messages.map(msg => (
              <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="message-bubble">
                  <p className="message-text">{msg.text}</p>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="message-wrapper bot typing">
                <div className="message-avatar">
                  <Bot size={14} />
                </div>
                <div className="message-bubble typing-bubble">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggest Question Buttons */}
          <div className="chatbot-suggestions">
            <button 
              onClick={() => handleQuickQuestion(
                lang === 'tr' ? 'fiyat' : 'price', 
                lang === 'tr' ? 'Fiyat Hesaplama? ⚡' : 'Pricing Estimate? ⚡'
              )}
            >
              {lang === 'tr' ? 'Fiyat Hesapla ⚡' : 'Pricing Estimate ⚡'}
            </button>
            <button 
              onClick={() => handleQuickQuestion(
                lang === 'tr' ? 'süre' : 'time', 
                lang === 'tr' ? 'Teslimat Süresi? 📅' : 'Delivery Timeline? 📅'
              )}
            >
              {lang === 'tr' ? 'Teslimat Süresi? 📅' : 'Delivery Timeline? 📅'}
            </button>
            <button 
              onClick={() => handleQuickQuestion(
                lang === 'tr' ? 'hizmet' : 'service', 
                lang === 'tr' ? 'Hizmet Alanlarınız? ⚙️' : 'Our Services? ⚙️'
              )}
            >
              {lang === 'tr' ? 'Hizmetler Neler? ⚙️' : 'Our Services? ⚙️'}
            </button>
            <button 
              onClick={() => handleQuickQuestion(
                lang === 'tr' ? 'iletişim' : 'contact', 
                lang === 'tr' ? 'İletişime Geç 💬' : 'Contact Us 💬'
              )}
            >
              {lang === 'tr' ? 'İletişime Geç 💬' : 'Contact Us 💬'}
            </button>
          </div>

          {/* Input Footer Form */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }} 
            className="chatbot-input-footer"
          >
            <input
              type="text"
              placeholder={lang === 'tr' ? 'Mesajınızı yazın...' : 'Type a message...'}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <button type="submit" className="chatbot-send-btn" aria-label="Send Message">
              <SendHorizontal size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;

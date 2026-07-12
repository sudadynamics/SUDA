import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, SendHorizontal } from 'lucide-react';
import './AIChatbot.css';

const AIChatbot = ({ t, lang, onCaptureLead, dietitianConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  const profile = dietitianConfig?.profile || {};

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Load welcome message on mount or language change
  useEffect(() => {
    const welcome = lang === 'tr' 
      ? `Merhaba! Ben SUDA Diyet Asistanı. Sağlıklı beslenme, diyet programlarımız, kaloriler veya randevu süreçlerimiz hakkında merak ettiğiniz her şeyi bana sorabilirsiniz. Size nasıl yardımcı olabilirim?`
      : `Hello! I am SUDA Diet Assistant. You can ask me anything about healthy nutrition, our diet programs, calories, or booking appointments. How can I help you today?`;
    
    setMessages([
      { id: 1, sender: 'bot', text: welcome, time: new Date().toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' }) }
    ]);
  }, [lang, dietitianConfig]);

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
      
      const detailsObj = {
        goal: 'Chatbot Başvurusu',
        message: `Sohbet girdisi: "${textToSend}"`
      };

      onCaptureLead({
        name: 'Chatbot Ziyaretçisi',
        contact: contactVal.trim() || textToSend,
        source: 'Chatbot',
        details: JSON.stringify(detailsObj)
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

  // Rule-based dietitian response matching
  const generateBotResponse = (query) => {
    const q = query.toLowerCase();

    if (lang === 'tr') {
      if (q.includes('fiyat') || q.includes('ücret') || q.includes('maliyet') || q.includes('para') || q.includes('tutar') || q.includes('teklif') || q.includes('paket')) {
        return "SUDA-DİYETİSYEN bünyesinde online diyet, kilo yönetimi, sporcu beslenmesi ve kurumsal danışmanlık hizmetleri sunuyoruz. Fiyatlarımız seçilen paketin süresine ve içeriğine göre değişiklik gösterir. Detaylı analizleriniz için sitemizdeki 'Diyet Hesaplama Araçları'nı kullanabilir, WhatsApp üzerinden doğrudan teklif alabilirsiniz!";
      }
      if (q.includes('tarif') || q.includes('yemek') || q.includes('tatlı') || q.includes('atıştırmalık') || q.includes('lapası') || q.includes('ne yesem')) {
        return `Diyetisyenimiz ${profile.name} tarafından hazırlanan sağlıklı ve düşük kalorili tariflerimize sitemizdeki 'Tarifler & Başarılar' sekmesinden ulaşabilirsiniz. Yulaf lapasından, fırında çıtır nohut cipsine kadar lezzetli fit alternatifler sizi bekliyor!`;
      }
      if (q.includes('su') || q.includes('ne kadar su') || q.includes('litresi') || q.includes('sıvı')) {
        return "Sağlıklı bir yaşam için günlük su tüketimi kilo başına yaklaşık 33 ml olmalıdır. Günlük egzersiz yaptığınız her saat için ise bu miktara ekstra 500 ml eklemeniz önerilir. Sitemizdeki 'Diyet Hesaplama Araçları'nda yer alan Su Hesaplayıcıyı kullanarak kilonuza özel su ihtiyacınızı hemen öğrenebilirsiniz!";
      }
      if (q.includes('kimdir') || q.includes('diyetisyen') || q.includes('zehra') || q.includes('özgeçmiş') || q.includes('biyografi')) {
        return `Diyetisyenimiz ${profile.name}, sağlıklı yaşamı sürdürülebilir kılma felsefesiyle online ve yüz yüze beslenme danışmanlığı yürütmektedir. Fonksiyonel tıp beslenmesi ve kilo kontrolü alanında uzmandır. Kendisi hakkında detaylı bilgiye sitemizdeki 'Hakkımda' bölümünden erişebilirsiniz.`;
      }
      if (q.includes('randevu') || q.includes('görüşme') || q.includes('başvuru') || q.includes('iletişim') || q.includes('telefon') || q.includes('whatsapp') || q.includes('ulaşabilirim')) {
        return `Bizimle iletişime geçmek ve randevu planlamak çok kolay:\n📞 Telefon/WhatsApp: ${profile.phone || '0551 031 10 29'}\n✉️ E-posta: ${profile.email || 'dyt.zehraabaci@gmail.com'}\n\nDilerseniz sağ üstteki 'Randevu Al' butonuna tıklayarak boy, kilo ve yaş bilgilerinizi bırakabilirsiniz; ${profile.name} size WhatsApp üzerinden özel bir planlamayla geri dönecektir.`;
      }
      if (q.includes('@') || q.match(/[0-9]{9,12}/)) {
        return `İletişim bilgilerinizi kaydettim! Diyetisyenimiz ${profile.name} en kısa sürede sizinle iletişime geçerek sağlıklı yaşam planınızı başlatacaktır. Sağlıklı günler dileriz! 😊`;
      }
      return `SUDA Diyet Asistanı olarak size sağlıklı tarifler, su tüketimi, ideal kilo analizi, diyet paketlerimiz veya randevular konusunda yardımcı olabilirim. Lütfen öğrenmek istediğiniz konuyu yazın!`;
    } 
    else {
      if (q.includes('price') || q.includes('cost') || q.includes('package') || q.includes('budget') || q.includes('how much') || q.includes('quote')) {
        return "We offer online diet coaching, weight management, sports nutrition, and corporate consulting. Package prices vary based on program details and duration. You can check our 'Diet Calculator' or ask for a direct quote via WhatsApp!";
      }
      if (q.includes('recipe') || q.includes('meal') || q.includes('food') || q.includes('eat') || q.includes('snack')) {
        return `You can explore delicious, low-calorie diet recipes prepared by ${profile.name} directly under our 'Recipes & Success' tab on the homepage. Happy cooking!`;
      }
      if (q.includes('water') || q.includes('how much water') || q.includes('drink') || q.includes('liter')) {
        return "For an active metabolism, you should drink about 33ml of water per kg of body weight. Add an extra 500ml for each hour of exercise. Try the Water Intake tab in our Diet Calculator to get your custom amount!";
      }
      if (q.includes('who') || q.includes('dietitian') || q.includes('zehra') || q.includes('about') || q.includes('bio')) {
        return `Our specialist dietitian ${profile.name} focuses on sustainable eating models. She offers both online and clinical support. You can read her biography under the 'About Me' section of our website.`;
      }
      if (q.includes('appointment') || q.includes('book') || q.includes('consultation') || q.includes('contact') || q.includes('phone') || q.includes('whatsapp')) {
        return `Booking a consultation with us is simple:\n📞 Call/WhatsApp: ${profile.phone || '0551 031 10 29'}\n✉️ Email: ${profile.email || 'dyt.zehraabaci@gmail.com'}\nYou can click 'Book Appointment' at the top right to share your physical metrics, and we'll reach out to schedule your plan!`;
      }
      if (q.includes('@') || q.match(/[0-9]{9,12}/)) {
        return `I've saved your details! Our dietitian ${profile.name} will reach out to you shortly to map out your health journey. Have a wonderful day! 😊`;
      }
      return "As your SUDA Diet Assistant, I can guide you on healthy recipes, daily water intake, BMR/BMI calculations, or help you schedule a dietitian consultation. How can I help you today?";
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
        title={lang === 'tr' ? 'Suda Diyet Asistanı' : 'Suda Diet Assistant'}
        aria-label={lang === 'tr' ? 'Suda Diyet Asistanı' : 'Suda Diet Assistant'}
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
                <h4 className="bot-title">{lang === 'tr' ? 'SUDA Diyet Asistanı' : 'SUDA Diet Assistant'}</h4>
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
                  <p className="message-text" style={{ whiteSpace: 'pre-line' }}>{msg.text}</p>
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
                lang === 'tr' ? 'randevu' : 'appointment', 
                lang === 'tr' ? 'Randevu Nasıl Alınır? 📅' : 'How to Book? 📅'
              )}
            >
              {lang === 'tr' ? 'Randevu Al 📅' : 'How to Book 📅'}
            </button>
            <button 
              onClick={() => handleQuickQuestion(
                lang === 'tr' ? 'su' : 'water', 
                lang === 'tr' ? 'Su İhtiyacım Ne Kadar? 💧' : 'How much water? 💧'
              )}
            >
              {lang === 'tr' ? 'Su İhtiyacı 💧' : 'Water Needs 💧'}
            </button>
            <button 
              onClick={() => handleQuickQuestion(
                lang === 'tr' ? 'tarif' : 'recipe', 
                lang === 'tr' ? 'Diyet Tarifleri Nerede? 🥗' : 'Where are recipes? 🥗'
              )}
            >
              {lang === 'tr' ? 'Tarifler 🥗' : 'Diet Recipes 🥗'}
            </button>
            <button 
              onClick={() => handleQuickQuestion(
                lang === 'tr' ? 'fiyat' : 'price', 
                lang === 'tr' ? 'Diyet Paket Fiyatları? 💳' : 'Package Prices? 💳'
              )}
            >
              {lang === 'tr' ? 'Paket Fiyatları 💳' : 'Package Prices 💳'}
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
              placeholder={lang === 'tr' ? 'Diyet asistanına sorun...' : 'Ask diet assistant...'}
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

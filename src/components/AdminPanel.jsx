import React, { useState, useEffect } from 'react';
import { 
  X, Lock, User, ShieldAlert, Sparkles, Settings, Users, BookOpen, 
  HelpCircle, Activity, Save, Plus, Trash2, Edit2, LogOut, RefreshCw, MessageSquare, FileText, ClipboardList
} from 'lucide-react';
import { defaultDietitianConfig } from '../utils/dietitianConfig';
import './AdminPanel.css';

const AdminPanel = ({ 
  isOpen, onClose, onLoginSuccess, t, isAdmin, 
  setProjectsVersion 
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Active tab in Admin Dashboard
  const [activeTab, setActiveTab] = useState('profile');

  // Dietitian Config State
  const [config, setConfig] = useState(() => {
    const stored = localStorage.getItem('suda_dietitian_config');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return defaultDietitianConfig;
      }
    }
    return defaultDietitianConfig;
  });

  // Leads list
  const [leads, setLeads] = useState([]);

  // Modal editor for lists
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorType, setEditorType] = useState(''); // service, recipe, transformation, faq, blog
  const [editorIndex, setEditorIndex] = useState(null); // null for new, index for editing
  
  // Editor form states
  const [formFields, setFormFields] = useState({});

  // Diet builder states
  const [activeDietLead, setActiveDietLead] = useState(null);
  const [dietForm, setDietForm] = useState({ sabah: '', ogle: '', aksam: '', araOgun: '' });

  useEffect(() => {
    if (isOpen) {
      // Load current config
      const stored = localStorage.getItem('suda_dietitian_config');
      if (stored) {
        try {
          setConfig(JSON.parse(stored));
        } catch (e) {}
      }
      
      // Load leads
      const storedLeads = localStorage.getItem('suda_leads');
      if (storedLeads) {
        try {
          setLeads(JSON.parse(storedLeads));
        } catch (e) {}
      }
    }
  }, [isOpen]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username === 'SUDA' && password === 'SFGA') {
      setError(false);
      onLoginSuccess();
      setUsername('');
      setPassword('');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleClose = () => {
    setError(false);
    setUsername('');
    setPassword('');
    setEditorOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  // Save the entire dietitian config to localStorage and notify parent
  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('suda_dietitian_config', JSON.stringify(newConfig));
    if (setProjectsVersion) {
      setProjectsVersion(prev => prev + 1); // Trigger update in page components
    }
  };

  // Reset dietitian config to defaults
  const handleResetDefaults = () => {
    if (window.confirm('Tüm diyetisyen verilerini, tarifleri ve hizmetleri varsayılana sıfırlamak istediğinize emin misiniz?')) {
      localStorage.removeItem('suda_dietitian_config');
      setConfig(defaultDietitianConfig);
      saveConfig(defaultDietitianConfig);
      alert('Tüm ayarlar fabrika ayarlarına döndürüldü.');
    }
  };

  // Profile Settings Form Save
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    
    const newConfig = {
      ...config,
      profile: {
        name: fd.get('name'),
        image: fd.get('image'),
        titleTr: fd.get('titleTr'),
        titleEn: fd.get('titleEn'),
        phone: fd.get('phone'),
        phoneRaw: fd.get('phoneRaw'),
        whatsapp: fd.get('whatsapp'),
        email: fd.get('email'),
        addressTr: fd.get('addressTr'),
        addressEn: fd.get('addressEn'),
        workingHoursTr: fd.get('workingHoursTr'),
        workingHoursEn: fd.get('workingHoursEn'),
        instagram: fd.get('instagram'),
        linkedin: fd.get('linkedin'),
        bioTr: fd.get('bioTr'),
        bioEn: fd.get('bioEn'),
        visionTr: fd.get('visionTr'),
        visionEn: fd.get('visionEn'),
        missionTr: fd.get('missionTr'),
        missionEn: fd.get('missionEn')
      }
    };

    saveConfig(newConfig);
    alert('Profil ayarları başarıyla kaydedildi!');
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Bu başvuruyu silmek istediğinize emin misiniz?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      localStorage.setItem('suda_leads', JSON.stringify(updated));
    }
  };

  const handleLeadStatusChange = (id, newStatus) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updated);
    localStorage.setItem('suda_leads', JSON.stringify(updated));
  };

  const handleLeadPriceChange = (id, priceVal) => {
    const updated = leads.map(l => l.id === id ? { ...l, price: parseInt(priceVal) || 0 } : l);
    setLeads(updated);
    localStorage.setItem('suda_leads', JSON.stringify(updated));
  };

  const handleLeadPaymentStatusChange = (id, statusVal) => {
    const updated = leads.map(l => l.id === id ? { ...l, paymentStatus: statusVal } : l);
    setLeads(updated);
    localStorage.setItem('suda_leads', JSON.stringify(updated));
  };

  const sendDietViaWhatsApp = (lead) => {
    const { sabah, ogle, aksam, araOgun } = dietForm;
    const profile = config.profile;
    
    const dietText = `*Merhaba ${lead.name}!* \n` +
      `*Diyetisyeniniz ${profile.name} size özel yeni diyet listenizi hazırladı:* \n\n` +
      `🌅 *SABAH KAHVALTISI:*\n${sabah || 'Serbest / Plan dışı'}\n\n` +
      `☀️ *ÖĞLE YEMEĞİ:*\n${ogle || 'Serbest / Plan dışı'}\n\n` +
      `🌇 *AKŞAM YEMEĞİ:*\n${aksam || 'Serbest / Plan dışı'}\n\n` +
      `🍓 *ARA ÖĞÜNLER:*\n${araOgun || 'Serbest / Plan dışı'}\n\n` +
      `Bol su içmeyi ve egzersiz yapmayı ihmal etmeyin. Afiyet olsun! 💚`;

    const encodedText = encodeURIComponent(dietText);
    const cleanPhone = lead.contact ? lead.contact.replace(/\D/g, '') : '';
    const link = `https://wa.me/${cleanPhone.startsWith('90') || cleanPhone.length > 10 ? cleanPhone : '90' + cleanPhone}?text=${encodedText}`;
    window.open(link, '_blank');
  };

  const printDietList = (lead) => {
    const { sabah, ogle, aksam, araOgun } = dietForm;
    const profile = config.profile;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${lead.name} - Diyet Programı</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 45px; color: #1e293b; background: #fff; }
            .header { text-align: center; border-bottom: 2px solid #06b6d4; padding-bottom: 20px; margin-bottom: 30px; }
            .logo { font-size: 26px; font-weight: 800; color: #06b6d4; letter-spacing: 1.5px; }
            .subtitle { font-size: 13px; color: #64748b; margin-top: 6px; }
            .client-info { display: flex; justify-content: space-between; margin-bottom: 35px; font-size: 14px; background: #f8fafc; padding: 15px 20px; border-radius: 10px; border: 1px solid #e2e8f0; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 15px; font-weight: 700; color: #0f172a; border-left: 4px solid #8b5cf6; padding-left: 10px; margin-bottom: 12px; text-transform: uppercase; }
            .section-content { font-size: 14px; line-height: 1.6; white-space: pre-line; background: #fafafa; padding: 12px 18px; border-radius: 8px; border: 1px solid #f1f5f9; }
            .signature { margin-top: 50px; display: flex; justify-content: flex-end; }
            .sig-box { border-top: 1px solid #cbd5e1; width: 220px; text-align: center; padding-top: 10px; font-size: 13px; font-weight: 600; }
            .footer { margin-top: 60px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; }
            @media print {
              body { padding: 20px; }
              .client-info { background: #fff !important; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">SUDA DİYETİSYEN</div>
            <div class="subtitle">${profile.name} - Sağlıklı Beslenme ve Yaşam Portalı</div>
          </div>
          <div class="client-info">
            <div>
              <strong>Danışan Adı:</strong> ${lead.name}<br>
              <strong>Hedef:</strong> ${lead.source || 'Beslenme Planı'}
            </div>
            <div>
              <strong>Diyetisyen:</strong> ${profile.name}<br>
              <strong>Tarih:</strong> ${new Date().toLocaleDateString('tr-TR')}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">🌅 Sabah Kahvaltısı</div>
            <div class="section-content">${sabah || 'Serbest / Plan dışı'}</div>
          </div>
          <div class="section">
            <div class="section-title">☀️ Öğle Yemeği</div>
            <div class="section-content">${ogle || 'Serbest / Plan dışı'}</div>
          </div>
          <div class="section">
            <div class="section-title">🌇 Akşam Yemeği</div>
            <div class="section-content">${aksam || 'Serbest / Plan dışı'}</div>
          </div>
          <div class="section">
            <div class="section-title">🍓 Ara Öğünler</div>
            <div class="section-content">${araOgun || 'Serbest / Plan dışı'}</div>
          </div>

          <div class="signature">
            <div class="sig-box">
              ${profile.name}<br>
              <span style="font-size: 11px; font-weight: normal; color: #64748b;">Uzman Kaşesi / İmza</span>
            </div>
          </div>

          <div class="footer">
            Bu beslenme programı kişiye özel tasarlanmıştır. Başkaları tarafından kopyalanamaz veya uygulanamaz.<br>
            &copy; ${new Date().getFullYear()} SUDA-DİYETİSYEN - Tüm Hakları Saklıdır.
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const toggleDietForm = (leadId) => {
    if (activeDietLead === leadId) {
      setActiveDietLead(null);
    } else {
      setActiveDietLead(leadId);
      setDietForm({ sabah: '', ogle: '', aksam: '', araOgun: '' });
    }
  };

  // CRUD Popup Editors
  const openEditor = (type, index = null) => {
    setEditorType(type);
    setEditorIndex(index);
    
    let fields = {};
    if (type === 'service') {
      const item = index !== null ? config.services[index] : {};
      fields = {
        titleTr: item.titleTr || '',
        titleEn: item.titleEn || '',
        shortDescTr: item.shortDescTr || '',
        shortDescEn: item.shortDescEn || '',
        fullDescTr: item.fullDescTr || '',
        fullDescEn: item.fullDescEn || '',
        techs: item.techs ? item.techs.join(', ') : '',
        icon: item.icon || 'Activity'
      };
    } else if (type === 'recipe') {
      const item = index !== null ? config.recipes[index] : {};
      fields = {
        titleTr: item.titleTr || '',
        titleEn: item.titleEn || '',
        category: item.category || 'Atıştırmalık',
        categoryEn: item.categoryEn || 'Snack',
        prepTime: item.prepTime || '15 Dk',
        prepTimeEn: item.prepTimeEn || '15 Mins',
        calories: item.calories || 200,
        ingredientsTr: item.ingredientsTr || '',
        ingredientsEn: item.ingredientsEn || '',
        instructionsTr: item.instructionsTr || '',
        instructionsEn: item.instructionsEn || '',
        image: item.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop'
      };
    } else if (type === 'transformation') {
      const item = index !== null ? config.transformations[index] : {};
      fields = {
        name: item.name || '',
        lostWeight: item.lostWeight || '',
        durationTr: item.durationTr || '',
        durationEn: item.durationEn || '',
        commentTr: item.commentTr || '',
        commentEn: item.commentEn || '',
        statsTr: item.statsTr || '',
        statsEn: item.statsEn || ''
      };
    } else if (type === 'faq') {
      const item = index !== null ? config.faqs[index] : {};
      fields = {
        questionTr: item.questionTr || '',
        questionEn: item.questionEn || '',
        answerTr: item.answerTr || '',
        answerEn: item.answerEn || ''
      };
    } else if (type === 'blog') {
      const item = index !== null ? (config.blogs || [])[index] : {};
      fields = {
        titleTr: item.titleTr || '',
        titleEn: item.titleEn || '',
        categoryTr: item.categoryTr || 'Sağlıklı Yaşam',
        categoryEn: item.categoryEn || 'Healthy Life',
        date: item.date || new Date().toLocaleDateString('tr-TR'),
        readTimeTr: item.readTimeTr || '5 Dk Okuma',
        readTimeEn: item.readTimeEn || '5 Min Read',
        summaryTr: item.summaryTr || '',
        summaryEn: item.summaryEn || '',
        contentTr: item.contentTr || '',
        contentEn: item.contentEn || '',
        image: item.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop'
      };
    }
    
    setFormFields(fields);
    setEditorOpen(true);
  };

  const handleEditorFieldChange = (key, value) => {
    setFormFields(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleEditorSubmit = (e) => {
    e.preventDefault();
    
    const newConfig = { ...config };
    if (!newConfig.blogs) newConfig.blogs = [];
    
    if (editorType === 'service') {
      const updatedItem = {
        id: editorIndex !== null ? config.services[editorIndex].id : 'service_' + Date.now(),
        icon: formFields.icon,
        titleTr: formFields.titleTr,
        titleEn: formFields.titleEn,
        shortDescTr: formFields.shortDescTr,
        shortDescEn: formFields.shortDescEn,
        fullDescTr: formFields.fullDescTr,
        fullDescEn: formFields.fullDescEn,
        techs: formFields.techs ? formFields.techs.split(',').map(s => s.trim()) : []
      };

      if (editorIndex !== null) {
        newConfig.services[editorIndex] = updatedItem;
      } else {
        newConfig.services.push(updatedItem);
      }
    } 
    else if (editorType === 'recipe') {
      const updatedItem = {
        id: editorIndex !== null ? config.recipes[editorIndex].id : 'recipe_' + Date.now(),
        titleTr: formFields.titleTr,
        titleEn: formFields.titleEn,
        category: formFields.category,
        categoryEn: formFields.categoryEn,
        prepTime: formFields.prepTime,
        prepTimeEn: formFields.prepTimeEn,
        calories: parseInt(formFields.calories) || 0,
        ingredientsTr: formFields.ingredientsTr,
        ingredientsEn: formFields.ingredientsEn,
        instructionsTr: formFields.instructionsTr,
        instructionsEn: formFields.instructionsEn,
        image: formFields.image
      };

      if (editorIndex !== null) {
        newConfig.recipes[editorIndex] = updatedItem;
      } else {
        newConfig.recipes.push(updatedItem);
      }
    } 
    else if (editorType === 'transformation') {
      const updatedItem = {
        id: editorIndex !== null ? config.transformations[editorIndex].id : 'trans_' + Date.now(),
        name: formFields.name,
        lostWeight: formFields.lostWeight,
        durationTr: formFields.durationTr,
        durationEn: formFields.durationEn,
        commentTr: formFields.commentTr,
        commentEn: formFields.commentEn,
        statsTr: formFields.statsTr,
        statsEn: formFields.statsEn
      };

      if (editorIndex !== null) {
        newConfig.transformations[editorIndex] = updatedItem;
      } else {
        newConfig.transformations.push(updatedItem);
      }
    } 
    else if (editorType === 'faq') {
      const updatedItem = {
        id: editorIndex !== null ? config.faqs[editorIndex].id : Date.now(),
        questionTr: formFields.questionTr,
        questionEn: formFields.questionEn,
        answerTr: formFields.answerTr,
        answerEn: formFields.answerEn
      };

      if (editorIndex !== null) {
        newConfig.faqs[editorIndex] = updatedItem;
      } else {
        newConfig.faqs.push(updatedItem);
      }
    }
    else if (editorType === 'blog') {
      const updatedItem = {
        id: editorIndex !== null ? config.blogs[editorIndex].id : 'blog_' + Date.now(),
        titleTr: formFields.titleTr,
        titleEn: formFields.titleEn,
        categoryTr: formFields.categoryTr,
        categoryEn: formFields.categoryEn,
        date: formFields.date,
        readTimeTr: formFields.readTimeTr,
        readTimeEn: formFields.readTimeEn,
        summaryTr: formFields.summaryTr,
        summaryEn: formFields.summaryEn,
        contentTr: formFields.contentTr,
        contentEn: formFields.contentEn,
        image: formFields.image
      };

      if (editorIndex !== null) {
        newConfig.blogs[editorIndex] = updatedItem;
      } else {
        newConfig.blogs.push(updatedItem);
      }
    }

    saveConfig(newConfig);
    setEditorOpen(false);
    alert('İçerik başarıyla güncellendi!');
  };

  const handleDeleteItem = (type, index) => {
    if (!window.confirm('Bu ögeyi silmek istediğinize emin misiniz?')) return;
    const newConfig = { ...config };
    
    if (type === 'service') {
      newConfig.services.splice(index, 1);
    } else if (type === 'recipe') {
      newConfig.recipes.splice(index, 1);
    } else if (type === 'transformation') {
      newConfig.transformations.splice(index, 1);
    } else if (type === 'faq') {
      newConfig.faqs.splice(index, 1);
    } else if (type === 'blog') {
      newConfig.blogs.splice(index, 1);
    }

    saveConfig(newConfig);
    alert('Öge başarıyla silindi.');
  };

  // Payment Tracking Computations
  const totalIncome = leads.reduce((sum, l) => l.paymentStatus === 'Ödendi' ? sum + (l.price || 0) : sum, 0);
  const pendingIncome = leads.reduce((sum, l) => l.paymentStatus !== 'Ödendi' ? sum + (l.price || 0) : sum, 0);

  // Render Login Panel if not Admin
  if (!isAdmin) {
    return (
      <div className="calculator-backdrop" onClick={handleClose}>
        <div className="calculator-modal glass hover-glow admin-login-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
          
          <div className="modal-header-section">
            <div className="icon-wrapper">
              <Lock size={24} className="accent-glow-icon" />
            </div>
            <h2>SUDA-DİYETİSYEN</h2>
            <p>Diyetisyen Yönetici Paneli Girişi</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="admin-login-form">
            <div className="form-group">
              <label>Kullanıcı Adı</label>
              <div className="input-with-icon">
                <User size={16} className="input-icon" />
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Kullanıcı adını girin" 
                  className="form-input"
                  required 
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label>Şifre</label>
              <div className="input-with-icon">
                <Lock size={16} className="input-icon" />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Şifrenizi girin" 
                  className="form-input"
                  required 
                />
              </div>
            </div>

            {error && (
              <div className="alert-message error" style={{ marginBottom: '20px' }}>
                <ShieldAlert size={16} />
                <span>Kullanıcı adı veya şifre hatalı!</span>
              </div>
            )}

            <button type="submit" className="admin-login-submit-btn">
              <Sparkles size={16} />
              <span>Giriş Yap</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Dashboard if logged in
  return (
    <div className="calculator-backdrop" onClick={handleClose}>
      <div className="calculator-modal glass hover-glow admin-dashboard-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>
          <X size={20} />
        </button>

        <div className="admin-dashboard-container">
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="admin-sidebar-header">
              <div className="admin-sidebar-logo">S</div>
              <div>
                <h4>SUDA</h4>
                <span>Diyetisyen Paneli</span>
              </div>
            </div>

            <nav className="admin-nav">
              <button className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                <Settings size={18} />
                <span>Profil Ayarları</span>
              </button>
              <button className={`admin-nav-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
                <Activity size={18} />
                <span>Diyet Paketleri</span>
              </button>
              <button className={`admin-nav-item ${activeTab === 'recipes' ? 'active' : ''}`} onClick={() => setActiveTab('recipes')}>
                <BookOpen size={18} />
                <span>Diyet Tarifleri</span>
              </button>
              <button className={`admin-nav-item ${activeTab === 'transformations' ? 'active' : ''}`} onClick={() => setActiveTab('transformations')}>
                <Users size={18} />
                <span>Başarı Hikayeleri</span>
              </button>
              <button className={`admin-nav-item ${activeTab === 'blogs' ? 'active' : ''}`} onClick={() => setActiveTab('blogs')}>
                <ClipboardList size={18} />
                <span>Blog Makaleleri</span>
              </button>
              <button className={`admin-nav-item ${activeTab === 'faqs' ? 'active' : ''}`} onClick={() => setActiveTab('faqs')}>
                <HelpCircle size={18} />
                <span>SSS Yönetimi</span>
              </button>
              <button className={`admin-nav-item ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => { setActiveTab('leads'); }}>
                <MessageSquare size={18} />
                <span>Başvurular ({leads.length})</span>
              </button>
              <button className={`admin-nav-item ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>
                <Activity size={18} />
                <span>Ödeme Takibi</span>
              </button>
              <button className={`admin-nav-item ${activeTab === 'system' ? 'active' : ''}`} onClick={() => setActiveTab('system')}>
                <RefreshCw size={18} />
                <span>Sistem Ayarları</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="admin-main-content">
            {/* PROFILE SETTINGS TAB */}
            {activeTab === 'profile' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Diyetisyen Biyografi & İletişim Ayarları</h3>
                  <p>Sitede sergilenen diyetisyene ait kişisel bilgileri, unvanları ve biyografiyi buradan güncelleyin.</p>
                </div>
                
                <form className="admin-form-grid" onSubmit={handleProfileSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Diyetisyen Adı Soyadı</label>
                      <input type="text" name="name" defaultValue={config.profile.name} className="admin-form-input" required />
                    </div>
                    <div className="form-group">
                      <label>Profil Fotoğrafı URL'si</label>
                      <input type="text" name="image" defaultValue={config.profile.image} className="admin-form-input" required />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Unvan (Türkçe)</label>
                      <input type="text" name="titleTr" defaultValue={config.profile.titleTr} className="admin-form-input" required />
                    </div>
                    <div className="form-group">
                      <label>Unvan (İngilizce)</label>
                      <input type="text" name="titleEn" defaultValue={config.profile.titleEn} className="admin-form-input" required />
                    </div>
                  </div>

                  <div className="form-row-3">
                    <div className="form-group">
                      <label>Telefon</label>
                      <input type="text" name="phone" defaultValue={config.profile.phone} className="admin-form-input" required />
                    </div>
                    <div className="form-group">
                      <label>Telefon (Ham Veri - Arama İçin)</label>
                      <input type="text" name="phoneRaw" defaultValue={config.profile.phoneRaw} className="admin-form-input" required />
                    </div>
                    <div className="form-group">
                      <label>WhatsApp Numarası (Ülke Kodlu)</label>
                      <input type="text" name="whatsapp" defaultValue={config.profile.whatsapp} className="admin-form-input" required />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>E-posta Adresi</label>
                      <input type="email" name="email" defaultValue={config.profile.email} className="admin-form-input" required />
                    </div>
                    <div className="form-group">
                      <label>Çalışma Saatleri (Türkçe)</label>
                      <input type="text" name="workingHoursTr" defaultValue={config.profile.workingHoursTr} className="admin-form-input" required />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Klinik Adresi (Türkçe)</label>
                      <input type="text" name="addressTr" defaultValue={config.profile.addressTr} className="admin-form-input" required />
                    </div>
                    <div className="form-group">
                      <label>Klinik Adresi (İngilizce)</label>
                      <input type="text" name="addressEn" defaultValue={config.profile.addressEn} className="admin-form-input" required />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Instagram URL</label>
                      <input type="text" name="instagram" defaultValue={config.profile.instagram} className="admin-form-input" />
                    </div>
                    <div className="form-group">
                      <label>Linkedin URL</label>
                      <input type="text" name="linkedin" defaultValue={config.profile.linkedin} className="admin-form-input" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Diyetisyen Biyografisi (Türkçe)</label>
                    <textarea name="bioTr" defaultValue={config.profile.bioTr} className="admin-form-textarea" rows="4" required />
                  </div>
                  <div className="form-group">
                    <label>Diyetisyen Biyografisi (İngilizce)</label>
                    <textarea name="bioEn" defaultValue={config.profile.bioEn} className="admin-form-textarea" rows="4" required />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Vizyon (Türkçe)</label>
                      <textarea name="visionTr" defaultValue={config.profile.visionTr} className="admin-form-textarea" rows="2" required />
                    </div>
                    <div className="form-group">
                      <label>Vizyon (İngilizce)</label>
                      <textarea name="visionEn" defaultValue={config.profile.visionEn} className="admin-form-textarea" rows="2" required />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Misyon (Türkçe)</label>
                      <textarea name="missionTr" defaultValue={config.profile.missionTr} className="admin-form-textarea" rows="2" required />
                    </div>
                    <div className="form-group">
                      <label>Misyon (İngilizce)</label>
                      <textarea name="missionEn" defaultValue={config.profile.missionEn} className="admin-form-textarea" rows="2" required />
                    </div>
                  </div>

                  <button type="submit" className="admin-save-btn">
                    <Save size={16} />
                    <span>Değişiklikleri Kaydet</span>
                  </button>
                </form>
              </div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Diyet Paketleri Yönetimi</h3>
                  <button className="admin-add-item-btn" onClick={() => openEditor('service')}>
                    <Plus size={16} />
                    <span>Yeni Paket Ekle</span>
                  </button>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Paket Adı (TR)</th>
                        <th>Paket Adı (EN)</th>
                        <th>Etiketler</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.services.map((srv, idx) => (
                        <tr key={srv.id}>
                          <td className="bold">{srv.titleTr}</td>
                          <td>{srv.titleEn}</td>
                          <td>
                            <div className="admin-tag-row">
                              {srv.techs.map((t, i) => <span key={i} className="admin-tbl-tag">{t}</span>)}
                            </div>
                          </td>
                          <td>
                            <div className="action-btns">
                              <button className="edit-action" onClick={() => openEditor('service', idx)}><Edit2 size={14} /></button>
                              <button className="delete-action" onClick={() => handleDeleteItem('service', idx)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* DIET RECIPES TAB */}
            {activeTab === 'recipes' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Sağlıklı Diyet Tarifleri</h3>
                  <button className="admin-add-item-btn" onClick={() => openEditor('recipe')}>
                    <Plus size={16} />
                    <span>Yeni Tarif Ekle</span>
                  </button>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Görsel</th>
                        <th>Tarif Adı (TR)</th>
                        <th>Kategori</th>
                        <th>Kalori</th>
                        <th>Süre</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.recipes.map((rcp, idx) => (
                        <tr key={rcp.id}>
                          <td>
                            <img src={rcp.image} alt={rcp.titleTr} className="tbl-img" />
                          </td>
                          <td className="bold">{rcp.titleTr}</td>
                          <td>{rcp.category}</td>
                          <td className="bold text-purple">{rcp.calories} kcal</td>
                          <td>{rcp.prepTime}</td>
                          <td>
                            <div className="action-btns">
                              <button className="edit-action" onClick={() => openEditor('recipe', idx)}><Edit2 size={14} /></button>
                              <button className="delete-action" onClick={() => handleDeleteItem('recipe', idx)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SUCCESS STORIES TAB */}
            {activeTab === 'transformations' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Başarı Hikayeleri (Önce-Sonra)</h3>
                  <button className="admin-add-item-btn" onClick={() => openEditor('transformation')}>
                    <Plus size={16} />
                    <span>Yeni Başarı Ekle</span>
                  </button>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Danışan Adı</th>
                        <th>Verilen/Alınan Kilo</th>
                        <th>Süre</th>
                        <th>Ölçüm İstatistiği (TR)</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.transformations.map((trans, idx) => (
                        <tr key={trans.id}>
                          <td className="bold">{trans.name}</td>
                          <td className="bold text-green">{trans.lostWeight}</td>
                          <td>{trans.durationTr}</td>
                          <td>{trans.statsTr}</td>
                          <td>
                            <div className="action-btns">
                              <button className="edit-action" onClick={() => openEditor('transformation', idx)}><Edit2 size={14} /></button>
                              <button className="delete-action" onClick={() => handleDeleteItem('transformation', idx)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* BLOG TAB */}
            {activeTab === 'blogs' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Sağlıklı Yaşam Makaleleri (Blog)</h3>
                  <button className="admin-add-item-btn" onClick={() => openEditor('blog')}>
                    <Plus size={16} />
                    <span>Yeni Makale Yaz</span>
                  </button>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Başlık (TR)</th>
                        <th>Kategori (TR)</th>
                        <th>Tarih</th>
                        <th>Okuma Süresi</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(config.blogs || []).map((blog, idx) => (
                        <tr key={blog.id}>
                          <td className="bold">{blog.titleTr}</td>
                          <td>{blog.categoryTr}</td>
                          <td>{blog.date}</td>
                          <td>{blog.readTimeTr}</td>
                          <td>
                            <div className="action-btns">
                              <button className="edit-action" onClick={() => openEditor('blog', idx)}><Edit2 size={14} /></button>
                              <button className="delete-action" onClick={() => handleDeleteItem('blog', idx)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* FAQ TAB */}
            {activeTab === 'faqs' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Sıkça Sorulan Sorular</h3>
                  <button className="admin-add-item-btn" onClick={() => openEditor('faq')}>
                    <Plus size={16} />
                    <span>Yeni Soru Ekle</span>
                  </button>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Soru (TR)</th>
                        <th>Soru (EN)</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {config.faqs.map((faq, idx) => (
                        <tr key={faq.id}>
                          <td className="bold">{faq.questionTr}</td>
                          <td>{faq.questionEn}</td>
                          <td>
                            <div className="action-btns">
                              <button className="edit-action" onClick={() => openEditor('faq', idx)}><Edit2 size={14} /></button>
                              <button className="delete-action" onClick={() => handleDeleteItem('faq', idx)}><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CLIENT APPLICATIONS TAB */}
            {activeTab === 'leads' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Danışan Diyet Başvuru Formları</h3>
                  <p>İletişim formu, diyet testi ve chatbot üzerinden gelen tüm başvuruları randevu tarihiyle izleyin.</p>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Adı Soyadı / İletişim</th>
                        <th>Boy/Kilo/Yaş</th>
                        <th>Tercih Edilen Randevu</th>
                        <th>Hedef / Şikayet</th>
                        <th>Durum</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center">Henüz bir danışan başvurusu bulunmamaktadır.</td>
                        </tr>
                      ) : (
                        leads.map((ld) => {
                          let extraDetails = {};
                          try {
                            if (ld.details && ld.details.startsWith('{')) {
                              extraDetails = JSON.parse(ld.details);
                            }
                          } catch(e) {}
                          
                          const age = extraDetails.age || '-';
                          const height = extraDetails.height || '-';
                          const weight = extraDetails.weight || '-';
                          const goal = extraDetails.goal || ld.source || 'Genel';
                          const health = extraDetails.healthProblem || '-';
                          const date = extraDetails.appointmentDate || '-';
                          const time = extraDetails.appointmentTime || '-';

                          const cleanPhone = ld.contact ? ld.contact.replace(/\D/g, '') : '';
                          const waLink = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('90') || cleanPhone.length > 10 ? cleanPhone : '90' + cleanPhone}` : '';

                          return (
                            <React.Fragment key={ld.id}>
                              <tr className={activeDietLead === ld.id ? 'active-lead-row' : ''}>
                                <td>
                                  <div className="lead-contact-info">
                                    <span className="bold">{ld.name}</span>
                                    <span>{ld.contact}</span>
                                  </div>
                                </td>
                                <td>{age} Yaş / {height}cm / {weight}kg</td>
                                <td>
                                  <div className="lead-contact-info">
                                    <span className="bold text-purple">{date}</span>
                                    <span style={{ fontSize: '0.8rem' }}>Saat: {time}</span>
                                  </div>
                                </td>
                                <td>
                                  <div className="lead-goal-info">
                                    <span className="goal-lbl">{goal}</span>
                                    <span className="health-lbl">{health}</span>
                                  </div>
                                </td>
                                <td>
                                  <select 
                                    value={ld.status} 
                                    onChange={(e) => handleLeadStatusChange(ld.id, e.target.value)}
                                    className={`lead-status-select ${ld.status === 'Yeni' ? 'new' : ld.status === 'İşleniyor' ? 'progress' : 'done'}`}
                                  >
                                    <option value="Yeni">Yeni</option>
                                    <option value="İşleniyor">İşleniyor</option>
                                    <option value="Tamamlandı">Tamamlandı</option>
                                  </select>
                                </td>
                                <td>
                                  <div className="action-btns">
                                    <button 
                                      className={`diet-action-btn ${activeDietLead === ld.id ? 'active' : ''}`} 
                                      onClick={() => toggleDietForm(ld.id)} 
                                      title="Diyet Planla"
                                      style={{ background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', border: '1px solid rgba(6, 182, 212, 0.2)', padding: '6px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                    >
                                      <FileText size={14} />
                                    </button>
                                    {waLink && (
                                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="wa-action-btn" title="WhatsApp ile Yazış">
                                        <MessageSquare size={14} />
                                      </a>
                                    )}
                                    <button className="delete-action" onClick={() => handleDeleteLead(ld.id)}><Trash2 size={14} /></button>
                                  </div>
                                </td>
                              </tr>
                              {activeDietLead === ld.id && (
                                <tr className="diet-form-row">
                                  <td colSpan="6">
                                    <div className="diet-writer-box glass-light animate-fade-in" style={{ padding: '20px', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.08)', margin: '10px 0', textAlign: 'left' }}>
                                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-turquoise)', marginBottom: '15px', fontSize: '0.95rem' }}>
                                        <Sparkles size={16} /> <span>{ld.name} için Diyet Menüsü Editörü & İndiricisi</span>
                                      </h4>
                                      <div className="diet-writer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>🌅 Sabah Kahvaltısı</label>
                                          <textarea 
                                            value={dietForm.sabah} 
                                            onChange={(e) => setDietForm(prev => ({...prev, sabah: e.target.value}))} 
                                            placeholder="Yumurtalı kahvaltı detayları..."
                                            className="admin-form-textarea"
                                            rows="3"
                                            style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
                                          />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>☀️ Öğle Yemeği</label>
                                          <textarea 
                                            value={dietForm.ogle} 
                                            onChange={(e) => setDietForm(prev => ({...prev, ogle: e.target.value}))} 
                                            placeholder="Protein / Sebze detayları..."
                                            className="admin-form-textarea"
                                            rows="3"
                                            style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
                                          />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>🌇 Akşam Yemeği</label>
                                          <textarea 
                                            value={dietForm.aksam} 
                                            onChange={(e) => setDietForm(prev => ({...prev, aksam: e.target.value}))} 
                                            placeholder="Hafif akşam yemeği..."
                                            className="admin-form-textarea"
                                            rows="3"
                                            style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
                                          />
                                        </div>
                                        <div className="form-group" style={{ marginBottom: 0 }}>
                                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>🍓 Ara Öğünler</label>
                                          <textarea 
                                            value={dietForm.araOgun} 
                                            onChange={(e) => setDietForm(prev => ({...prev, araOgun: e.target.value}))} 
                                            placeholder="Kuruyemiş / Meyve..."
                                            className="admin-form-textarea"
                                            rows="3"
                                            style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
                                          />
                                        </div>
                                      </div>
                                      <div className="diet-writer-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'flex-end' }}>
                                        <button 
                                          type="button" 
                                          className="system-btn flex-center" 
                                          style={{ background: 'var(--accent-purple)', color: '#fff', fontSize: '0.8rem', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', border: 'none', gap: '6px' }}
                                          onClick={() => sendDietViaWhatsApp(ld)}
                                        >
                                          <MessageSquare size={14} /> <span>WhatsApp\'a Gönder</span>
                                        </button>
                                        <button 
                                          type="button" 
                                          className="system-btn flex-center" 
                                          style={{ background: '#06b6d4', color: '#fff', fontSize: '0.8rem', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', border: 'none', gap: '6px' }}
                                          onClick={() => printDietList(ld)}
                                        >
                                          <FileText size={14} /> <span>PDF / Çıktı Al</span>
                                        </button>
                                        <button 
                                          type="button" 
                                          className="system-btn flex-center" 
                                          style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '0.8rem', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', border: 'none' }}
                                          onClick={() => setActiveDietLead(null)}
                                        >
                                          İptal
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* PAYMENTS & FINANCE TAB */}
            {activeTab === 'payments' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Danışan Ödeme & Gelir Takip Tablosu</h3>
                  <p>Danışanlardan alınan paket ücretlerini, tahsilat durumlarını ve toplam ciroları canlı izleyin.</p>
                </div>

                <div className="results-grid-mini" style={{ marginBottom: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  <div className="stat-card glass-light">
                    <span className="stat-num text-gradient" style={{ color: '#4ade80', fontSize: '1.6rem' }}>{totalIncome} ₺</span>
                    <span className="stat-lbl">{lang === 'tr' ? 'Toplam Ciro (Alınan)' : 'Total Received'}</span>
                  </div>
                  <div className="stat-card glass-light highlight-glow" style={{ borderColor: 'rgba(251,146,60,0.3)' }}>
                    <span className="stat-num" style={{ color: '#fb923c', fontSize: '1.6rem' }}>{pendingIncome} ₺</span>
                    <span className="stat-lbl">{lang === 'tr' ? 'Bekleyen Toplam Alacak' : 'Total Pending'}</span>
                  </div>
                  <div className="stat-card glass-light">
                    <span className="stat-num" style={{ color: '#06b6d4', fontSize: '1.6rem' }}>{leads.length}</span>
                    <span className="stat-lbl">{lang === 'tr' ? 'Toplam Başvuru Sayısı' : 'Total Clients'}</span>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Danışan Adı</th>
                        <th>Kategori / Paket</th>
                        <th>İletişim</th>
                        <th>Paket Ücreti (₺)</th>
                        <th>Ödeme Durumu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center">Kayıtlı danışan bulunmamaktadır.</td>
                        </tr>
                      ) : (
                        leads.map((ld) => (
                          <tr key={ld.id}>
                            <td className="bold">{ld.name}</td>
                            <td><span className="goal-lbl">{ld.source || 'Diyet Programı'}</span></td>
                            <td>{ld.contact}</td>
                            <td>
                              <input 
                                type="number" 
                                value={ld.price || ''} 
                                onChange={(e) => handleLeadPriceChange(ld.id, e.target.value)}
                                placeholder="0 ₺"
                                className="admin-form-input"
                                style={{ width: '100px', padding: '6px', textAlign: 'center', fontSize: '0.85rem' }}
                              />
                            </td>
                            <td>
                              <select
                                value={ld.paymentStatus || 'Bekliyor'}
                                onChange={(e) => handleLeadPaymentStatusChange(ld.id, e.target.value)}
                                className={`lead-status-select ${ld.paymentStatus === 'Ödendi' ? 'done' : 'new'}`}
                                style={{ width: '120px', padding: '6px' }}
                              >
                                <option value="Bekliyor">Bekliyor</option>
                                <option value="Ödenmedi">Ödenmedi</option>
                                <option value="Ödendi">Ödendi</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SYSTEM SETTINGS TAB */}
            {activeTab === 'system' && (
              <div className="admin-tab-content">
                <div className="tab-title-row">
                  <h3>Sistem ve Fabrika Ayarları</h3>
                  <p>SUDA-DİYETİSYEN platformuna ait veri sıfırlama ve oturum sonlandırma ayarları.</p>
                </div>

                <div className="system-actions-box">
                  <div className="system-action-card glass-light">
                    <div>
                      <h4>Tüm Verileri Fabrika Ayarlarına Sıfırla</h4>
                      <p>Bu işlem yaptığınız tüm profil güncellemelerini, eklediğiniz sağlıklı tarifleri ve başarı hikayelerini kalıcı olarak siler ve varsayılan Zehra Abacı verilerine geri döndürür.</p>
                    </div>
                    <button className="system-btn danger" onClick={handleResetDefaults}>
                      <RefreshCw size={16} />
                      <span>Varsayılana Sıfırla</span>
                    </button>
                  </div>

                  <div className="system-action-card glass-light">
                    <div>
                      <h4>Yönetici Oturumunu Kapat</h4>
                      <p>Bu tarayıcıdaki yönetici oturumunu sonlandırır ve siteyi ziyaretçi moduna geçirir.</p>
                    </div>
                    <button className="system-btn" onClick={() => {
                      sessionStorage.removeItem('suda_admin');
                      window.location.reload();
                    }}>
                      <LogOut size={16} />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>

        {/* EDITOR POPUP MODAL */}
        {editorOpen && (
          <div className="editor-overlay active">
            <form className="editor-popup-content glass animate-scale-up" onSubmit={handleEditorSubmit}>
              <div className="editor-popup-header">
                <h4>
                  {editorIndex !== null ? 'Ögeyi Düzenle' : 'Yeni Öge Ekle'} ({
                    editorType === 'service' ? 'Diyet Paketi' :
                    editorType === 'recipe' ? 'Diyet Tarifi' :
                    editorType === 'transformation' ? 'Başarı Hikayesi' :
                    editorType === 'blog' ? 'Blog Makalesi' : 'SSS Soru'
                  })
                </h4>
                <button type="button" className="close-btn-mini" onClick={() => setEditorOpen(false)}><X size={16} /></button>
              </div>

              <div className="editor-popup-body" style={{ maxHeight: '60vh', overflowY: 'auto', padding: '20px' }}>
                {/* 1. SERVICES FIELDS */}
                {editorType === 'service' && (
                  <>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Diyet Paket Adı (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.titleTr} 
                          onChange={(e) => handleEditorFieldChange('titleTr', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Diyet Paket Adı (EN)</label>
                        <input 
                          type="text" 
                          value={formFields.titleEn} 
                          onChange={(e) => handleEditorFieldChange('titleEn', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Kısa Açıklama (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.shortDescTr} 
                          onChange={(e) => handleEditorFieldChange('shortDescTr', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Kısa Açıklama (EN)</label>
                        <input 
                          type="text" 
                          value={formFields.shortDescEn} 
                          onChange={(e) => handleEditorFieldChange('shortDescEn', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>İkon Adı (Lucide)</label>
                        <input 
                          type="text" 
                          value={formFields.icon} 
                          onChange={(e) => handleEditorFieldChange('icon', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="Globe, Activity, Zap, Users vb."
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Etiketler (Virgülle Ayırın)</label>
                        <input 
                          type="text" 
                          value={formFields.techs} 
                          onChange={(e) => handleEditorFieldChange('techs', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="Yağ Yakımı, Kişiye Özel..."
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Detaylı Paket Açıklaması (TR)</label>
                      <textarea 
                        value={formFields.fullDescTr} 
                        onChange={(e) => handleEditorFieldChange('fullDescTr', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="3" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Detaylı Paket Açıklaması (EN)</label>
                      <textarea 
                        value={formFields.fullDescEn} 
                        onChange={(e) => handleEditorFieldChange('fullDescEn', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="3" 
                        required 
                      />
                    </div>
                  </>
                )}

                {/* 2. RECIPES FIELDS */}
                {editorType === 'recipe' && (
                  <>
                    <div className="form-row-3">
                      <div className="form-group">
                        <label>Tarif Adı (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.titleTr} 
                          onChange={(e) => handleEditorFieldChange('titleTr', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Tarif Adı (EN)</label>
                        <input 
                          type="text" 
                          value={formFields.titleEn} 
                          onChange={(e) => handleEditorFieldChange('titleEn', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Kategori (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.category} 
                          onChange={(e) => handleEditorFieldChange('category', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="Atıştırmalık, Kahvaltı..."
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-3">
                      <div className="form-group">
                        <label>Kategori (EN)</label>
                        <input 
                          type="text" 
                          value={formFields.categoryEn} 
                          onChange={(e) => handleEditorFieldChange('categoryEn', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="Snack, Breakfast..."
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Hazırlama Süresi (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.prepTime} 
                          onChange={(e) => handleEditorFieldChange('prepTime', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="15 Dk"
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Hazırlama Süresi (EN)</label>
                        <input 
                          type="text" 
                          value={formFields.prepTimeEn} 
                          onChange={(e) => handleEditorFieldChange('prepTimeEn', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="15 Mins"
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Kalori (kcal)</label>
                        <input 
                          type="number" 
                          value={formFields.calories} 
                          onChange={(e) => handleEditorFieldChange('calories', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Görsel URL</label>
                        <input 
                          type="text" 
                          value={formFields.image} 
                          onChange={(e) => handleEditorFieldChange('image', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Malzemeler (Türkçe)</label>
                      <textarea 
                        value={formFields.ingredientsTr} 
                        onChange={(e) => handleEditorFieldChange('ingredientsTr', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="2" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Malzemeler (İngilizce)</label>
                      <textarea 
                        value={formFields.ingredientsEn} 
                        onChange={(e) => handleEditorFieldChange('ingredientsEn', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="2" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Hazırlanışı (Türkçe)</label>
                      <textarea 
                        value={formFields.instructionsTr} 
                        onChange={(e) => handleEditorFieldChange('instructionsTr', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="3" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Hazırlanışı (İngilizce)</label>
                      <textarea 
                        value={formFields.instructionsEn} 
                        onChange={(e) => handleEditorFieldChange('instructionsEn', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="3" 
                        required 
                      />
                    </div>
                  </>
                )}

                {/* 3. TRANSFORMATIONS FIELDS */}
                {editorType === 'transformation' && (
                  <>
                    <div className="form-row-3">
                      <div className="form-group">
                        <label>Danışan Adı Soyadı</label>
                        <input 
                          type="text" 
                          value={formFields.name} 
                          onChange={(e) => handleEditorFieldChange('name', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="Ahmet Y."
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Verilen/Alınan Kilo</label>
                        <input 
                          type="text" 
                          value={formFields.lostWeight} 
                          onChange={(e) => handleEditorFieldChange('lostWeight', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="-15 kg"
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Süre (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.durationTr} 
                          onChange={(e) => handleEditorFieldChange('durationTr', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="3 Ayda"
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Kilo Verim İstatistiği (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.statsTr} 
                          onChange={(e) => handleEditorFieldChange('statsTr', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="Yağ Oranı: %32 -> %20"
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Kilo Verim İstatistiği (EN)</label>
                        <input 
                          type="text" 
                          value={formFields.statsEn} 
                          onChange={(e) => handleEditorFieldChange('statsEn', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="Fat Ratio: 32% -> 20%"
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Danışan Yorumu (Türkçe)</label>
                      <textarea 
                        value={formFields.commentTr} 
                        onChange={(e) => handleEditorFieldChange('commentTr', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="3" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Danışan Yorumu (İngilizce)</label>
                      <textarea 
                        value={formFields.commentEn} 
                        onChange={(e) => handleEditorFieldChange('commentEn', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="3" 
                        required 
                      />
                    </div>
                  </>
                )}

                {/* 4. FAQS FIELDS */}
                {editorType === 'faq' && (
                  <>
                    <div className="form-group">
                      <label>Soru (Türkçe)</label>
                      <input 
                        type="text" 
                        value={formFields.questionTr} 
                        onChange={(e) => handleEditorFieldChange('questionTr', e.target.value)} 
                        className="admin-form-input" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Soru (İngilizce)</label>
                      <input 
                        type="text" 
                        value={formFields.questionEn} 
                        onChange={(e) => handleEditorFieldChange('questionEn', e.target.value)} 
                        className="admin-form-input" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Cevap (Türkçe)</label>
                      <textarea 
                        value={formFields.answerTr} 
                        onChange={(e) => handleEditorFieldChange('answerTr', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="4" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>Cevap (İngilizce)</label>
                      <textarea 
                        value={formFields.answerEn} 
                        onChange={(e) => handleEditorFieldChange('answerEn', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="4" 
                        required 
                      />
                    </div>
                  </>
                )}

                {/* 5. BLOG FIELDS */}
                {editorType === 'blog' && (
                  <>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Başlık (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.titleTr || ''} 
                          onChange={(e) => handleEditorFieldChange('titleTr', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Başlık (EN)</label>
                        <input 
                          type="text" 
                          value={formFields.titleEn || ''} 
                          onChange={(e) => handleEditorFieldChange('titleEn', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-3">
                      <div className="form-group">
                        <label>Kategori (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.categoryTr || ''} 
                          onChange={(e) => handleEditorFieldChange('categoryTr', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Kategori (EN)</label>
                        <input 
                          type="text" 
                          value={formFields.categoryEn || ''} 
                          onChange={(e) => handleEditorFieldChange('categoryEn', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Okuma Süresi (TR)</label>
                        <input 
                          type="text" 
                          value={formFields.readTimeTr || ''} 
                          onChange={(e) => handleEditorFieldChange('readTimeTr', e.target.value)} 
                          className="admin-form-input" 
                          placeholder="5 Dk Okuma"
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Görsel URL</label>
                        <input 
                          type="text" 
                          value={formFields.image || ''} 
                          onChange={(e) => handleEditorFieldChange('image', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Tarih</label>
                        <input 
                          type="text" 
                          value={formFields.date || ''} 
                          onChange={(e) => handleEditorFieldChange('date', e.target.value)} 
                          className="admin-form-input" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Özet (TR)</label>
                        <textarea 
                          value={formFields.summaryTr || ''} 
                          onChange={(e) => handleEditorFieldChange('summaryTr', e.target.value)} 
                          className="admin-form-textarea" 
                          rows="2" 
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Özet (EN)</label>
                        <textarea 
                          value={formFields.summaryEn || ''} 
                          onChange={(e) => handleEditorFieldChange('summaryEn', e.target.value)} 
                          className="admin-form-textarea" 
                          rows="2" 
                          required 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>İçerik (TR)</label>
                      <textarea 
                        value={formFields.contentTr || ''} 
                        onChange={(e) => handleEditorFieldChange('contentTr', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="5" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>İçerik (EN)</label>
                      <textarea 
                        value={formFields.contentEn || ''} 
                        onChange={(e) => handleEditorFieldChange('contentEn', e.target.value)} 
                        className="admin-form-textarea" 
                        rows="5" 
                        required 
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="editor-popup-actions">
                <button type="button" className="editor-cancel" onClick={() => setEditorOpen(false)}>İptal</button>
                <button type="submit" className="editor-save"><Save size={16} />Kaydet</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

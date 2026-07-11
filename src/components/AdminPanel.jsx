import React, { useState, useEffect } from 'react';
import { 
  X, Lock, User, ShieldAlert, Sparkles, LogIn, Settings, Cpu, 
  Calendar, Users, FolderOpen, Phone, Plus, Trash2, Edit2, 
  Save, RotateCcw, HelpCircle, Activity 
} from 'lucide-react';
import './AdminPanel.css';

const AdminPanel = ({ 
  isOpen, onClose, onLoginSuccess, t, isAdmin, 
  allTranslations, setAllTranslations, setProjectsVersion 
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState('general');
  const [localTr, setLocalTr] = useState({});
  const [localEn, setLocalEn] = useState({});
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Showcase projects local state
  const [localProjects, setLocalProjects] = useState([]);
  
  // List CRUD item modals state
  const [editingItem, setEditingItem] = useState(null); // { type: 'service|step|member|project', index: number|null }

  // Sync state with parent translations state when modal opens
  useEffect(() => {
    if (isOpen && allTranslations) {
      setLocalTr(JSON.parse(JSON.stringify(allTranslations.tr || {})));
      setLocalEn(JSON.parse(JSON.stringify(allTranslations.en || {})));
      
      const storedProjects = localStorage.getItem('suda_showcase_projects');
      if (storedProjects) {
        try {
          setLocalProjects(JSON.parse(storedProjects));
        } catch (e) {
          setLocalProjects([]);
        }
      }
      const storedKey = localStorage.getItem('suda_gemini_api_key');
      setGeminiApiKey(storedKey || '');
    }
  }, [isOpen, allTranslations]);

  const handleSubmitLogin = (e) => {
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
    setEditingItem(null);
    onClose();
  };

  if (!isOpen) return null;

  // Global Save translations helper
  const saveTranslations = (updatedTr, updatedEn) => {
    const updated = {
      tr: updatedTr || localTr,
      en: updatedEn || localEn
    };
    setLocalTr(updated.tr);
    setLocalEn(updated.en);
    setAllTranslations(updated);
    localStorage.setItem('suda_translations', JSON.stringify(updated));
  };

  // Reset to static default translations
  const handleResetDefaults = () => {
    if (window.confirm('Tüm site ayarlarını varsayılana sıfırlamak istediğinize emin misiniz?')) {
      localStorage.removeItem('suda_translations');
      localStorage.removeItem('suda_showcase_projects');
      
      // Reload page to reinitialize all defaults
      window.location.reload();
    }
  };

  // Save General/Hero inputs
  const handleSaveGeneral = (e) => {
    e.preventDefault();
    saveTranslations(localTr, localEn);
    alert('Genel içerikler başarıyla kaydedildi!');
  };

  // Save Contacts & Stats inputs
  const handleSaveContactsStats = (e) => {
    e.preventDefault();
    saveTranslations(localTr, localEn);
    localStorage.setItem('suda_gemini_api_key', geminiApiKey);
    alert('İletişim, İstatistik ve Yapay Zeka bilgileri başarıyla kaydedildi!');
  };

  // Lists CRUD operations helper
  const openItemModal = (type, index = null) => {
    let initialData = {};
    
    if (type === 'service') {
      if (index !== null) {
        const itemTr = localTr.servicesData[index];
        const itemEn = localEn.servicesData[index];
        initialData = {
          id: itemTr.id,
          icon: itemTr.icon || 'Cpu',
          titleTr: itemTr.title,
          titleEn: itemEn.title,
          shortDescTr: itemTr.shortDesc,
          shortDescEn: itemEn.shortDesc,
          fullDescTr: itemTr.fullDesc,
          fullDescEn: itemEn.fullDesc,
          techs: itemTr.techs ? itemTr.techs.join(', ') : ''
        };
      } else {
        initialData = {
          id: 'service_' + Date.now(),
          icon: 'Cpu',
          titleTr: '',
          titleEn: '',
          shortDescTr: '',
          shortDescEn: '',
          fullDescTr: '',
          fullDescEn: '',
          techs: ''
        };
      }
    } else if (type === 'step') {
      if (index !== null) {
        const itemTr = localTr.workflowSteps[index];
        const itemEn = localEn.workflowSteps[index];
        initialData = {
          titleTr: itemTr.title,
          titleEn: itemEn.title,
          descTr: itemTr.desc,
          descEn: itemEn.desc,
          timeTr: itemTr.time,
          timeEn: itemEn.time
        };
      } else {
        initialData = {
          titleTr: '',
          titleEn: '',
          descTr: '',
          descEn: '',
          timeTr: '',
          timeEn: ''
        };
      }
    } else if (type === 'member') {
      if (index !== null) {
        const itemTr = localTr.teamData[index];
        const itemEn = localEn.teamData[index];
        initialData = {
          name: itemTr.name,
          roleTr: itemTr.role,
          roleEn: itemEn.role,
          bioTr: itemTr.bio,
          bioEn: itemEn.bio,
          linkedin: itemTr.social?.linkedin || '#',
          github: itemTr.social?.github || '#'
        };
      } else {
        initialData = {
          name: '',
          roleTr: '',
          roleEn: '',
          bioTr: '',
          bioEn: '',
          linkedin: '#',
          github: '#'
        };
      }
    } else if (type === 'project') {
      if (index !== null) {
        const item = localProjects[index];
        initialData = {
          id: item.id,
          titleTr: item.titleTr,
          titleEn: item.titleEn,
          descTr: item.descTr,
          descEn: item.descEn,
          category: item.category || 'web',
          techs: item.techs ? item.techs.join(', ') : '',
          link: item.link || ''
        };
      } else {
        initialData = {
          id: Date.now(),
          titleTr: '',
          titleEn: '',
          descTr: '',
          descEn: '',
          category: 'web',
          techs: '',
          link: ''
        };
      }
    } else if (type === 'testimonial') {
      if (index !== null) {
        const itemTr = localTr.testimonialsData[index];
        const itemEn = localEn.testimonialsData[index];
        initialData = {
          id: itemTr.id,
          name: itemTr.name,
          stars: itemTr.stars || 5,
          roleTr: itemTr.role,
          roleEn: itemEn.role,
          companyTr: itemTr.company,
          companyEn: itemEn.company,
          quoteTr: itemTr.quote,
          quoteEn: itemEn.quote
        };
      } else {
        initialData = {
          id: Date.now(),
          name: '',
          stars: 5,
          roleTr: '',
          roleEn: '',
          companyTr: '',
          companyEn: '',
          quoteTr: '',
          quoteEn: ''
        };
      }
    }

    setEditingItem({ type, index, data: initialData });
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const { type, index, data } = editingItem;

    if (type === 'service') {
      const updatedTr = { ...localTr };
      const updatedEn = { ...localEn };
      
      const techArray = data.techs 
        ? data.techs.split(',').map(t => t.trim()).filter(t => t.length > 0)
        : [];
      
      const serviceTr = {
        id: data.id,
        icon: data.icon,
        title: data.titleTr,
        shortDesc: data.shortDescTr,
        fullDesc: data.fullDescTr,
        techs: techArray
      };

      const serviceEn = {
        id: data.id,
        icon: data.icon,
        title: data.titleEn,
        shortDesc: data.shortDescEn,
        fullDesc: data.fullDescEn,
        techs: techArray
      };

      if (index !== null) {
        updatedTr.servicesData[index] = serviceTr;
        updatedEn.servicesData[index] = serviceEn;
      } else {
        updatedTr.servicesData.push(serviceTr);
        updatedEn.servicesData.push(serviceEn);
      }
      
      saveTranslations(updatedTr, updatedEn);

    } else if (type === 'step') {
      const updatedTr = { ...localTr };
      const updatedEn = { ...localEn };

      const stepTr = {
        title: data.titleTr,
        desc: data.descTr,
        time: data.timeTr
      };

      const stepEn = {
        title: data.titleEn,
        desc: data.descEn,
        time: data.timeEn
      };

      if (index !== null) {
        updatedTr.workflowSteps[index] = stepTr;
        updatedEn.workflowSteps[index] = stepEn;
      } else {
        updatedTr.workflowSteps.push(stepTr);
        updatedEn.workflowSteps.push(stepEn);
      }

      saveTranslations(updatedTr, updatedEn);

    } else if (type === 'member') {
      const updatedTr = { ...localTr };
      const updatedEn = { ...localEn };

      const memberTr = {
        name: data.name,
        role: data.roleTr,
        bio: data.bioTr,
        social: { linkedin: data.linkedin, github: data.github }
      };

      const memberEn = {
        name: data.name,
        role: data.roleEn,
        bio: data.bioEn,
        social: { linkedin: data.linkedin, github: data.github }
      };

      if (index !== null) {
        updatedTr.teamData[index] = memberTr;
        updatedEn.teamData[index] = memberEn;
      } else {
        updatedTr.teamData.push(memberTr);
        updatedEn.teamData.push(memberEn);
      }

      saveTranslations(updatedTr, updatedEn);

    } else if (type === 'project') {
      const techArray = data.techs 
        ? data.techs.split(',').map(t => t.trim()).filter(t => t.length > 0)
        : [];
      
      const newProj = {
        id: data.id,
        titleTr: data.titleTr,
        titleEn: data.titleEn,
        descTr: data.descTr,
        descEn: data.descEn,
        category: data.category,
        techs: techArray,
        link: data.link || '#'
      };

      let updatedProjects = [...localProjects];
      if (index !== null) {
        updatedProjects[index] = newProj;
      } else {
        updatedProjects.push(newProj);
      }

      setLocalProjects(updatedProjects);
      localStorage.setItem('suda_showcase_projects', JSON.stringify(updatedProjects));
      setProjectsVersion(prev => prev + 1);
    } else if (type === 'testimonial') {
      const updatedTr = { ...localTr };
      const updatedEn = { ...localEn };

      const testimonialTr = {
        id: data.id,
        name: data.name,
        stars: parseInt(data.stars) || 5,
        role: data.roleTr,
        company: data.companyTr,
        quote: data.quoteTr
      };

      const testimonialEn = {
        id: data.id,
        name: data.name,
        stars: parseInt(data.stars) || 5,
        role: data.roleEn,
        company: data.companyEn,
        quote: data.quoteEn
      };

      if (index !== null) {
        updatedTr.testimonialsData[index] = testimonialTr;
        updatedEn.testimonialsData[index] = testimonialEn;
      } else {
        if (!updatedTr.testimonialsData) updatedTr.testimonialsData = [];
        if (!updatedEn.testimonialsData) updatedEn.testimonialsData = [];
        updatedTr.testimonialsData.push(testimonialTr);
        updatedEn.testimonialsData.push(testimonialEn);
      }

      saveTranslations(updatedTr, updatedEn);
    }

    setEditingItem(null);
  };

  const handleDeleteItem = (type, index) => {
    if (!window.confirm('Bu ögeyi silmek istediğinize emin misiniz?')) return;

    if (type === 'service') {
      const updatedTr = { ...localTr };
      const updatedEn = { ...localEn };
      updatedTr.servicesData.splice(index, 1);
      updatedEn.servicesData.splice(index, 1);
      saveTranslations(updatedTr, updatedEn);

    } else if (type === 'step') {
      const updatedTr = { ...localTr };
      const updatedEn = { ...localEn };
      updatedTr.workflowSteps.splice(index, 1);
      updatedEn.workflowSteps.splice(index, 1);
      saveTranslations(updatedTr, updatedEn);

    } else if (type === 'member') {
      const updatedTr = { ...localTr };
      const updatedEn = { ...localEn };
      updatedTr.teamData.splice(index, 1);
      updatedEn.teamData.splice(index, 1);
      saveTranslations(updatedTr, updatedEn);

    } else if (type === 'project') {
      const updatedProjects = [...localProjects];
      updatedProjects.splice(index, 1);
      setLocalProjects(updatedProjects);
      localStorage.setItem('suda_showcase_projects', JSON.stringify(updatedProjects));
      setProjectsVersion(prev => prev + 1);
    } else if (type === 'testimonial') {
      const updatedTr = { ...localTr };
      const updatedEn = { ...localEn };
      updatedTr.testimonialsData.splice(index, 1);
      updatedEn.testimonialsData.splice(index, 1);
      saveTranslations(updatedTr, updatedEn);
    }
  };

  // Render Login Modal if not logged in
  if (!isAdmin) {
    return (
      <div className="modal-overlay active" onClick={handleClose}>
        <div 
          className="modal-content admin-login-modal glass" 
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={handleClose} aria-label="Kapat">
            <X size={20} />
          </button>
          <div className="admin-login-header">
            <div className="admin-login-logo-box">
              <Lock size={26} />
            </div>
            <h3 className="admin-login-title">{t.adminTitle}</h3>
            <p className="admin-login-subtitle">Yönetici kimlik bilgileri ile giriş yapın.</p>
          </div>

          <form onSubmit={handleSubmitLogin} className="admin-login-form">
            {error && (
              <div className="admin-error-msg">
                <ShieldAlert size={16} />
                <span>{t.adminError}</span>
              </div>
            )}
            <div className="admin-input-group">
              <label className="admin-input-label" htmlFor="admin-username">{t.adminUsername}</label>
              <div className="admin-input-wrapper">
                <User size={18} className="admin-input-icon" />
                <input
                  id="admin-username"
                  type="text"
                  className="admin-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="SUDA"
                  autoComplete="username"
                  required
                />
              </div>
            </div>
            <div className="admin-input-group">
              <label className="admin-input-label" htmlFor="admin-password">{t.adminPassword}</label>
              <div className="admin-input-wrapper">
                <Lock size={18} className="admin-input-icon" />
                <input
                  id="admin-password"
                  type="password"
                  className="admin-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            <div className="admin-login-actions">
              <button type="submit" className="btn-admin-submit">
                <LogIn size={18} />
                <span>{t.adminLoginSubmit}</span>
              </button>
              <button type="button" className="btn-admin-cancel" onClick={handleClose}>
                {t.adminCancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render full dashboard if logged in
  return (
    <div className="modal-overlay active" onClick={handleClose}>
      <div 
        className="modal-content admin-dashboard-modal glass" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={handleClose} aria-label="Kapat">
          <X size={20} />
        </button>

        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <div className="admin-login-logo-box small">
              <Settings size={20} />
            </div>
            <div>
              <h3 className="dashboard-title">Yönetici Kontrol Paneli</h3>
              <p className="dashboard-subtitle">Sitedeki tüm bölümleri, yazıları ve ögeleri gerçek zamanlı yönetin.</p>
            </div>
          </div>
          <div className="dashboard-header-actions">
            <button className="btn-dashboard-reset" onClick={handleResetDefaults} title="Varsayılana Sıfırla">
              <RotateCcw size={15} />
              <span>Sıfırla</span>
            </button>
            <button className="btn-dashboard-close" onClick={handleClose}>
              Kapat
            </button>
          </div>
        </div>

        {/* Dashboard Grid Container */}
        <div className="dashboard-layout">
          {/* Sidebar Tabs */}
          <aside className="dashboard-sidebar">
            <button 
              className={`sidebar-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              <Sparkles size={16} />
              <span>Genel / Hero</span>
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <Cpu size={16} />
              <span>Hizmetlerimiz</span>
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === 'workflow' ? 'active' : ''}`}
              onClick={() => setActiveTab('workflow')}
            >
              <Calendar size={16} />
              <span>Sürecimiz</span>
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              <Users size={16} />
              <span>Ekibimiz</span>
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === 'showcase' ? 'active' : ''}`}
              onClick={() => setActiveTab('showcase')}
            >
              <FolderOpen size={16} />
              <span>Vitrin Projeleri</span>
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => setActiveTab('contacts')}
            >
              <Phone size={16} />
              <span>İletişim & Sayılar</span>
            </button>
            <button 
              className={`sidebar-tab-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
              onClick={() => setActiveTab('testimonials')}
            >
              <Sparkles size={16} />
              <span>Müşteri Yorumları</span>
            </button>
          </aside>

          {/* Main Form Content */}
          <div className="dashboard-main-content">
            
            {/* TAB 1: GENERAL & HERO */}
            {activeTab === 'general' && (
              <form onSubmit={handleSaveGeneral} className="tab-form">
                <h4 className="tab-title-heading">Hero ve Genel Tanıtım Bölümü</h4>
                
                <div className="form-translation-grid">
                  {/* Turkish inputs */}
                  <div className="lang-col">
                    <span className="lang-indicator">Türkçe</span>
                    
                    <div className="form-field">
                      <label>Hero Başlık Öneki</label>
                      <input 
                        type="text" 
                        value={localTr.heroTitlePrefix || ''} 
                        onChange={e => setLocalTr({...localTr, heroTitlePrefix: e.target.value})} 
                      />
                    </div>
                    
                    <div className="form-field">
                      <label>Hero Başlık Vurgusu</label>
                      <input 
                        type="text" 
                        value={localTr.heroTitleHighlight || ''} 
                        onChange={e => setLocalTr({...localTr, heroTitleHighlight: e.target.value})} 
                      />
                    </div>
                    
                    <div className="form-field">
                      <label>Hero Alt Başlık</label>
                      <textarea 
                        rows="4"
                        value={localTr.heroSubtitle || ''} 
                        onChange={e => setLocalTr({...localTr, heroSubtitle: e.target.value})} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Ana Buton Metni (İletişim)</label>
                      <input 
                        type="text" 
                        value={localTr.heroCTA1 || ''} 
                        onChange={e => setLocalTr({...localTr, heroCTA1: e.target.value})} 
                      />
                    </div>

                    <div className="form-field">
                      <label>İkincil Buton Metni (Hizmetler)</label>
                      <input 
                        type="text" 
                        value={localTr.heroCTA2 || ''} 
                        onChange={e => setLocalTr({...localTr, heroCTA2: e.target.value})} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Footer Açıklaması</label>
                      <textarea 
                        rows="3"
                        value={localTr.footerText || ''} 
                        onChange={e => setLocalTr({...localTr, footerText: e.target.value})} 
                      />
                    </div>
                  </div>

                  {/* English inputs */}
                  <div className="lang-col">
                    <span className="lang-indicator">English</span>
                    
                    <div className="form-field">
                      <label>Hero Title Prefix</label>
                      <input 
                        type="text" 
                        value={localEn.heroTitlePrefix || ''} 
                        onChange={e => setLocalEn({...localEn, heroTitlePrefix: e.target.value})} 
                      />
                    </div>
                    
                    <div className="form-field">
                      <label>Hero Title Highlight</label>
                      <input 
                        type="text" 
                        value={localEn.heroTitleHighlight || ''} 
                        onChange={e => setLocalEn({...localEn, heroTitleHighlight: e.target.value})} 
                      />
                    </div>
                    
                    <div className="form-field">
                      <label>Hero Subtitle</label>
                      <textarea 
                        rows="4"
                        value={localEn.heroSubtitle || ''} 
                        onChange={e => setLocalEn({...localEn, heroSubtitle: e.target.value})} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Primary CTA Text (Contact)</label>
                      <input 
                        type="text" 
                        value={localEn.heroCTA1 || ''} 
                        onChange={e => setLocalEn({...localEn, heroCTA1: e.target.value})} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Secondary CTA Text (Services)</label>
                      <input 
                        type="text" 
                        value={localEn.heroCTA2 || ''} 
                        onChange={e => setLocalEn({...localEn, heroCTA2: e.target.value})} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Footer Description</label>
                      <textarea 
                        rows="3"
                        value={localEn.footerText || ''} 
                        onChange={e => setLocalEn({...localEn, footerText: e.target.value})} 
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions-bar">
                  <button type="submit" className="btn-save-form">
                    <Save size={16} />
                    <span>Değişiklikleri Kaydet</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: SERVICES */}
            {activeTab === 'services' && (
              <div className="tab-list-view">
                <div className="tab-list-header">
                  <h4 className="tab-title-heading">Hizmetlerimiz ({localTr.servicesData?.length || 0})</h4>
                  <button className="btn-add-item" type="button" onClick={() => openItemModal('service')}>
                    <Plus size={16} />
                    <span>Yeni Hizmet Ekle</span>
                  </button>
                </div>

                <div className="crud-items-grid">
                  {localTr.servicesData?.map((service, idx) => (
                    <div key={service.id} className="crud-item-card glass">
                      <div className="crud-card-info">
                        <span className="crud-card-badge">{service.icon}</span>
                        <div>
                          <h5 className="crud-card-name">{service.title}</h5>
                          <p className="crud-card-sub">{service.shortDesc}</p>
                        </div>
                      </div>
                      <div className="crud-card-actions">
                        <button className="btn-crud-edit" type="button" onClick={() => openItemModal('service', idx)}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-crud-delete" type="button" onClick={() => handleDeleteItem('service', idx)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: WORKFLOW */}
            {activeTab === 'workflow' && (
              <div className="tab-list-view">
                <div className="workflow-whyus-editor card glass" style={{ padding: '20px', marginBottom: '30px' }}>
                  <h5 className="sub-section-title" style={{ marginBottom: '15px', color: 'var(--accent-purple)' }}>Değerlerimiz (Neden Biz?)</h5>
                  <div className="form-translation-grid">
                    <div className="lang-col">
                      <span className="lang-indicator">Türkçe</span>
                      <div className="form-field">
                        <label>Bölüm Başlığı</label>
                        <input type="text" value={localTr.whyUsTitle || ''} onChange={e => saveTranslations({...localTr, whyUsTitle: e.target.value}, localEn)} />
                      </div>
                      <div className="form-field">
                        <label>Bölüm Açıklaması</label>
                        <input type="text" value={localTr.whyUsSubtitle || ''} onChange={e => saveTranslations({...localTr, whyUsSubtitle: e.target.value}, localEn)} />
                      </div>
                    </div>
                    <div className="lang-col">
                      <span className="lang-indicator">English</span>
                      <div className="form-field">
                        <label>Section Title</label>
                        <input type="text" value={localEn.whyUsTitle || ''} onChange={e => saveTranslations(localTr, {...localEn, whyUsTitle: e.target.value})} />
                      </div>
                      <div className="form-field">
                        <label>Section Subtitle</label>
                        <input type="text" value={localEn.whyUsSubtitle || ''} onChange={e => saveTranslations(localTr, {...localEn, whyUsSubtitle: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-list-header">
                  <h4 className="tab-title-heading">Çalışma Süreci Adımları ({localTr.workflowSteps?.length || 0})</h4>
                  <button className="btn-add-item" type="button" onClick={() => openItemModal('step')}>
                    <Plus size={16} />
                    <span>Yeni Adım Ekle</span>
                  </button>
                </div>

                <div className="crud-items-grid">
                  {localTr.workflowSteps?.map((step, idx) => (
                    <div key={idx} className="crud-item-card glass">
                      <div className="crud-card-info">
                        <span className="crud-card-badge">{step.time}</span>
                        <div>
                          <h5 className="crud-card-name">{step.title}</h5>
                          <p className="crud-card-sub">{step.desc}</p>
                        </div>
                      </div>
                      <div className="crud-card-actions">
                        <button className="btn-crud-edit" type="button" onClick={() => openItemModal('step', idx)}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-crud-delete" type="button" onClick={() => handleDeleteItem('step', idx)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: TEAM */}
            {activeTab === 'team' && (
              <div className="tab-list-view">
                <div className="tab-list-header">
                  <h4 className="tab-title-heading">Ekibimiz ({localTr.teamData?.length || 0})</h4>
                  <button className="btn-add-item" type="button" onClick={() => openItemModal('member')}>
                    <Plus size={16} />
                    <span>Yeni Üye Ekle</span>
                  </button>
                </div>

                <div className="crud-items-grid">
                  {localTr.teamData?.map((member, idx) => (
                    <div key={idx} className="crud-item-card glass">
                      <div className="crud-card-info">
                        <div className="crud-card-avatar-initials">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h5 className="crud-card-name">{member.name}</h5>
                          <p className="crud-card-sub">{member.role}</p>
                        </div>
                      </div>
                      <div className="crud-card-actions">
                        <button className="btn-crud-edit" type="button" onClick={() => openItemModal('member', idx)}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-crud-delete" type="button" onClick={() => handleDeleteItem('member', idx)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SHOWCASE */}
            {activeTab === 'showcase' && (
              <div className="tab-list-view">
                <div className="tab-list-header">
                  <h4 className="tab-title-heading">Vitrin Projeleri ({localProjects.length})</h4>
                  <button className="btn-add-item" type="button" onClick={() => openItemModal('project')}>
                    <Plus size={16} />
                    <span>Yeni Proje Ekle</span>
                  </button>
                </div>

                <div className="crud-items-grid">
                  {localProjects.map((project, idx) => (
                    <div key={project.id} className="crud-item-card glass">
                      <div className="crud-card-info">
                        <span className="crud-card-badge tag">{project.category}</span>
                        <div>
                          <h5 className="crud-card-name">{project.titleTr}</h5>
                          <p className="crud-card-sub">{project.descTr}</p>
                        </div>
                      </div>
                      <div className="crud-card-actions">
                        <button className="btn-crud-edit" type="button" onClick={() => openItemModal('project', idx)}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-crud-delete" type="button" onClick={() => handleDeleteItem('project', idx)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 6: CONTACTS & STATS */}
            {activeTab === 'contacts' && (
              <form onSubmit={handleSaveContactsStats} className="tab-form">
                <h4 className="tab-title-heading">İletişim Bilgileri ve İstatistik Hedefleri</h4>

                <div className="form-double-col-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  
                  {/* Left Column: Contact details (global) */}
                  <div className="card glass" style={{ padding: '20px' }}>
                    <h5 className="sub-section-title" style={{ marginBottom: '15px', color: 'var(--accent-turquoise)' }}>İletişim Kanalları</h5>
                    
                    <div className="form-field">
                      <label>E-posta Adresi</label>
                      <input 
                        type="email" 
                        value={localTr.contactEmail || ''} 
                        onChange={e => {
                          setLocalTr({...localTr, contactEmail: e.target.value});
                          setLocalEn({...localEn, contactEmail: e.target.value});
                        }} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Telefon Numarası (Görünüm)</label>
                      <input 
                        type="text" 
                        value={localTr.contactPhone || ''} 
                        onChange={e => {
                          setLocalTr({...localTr, contactPhone: e.target.value});
                          setLocalEn({...localEn, contactPhone: e.target.value});
                        }} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Telefon Arama Numarası (Boşluksuz)</label>
                      <input 
                        type="text" 
                        value={localTr.contactPhoneRaw || ''} 
                        onChange={e => {
                          setLocalTr({...localTr, contactPhoneRaw: e.target.value});
                          setLocalEn({...localEn, contactPhoneRaw: e.target.value});
                        }} 
                      />
                    </div>

                    <div className="form-field">
                      <label>WhatsApp Numarası (Ülke Kodlu, Örn: 90551...)</label>
                      <input 
                        type="text" 
                        value={localTr.contactWhatsApp || ''} 
                        onChange={e => {
                          setLocalTr({...localTr, contactWhatsApp: e.target.value});
                          setLocalEn({...localEn, contactWhatsApp: e.target.value});
                        }} 
                      />
                    </div>
                  </div>

                  {/* Right Column: Counter animation statistics */}
                  <div className="card glass" style={{ padding: '20px' }}>
                    <h5 className="sub-section-title" style={{ marginBottom: '15px', color: 'var(--accent-gold)' }}>İstatistik Sayıcıları (Hero)</h5>

                    <div className="form-field">
                      <label>Başarılı Proje Sayısı (+)</label>
                      <input 
                        type="number" 
                        value={localTr.statProjectsCount || ''} 
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setLocalTr({...localTr, statProjectsCount: val});
                          setLocalEn({...localEn, statProjectsCount: val});
                        }} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Müşteri Memnuniyeti (%)</label>
                      <input 
                        type="number" 
                        max="100"
                        value={localTr.statSatisfactionPercent || ''} 
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setLocalTr({...localTr, statSatisfactionPercent: val});
                          setLocalEn({...localEn, statSatisfactionPercent: val});
                        }} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Sistem Aktiflik Oranı (%)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        max="100"
                        value={localTr.statUptimePercent || ''} 
                        onChange={e => {
                          const val = parseFloat(e.target.value) || 0;
                          setLocalTr({...localTr, statUptimePercent: val});
                          setLocalEn({...localEn, statUptimePercent: val});
                        }} 
                      />
                    </div>

                    <div className="form-field">
                      <label>Geliştirici Sayısı</label>
                      <input 
                        type="number" 
                        value={localTr.statDevelopersCount || ''} 
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setLocalTr({...localTr, statDevelopersCount: val});
                          setLocalEn({...localEn, statDevelopersCount: val});
                        }} 
                      />
                    </div>
                  </div>

                </div>

                <div className="card glass" style={{ padding: '20px', marginTop: '20px' }}>
                  <h5 className="sub-section-title" style={{ marginBottom: '15px', color: 'var(--accent-purple)' }}>Gemini Yapay Zeka Entegrasyon Ayarları</h5>
                  <div className="form-field">
                    <label>Gemini API Anahtarı (API Key)</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type={showApiKey ? "text" : "password"} 
                        placeholder="AIzaSy..."
                        value={geminiApiKey} 
                        onChange={e => setGeminiApiKey(e.target.value)} 
                        style={{ flex: 1 }}
                      />
                      <button 
                        type="button" 
                        className="btn-secondary" 
                        onClick={() => setShowApiKey(!showApiKey)}
                        style={{ width: 'auto', padding: '10px 16px', borderRadius: '10px', fontSize: '0.85rem' }}
                      >
                        {showApiKey ? "Gizle" : "Göster"}
                      </button>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px', display: 'block' }}>
                      API anahtarı tarayıcınızın yerel hafızasında güvenli bir şekilde saklanır ve sunucuya aktarılmaz.
                    </span>
                  </div>
                </div>

                <div className="form-actions-bar">
                  <button type="submit" className="btn-save-form">
                    <Save size={16} />
                    <span>Değişiklikleri Kaydet</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 7: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="tab-list-view">
                <div className="workflow-whyus-editor card glass" style={{ padding: '20px', marginBottom: '30px' }}>
                  <h5 className="sub-section-title" style={{ marginBottom: '15px', color: 'var(--accent-purple)' }}>Yorumlar Bölüm Başlığı</h5>
                  <div className="form-translation-grid">
                    <div className="lang-col">
                      <span className="lang-indicator">Türkçe</span>
                      <div className="form-field">
                        <label>Bölüm Başlığı</label>
                        <input type="text" value={localTr.testimonialsTitle || ''} onChange={e => saveTranslations({...localTr, testimonialsTitle: e.target.value}, localEn)} />
                      </div>
                      <div className="form-field">
                        <label>Bölüm Açıklaması</label>
                        <input type="text" value={localTr.testimonialsSubtitle || ''} onChange={e => saveTranslations({...localTr, testimonialsSubtitle: e.target.value}, localEn)} />
                      </div>
                    </div>
                    <div className="lang-col">
                      <span className="lang-indicator">English</span>
                      <div className="form-field">
                        <label>Section Title</label>
                        <input type="text" value={localEn.testimonialsTitle || ''} onChange={e => saveTranslations(localTr, {...localEn, testimonialsTitle: e.target.value})} />
                      </div>
                      <div className="form-field">
                        <label>Section Subtitle</label>
                        <input type="text" value={localEn.testimonialsSubtitle || ''} onChange={e => saveTranslations(localTr, {...localEn, testimonialsSubtitle: e.target.value})} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="tab-list-header">
                  <h4 className="tab-title-heading">Müşteri Yorumları ({localTr.testimonialsData?.length || 0})</h4>
                  <button className="btn-add-item" type="button" onClick={() => openItemModal('testimonial')}>
                    <Plus size={16} />
                    <span>Yeni Yorum Ekle</span>
                  </button>
                </div>

                <div className="crud-items-grid">
                  {localTr.testimonialsData?.map((item, idx) => (
                    <div key={item.id || idx} className="crud-item-card glass">
                      <div className="crud-card-info">
                        <span className="crud-card-badge">{item.stars} ⭐</span>
                        <div>
                          <h5 className="crud-card-name">{item.name}</h5>
                          <p className="crud-card-sub">{item.company} - "{item.quote}"</p>
                        </div>
                      </div>
                      <div className="crud-card-actions">
                        <button className="btn-crud-edit" type="button" onClick={() => openItemModal('testimonial', idx)}>
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-crud-delete" type="button" onClick={() => handleDeleteItem('testimonial', idx)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* NESTED CRUD MODAL OVERLAY */}
      {editingItem && (
        <div className="modal-overlay sub-modal active" onClick={() => setEditingItem(null)}>
          <div className="modal-content crud-editor-modal glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setEditingItem(null)}>
              <X size={18} />
            </button>

            <div className="crud-modal-header">
              <h4 className="crud-modal-title">
                {editingItem.index !== null ? 'Ögeyi Düzenle' : 'Yeni Öge Ekle'}
              </h4>
            </div>

            <form onSubmit={handleSaveItem} className="crud-modal-form">
              <div className="crud-form-scrollable">
                
                {/* 1. SERVICES EDITOR FIELDS */}
                {editingItem.type === 'service' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div className="form-field">
                        <label>Hizmet İkonu (Lucide Sınıf Adı)</label>
                        <select 
                          value={editingItem.data.icon} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, icon: e.target.value }
                          })}
                        >
                          <option value="Cpu">Cpu (Otomasyon)</option>
                          <option value="GitMerge">GitMerge (Entegrasyon)</option>
                          <option value="Smartphone">Smartphone (Mobil)</option>
                          <option value="Globe">Globe (Web)</option>
                          <option value="Sparkles">Sparkles</option>
                          <option value="Users">Users</option>
                          <option value="Activity">Activity</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label>Teknolojiler (Virgülle Ayırın)</label>
                        <input 
                          type="text" 
                          placeholder="React, Node.js, Python"
                          value={editingItem.data.techs} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, techs: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-translation-grid">
                      <div className="lang-col">
                        <span className="lang-indicator">Türkçe</span>
                        <div className="form-field">
                          <label>Hizmet Adı (TR)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.titleTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, titleTr: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Kısa Açıklama (TR)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.shortDescTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, shortDescTr: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Detaylı Açıklama (TR)</label>
                          <textarea 
                            rows="4" 
                            required
                            value={editingItem.data.fullDescTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, fullDescTr: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="lang-col">
                        <span className="lang-indicator">English</span>
                        <div className="form-field">
                          <label>Service Title (EN)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.titleEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, titleEn: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Short Description (EN)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.shortDescEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, shortDescEn: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Detailed Description (EN)</label>
                          <textarea 
                            rows="4" 
                            required
                            value={editingItem.data.fullDescEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, fullDescEn: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 2. WORKFLOW STEP EDITOR FIELDS */}
                {editingItem.type === 'step' && (
                  <div className="form-translation-grid">
                    <div className="lang-col">
                      <span className="lang-indicator">Türkçe</span>
                      <div className="form-field">
                        <label>Adım Başlığı (TR)</label>
                        <input 
                          type="text" 
                          required
                          value={editingItem.data.titleTr} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, titleTr: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-field">
                        <label>Süreç Süresi (TR, Örn: 1-2 Gün)</label>
                        <input 
                          type="text" 
                          required
                          value={editingItem.data.timeTr} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, timeTr: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-field">
                        <label>Açıklama (TR)</label>
                        <textarea 
                          rows="3" 
                          required
                          value={editingItem.data.descTr} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, descTr: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="lang-col">
                      <span className="lang-indicator">English</span>
                      <div className="form-field">
                        <label>Step Title (EN)</label>
                        <input 
                          type="text" 
                          required
                          value={editingItem.data.titleEn} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, titleEn: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-field">
                        <label>Process Duration (EN, E.g., 1-2 Days)</label>
                        <input 
                          type="text" 
                          required
                          value={editingItem.data.timeEn} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, timeEn: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-field">
                        <label>Description (EN)</label>
                        <textarea 
                          rows="3" 
                          required
                          value={editingItem.data.descEn} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, descEn: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. TEAM MEMBER EDITOR FIELDS */}
                {editingItem.type === 'member' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                      <div className="form-field">
                        <label>Üye Adı Soyadı</label>
                        <input 
                          type="text" 
                          required
                          value={editingItem.data.name} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, name: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-field">
                        <label>LinkedIn Linki</label>
                        <input 
                          type="text" 
                          value={editingItem.data.linkedin} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, linkedin: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-field">
                        <label>GitHub Linki</label>
                        <input 
                          type="text" 
                          value={editingItem.data.github} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, github: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-translation-grid">
                      <div className="lang-col">
                        <span className="lang-indicator">Türkçe</span>
                        <div className="form-field">
                          <label>Rol / Görev (TR)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.roleTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, roleTr: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Biyografi (TR)</label>
                          <textarea 
                            rows="3" 
                            required
                            value={editingItem.data.bioTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, bioTr: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="lang-col">
                        <span className="lang-indicator">English</span>
                        <div className="form-field">
                          <label>Role / Position (EN)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.roleEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, roleEn: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Biography (EN)</label>
                          <textarea 
                            rows="3" 
                            required
                            value={editingItem.data.bioEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, bioEn: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 4. SHOWCASE PROJECT EDITOR FIELDS */}
                {editingItem.type === 'project' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                      <div className="form-field">
                        <label>Proje Kategorisi</label>
                        <select 
                          value={editingItem.data.category} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, category: e.target.value }
                          })}
                        >
                          <option value="web">Web</option>
                          <option value="mobile">Mobil</option>
                          <option value="automation">Otomasyon</option>
                          <option value="integration">Entegrasyon</option>
                        </select>
                      </div>

                      <div className="form-field">
                        <label>Teknolojiler (Virgülle Ayırın)</label>
                        <input 
                          type="text" 
                          placeholder="Next.js, GraphQL, Shopify"
                          value={editingItem.data.techs} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, techs: e.target.value }
                          })}
                        />
                      </div>

                      <div className="form-field">
                        <label>Proje Linki</label>
                        <input 
                          type="text" 
                          placeholder="https://..."
                          value={editingItem.data.link} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, link: e.target.value }
                          })}
                        />
                      </div>
                    </div>

                    <div className="form-translation-grid">
                      <div className="lang-col">
                        <span className="lang-indicator">Türkçe</span>
                        <div className="form-field">
                          <label>Proje Adı (TR)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.titleTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, titleTr: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Proje Açıklaması (TR)</label>
                          <textarea 
                            rows="3" 
                            required
                            value={editingItem.data.descTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, descTr: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="lang-col">
                        <span className="lang-indicator">English</span>
                        <div className="form-field">
                          <label>Project Name (EN)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.titleEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, titleEn: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Project Description (EN)</label>
                          <textarea 
                            rows="3" 
                            required
                            value={editingItem.data.descEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, descEn: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* 5. TESTIMONIAL EDITOR FIELDS */}
                {editingItem.type === 'testimonial' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                      <div className="form-field">
                        <label>Müşteri Adı Soyadı</label>
                        <input 
                          type="text" 
                          required
                          value={editingItem.data.name} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, name: e.target.value }
                          })}
                        />
                      </div>
                      <div className="form-field">
                        <label>Yıldız Puanı (1-5)</label>
                        <select 
                          value={editingItem.data.stars} 
                          onChange={e => setEditingItem({
                            ...editingItem,
                            data: { ...editingItem.data, stars: parseInt(e.target.value) || 5 }
                          })}
                        >
                          <option value="5">5 Yıldız ⭐⭐⭐⭐⭐</option>
                          <option value="4">4 Yıldız ⭐⭐⭐⭐</option>
                          <option value="3">3 Yıldız ⭐⭐⭐</option>
                          <option value="2">2 Yıldız ⭐⭐</option>
                          <option value="1">1 Yıldız ⭐</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-translation-grid">
                      <div className="lang-col">
                        <span className="lang-indicator">Türkçe</span>
                        <div className="form-field">
                          <label>Görevi / Rolü (TR)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.roleTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, roleTr: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Şirket Adı (TR)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.companyTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, companyTr: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Yorum Metni (TR)</label>
                          <textarea 
                            rows="3" 
                            required
                            value={editingItem.data.quoteTr} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, quoteTr: e.target.value }
                            })}
                          />
                        </div>
                      </div>

                      <div className="lang-col">
                        <span className="lang-indicator">English</span>
                        <div className="form-field">
                          <label>Role / Position (EN)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.roleEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, roleEn: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Company Name (EN)</label>
                          <input 
                            type="text" 
                            required
                            value={editingItem.data.companyEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, companyEn: e.target.value }
                            })}
                          />
                        </div>
                        <div className="form-field">
                          <label>Review Quote (EN)</label>
                          <textarea 
                            rows="3" 
                            required
                            value={editingItem.data.quoteEn} 
                            onChange={e => setEditingItem({
                              ...editingItem,
                              data: { ...editingItem.data, quoteEn: e.target.value }
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

              </div>

              <div className="crud-modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setEditingItem(null)}>
                  İptal
                </button>
                <button type="submit" className="btn-primary">
                  <Save size={16} />
                  <span>Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

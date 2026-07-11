import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import './Showcase.css';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    titleTr: "Suda B2B Otomasyon Sistemi",
    titleEn: "Suda B2B Automation System",
    descTr: "Distribütörler ve bayiler arası sipariş, stok ve fatura süreçlerini sıfır hata ile senkronize eden tam otomatik entegrasyon altyapısı.",
    descEn: "Fully automated integration infrastructure that synchronizes order, stock, and invoicing processes between distributors and dealers with zero errors.",
    category: "automation",
    techs: ["Python", "Node.js", "PostgreSQL", "Docker", "REST APIs"],
    link: "https://sudadynamics.com/projects/b2b-automation"
  },
  {
    id: 2,
    titleTr: "Finansal Cüzdan Mobil Uygulaması",
    titleEn: "Financial Wallet Mobile Application",
    descTr: "Kullanıcıların harcamalarını yapay zekayla kategorize eden, faturalarını otomatik ödeyen yüksek güvenlikli cüzdan uygulaması.",
    descEn: "High-security wallet application that categorizes user expenses with AI and automatically pays invoices.",
    category: "mobile",
    techs: ["React Native", "Expo", "Firebase", "Node.js", "Siri Shortcuts"],
    link: "https://sudadynamics.com/projects/finwallet"
  },
  {
    id: 3,
    titleTr: "Next.js Hızlı E-Ticaret Arayüzü",
    titleEn: "Next.js Ultra-Fast E-Commerce",
    descTr: "Özel Shopify entegrasyonu ve Next.js mimarisiyle 0.4 saniye sayfa yükleme hızına sahip, dönüşüm oranı yüksek premium e-ticaret platformu.",
    descEn: "Premium e-commerce platform with a 0.4-second page load speed using custom Shopify integration and Next.js architecture.",
    category: "web",
    techs: ["Next.js", "React.js", "TailwindCSS", "GraphQL", "Shopify API"],
    link: "https://sudadynamics.com/projects/ecommerce"
  },
  {
    id: 4,
    titleTr: "Logo ERP & CRM Entegrasyon Köprüsü",
    titleEn: "Logo ERP & CRM Integration Bridge",
    descTr: "Logo Tiger ERP ile Salesforce CRM platformlarını gerçek zamanlı eşleyen, veri tutarsızlıklarını tamamen ortadan kaldıran API entegrasyon köprüsü.",
    descEn: "Real-time API integration bridge matching Logo Tiger ERP with Salesforce CRM, completely eliminating data inconsistency.",
    category: "integration",
    techs: ["REST APIs", "Node.js", "MSSQL", "Webhooks", "OAuth 2.0"],
    link: "https://sudadynamics.com/projects/erp-bridge"
  }
];

const Showcase = ({ t, lang, isAdmin, onLogout, projectsVersion }) => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Form States
  const [formTitleTr, setFormTitleTr] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formDescTr, setFormDescTr] = useState('');
  const [formDescEn, setFormDescEn] = useState('');
  const [formCategory, setFormCategory] = useState('web');
  const [formTechs, setFormTechs] = useState('');
  const [formLink, setFormLink] = useState('');

  // Load projects from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('suda_showcase_projects');
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (e) {
        setProjects(DEFAULT_PROJECTS);
      }
    } else {
      setProjects(DEFAULT_PROJECTS);
      localStorage.setItem('suda_showcase_projects', JSON.stringify(DEFAULT_PROJECTS));
    }
  }, [projectsVersion]);

  // Save projects to localStorage helper
  const saveProjects = (updatedProjects) => {
    setProjects(updatedProjects);
    localStorage.setItem('suda_showcase_projects', JSON.stringify(updatedProjects));
  };

  // Card Mouse Glow Follower
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'web':
        return <Icons.Globe size={22} />;
      case 'mobile':
        return <Icons.Smartphone size={22} />;
      case 'automation':
        return <Icons.Cpu size={22} />;
      case 'integration':
        return <Icons.GitMerge size={22} />;
      default:
        return <Icons.Sparkles size={22} />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'automation': return 'purple-gold';
      case 'integration': return 'turquoise-purple';
      case 'mobile': return 'red-gold';
      case 'web': return 'turquoise-gold';
      default: return 'purple-gold';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'web': return t.filterWeb;
      case 'mobile': return t.filterMobile;
      case 'automation': return t.filterAutomation;
      case 'integration': return t.filterIntegration;
      default: return category;
    }
  };

  // Filter project list
  const filteredProjects = projects.filter(proj => {
    if (filter === 'all') return true;
    return proj.category === filter;
  });

  // Open Form for Adding
  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormTitleTr('');
    setFormTitleEn('');
    setFormDescTr('');
    setFormDescEn('');
    setFormCategory('web');
    setFormTechs('');
    setFormLink('');
    setEditorOpen(true);
  };

  // Open Form for Editing
  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setFormTitleTr(project.titleTr || '');
    setFormTitleEn(project.titleEn || '');
    setFormDescTr(project.descTr || '');
    setFormDescEn(project.descEn || '');
    setFormCategory(project.category || 'web');
    setFormTechs(project.techs ? project.techs.join(', ') : '');
    setFormLink(project.link || '');
    setEditorOpen(true);
  };

  // Delete Project
  const handleDelete = (id) => {
    if (window.confirm(t.confirmDelete)) {
      const updated = projects.filter(p => p.id !== id);
      saveProjects(updated);
    }
  };

  // Save Form (Add or Edit)
  const handleSaveProject = (e) => {
    e.preventDefault();

    if (!formTitleTr || !formTitleEn || !formDescTr || !formDescEn) {
      alert(t.toastError);
      return;
    }

    const techArray = formTechs
      ? formTechs.split(',').map(s => s.trim()).filter(s => s.length > 0)
      : [];

    if (editingProject) {
      // Edit mode
      const updated = projects.map(p => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            titleTr: formTitleTr,
            titleEn: formTitleEn,
            descTr: formDescTr,
            descEn: formDescEn,
            category: formCategory,
            techs: techArray,
            link: formLink
          };
        }
        return p;
      });
      saveProjects(updated);
    } else {
      // Add mode
      const newProj = {
        id: Date.now(),
        titleTr: formTitleTr,
        titleEn: formTitleEn,
        descTr: formDescTr,
        descEn: formDescEn,
        category: formCategory,
        techs: techArray,
        link: formLink || '#'
      };
      saveProjects([...projects, newProj]);
    }

    setEditorOpen(false);
    setEditingProject(null);
  };

  return (
    <section id="showcase" className="showcase-section">
      <div className="showcase-decor"></div>

      <div className="section-header">
        <span className="badge">{t.navShowcase}</span>
        <h2>{t.showcaseTitle}</h2>
        <p>{t.showcaseSubtitle}</p>
      </div>

      {/* Admin Action Bar */}
      {isAdmin && (
        <div className="admin-control-bar">
          <div className="admin-badge-indicator">
            <span className="admin-indicator-dot"></span>
            <span>SUDA Admin</span>
          </div>
          <button className="btn-admin-add" onClick={handleOpenAdd}>
            <Icons.Plus size={16} />
            <span>{t.adminAddProject}</span>
          </button>
          <button className="btn-admin-logout" onClick={onLogout}>
            <Icons.LogOut size={16} />
            <span>{t.adminLogoutBtn}</span>
          </button>
        </div>
      )}

      {/* Showcase Filters */}
      <div className="showcase-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t.filterAll}
        </button>
        <button
          className={`filter-btn ${filter === 'web' ? 'active' : ''}`}
          onClick={() => setFilter('web')}
        >
          {t.filterWeb}
        </button>
        <button
          className={`filter-btn ${filter === 'mobile' ? 'active' : ''}`}
          onClick={() => setFilter('mobile')}
        >
          {t.filterMobile}
        </button>
        <button
          className={`filter-btn ${filter === 'automation' ? 'active' : ''}`}
          onClick={() => setFilter('automation')}
        >
          {t.filterAutomation}
        </button>
        <button
          className={`filter-btn ${filter === 'integration' ? 'active' : ''}`}
          onClick={() => setFilter('integration')}
        >
          {t.filterIntegration}
        </button>
      </div>

      {/* Project Grid */}
      <div className="showcase-grid">
        {filteredProjects.map((project) => {
          const colorScheme = getCategoryColor(project.category);
          const projectTitle = lang === 'tr' ? project.titleTr : project.titleEn;
          const projectDesc = lang === 'tr' ? project.descTr : project.descEn;

          return (
            <div
              key={project.id}
              className={`showcase-card glass card-hover-${colorScheme}`}
              onMouseMove={handleMouseMove}
            >
              <div className="showcase-card-glow"></div>

              <div>
                <div className="showcase-card-header">
                  <div className={`showcase-icon-box ${colorScheme}`}>
                    {getCategoryIcon(project.category)}
                  </div>
                  <span className="showcase-category-tag">
                    {getCategoryLabel(project.category)}
                  </span>
                </div>

                <div className="showcase-card-content">
                  <h3 className="showcase-card-title">{projectTitle}</h3>
                  <p className="showcase-card-desc">{projectDesc}</p>

                  {project.techs && project.techs.length > 0 && (
                    <div className="showcase-tech-tags">
                      {project.techs.map((tech, idx) => (
                        <span key={idx} className="showcase-tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="showcase-card-footer">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-showcase-link"
                >
                  <span>{lang === 'tr' ? 'Projeyi İncele' : 'View Project'}</span>
                  <Icons.ArrowUpRight size={16} className="arrow-icon" />
                </a>

                {isAdmin && (
                  <div className="showcase-admin-actions">
                    <button
                      className="btn-action-edit"
                      title={t.adminEditProject}
                      onClick={() => handleOpenEdit(project)}
                    >
                      <Icons.Edit2 size={14} />
                    </button>
                    <button
                      className="btn-action-delete"
                      title={t.adminDeleteProject}
                      onClick={() => handleDelete(project.id)}
                    >
                      <Icons.Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Add project box for admins in grid */}
        {isAdmin && (
          <div className="showcase-add-placeholder-card" onClick={handleOpenAdd}>
            <div className="showcase-add-plus-icon">
              <Icons.Plus size={28} />
            </div>
            <span className="showcase-add-text">{t.adminAddProject}</span>
          </div>
        )}
      </div>

      {filteredProjects.length === 0 && !isAdmin && (
        <div className="showcase-empty">
          <Icons.FolderOpen size={48} className="showcase-empty-icon" />
          <p>{t.noProjects}</p>
        </div>
      )}

      {/* Editor Modal for Adding/Editing Projects */}
      {editorOpen && (
        <div className="modal-overlay active" onClick={() => setEditorOpen(false)}>
          <div className="modal-content service-modal glass" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <button className="modal-close" onClick={() => setEditorOpen(false)} aria-label="Close">
              <Icons.X size={20} />
            </button>

            <div className="service-modal-header">
              <div className="showcase-icon-box purple-gold">
                <Icons.Edit size={22} />
              </div>
              <div>
                <span className="modal-badge">{t.adminTitle}</span>
                <h3 className="service-modal-title">
                  {editingProject ? t.adminEditProject : t.adminAddProject}
                </h3>
              </div>
            </div>

            <form onSubmit={handleSaveProject} className="cost-calc-form" style={{ marginTop: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div className="calc-group">
                  <label className="calc-label">{t.projectTitleTr} *</label>
                  <input
                    type="text"
                    value={formTitleTr}
                    onChange={e => setFormTitleTr(e.target.value)}
                    placeholder="Örn: Suda B2B Otomasyonu"
                    className="calc-select"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', width: '100%', outline: 'none' }}
                    required
                  />
                </div>
                <div className="calc-group">
                  <label className="calc-label">{t.projectTitleEn} *</label>
                  <input
                    type="text"
                    value={formTitleEn}
                    onChange={e => setFormTitleEn(e.target.value)}
                    placeholder="E.g., Suda B2B Automation"
                    className="calc-select"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', width: '100%', outline: 'none' }}
                    required
                  />
                </div>
              </div>

              <div className="calc-group" style={{ marginBottom: '15px' }}>
                <label className="calc-label">{t.projectDescTr} *</label>
                <textarea
                  value={formDescTr}
                  onChange={e => setFormDescTr(e.target.value)}
                  placeholder="Proje açıklaması (Türkçe)"
                  className="calc-select"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', width: '100%', minHeight: '80px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  required
                />
              </div>

              <div className="calc-group" style={{ marginBottom: '15px' }}>
                <label className="calc-label">{t.projectDescEn} *</label>
                <textarea
                  value={formDescEn}
                  onChange={e => setFormDescEn(e.target.value)}
                  placeholder="Project description (English)"
                  className="calc-select"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', width: '100%', minHeight: '80px', fontFamily: 'inherit', outline: 'none', resize: 'vertical' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div className="calc-group">
                  <label className="calc-label">{t.projectCategory} *</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="calc-select"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', width: '100%', cursor: 'pointer', outline: 'none' }}
                  >
                    <option value="web">{t.filterWeb}</option>
                    <option value="mobile">{t.filterMobile}</option>
                    <option value="automation">{t.filterAutomation}</option>
                    <option value="integration">{t.filterIntegration}</option>
                  </select>
                </div>

                <div className="calc-group">
                  <label className="calc-label">{t.projectLink}</label>
                  <input
                    type="text"
                    value={formLink}
                    onChange={e => setFormLink(e.target.value)}
                    placeholder="https://..."
                    className="calc-select"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', width: '100%', outline: 'none' }}
                  />
                </div>
              </div>

              <div className="calc-group" style={{ marginBottom: '25px' }}>
                <label className="calc-label">{t.projectTechs}</label>
                <input
                  type="text"
                  value={formTechs}
                  onChange={e => setFormTechs(e.target.value)}
                  placeholder="React, Node.js, Python, PostgreSQL"
                  className="calc-select"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px', width: '100%', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditorOpen(false)}
                >
                  {t.adminCancel}
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {t.adminSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Showcase;

import React, { useState } from 'react';
import { X, BookOpen, Clock, Calendar, Sparkles } from 'lucide-react';
import './Blog.css';

const Blog = ({ lang, dietitianConfig }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const blogs = dietitianConfig?.blogs || [];

  if (blogs.length === 0) return null;

  return (
    <section id="blog" className="blog-section">
      <div className="section-header">
        <span className="badge">{lang === 'tr' ? 'SAĞLIKLI YAŞAM PORTALI' : 'HEALTHY LIVING PORTAL'}</span>
        <h2>{lang === 'tr' ? 'Diyetisyen Makaleleri & Beslenme Tüyoları' : 'Nutrition Articles & Health Tips'}</h2>
        <p>{lang === 'tr' ? 'Diyetisyenimizden bilimsel temelli makaleler ve pratik beslenme rehberleri.' : 'Science-based articles and practical nutrition guides from our dietitian.'}</p>
      </div>

      <div className="blog-grid">
        {blogs.map((post) => {
          const title = lang === 'tr' ? post.titleTr : post.titleEn;
          const category = lang === 'tr' ? post.categoryTr : post.categoryEn;
          const readTime = lang === 'tr' ? post.readTimeTr : post.readTimeEn;
          const summary = lang === 'tr' ? post.summaryTr : post.summaryEn;

          return (
            <div key={post.id} className="blog-card glass hover-glow">
              <div className="blog-card-image" style={{ background: `url(${post.image}) center/cover no-repeat` }}>
                <span className="blog-card-category">{category}</span>
              </div>
              <div className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="meta-item"><Calendar size={12} /> {post.date}</span>
                  <span className="meta-item"><Clock size={12} /> {readTime}</span>
                </div>
                <h3 className="blog-card-title">{title}</h3>
                <p className="blog-card-summary">{summary}</p>
                <button className="blog-card-readmore-btn" onClick={() => setSelectedBlog(post)}>
                  <span>{lang === 'tr' ? 'Makaleyi Oku' : 'Read Article'}</span>
                  <BookOpen size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ARTICLE FULL MODAL */}
      {selectedBlog && (() => {
        const title = lang === 'tr' ? selectedBlog.titleTr : selectedBlog.titleEn;
        const category = lang === 'tr' ? selectedBlog.categoryTr : selectedBlog.categoryEn;
        const readTime = lang === 'tr' ? selectedBlog.readTimeTr : selectedBlog.readTimeEn;
        const content = lang === 'tr' ? selectedBlog.contentTr : selectedBlog.contentEn;

        return (
          <div className="calculator-backdrop" onClick={() => setSelectedBlog(null)}>
            <div className="calculator-modal glass hover-glow blog-detail-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setSelectedBlog(null)}>
                <X size={20} />
              </button>

              <div className="blog-detail-header-image" style={{ background: `url(${selectedBlog.image}) center/cover no-repeat` }}>
                <span className="blog-card-category" style={{ top: '20px', left: '20px' }}>{category}</span>
              </div>

              <div className="blog-detail-body" style={{ padding: '30px', textAlign: 'left' }}>
                <div className="blog-card-meta" style={{ marginBottom: '15px' }}>
                  <span className="meta-item" style={{ fontSize: '0.8rem' }}><Calendar size={14} /> {selectedBlog.date}</span>
                  <span className="meta-item" style={{ fontSize: '0.8rem' }}><Clock size={14} /> {readTime}</span>
                </div>
                <h2 className="blog-detail-title text-gradient" style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '20px', lineHeight: 1.35 }}>{title}</h2>
                <div className="blog-detail-content" style={{ fontSize: '0.95rem', lineHeight: 1.65, color: '#e2e8f0', whiteSpace: 'pre-line' }}>
                  {content}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default Blog;

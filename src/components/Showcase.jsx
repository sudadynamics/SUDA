import React, { useState } from 'react';
import { BookOpen, Users, Clock, Flame, ChevronRight, X, Sparkles, HelpCircle } from 'lucide-react';
import './Showcase.css';

const Showcase = ({ t, lang, dietitianConfig }) => {
  const [subTab, setSubTab] = useState('recipes'); // recipes, success
  const [recipeFilter, setRecipeFilter] = useState('all');
  const [activeRecipe, setActiveRecipe] = useState(null);

  const recipes = dietitianConfig?.recipes || [];
  const transformations = dietitianConfig?.transformations || [];

  // Get unique recipe categories for filter tabs
  const getRecipeCategories = () => {
    const categories = new Set();
    recipes.forEach(r => {
      const cat = lang === 'tr' ? r.category : r.categoryEn;
      if (cat) categories.add(cat);
    });
    return ['all', ...Array.from(categories)];
  };

  const recipeCategories = getRecipeCategories();

  const filteredRecipes = recipes.filter(r => {
    if (recipeFilter === 'all') return true;
    const cat = lang === 'tr' ? r.category : r.categoryEn;
    return cat === recipeFilter;
  });

  // Card Mouse Glow Follower
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="showcase" className="showcase-section">
      <div className="section-header animate-slide-up">
        <span className="badge">{lang === 'tr' ? 'Danışan Portföyü' : 'Client Portfolio'}</span>
        <h2>{lang === 'tr' ? 'Diyet Arşivi & Başarılarımız' : 'Diet Archive & Our Successes'}</h2>
        <p>{lang === 'tr' ? 'Sağlıklı yaşam serüveninizde size ilham verecek tarifler ve gerçek başarı hikayeleri.' : 'Recipes and real success stories to inspire you in your healthy life journey.'}</p>
      </div>

      {/* Main Tab Toggle (Recipes vs Success Stories) */}
      <div className="showcase-tab-toggle">
        <button 
          className={`toggle-btn ${subTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setSubTab('recipes')}
        >
          <BookOpen size={18} />
          <span>{lang === 'tr' ? 'Sağlıklı Tarifler' : 'Healthy Recipes'}</span>
        </button>
        <button 
          className={`toggle-btn ${subTab === 'success' ? 'active' : ''}`}
          onClick={() => setSubTab('success')}
        >
          <Users size={18} />
          <span>{lang === 'tr' ? 'Başarı Hikayeleri (Önce-Sonra)' : 'Success Stories (Before-After)'}</span>
        </button>
      </div>

      {/* RECIPES SECTION VIEW */}
      {subTab === 'recipes' && (
        <div className="recipes-view-container animate-fade-in">
          {/* Category Filter Pills */}
          <div className="filter-container">
            {recipeCategories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${recipeFilter === cat ? 'active' : ''}`}
                onClick={() => setRecipeFilter(cat)}
              >
                {cat === 'all' ? (lang === 'tr' ? 'Tümü' : 'All') : cat}
              </button>
            ))}
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="no-items-box glass">
              <p>{lang === 'tr' ? 'Henüz bu kategoride eklenmiş bir tarif bulunmuyor.' : 'No recipes added in this category yet.'}</p>
            </div>
          ) : (
            <div className="showcase-grid">
              {filteredRecipes.map((recipe, index) => {
                const title = lang === 'tr' ? recipe.titleTr : recipe.titleEn;
                const category = lang === 'tr' ? recipe.category : recipe.categoryEn;
                
                return (
                  <div
                    key={recipe.id}
                    className="showcase-card glass"
                    onMouseMove={handleMouseMove}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="showcase-card-glow"></div>
                    <div className="showcase-img-wrapper">
                      <img src={recipe.image} alt={title} className="showcase-img" />
                      <span className="recipe-tag">{category}</span>
                    </div>

                    <div className="showcase-info">
                      <div className="recipe-stats-row">
                        <span className="recipe-stat-pill">
                          <Clock size={12} />
                          <span>{lang === 'tr' ? recipe.prepTime : recipe.prepTimeEn}</span>
                        </span>
                        <span className="recipe-stat-pill orange">
                          <Flame size={12} />
                          <span>{recipe.calories} kcal</span>
                        </span>
                      </div>
                      
                      <h3 className="showcase-card-title">{title}</h3>
                      <button className="btn-detail-trigger" onClick={() => setActiveRecipe(recipe)}>
                        {lang === 'tr' ? 'Tarifi Gör' : 'See Recipe'} <ChevronRight size={16} className="arrow-icon" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SUCCESS STORIES SECTION VIEW */}
      {subTab === 'success' && (
        <div className="success-view-container animate-fade-in">
          {transformations.length === 0 ? (
            <div className="no-items-box glass">
              <p>{lang === 'tr' ? 'Henüz başarı hikayesi eklenmemiş.' : 'No success stories added yet.'}</p>
            </div>
          ) : (
            <div className="transformations-grid">
              {transformations.map((trans, index) => {
                const duration = lang === 'tr' ? trans.durationTr : trans.durationEn;
                const comment = lang === 'tr' ? trans.commentTr : trans.commentEn;
                const stats = lang === 'tr' ? trans.statsTr : trans.statsEn;

                return (
                  <div 
                    key={trans.id} 
                    className="trans-card glass hover-glow"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="trans-header">
                      <div className="trans-user-info">
                        <h4>{trans.name}</h4>
                        <span className="trans-duration">{duration}</span>
                      </div>
                      <div className="trans-weight-badge">
                        <Sparkles size={14} className="sparkle" />
                        <span>{trans.lostWeight}</span>
                      </div>
                    </div>

                    <div className="trans-body">
                      <div className="quote-mark">“</div>
                      <p className="trans-comment">{comment}</p>
                    </div>

                    {stats && (
                      <div className="trans-footer">
                        <div className="trans-stat-pill">
                          <span className="lbl">{lang === 'tr' ? 'Değişim:' : 'Change:'}</span>
                          <span className="val">{stats}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* RECIPE DETAILS MODAL */}
      {activeRecipe && (
        <div className="modal-overlay active" onClick={() => setActiveRecipe(null)}>
          <div className="modal-content recipe-modal glass" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveRecipe(null)}>
              <X size={20} />
            </button>
            
            <div className="recipe-modal-header" style={{ background: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url(${activeRecipe.image}) center/cover no-repeat` }}>
              <div className="recipe-modal-title-box">
                <span className="recipe-modal-badge">{lang === 'tr' ? activeRecipe.category : activeRecipe.categoryEn}</span>
                <h3>{lang === 'tr' ? activeRecipe.titleTr : activeRecipe.titleEn}</h3>
              </div>
            </div>

            <div className="recipe-modal-stats">
              <div className="modal-stat-box">
                <Clock size={18} className="blue" />
                <div>
                  <span className="stat-lbl">{lang === 'tr' ? 'Hazırlama' : 'Prep Time'}</span>
                  <span className="stat-val">{lang === 'tr' ? activeRecipe.prepTime : activeRecipe.prepTimeEn}</span>
                </div>
              </div>
              <div className="modal-stat-box">
                <Flame size={18} className="orange" />
                <div>
                  <span className="stat-lbl">{lang === 'tr' ? 'Enerji Değeri' : 'Energy'}</span>
                  <span className="stat-val">{activeRecipe.calories} kcal</span>
                </div>
              </div>
            </div>

            <div className="recipe-modal-body">
              <div className="recipe-section">
                <h4 className="recipe-sub-title">{lang === 'tr' ? 'Malzemeler' : 'Ingredients'}</h4>
                <p className="recipe-text">
                  {lang === 'tr' ? activeRecipe.ingredientsTr : activeRecipe.ingredientsEn}
                </p>
              </div>

              <div className="recipe-section">
                <h4 className="recipe-sub-title">{lang === 'tr' ? 'Nasıl Hazırlanır?' : 'Preparation'}</h4>
                <p className="recipe-text">
                  {lang === 'tr' ? activeRecipe.instructionsTr : activeRecipe.instructionsEn}
                </p>
              </div>
            </div>

            <div className="recipe-modal-footer">
              <div className="disclaimer-box">
                <HelpCircle size={14} />
                <span>{lang === 'tr' ? 'Tariflerin porsiyon kontrolü için diyetisyeninize danışın.' : 'Consult your dietitian for portion control of the recipes.'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Showcase;

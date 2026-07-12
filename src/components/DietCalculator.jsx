import React, { useState } from 'react';
import { X, Scale, Flame, Droplet, Target, ShieldCheck, HelpCircle } from 'lucide-react';
import './DietCalculator.css';

const DietCalculator = ({ isOpen, onClose, t, lang }) => {
  const [activeTab, setActiveTab] = useState('bmi'); // bmi, bmr, ideal, water, macro

  // Input states
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState('female'); // male, female
  const [activity, setActivity] = useState(1.375); // 1.2, 1.375, 1.55, 1.725, 1.9
  const [exerciseHours, setExerciseHours] = useState(0.5);
  const [goal, setGoal] = useState('lose'); // lose, maintain, gain
  
  // Custom weight tracking states for Ideal weight tab
  const [startWeight, setStartWeight] = useState(85);
  const [customTargetWeight, setCustomTargetWeight] = useState(65);

  // Custom water log states
  const [drunkWater, setDrunkWater] = useState(() => {
    const saved = localStorage.getItem(`suda_water_${new Date().toDateString()}`);
    return saved ? parseFloat(saved) : 0;
  });

  const updateDrunkWater = (newVal) => {
    const val = parseFloat(Math.max(0, newVal).toFixed(2));
    setDrunkWater(val);
    localStorage.setItem(`suda_water_${new Date().toDateString()}`, val.toString());
  };

  if (!isOpen) return null;

  // 1. BMI Calculation
  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmiVal = weight / (heightInMeters * heightInMeters);
    return parseFloat(bmiVal.toFixed(1));
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return {
        label: lang === 'tr' ? 'Zayıf' : 'Underweight',
        color: '#38bdf8',
        pct: 20,
        advice: lang === 'tr' 
          ? 'Metabolik dengeniz için besleyici gıdalar ve dengeli kalorilerle sağlıklı kilo almanız önerilir.' 
          : 'It is recommended to gain weight healthily with nutrient-rich foods and balanced calories for metabolic balance.'
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        label: lang === 'tr' ? 'Normal / Sağlıklı' : 'Normal / Healthy',
        color: '#4ade80',
        pct: 50,
        advice: lang === 'tr' 
          ? 'Harika! Kilonuz boyunuza göre oldukça dengeli. Aktif yaşamınızı ve sağlıklı beslenmenizi sürdürün.' 
          : 'Great! Your weight is well-balanced for your height. Maintain your active lifestyle and healthy diet.'
      };
    } else if (bmi >= 25 && bmi < 30) {
      return {
        label: lang === 'tr' ? 'Fazla Kilolu' : 'Overweight',
        color: '#fb923c',
        pct: 75,
        advice: lang === 'tr' 
          ? 'Hafif bir kalori kısıtlaması ve düzenli fiziksel aktivite ile ideal kilonuza ulaşabilirsiniz.' 
          : 'You can reach your ideal weight with moderate calorie restriction and regular physical activity.'
      };
    } else {
      return {
        label: lang === 'tr' ? 'Obez' : 'Obese',
        color: '#f87171',
        pct: 95,
        advice: lang === 'tr' 
          ? 'Kardiyovasküler sağlık risklerini azaltmak için uzman eşliğinde kişiselleştirilmiş bir beslenme programı tavsiye edilir.' 
          : 'A personalized nutrition program supervised by a specialist is recommended to reduce cardiovascular health risks.'
      };
    }
  };

  const bmi = calculateBMI();
  const bmiCat = getBMICategory(bmi);

  // 2. BMR Calculation (Mifflin-St Jeor)
  const calculateBMR = () => {
    let bmrVal = 0;
    if (gender === 'male') {
      bmrVal = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmrVal = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    return Math.round(bmrVal);
  };

  const bmr = calculateBMR();
  const tdee = Math.round(bmr * activity);

  // 3. Ideal Weight Calculation (Devine Formula)
  const calculateIdealWeight = () => {
    const heightInInches = height / 2.54;
    const baseHeightInches = 60; // 5 feet
    const diff = heightInInches - baseHeightInches;
    
    let ideal = 0;
    if (gender === 'male') {
      ideal = 50.0 + 2.3 * Math.max(0, diff);
    } else {
      ideal = 45.5 + 2.3 * Math.max(0, diff);
    }
    return parseFloat(ideal.toFixed(1));
  };

  const idealWeight = calculateIdealWeight();

  // 4. Water Intake Calculation
  const calculateWaterIntake = () => {
    const baseWater = weight * 0.033; // 33 ml per kg
    const extraWater = exerciseHours * 0.5; // 500ml per hour of exercise
    return parseFloat((baseWater + extraWater).toFixed(1));
  };

  const waterIntake = calculateWaterIntake();

  // 5. Macro Calculation
  const calculateMacros = () => {
    let targetCalories = tdee;
    if (goal === 'lose') targetCalories = tdee - 500;
    if (goal === 'gain') targetCalories = tdee + 400;

    targetCalories = Math.max(1200, targetCalories); // Safe minimum floor

    let carbPct = 0.5, protPct = 0.2, fatPct = 0.3;
    if (goal === 'lose') {
      carbPct = 0.4;
      protPct = 0.3;
      fatPct = 0.3;
    } else if (goal === 'gain') {
      carbPct = 0.5;
      protPct = 0.25;
      fatPct = 0.25;
    }

    const proteinGrams = Math.round((targetCalories * protPct) / 4);
    const carbGrams = Math.round((targetCalories * carbPct) / 4);
    const fatGrams = Math.round((targetCalories * fatPct) / 9);

    return {
      calories: targetCalories,
      protein: proteinGrams,
      carbs: carbGrams,
      fat: fatGrams
    };
  };

  const macros = calculateMacros();

  return (
    <div className="calculator-backdrop" onClick={onClose}>
      <div className="calculator-modal glass hover-glow" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Kapat">
          <X size={20} />
        </button>

        <div className="modal-header-section">
          <div className="icon-wrapper">
            <Scale size={24} className="accent-glow-icon" />
          </div>
          <h2>{lang === 'tr' ? 'Diyet Hesaplama Araçları' : 'Diet Calculator Suite'}</h2>
          <p>{lang === 'tr' ? 'Metabolik analizlerinizi yaparak size en uygun hedefleri belirleyin.' : 'Perform your metabolic analysis and discover your customized targets.'}</p>
        </div>

        {/* Tab Headers */}
        <div className="tabs-header">
          <button className={`tab-btn ${activeTab === 'bmi' ? 'active' : ''}`} onClick={() => setActiveTab('bmi')}>
            <Scale size={16} />
            <span>{lang === 'tr' ? 'VKİ (BMI)' : 'BMI'}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'bmr' ? 'active' : ''}`} onClick={() => setActiveTab('bmr')}>
            <Flame size={16} />
            <span>{lang === 'tr' ? 'BMH (BMR)' : 'BMR'}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'ideal' ? 'active' : ''}`} onClick={() => setActiveTab('ideal')}>
            <Target size={16} />
            <span>{lang === 'tr' ? 'İdeal Kilo' : 'Ideal Weight'}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'water' ? 'active' : ''}`} onClick={() => setActiveTab('water')}>
            <Droplet size={16} />
            <span>{lang === 'tr' ? 'Su İhtiyacı' : 'Water Intake'}</span>
          </button>
          <button className={`tab-btn ${activeTab === 'macro' ? 'active' : ''}`} onClick={() => setActiveTab('macro')}>
            <ShieldCheck size={16} />
            <span>{lang === 'tr' ? 'Makro Besin' : 'Macros'}</span>
          </button>
        </div>

        <div className="calculator-body">
          {/* Inputs Section */}
          <div className="calculator-inputs-panel">
            <h3 className="panel-title">{lang === 'tr' ? 'Kişisel Bilgileriniz' : 'Your Personal Metrics'}</h3>
            
            {/* Gender Selector */}
            <div className="input-group">
              <label>{lang === 'tr' ? 'Cinsiyet' : 'Gender'}</label>
              <div className="gender-toggle">
                <button 
                  type="button" 
                  className={`gender-btn ${gender === 'female' ? 'active' : ''}`} 
                  onClick={() => setGender('female')}
                >
                  {lang === 'tr' ? 'Kadın' : 'Female'}
                </button>
                <button 
                  type="button" 
                  className={`gender-btn ${gender === 'male' ? 'active' : ''}`} 
                  onClick={() => setGender('male')}
                >
                  {lang === 'tr' ? 'Erkek' : 'Male'}
                </button>
              </div>
            </div>

            {/* Height & Weight Sliders */}
            <div className="input-group">
              <div className="label-val-row">
                <label>{lang === 'tr' ? 'Boy (cm)' : 'Height (cm)'}</label>
                <span className="value-badge">{height} cm</span>
              </div>
              <input 
                type="range" 
                min="120" 
                max="220" 
                value={height} 
                onChange={(e) => setHeight(parseInt(e.target.value))} 
                className="custom-range"
              />
            </div>

            <div className="input-group">
              <div className="label-val-row">
                <label>{lang === 'tr' ? 'Kilo (kg)' : 'Weight (kg)'}</label>
                <span className="value-badge">{weight} kg</span>
              </div>
              <input 
                type="range" 
                min="35" 
                max="180" 
                value={weight} 
                onChange={(e) => setWeight(parseInt(e.target.value))} 
                className="custom-range"
              />
            </div>

            {/* Age Input */}
            <div className="input-group">
              <div className="label-val-row">
                <label>{lang === 'tr' ? 'Yaş' : 'Age'}</label>
                <span className="value-badge">{age}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={age} 
                onChange={(e) => setAge(parseInt(e.target.value))} 
                className="custom-range"
              />
            </div>

            {/* Extra inputs based on active tab */}
            {activeTab === 'bmr' && (
              <div className="input-group">
                <label>{lang === 'tr' ? 'Günlük Aktivite Düzeyi' : 'Daily Activity Level'}</label>
                <select 
                  value={activity} 
                  onChange={(e) => setActivity(parseFloat(e.target.value))}
                  className="custom-select"
                >
                  <option value="1.2">{lang === 'tr' ? 'Hareketsiz (Ofis İşi, Egzersiz Yok)' : 'Sedentary (No Exercise)'}</option>
                  <option value="1.375">{lang === 'tr' ? 'Hafif Aktif (Haftada 1-3 Gün Egzersiz)' : 'Light Active (Exercise 1-3 days/week)'}</option>
                  <option value="1.55">{lang === 'tr' ? 'Orta Aktif (Haftada 3-5 Gün Egzersiz)' : 'Moderate Active (Exercise 3-5 days/week)'}</option>
                  <option value="1.725">{lang === 'tr' ? 'Çok Aktif (Haftada 6-7 Gün Ağır Egzersiz)' : 'Very Active (Heavy Exercise 6-7 days/week)'}</option>
                  <option value="1.9">{lang === 'tr' ? 'Ekstra Aktif (Ağır Spor / Atletik Antrenman)' : 'Extra Active (Professional Athlete)'}</option>
                </select>
              </div>
            )}

            {activeTab === 'water' && (
              <div className="input-group">
                <div className="label-val-row">
                  <label>{lang === 'tr' ? 'Günlük Egzersiz Süresi (Saat)' : 'Daily Exercise (Hours)'}</label>
                  <span className="value-badge">{exerciseHours} saat</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="4" 
                  step="0.5"
                  value={exerciseHours} 
                  onChange={(e) => setExerciseHours(parseFloat(e.target.value))} 
                  className="custom-range"
                />
              </div>
            )}

            {activeTab === 'ideal' && (
              <>
                <div className="input-group">
                  <div className="label-val-row">
                    <label>{lang === 'tr' ? 'Diyet Başlangıç Kilonuz (kg)' : 'Diet Starting Weight (kg)'}</label>
                    <span className="value-badge">{startWeight} kg</span>
                  </div>
                  <input 
                    type="range" 
                    min="35" 
                    max="180" 
                    value={startWeight} 
                    onChange={(e) => setStartWeight(parseInt(e.target.value))} 
                    className="custom-range"
                  />
                </div>
                <div className="input-group">
                  <div className="label-val-row">
                    <label>{lang === 'tr' ? 'Kişisel Hedef Kilonuz (kg)' : 'Personal Goal Weight (kg)'}</label>
                    <span className="value-badge">{customTargetWeight} kg</span>
                  </div>
                  <input 
                    type="range" 
                    min="35" 
                    max="180" 
                    value={customTargetWeight} 
                    onChange={(e) => setCustomTargetWeight(parseInt(e.target.value))} 
                    className="custom-range"
                  />
                </div>
              </>
            )}

            {activeTab === 'macro' && (
              <>
                <div className="input-group">
                  <label>{lang === 'tr' ? 'Günlük Aktivite Düzeyi' : 'Daily Activity Level'}</label>
                  <select 
                    value={activity} 
                    onChange={(e) => setActivity(parseFloat(e.target.value))}
                    className="custom-select"
                  >
                    <option value="1.2">{lang === 'tr' ? 'Hareketsiz (Ofis İşi, Egzersiz Yok)' : 'Sedentary (No Exercise)'}</option>
                    <option value="1.375">{lang === 'tr' ? 'Hafif Aktif (Haftada 1-3 Gün Egzersiz)' : 'Light Active (Exercise 1-3 days/week)'}</option>
                    <option value="1.55">{lang === 'tr' ? 'Orta Aktif (Haftada 3-5 Gün Egzersiz)' : 'Moderate Active (Exercise 3-5 days/week)'}</option>
                    <option value="1.725">{lang === 'tr' ? 'Çok Aktif (Haftada 6-7 Gün Ağır Egzersiz)' : 'Very Active (Heavy Exercise 6-7 days/week)'}</option>
                    <option value="1.9">{lang === 'tr' ? 'Ekstra Aktif (Ağır Spor)' : 'Extra Active (Heavy Sport)'}</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>{lang === 'tr' ? 'Beslenme Hedefiniz' : 'Nutrition Goal'}</label>
                  <div className="goal-selector">
                    <button 
                      type="button" 
                      className={`goal-btn ${goal === 'lose' ? 'active' : ''}`} 
                      onClick={() => setGoal('lose')}
                    >
                      {lang === 'tr' ? 'Kilo Verme' : 'Lose Weight'}
                    </button>
                    <button 
                      type="button" 
                      className={`goal-btn ${goal === 'maintain' ? 'active' : ''}`} 
                      onClick={() => setGoal('maintain')}
                    >
                      {lang === 'tr' ? 'Korumak' : 'Maintain'}
                    </button>
                    <button 
                      type="button" 
                      className={`goal-btn ${goal === 'gain' ? 'active' : ''}`} 
                      onClick={() => setGoal('gain')}
                    >
                      {lang === 'tr' ? 'Kas / Kilo Alma' : 'Gain Muscle'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Results Panel */}
          <div className="calculator-results-panel">
            {activeTab === 'bmi' && (
              <div className="result-container animate-fade-in">
                <h4 className="result-title">{lang === 'tr' ? 'Vücut Kitle Endeksiniz' : 'Your Body Mass Index'}</h4>
                <div className="bmi-gauge">
                  <span className="bmi-val" style={{ color: bmiCat.color }}>{bmi}</span>
                  <span className="bmi-unit">kg/m²</span>
                </div>
                <div className="bmi-category" style={{ background: `${bmiCat.color}15`, color: bmiCat.color, border: `1px solid ${bmiCat.color}40` }}>
                  {bmiCat.label}
                </div>
                
                {/* Visual Scale bar */}
                <div className="bmi-bar-wrapper">
                  <div className="bmi-scale-bar">
                    <div className="bmi-marker" style={{ left: `${bmiCat.pct}%`, background: bmiCat.color }}></div>
                  </div>
                  <div className="bmi-labels-row">
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                  </div>
                </div>

                <div className="advice-box glass-light">
                  <HelpCircle className="advice-icon" size={16} />
                  <p>{bmiCat.advice}</p>
                </div>
              </div>
            )}

            {activeTab === 'bmr' && (
              <div className="result-container animate-fade-in">
                <h4 className="result-title">{lang === 'tr' ? 'Metabolik İhtiyaçlarınız' : 'Metabolic Demands'}</h4>
                
                <div className="results-grid-mini">
                  <div className="stat-card glass-light">
                    <span className="stat-num">{bmr}</span>
                    <span className="stat-lbl">kcal / {lang === 'tr' ? 'Gün (Bazal)' : 'Day (BMR)'}</span>
                    <span className="stat-info">{lang === 'tr' ? 'Hiç hareket etmeden harcanan enerji' : 'Energy spent at absolute rest'}</span>
                  </div>
                  
                  <div className="stat-card glass-light highlight-glow">
                    <span className="stat-num text-gradient">{tdee}</span>
                    <span className="stat-lbl">kcal / {lang === 'tr' ? 'Gün (Aktif)' : 'Day (TDEE)'}</span>
                    <span className="stat-info">{lang === 'tr' ? 'Günlük hareketiniz dahil toplam harcanan' : 'Total energy spent with daily movement'}</span>
                  </div>
                </div>

                <div className="advice-box glass-light">
                  <HelpCircle className="advice-icon" size={16} />
                  <p>
                    {lang === 'tr' 
                      ? 'Kilonuzu korumak için günlük aktif enerji miktarı kadar kalori almalısınız. Kilo vermek için bu miktardan 400-500 kcal azaltarak sağlıklı beslenmelisiniz.'
                      : 'To maintain weight, you should consume your active energy amount (TDEE). To lose weight safely, subtract 400-500 kcal from this daily intake.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'ideal' && (() => {
              const diffToTarget = Math.abs(startWeight - customTargetWeight);
              const completedDiff = Math.abs(startWeight - weight);
              const progressPct = diffToTarget > 0 ? Math.min(100, Math.max(0, Math.round((completedDiff / diffToTarget) * 100))) : 0;
              const isWeightLoss = startWeight > customTargetWeight;
              
              return (
                <div className="result-container animate-fade-in">
                  <h4 className="result-title">{lang === 'tr' ? 'İdeal Kilo & Kilo Takip İlerlemesi' : 'Ideal Weight & Progress Tracker'}</h4>
                  
                  <div className="results-grid-mini" style={{ marginBottom: '15px', gap: '10px' }}>
                    <div className="stat-card glass-light" style={{ padding: '10px' }}>
                      <span className="stat-num" style={{ fontSize: '1.2rem' }}>{idealWeight} kg</span>
                      <span className="stat-lbl" style={{ fontSize: '0.7rem' }}>{lang === 'tr' ? 'Formül İdeal Kilosu' : 'Formula Ideal Weight'}</span>
                    </div>
                    <div className="stat-card glass-light highlight-glow" style={{ padding: '10px' }}>
                      <span className="stat-num text-gradient" style={{ fontSize: '1.2rem' }}>{customTargetWeight} kg</span>
                      <span className="stat-lbl" style={{ fontSize: '0.7rem' }}>{lang === 'tr' ? 'Sizin Hedefiniz' : 'Your Personal Goal'}</span>
                    </div>
                  </div>

                  {/* Interactive progress bar */}
                  <div className="weight-progress-section glass-light" style={{ padding: '15px', borderRadius: '12px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
                      <span style={{ color: 'var(--accent-purple)' }}>{lang === 'tr' ? 'Başlangıç: ' : 'Start: '}{startWeight} kg</span>
                      <span style={{ color: 'var(--accent-turquoise)' }}>{lang === 'tr' ? 'Mevcut: ' : 'Current: '}{weight} kg</span>
                      <span style={{ color: 'var(--accent-gold)' }}>{lang === 'tr' ? 'Hedef: ' : 'Goal: '}{customTargetWeight} kg</span>
                    </div>
                    
                    <div className="progress-bar-container" style={{ background: 'rgba(255,255,255,0.05)', height: '10px', borderRadius: '5px', overflow: 'hidden', position: 'relative' }}>
                      <div className="progress-bar-fill" style={{ 
                        width: `${progressPct}%`, 
                        height: '100%', 
                        background: 'linear-gradient(90deg, var(--accent-purple) 0%, var(--accent-turquoise) 100%)',
                        borderRadius: '5px',
                        transition: 'width 0.4s ease'
                      }}></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{lang === 'tr' ? `Tamamlanan: %${progressPct}` : `Completed: ${progressPct}%`}</span>
                      <span style={{ fontWeight: 700, color: progressPct === 100 ? '#4ade80' : '#fb923c' }}>
                        {progressPct === 100 
                          ? (lang === 'tr' ? 'Hedefe Ulaşıldı! 🎉' : 'Goal Reached! 🎉') 
                          : isWeightLoss 
                            ? (weight > customTargetWeight 
                              ? (lang === 'tr' ? `Kalan: ${parseFloat((weight - customTargetWeight).toFixed(1))} kg` : `Remaining: ${parseFloat((weight - customTargetWeight).toFixed(1))} kg`)
                              : (lang === 'tr' ? 'Hedef Aşıldı!' : 'Below Goal!'))
                            : (weight < customTargetWeight
                              ? (lang === 'tr' ? `Kalan: ${parseFloat((customTargetWeight - weight).toFixed(1))} kg` : `Remaining: ${parseFloat((customTargetWeight - weight).toFixed(1))} kg`)
                              : (lang === 'tr' ? 'Hedef Aşıldı!' : 'Above Goal!'))
                        }
                      </span>
                    </div>
                  </div>

                  <div className="weight-comparison">
                    {weight > idealWeight ? (
                      <span className="comparison-tag over">
                        {lang === 'tr' ? `Formül İdealinden ${parseFloat((weight - idealWeight).toFixed(1))} kg fazlanız var` : `${parseFloat((weight - idealWeight).toFixed(1))} kg above formula ideal`}
                      </span>
                    ) : weight < idealWeight ? (
                      <span className="comparison-tag under">
                        {lang === 'tr' ? `Formül İdealinden ${parseFloat((idealWeight - weight).toFixed(1))} kg eksiksiniz` : `${parseFloat((idealWeight - weight).toFixed(1))} kg below formula ideal`}
                      </span>
                    ) : (
                      <span className="comparison-tag normal">
                        {lang === 'tr' ? 'Tam ideal kilodasınız!' : 'You are at your perfect ideal weight!'}
                      </span>
                    )}
                  </div>

                  <div className="advice-box glass-light" style={{ marginTop: '10px' }}>
                    <HelpCircle className="advice-icon" size={16} />
                    <p>
                      {lang === 'tr'
                        ? 'Kişisel hedefinizi ve diyet başlangıç kilonuzu kaydırarak hedefinize ne kadar yaklaştığınızı takip edebilirsiniz.'
                        : 'You can adjust your starting weight and personal goal to track how close you are to your targets.'}
                    </p>
                  </div>
                </div>
              );
            })()}

            {activeTab === 'water' && (
              <div className="result-container animate-fade-in">
                <h4 className="result-title">{lang === 'tr' ? 'Günlük Su İhtiyacı & Tüketimi' : 'Daily Water Log'}</h4>
                
                <div className="results-grid-mini" style={{ marginBottom: '15px', gap: '10px' }}>
                  <div className="stat-card glass-light" style={{ padding: '10px' }}>
                    <span className="stat-num" style={{ fontSize: '1.25rem', color: '#60a5fa' }}>{waterIntake} L</span>
                    <span className="stat-lbl" style={{ fontSize: '0.7rem' }}>{lang === 'tr' ? 'Günlük Hedef' : 'Daily Target'}</span>
                  </div>
                  <div className="stat-card glass-light highlight-glow" style={{ padding: '10px', borderColor: 'rgba(96, 165, 250, 0.3)' }}>
                    <span className="stat-num text-gradient" style={{ fontSize: '1.25rem', color: '#60a5fa' }}>{drunkWater} L</span>
                    <span className="stat-lbl" style={{ fontSize: '0.7rem' }}>{lang === 'tr' ? 'İçilen Miktar' : 'Logged Water'}</span>
                  </div>
                </div>

                {/* Animated Water cup effect */}
                <div className="water-cup-container" style={{ margin: '15px auto' }}>
                  <div className="water-waves" style={{ height: `${Math.min(100, (drunkWater / waterIntake) * 100)}%` }}></div>
                </div>

                {/* Drunk Water Control Buttons */}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
                  <button 
                    type="button" 
                    className="system-btn"
                    style={{ background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa', border: '1px solid rgba(96, 165, 250, 0.3)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                    onClick={() => updateDrunkWater(drunkWater + 0.25)}
                  >
                    +0.25 L {lang === 'tr' ? '(Bardak)' : '(Glass)'}
                  </button>
                  <button 
                    type="button" 
                    className="system-btn"
                    style={{ background: 'rgba(96, 165, 250, 0.15)', color: '#60a5fa', border: '1px solid rgba(96, 165, 250, 0.3)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                    onClick={() => updateDrunkWater(drunkWater + 0.50)}
                  >
                    +0.50 L {lang === 'tr' ? '(Şişe)' : '(Bottle)'}
                  </button>
                  <button 
                    type="button" 
                    className="system-btn"
                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}
                    onClick={() => updateDrunkWater(0)}
                  >
                    {lang === 'tr' ? 'Sıfırla' : 'Reset'}
                  </button>
                </div>

                {drunkWater >= waterIntake && (
                  <div className="alert-message success animate-scale-up" style={{ marginBottom: '15px', background: 'rgba(74, 222, 128, 0.1)', borderColor: 'rgba(74, 222, 128, 0.3)', color: '#4ade80' }}>
                    <span>🎉 {lang === 'tr' ? 'Tebrikler! Bugünlük su hedefinize ulaştınız.' : 'Congratulations! You reached your water goal today.'} 💧</span>
                  </div>
                )}

                <div className="advice-box glass-light">
                  <HelpCircle className="advice-icon" size={16} />
                  <p>
                    {lang === 'tr'
                      ? 'Metabolizmanın hızlı çalışması, sindirim sistemi sağlığı ve toksinlerin atılması için su tüketimini gün içine yayarak yapmalısınız.'
                      : 'For fast metabolism, digestive system health, and detoxification, you should spread your water intake throughout the day.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'macro' && (
              <div className="result-container animate-fade-in">
                <h4 className="result-title">{lang === 'tr' ? 'Günlük Makro Paylaşımı' : 'Macro Nutrient Splits'}</h4>
                <div className="macro-target-calories">
                  <span>{macros.calories} kcal / {lang === 'tr' ? 'Hedef Kalori' : 'Target Calories'}</span>
                </div>

                <div className="macros-breakdown">
                  <div className="macro-row">
                    <div className="macro-info">
                      <span className="macro-label">{lang === 'tr' ? 'Karbonhidrat' : 'Carbs'}</span>
                      <span className="macro-val">{macros.carbs}g</span>
                    </div>
                    <div className="macro-bar-container">
                      <div className="macro-bar carb-bar" style={{ width: goal === 'lose' ? '40%' : '50%' }}></div>
                    </div>
                  </div>

                  <div className="macro-row">
                    <div className="macro-info">
                      <span className="macro-label">{lang === 'tr' ? 'Protein' : 'Protein'}</span>
                      <span className="macro-val">{macros.protein}g</span>
                    </div>
                    <div className="macro-bar-container">
                      <div className="macro-bar protein-bar" style={{ width: goal === 'lose' ? '30%' : goal === 'gain' ? '25%' : '20%' }}></div>
                    </div>
                  </div>

                  <div className="macro-row">
                    <div className="macro-info">
                      <span className="macro-label">{lang === 'tr' ? 'Yağ' : 'Fat'}</span>
                      <span className="macro-val">{macros.fat}g</span>
                    </div>
                    <div className="macro-bar-container">
                      <div className="macro-bar fat-bar" style={{ width: goal === 'lose' ? '30%' : goal === 'gain' ? '25%' : '30%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="advice-box glass-light">
                  <HelpCircle className="advice-icon" size={16} />
                  <p>
                    {lang === 'tr'
                      ? 'Karbonhidratları tam tahıllı, proteinleri kaliteli ve yağları zeytinyağı, kuruyemiş gibi sağlıklı kaynaklardan almaya özen gösterin.'
                      : 'Focus on getting carbohydrates from whole grains, proteins from high-quality sources, and fats from healthy sources like olive oil and nuts.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietCalculator;

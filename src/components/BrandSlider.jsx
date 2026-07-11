import React from 'react';
import './BrandSlider.css';

const BrandSlider = () => {
  const brands = [
    { name: 'Logo ERP', type: 'Integration' },
    { name: 'AWS Cloud', type: 'Infrastructure' },
    { name: 'Shopify Plus', type: 'E-Commerce' },
    { name: 'Stripe Pay', type: 'Payments' },
    { name: 'SAP ERP', type: 'Enterprise' },
    { name: 'Node.js API', type: 'Backend' },
    { name: 'React Native', type: 'Mobile' },
    { name: 'Docker Ops', type: 'DevOps' }
  ];

  // Duplicate the array to create a seamless infinite marquee effect
  const marqueeItems = [...brands, ...brands, ...brands];

  return (
    <div className="brand-slider-wrapper">
      <div className="brand-slider-container">
        <div className="brand-slider-track">
          {marqueeItems.map((brand, index) => (
            <div key={index} className="brand-card glass">
              <span className="brand-card-name">{brand.name}</span>
              <span className="brand-card-tag">{brand.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;

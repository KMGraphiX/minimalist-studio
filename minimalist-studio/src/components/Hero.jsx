import React from 'react';

/**
 * High-end minimal Hero section.
 * Designed for a luxury electronics brand aesthetic.
 */
const Hero = () => {
  return (
    <section className="hero">
      {/* Left Column: Branding and Actions */}
      <div className="hero-left">
        <div className="hero-content">
          <h1 className="hero-headline">
            SYSTEM 01<br />
            ESSENTIALS
          </h1>
          
          <p className="hero-subheading">
            DEFINING THE FUTURE OF MINIMALIST AUDIO TECHNOLOGY. 
            PURE SOUND, STRIPPED OF EXCESS.
          </p>
          
          <div className="hero-actions">
            <button className="cta-primary" aria-label="Discover our collection">
              DISCOVER COLLECTION
            </button>
            <a href="#specs" className="text-link">
              TECHNICAL SPECIFICATIONS
            </a>
          </div>

          <div className="hero-search-container">
            <input 
              type="text" 
              placeholder="SEARCH PRODUCTS" 
              className="hero-search-input" 
              aria-label="Search products"
            />
          </div>
        </div>
      </div>

      {/* Right Column: Visual Product Placeholder */}
      <div className="hero-right">
        <div className="image-placeholder">
          <div className="placeholder-overlay">
            <div className="bw-placeholder">
              <div className="placeholder-pattern"></div>
              <span className="placeholder-text">PRODUCT_PREVIEW</span>
            </div>
          </div>
          {/* A secondary border-box for a more "designed" look */}
          <div className="visual-accent-box"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
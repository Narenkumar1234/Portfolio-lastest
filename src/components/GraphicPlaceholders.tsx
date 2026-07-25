import React from 'react';
import heroImg from '../assets/hero.png';
import heroImg3 from '../assets/hero3.png';
import '../styles/components/Placeholders.css';

interface DesignerAvatarProps {
  type?: 'hero' | 'why-hire-me';
}

export const DesignerAvatarPlaceholder: React.FC<DesignerAvatarProps> = ({ type = 'hero' }) => {
  const currentImage = type === 'why-hire-me' ? heroImg3 : heroImg;

  return (
    <div className={`avatar-graphic-container ${type}`}>
      {/* Background Vibrant Arch */}
      <div className="arch-background"></div>

      {/* Naren Image Asset */}
      <div className="avatar-character-wrapper">
        <img 
          src={currentImage} 
          alt={type === 'why-hire-me' ? "Why Hire Naren - Product Designer" : "Naren - Senior Product Designer"} 
          className={`hero-avatar-img ${type}`} 
        />
      </div>
    </div>
  );
};

interface ServicePreviewProps {
  type: 'ui-ux' | 'web-design' | 'landing-page';
}

export const ServiceUIPreview: React.FC<ServicePreviewProps> = ({ type }) => {
  return (
    <div className={`service-preview-frame ${type}`}>
      <div className="preview-top-bar">
        <div className="dot-red"></div>
        <div className="dot-yellow"></div>
        <div className="dot-green"></div>
      </div>
      <div className="preview-grid-layout">
        {type === 'ui-ux' && (
          <>
            <div className="preview-card-box">
              <div className="skeleton-circle"></div>
              <div className="skeleton-line orange"></div>
              <div className="skeleton-line short"></div>
            </div>
            <div className="preview-card-box" style={{ background: '#F0F4FF', border: '1px solid #D6E0FF' }}>
              <div className="skeleton-line orange" style={{ width: '80%' }}></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short" style={{ background: '#13265C' }}></div>
            </div>
          </>
        )}

        {type === 'web-design' && (
          <>
            <div className="preview-card-box" style={{ gridColumn: 'span 2', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div className="skeleton-line orange" style={{ width: '30%' }}></div>
                <div className="skeleton-line" style={{ width: '30%' }}></div>
              </div>
              <div className="skeleton-line" style={{ width: '90%' }}></div>
              <div className="skeleton-line short"></div>
            </div>
          </>
        )}

        {type === 'landing-page' && (
          <>
            <div className="preview-card-box" style={{ background: '#F0F4FF', borderColor: '#D6E0FF' }}>
              <div className="skeleton-line orange" style={{ width: '60%' }}></div>
              <div className="skeleton-line short"></div>
            </div>
            <div className="preview-card-box">
              <div className="skeleton-circle" style={{ background: '#1E1E1E' }}></div>
              <div className="skeleton-line"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const PortfolioCardPreview: React.FC = () => {
  return (
    <div className="portfolio-preview-box">
      <div className="portfolio-mini-screen">
        <div className="skeleton-line orange" style={{ width: '50%' }}></div>
        <div className="skeleton-line" style={{ width: '90%' }}></div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#13265C' }}></div>
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#1E1E1E' }}></div>
          <div style={{ width: '30px', height: '30px', borderRadius: '6px', background: '#E2E2E6' }}></div>
        </div>
      </div>
      <div className="portfolio-mini-screen" style={{ background: '#F0F4FF', borderColor: '#D6E0FF' }}>
        <div className="skeleton-circle" style={{ alignSelf: 'flex-end' }}></div>
        <div className="skeleton-line orange" style={{ width: '70%' }}></div>
        <div className="skeleton-line" style={{ width: '80%' }}></div>
      </div>
      <div className="watermark-brand">Lirante</div>
    </div>
  );
};

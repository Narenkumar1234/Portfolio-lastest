import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { THEME_OPTIONS, type ThemeConfig } from '../data/themes';
import '../styles/components/ThemeSwitcher.css';

export const ThemeSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState<string>(() => {
    return localStorage.getItem('user_portfolio_theme') || 'harmony';
  });

  const applyTheme = (theme: ThemeConfig) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-hover', theme.hover);
    root.style.setProperty('--color-primary-light', theme.lightGlow);
    root.style.setProperty('--color-primary-glow', theme.lightGlow);
    root.style.setProperty('--shadow-hover', `0 20px 40px ${theme.lightGlow}`);

    // Dynamic style overrides for arch backgrounds & dark card contrast text
    let styleSheet = document.getElementById('dynamic-theme-overrides');
    if (!styleSheet) {
      styleSheet = document.createElement('style');
      styleSheet.id = 'dynamic-theme-overrides';
      document.head.appendChild(styleSheet);
    }

    styleSheet.innerHTML = `
      .arch-background {
        background: linear-gradient(180deg, ${theme.archTop} 0%, ${theme.archBottom} 100%) !important;
        box-shadow: 0 20px 50px ${theme.lightGlow} !important;
      }
      .services-dark-card .text-orange,
      .services-dark-card .text-brand,
      .footer-cta-card .text-orange,
      .footer-cta-card .text-brand {
        color: ${theme.darkAccent} !important;
      }
    `;

    localStorage.setItem('user_portfolio_theme', theme.id);
  };

  useEffect(() => {
    const selected = THEME_OPTIONS.find(t => t.id === activeThemeId) || THEME_OPTIONS[0];
    applyTheme(selected);
  }, [activeThemeId]);

  return (
    <div className="theme-switcher-container">
      {/* Floating Toggle Button */}
      <button 
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Color Theme"
      >
        {isOpen ? <X size={22} /> : <Palette size={22} />}
      </button>

      {/* Theme Picker Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="theme-panel"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="theme-panel-header">
              <div>
                <h4 className="theme-panel-title">Theme Palette</h4>
                <p className="theme-panel-subtitle">Select a color mood</p>
              </div>
            </div>

            <div className="theme-grid">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  className={`theme-option-card ${activeThemeId === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveThemeId(t.id);
                    setIsOpen(false);
                  }}
                >
                  <span 
                    className="theme-swatch" 
                    style={{ backgroundColor: t.primary }}
                  />
                  <span className="theme-word">{t.word}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

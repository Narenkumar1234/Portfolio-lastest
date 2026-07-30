import React from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowUpRight } from 'lucide-react';
import { HERO_DATA } from '../data/portfolioData';
import { DesignerAvatarPlaceholder } from './GraphicPlaceholders';
import { SOCIAL_LINKS_DATA } from './SocialIcons';

import swoosh from '../assets/swoosh.svg'
import '../styles/components/Hero.css';


export const Hero: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          {/* Hello Floating Badge */}
          <motion.div
            className="hello-badge-wrapper"
            initial={{ opacity: 0, y: -130 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="hello-badge">
              {HERO_DATA.greetingBadge}
            </div>
            {/* Orange Decorative Swooshes */}
            <img src={swoosh} alt="" className="badge-swoosh-svg"
              width="72"
              height="34" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            I'm <span className="highlight-name">{HERO_DATA.name}</span>,<br />
            {HERO_DATA.role}
          </motion.h1>

          {/* Visual Stage with Arch Graphic & Side Info */}
          <div className="hero-visual-stage">
            {/* Left Quote Info */}
            <motion.div
              className="hero-side-info left-info"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="quote-mark">“</div>
              <p className="quote-text">{HERO_DATA.quote}</p>
            </motion.div>

            {/* Center Character with Arch & Glassmorphic Pill CTAs */}
            <motion.div
              className="hero-character-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <DesignerAvatarPlaceholder type="hero" />

              {/* Glassmorphic Capsule CTAs */}
              <div className="hero-cta-capsule">
                <a href="#portfolio" className="btn-hero-primary">
                  Portfolio <ArrowUpRight size={18} />
                </a>
                <a href="#contact" className="btn-hero-outline">
                  Hire me
                </a>
              </div>
            </motion.div>

            {/* Right Rating Info */}
            <motion.div
              className="hero-side-info right-info"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="star-rating-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--color-primary)" stroke="var(--color-primary)" />
                ))}
              </div>
              <div className="exp-years">{HERO_DATA.experienceYears}</div>
              <div className="exp-subtitle">{HERO_DATA.experienceSubtitle}</div>

              {/* Hero Social Links Row */}
              <div className="hero-social-row">
                {SOCIAL_LINKS_DATA.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hero-social-btn"
                    aria-label={social.ariaLabel}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

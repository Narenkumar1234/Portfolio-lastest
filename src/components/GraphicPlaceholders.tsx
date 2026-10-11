import React from 'react';
import { ArrowUpRight, TrendingUp, CreditCard, Sparkles } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import heroImg from '../assets/hero.png';
import heroImg3 from '../assets/hero3.png';
import type { PortfolioItem, ServiceItem } from '../data/portfolioData';
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
  type: 'expense-tracker' | 'ui-ux' | 'web-design' | 'landing-page';
  service?: ServiceItem;
}

export const ServiceUIPreview: React.FC<ServicePreviewProps> = ({ type }) => {
  if (type === 'expense-tracker') {
    return (
      <div className="service-preview-frame aura-fintech-frame">
        {/* Top App Header */}
        <div className="aura-frame-header">
          <div className="preview-top-bar-dots">
            <div className="dot-red"></div>
            <div className="dot-yellow"></div>
            <div className="dot-green"></div>
          </div>
          <div className="aura-vault-badge">
            <span className="aura-pulse-dot"></span>
            AURA VAULT
          </div>
          <span className="aura-currency-tag">USD ($)</span>
        </div>

        {/* Balance Card */}
        <div className="aura-balance-card">
          <div className="aura-balance-left">
            <span className="aura-balance-label">Total Net Worth</span>
            <span className="aura-balance-amount">$28,450.00</span>
          </div>
          <div className="aura-growth-chip">
            <TrendingUp size={12} />
            +14.8%
          </div>
        </div>

        {/* 50/30/20 Budget Bar */}
        <div className="aura-budget-row">
          <div className="aura-budget-labels">
            <span>50/30/20 Budget</span>
            <span className="aura-burn-text">64% spent</span>
          </div>
          <div className="aura-progress-bar">
            <div className="aura-prog-segment needs" style={{ width: '50%' }} title="Needs: 50%"></div>
            <div className="aura-prog-segment wants" style={{ width: '30%' }} title="Wants: 30%"></div>
            <div className="aura-prog-segment savings" style={{ width: '20%' }} title="Savings: 20%"></div>
          </div>
        </div>

        {/* Recent Transactions Stream */}
        <div className="aura-tx-stream">
          <div className="aura-tx-item">
            <div className="aura-tx-icon salary">
              <Sparkles size={11} />
            </div>
            <div className="aura-tx-info">
              <span className="aura-tx-title">Stripe Payout</span>
              <span className="aura-tx-sub">Income</span>
            </div>
            <span className="aura-tx-val positive">+$3,200.00</span>
          </div>

          <div className="aura-tx-item">
            <div className="aura-tx-icon expense">
              <CreditCard size={11} />
            </div>
            <div className="aura-tx-info">
              <span className="aura-tx-title">Cloud Compute</span>
              <span className="aura-tx-sub">Software</span>
            </div>
            <span className="aura-tx-val negative">-$42.50</span>
          </div>
        </div>

        {/* Action Bar with Links */}
        <div className="aura-action-bar">
          <a
            href="https://expense-tracker-zeta-five-17.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="aura-pill-btn live"
            onClick={(e) => e.stopPropagation()}
          >
            Live Demo <ArrowUpRight size={12} />
          </a>
          <a
            href="https://github.com/Narenkumar1234/Expense-Tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="aura-pill-btn github"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub size={12} /> Code
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`service-preview-frame ${type}`}>
      <div className="preview-top-bar">
        <div className="dot-red"></div>
        <div className="dot-yellow"></div>
        <div className="dot-green"></div>
        <span className="preview-frame-caption">
          {type === 'ui-ux' ? 'MUI Enterprise System' : 'Next.js E-Commerce SSR'}
        </span>
      </div>
      <div className="preview-grid-layout">
        {type === 'ui-ux' && (
          <>
            <div className="preview-card-box">
              <div className="preview-comp-chip active">React + MUI</div>
              <div className="preview-stat-number">99.8%</div>
              <span className="preview-stat-label">Component Uptime</span>
              <div className="skeleton-line orange" style={{ width: '85%' }}></div>
            </div>
            <div className="preview-card-box highlight-blue">
              <div className="preview-comp-chip">Zoho Suite</div>
              <div className="preview-stat-number">40+ Screens</div>
              <span className="preview-stat-label">Enterprise Revamp</span>
              <div className="skeleton-line" style={{ width: '70%' }}></div>
            </div>
          </>
        )}

        {(type === 'web-design' || type === 'landing-page') && (
          <>
            <div className="preview-card-box ecom-box">
              <div className="preview-comp-chip green">Next.js SSR</div>
              <div className="ecom-product-row">
                <div className="ecom-img-badge">Cart: 3</div>
                <div className="ecom-price-tag">$128.00</div>
              </div>
              <div className="ecom-checkout-bar">
                <span>Fast Checkout</span>
                <span className="ecom-speed-pill">&lt; 1.2s</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

interface PortfolioCardPreviewProps {
  project?: PortfolioItem;
}

export const PortfolioCardPreview: React.FC<PortfolioCardPreviewProps> = ({ project }) => {
  const isExpenseTracker = project?.id === 'aura-expense-tracker' || project?.previewType === 'expense-tracker';

  if (isExpenseTracker) {
    return (
      <div className="portfolio-preview-box aura-portfolio-box">
        <div className="portfolio-mini-screen aura-card-emerald">
          <div className="screen-header-row">
            <span className="screen-brand-tag">AURA FINTECH</span>
            <span className="screen-live-tag">LIVE</span>
          </div>
          <div className="aura-mini-networth">
            <span className="lbl">NET WORTH</span>
            <span className="val">$28,450.00</span>
          </div>
          <div className="aura-mini-badges">
            <span className="chip-emerald">50/30/20 Budget</span>
            <span className="chip-cyan">Gemini AI</span>
          </div>
          <div className="aura-mini-card-chip">
            <CreditCard size={13} />
            <span>Aura Obsidian •• 4821</span>
          </div>
        </div>

        <div className="portfolio-mini-screen aura-card-telemetry">
          <div className="telemetry-bar-title">Recent Cashflow</div>
          <div className="mini-stream-line positive">
            <span>Stripe Payout</span>
            <span>+$3,200</span>
          </div>
          <div className="mini-stream-line negative">
            <span>AWS Infrastructure</span>
            <span>-$142</span>
          </div>
          <div className="mini-stream-line negative">
            <span>Apple Cloud</span>
            <span>-$14.99</span>
          </div>
          <div className="mini-stream-footer">
            <span>Firebase Sync</span>
            <span className="sync-pulse">● Active</span>
          </div>
        </div>
        <div className="watermark-brand aura-watermark">Aura</div>
      </div>
    );
  }

  return (
    <div className="portfolio-preview-box">
      <div className="portfolio-mini-screen">
        <div className="screen-header-row">
          <span className="screen-brand-tag">{project?.subtitle || 'Web Application'}</span>
        </div>
        <div className="skeleton-line orange" style={{ width: '60%' }}></div>
        <div className="skeleton-line" style={{ width: '90%' }}></div>
        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: project?.accentColor || '#13265C' }}></div>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#1E1E1E' }}></div>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#E2E2E6' }}></div>
        </div>
      </div>
      <div className="portfolio-mini-screen" style={{ background: '#F0F4FF', borderColor: '#D6E0FF' }}>
        <div className="skeleton-circle" style={{ alignSelf: 'flex-end', background: project?.accentColor || 'var(--color-primary)' }}></div>
        <div className="skeleton-line orange" style={{ width: '70%', background: project?.accentColor || 'var(--color-primary)' }}></div>
        <div className="skeleton-line" style={{ width: '80%' }}></div>
      </div>
      <div className="watermark-brand">{project?.title?.split(' ')[0] || 'Project'}</div>
    </div>
  );
};


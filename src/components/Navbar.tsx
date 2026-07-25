import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { NAV_LINKS } from '../data/portfolioData';
import '../styles/components/Navbar.css';

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is scrolled near bottom of page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="navbar-header">
      {/* Desktop Capsule Header */}
      <motion.nav
        className="nav-capsule"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="#home"
          className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
        >
          Home
        </a>
        <a
          href="#why-hire-me"
          className={`nav-link ${activeSection === 'why-hire-me' ? 'active' : ''}`}
        >
          About
        </a>
        <a
          href="#services"
          className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
        >
          Service
        </a>

        {/* Brand Center Logo */}
        <a href="#home" className="brand-logo">
          <span className="brand-icon">
            <Sparkles size={14} />
          </span>
          @narenkumar.xyz
        </a>

        <a
          href="#experience"
          className={`nav-link ${activeSection === 'experience' ? 'active' : ''}`}
        >
          Resume
        </a>
        <a
          href="#portfolio"
          className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`}
        >
          Project
        </a>
        <a
          href="#contact"
          className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
        >
          Contact
        </a>
      </motion.nav>

      {/* Mobile Toggle Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle Navigation Menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

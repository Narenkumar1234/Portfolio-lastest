import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS_DATA } from './SocialIcons';
import '../styles/components/Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="footer-section">
      <div className="container">
        {/* Contact CTA Block */}
        <motion.div
          className="footer-cta-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="footer-cta-title">
            Have an Awesome Project Idea?<br />
            <span className="text-orange">Let's Talk</span>
          </h2>
          <p className="footer-cta-subtitle">
            Interested in working together or hiring a Frontend Software Engineer? Reach out directly at <strong>narenkumar2001@gmail.com</strong>
          </p>

          <form onSubmit={handleSubmit} className="footer-input-group">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="footer-input"
              required
            />
            <button type="submit" className="btn btn-primary">
              {subscribed ? 'Sent! ✓' : <>Send Message <ArrowUpRight size={18} /></>}
            </button>
          </form>
        </motion.div>

        {/* Footer Bottom Row */}
        <div className="footer-bottom-row">
          <p>© {new Date().getFullYear()} Narenkumar RM. All Rights Reserved.</p>

          <div className="footer-social-links">
            {SOCIAL_LINKS_DATA.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="social-icon-btn"
                aria-label={social.ariaLabel}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

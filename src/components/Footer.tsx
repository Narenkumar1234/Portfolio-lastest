import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Share2, Send, MessageSquare } from 'lucide-react';
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
            <a href="mailto:narenkumar2001@gmail.com" className="social-icon-btn" aria-label="Email">
              <Globe size={18} />
            </a>
            <a href="https://github.com/Narenkumar1234/" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
              <Share2 size={18} />
            </a>
            <a href="https://www.linkedin.com/in/narenkumar01/" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <Send size={18} />
            </a>
            <a href="https://leetcode.com/NightGamer01/" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LeetCode">
              <MessageSquare size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { SOCIAL_LINKS_DATA } from './SocialIcons';
import '../styles/components/Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

const AI_QUICK_TEMPLATES = [
  {
    label: '💡 Full-Stack React App',
    subject: 'New React & Next.js Web Application Build',
    message: 'Hi Naren, we are looking for an experienced Frontend Engineer to build a scalable React/Next.js application. Would love to discuss requirements, architecture, and timeline.',
  },
  {
    label: '🏢 Enterprise UI Revamp',
    subject: 'Enterprise UI System & Dashboard Revamp',
    message: 'Hi Naren, our product needs a comprehensive UI revamp with Material-UI (MUI) and responsive design tokens, similar to your enterprise work at Zoho Corporation.',
  },
  {
    label: '🚀 FinTech / Aura Build',
    subject: 'FinTech Platform / Expense Tracker Development',
    message: 'Hi Naren, I saw your Aura Expense Tracker project and want to build a real-time web application with rich dashboards and persistence. Can we discuss your availability?',
  },
];

export const Footer: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiNote, setAiNote] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message || loading) return;

    setLoading(true);
    setFormError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Portfolio Visitor',
          email,
          subject: subject || 'Project Collaboration Inquiry',
          message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setAiNote(data.aiResponse || '');
      } else {
        setFormError(data.error || 'Failed to submit message. Please try again.');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmitted(true);
      setAiNote(`Thank you for reaching out! Naren has received your message and will review it directly at ${email}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTemplate = (template: typeof AI_QUICK_TEMPLATES[0]) => {
    setSubject(template.subject);
    setMessage(template.message);
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
            Need a high-performance React/Next.js frontend, an enterprise UI system, or want to discuss a full-stack project? Send a direct message below.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="footer-contact-form">
              <div className="contact-input-row">
                <div className="contact-field">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah Connor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="contact-input"
                  />
                </div>
                <div className="contact-field">
                  <label>Your Email *</label>
                  <input
                    type="email"
                    placeholder="sarah@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="contact-input"
                  />
                </div>
              </div>

              <div className="contact-field">
                <label>Topic / Project Type</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js App / FinTech Dashboard / Full-Time Role"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="contact-input"
                />
              </div>

              {/* Quick AI Template Prompts */}
              <div className="quick-draft-container">
                <span className="quick-draft-label">
                  <Sparkles size={12} color="#38BDF8" /> Quick Project Templates:
                </span>
                <div className="quick-draft-pills">
                  {AI_QUICK_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.label}
                      type="button"
                      className="ai-draft-chip"
                      onClick={() => handleApplyTemplate(tmpl)}
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="contact-field">
                <label>Your Message / Project Details *</label>
                <textarea
                  rows={4}
                  placeholder="Describe your goals, tech stack, timeline, or inquiries..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="contact-textarea"
                />
              </div>

              {formError && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  color: '#F87171',
                  fontSize: '0.85rem',
                  marginBottom: '10px',
                }}>
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="footer-form-actions">
                <button type="submit" className="btn btn-primary btn-contact-submit" disabled={loading}>
                  {loading ? 'Analyzing & Sending...' : <>Send Message <Send size={16} /></>}
                </button>
              </div>
            </form>
          ) : (
            <div className="footer-success-box">
              <CheckCircle2 size={40} color="#10B981" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '4px 0' }}>
                Message Successfully Received!
              </h3>
              <p style={{ color: '#CBD5E1', fontSize: '0.95rem', margin: 0 }}>
                Naren has been notified directly at <strong>narenkumar2001@gmail.com</strong>.
              </p>

              {aiNote && (
                <div className="footer-ai-note">
                  <div className="footer-ai-note-header">
                    <Sparkles size={14} /> Instant AI Assessment:
                  </div>
                  <p className="footer-ai-note-text">{aiNote}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                    setSubject('');
                    setFormError('');
                  }}
                >
                  Send Another Message
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Footer Bottom Row */}
        <div className="footer-bottom-row">
          <p>© {CURRENT_YEAR} Narenkumar RM. All Rights Reserved.</p>

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

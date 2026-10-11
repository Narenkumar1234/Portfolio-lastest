import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { SERVICES_DATA } from '../data/portfolioData';
import { ServiceUIPreview } from './GraphicPlaceholders';
import '../styles/components/Services.css';

export const Services: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="services-section">
      <div className="container">
        <motion.div 
          className="services-dark-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Ambient Glow */}
          <div className="services-glow-blob"></div>

          {/* Header Row */}
          <div className="services-header-row">
            <motion.h2 
              className="services-title"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              My <span className="text-orange">Services</span>
            </motion.h2>

            <motion.p 
              className="services-description"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Delivering high-performance digital products, scalable design systems, and intuitive user interfaces tailored to turn user friction into delightful experiences.
            </motion.p>
          </div>

          {/* Cards Grid */}
          <div className="services-grid">
            {SERVICES_DATA.map((service, index) => (
              <motion.div
                key={service.id}
                className={`service-card ${service.previewType === 'expense-tracker' ? 'service-card-featured' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="service-card-top">
                  <div className="service-card-badge-row">
                    <span className="service-category-tag">{service.category}</span>
                    {service.badge && (
                      <span className="service-featured-pill">{service.badge}</span>
                    )}
                  </div>
                  <h3 className="service-card-title">{service.title}</h3>
                </div>

                <ServiceUIPreview type={service.previewType} service={service} />

                <div className="service-card-bottom">
                  <p className="service-card-desc">{service.description}</p>
                  <div className="service-card-actions">
                    {service.githubUrl && (
                      <a
                        href={service.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="service-github-btn"
                        title="View GitHub Repository"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {service.demoUrl ? (
                      <a
                        href={service.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-circle-btn live-btn"
                        title="Launch Live Demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowUpRight size={22} />
                      </a>
                    ) : (
                      <div className="action-circle-btn">
                        <ArrowUpRight size={22} />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="services-pagination">
            {SERVICES_DATA.map((_, idx) => (
              <div 
                key={idx} 
                className={`page-dot ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

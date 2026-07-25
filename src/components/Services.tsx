import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
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
                className="service-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                whileHover={{ y: -8 }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="service-card-top">
                  <h3 className="service-card-title">{service.title}</h3>
                </div>

                <ServiceUIPreview type={service.previewType} />

                <div className="service-card-bottom">
                  <div className="action-circle-btn">
                    <ArrowUpRight size={22} />
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

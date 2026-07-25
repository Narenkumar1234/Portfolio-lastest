import React from 'react';
import { motion } from 'framer-motion';
import { WHY_HIRE_ME_DATA } from '../data/portfolioData';
import { DesignerAvatarPlaceholder } from './GraphicPlaceholders';
import '../styles/components/WhyHireMe.css';

export const WhyHireMe: React.FC = () => {
  return (
    <section id="why-hire-me" className="why-hire-section">
      <div className="container">
        <motion.div 
          className="why-hire-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Avatar Graphic */}
          <motion.div 
            className="why-hire-avatar-col"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <DesignerAvatarPlaceholder type="why-hire-me" />
          </motion.div>

          {/* Right Text & Stats */}
          <div className="why-hire-content-col">
            <motion.h2 
              className="why-hire-title"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Why <span className="text-orange">Hire me</span>?
            </motion.h2>

            <motion.p 
              className="why-hire-description"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {WHY_HIRE_ME_DATA.description}
            </motion.p>

            {/* Stats Row */}
            <motion.div 
              className="why-hire-stats-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {WHY_HIRE_ME_DATA.stats.map((stat, idx) => (
                <div key={idx} className="stat-box">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.a 
              href="#contact" 
              className="btn btn-outline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Hire me
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

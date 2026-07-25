import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import '../styles/components/Experience.css';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <motion.h2
          className="experience-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-orange">Work Experience</span>
        </motion.h2>

        <div className="timeline-container">
          {/* Dashed Center Connecting Line */}
          <div className="timeline-line"></div>

          {EXPERIENCE_DATA.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Left Column: Company & Period */}
              <div className="timeline-company-col">
                <h3 className="company-name">{exp.company}</h3>
                <span className="company-period">{exp.period}</span>
              </div>

              {/* Center Node */}
              <div className="timeline-node-col">
                <div className={`timeline-node ${index % 2 === 1 ? 'dark' : ''}`}>
                  <div className="timeline-node-inner"></div>
                </div>
              </div>

              {/* Right Column: Role & Summary */}
              <div className="timeline-role-col">
                <h3 className="role-title">{exp.role}</h3>
                <p className="role-description">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_TAGS, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioCardPreview } from './GraphicPlaceholders';
import '../styles/components/PortfolioSection.css';

export const PortfolioSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState('Landing Page');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const filteredProjects = PORTFOLIO_PROJECTS.filter(project =>
    project.tags.includes(activeTag) || activeTag === 'Landing Page'
  );

  const currentProject = filteredProjects[selectedProjectIndex] || PORTFOLIO_PROJECTS[0];

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        {/* Header Row */}
        <div className="portfolio-header-row">
          <motion.h2 
            className="portfolio-title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Lets have a look at my <span className="text-orange">Portfolio</span>
          </motion.h2>

          <motion.a 
            href="#portfolio"
            className="btn btn-primary"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            See All
          </motion.a>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="portfolio-cards-grid">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className="portfolio-card-frame"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => setSelectedProjectIndex(idx)}
            >
              <PortfolioCardPreview />
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="portfolio-dots">
          {filteredProjects.map((_, idx) => (
            <div 
              key={idx}
              className={`portfolio-dot ${selectedProjectIndex === idx ? 'active' : ''}`}
              onClick={() => setSelectedProjectIndex(idx)}
            />
          ))}
        </div>

        {/* Category Tags Filter Pills */}
        <motion.div 
          className="category-filter-bar"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {PORTFOLIO_TAGS.map(tag => (
            <button
              key={tag}
              className={`filter-tag-btn ${activeTag === tag ? 'active' : ''}`}
              onClick={() => {
                setActiveTag(tag);
                setSelectedProjectIndex(0);
              }}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Project Detail Accordion / Summary */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentProject.id}
            className="project-details-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="project-details-title">
              {currentProject.title}
              <span className="project-link-badge">
                <ArrowUpRight size={18} />
              </span>
            </h3>
            <p className="project-details-desc">
              {currentProject.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

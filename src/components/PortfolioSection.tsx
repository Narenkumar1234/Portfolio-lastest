import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { PORTFOLIO_TAGS, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioCardPreview } from './GraphicPlaceholders';
import '../styles/components/PortfolioSection.css';

export const PortfolioSection: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  const filterCategories = ['All', ...PORTFOLIO_TAGS];

  const filteredProjects = PORTFOLIO_PROJECTS.filter(project =>
    activeTag === 'All' ? true : project.tags.includes(activeTag)
  );

  const currentProject = filteredProjects[selectedProjectIndex] || filteredProjects[0] || PORTFOLIO_PROJECTS[0];

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

          <a 
            href="#portfolio"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              setActiveTag('All');
              setSelectedProjectIndex(0);
            }}
          >
            See All ({PORTFOLIO_PROJECTS.length})
          </a>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="portfolio-cards-grid">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              className={`portfolio-card-frame ${selectedProjectIndex === idx ? 'selected-card' : ''}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onClick={() => setSelectedProjectIndex(idx)}
            >
              <PortfolioCardPreview project={project} />
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
          {filterCategories.map(tag => (
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
            <div className="project-details-header">
              <div>
                <span className="project-category-pill">{currentProject.category}</span>
                <h3 className="project-details-title">{currentProject.title}</h3>
                <p className="project-subtitle-text">{currentProject.subtitle}</p>
              </div>

              <div className="project-header-actions">
                {currentProject.demoLink && (
                  <a
                    href={currentProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn live"
                  >
                    Live Demo <ArrowUpRight size={16} />
                  </a>
                )}
                {currentProject.githubLink && (
                  <a
                    href={currentProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn github"
                  >
                    <FaGithub size={16} /> GitHub
                  </a>
                )}
              </div>
            </div>

            <p className="project-details-desc">
              {currentProject.description}
            </p>

            <div className="project-tag-list">
              {currentProject.tags.map(tag => (
                <span key={tag} className="project-item-tag">#{tag}</span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

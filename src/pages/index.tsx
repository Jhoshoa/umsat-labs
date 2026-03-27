import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

// Import project data from JSON
import projectsData from '../data/projects.json';

// Type definitions
interface ProjectCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
  tags: string[];
}

// Tech icon mapping
const techIcons: Record<string, string> = {
  cpp: '⚡',
  python: '🐍',
  arduino: '🔧',
  esp32: '📡',
  docker: '🐳',
  kubernetes: '☸️',
  react: '⚛️',
  pcb: '🔌',
};

// Project Cards Data from JSON
const ProjectList: ProjectCardProps[] = projectsData.projects.map(project => ({
  title: project.title,
  image: project.image,
  description: project.description,
  link: project.link,
  tags: project.tags,
}));

function ProjectCard({title, image, description, link, tags}: ProjectCardProps) {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImageContainer}>
        <img src={image} alt={title} className={styles.projectImage} />
        <div className={styles.projectOverlay}>
          <Link to={link} className={styles.projectLink}>
            View Documentation
          </Link>
        </div>
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
        <div className={styles.tagContainer}>
          {tags.map((tag, idx) => (
            <span key={idx} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.heroBackground}>
        <div className={styles.gridLines}></div>
        <div className={styles.glowOrb}></div>
      </div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.titleAccent}>UMSAT</span>
          <br />
          Labs
        </h1>
        <p className={styles.heroSubtitle}>
          Building the future with <span className={styles.highlight}>robotics</span>,{' '}
          <span className={styles.highlight}>electronics</span>, and{' '}
          <span className={styles.highlight}>software</span>
        </p>
        <div className={styles.heroCta}>
          <Link className={styles.ctaButton} to="/docs/cansat/">
            Explore Projects
          </Link>
          <Link className={styles.ctaButtonSecondary} to="https://github.com/josoe">
            GitHub
          </Link>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>↓</span>
      </div>
    </header>
  );
}

function TechStackSection() {
  // Get technologies from JSON and add icons
  const technologies = projectsData.technologies.map(tech => ({
    name: tech.name,
    icon: techIcons[tech.icon] || '💻',
  }));

  return (
    <section className={styles.techSection}>
      <h2 className={styles.sectionTitle}>Tech Stack</h2>
      <div className={styles.techGrid}>
        {technologies.map((tech, idx) => (
          <div key={idx} className={styles.techItem}>
            <span className={styles.techIcon}>{tech.icon}</span>
            <span className={styles.techName}>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.sectionTitle}>Active Projects</h2>
      <div className={styles.projectsGrid}>
        {ProjectList.map((props, idx) => (
          <ProjectCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Engineering team documentation hub">
      <main className={styles.mainContent}>
        <HeroSection />
        <TechStackSection />
        <ProjectsSection />
      </main>
    </Layout>
  );
}

import React from 'react';
import styles from '@site/src/pages/index.module.css';
import { ProjectCard } from './ProjectCard';
import type { ProjectCardProps } from '@site/src/types/home';

interface ProjectsSectionProps {
  projects: ProjectCardProps[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => (
  <section className={styles.projectsSection}>
    <h2 className={styles.sectionTitle}>Active Projects</h2>
    <div className={styles.projectsGrid}>
      {projects.map((project, idx) => (
        <ProjectCard key={idx} {...project} />
      ))}
    </div>
  </section>
);

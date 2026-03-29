import React from 'react';
import styles from '@site/src/pages/index.module.css';
import { TECH_ICONS, DEFAULT_TECH_ICON } from '@site/src/constants/techIcons';
import type { Technology } from '@site/src/types/home';

interface TechStackSectionProps {
  technologies: Technology[];
}

const TechItem: React.FC<{ name: string; icon: string }> = ({ name, icon }) => (
  <div className={styles.techItem}>
    <span className={styles.techIcon}>{icon}</span>
    <span className={styles.techName}>{name}</span>
  </div>
);

export const TechStackSection: React.FC<TechStackSectionProps> = ({ technologies }) => {
  const techWithIcons = technologies.map((tech) => ({
    name: tech.name,
    icon: TECH_ICONS[tech.icon] || DEFAULT_TECH_ICON,
  }));

  return (
    <section className={styles.techSection}>
      <h2 className={styles.sectionTitle}>Tech Stack</h2>
      <div className={styles.techGrid}>
        {techWithIcons.map((tech, idx) => (
          <TechItem key={idx} name={tech.name} icon={tech.icon} />
        ))}
      </div>
    </section>
  );
};

import React from 'react';
import Link from '@docusaurus/Link';
import styles from '@site/src/pages/index.module.css';

export const HeroSection: React.FC = () => (
  <header className={styles.heroBanner}>
    <div className={styles.heroBackground}>
      <div className={styles.gridLines} />
      <div className={styles.glowOrb} />
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
        <Link className={styles.ctaButtonSecondary} to="https://github.com/Jhoshoa">
          GitHub
        </Link>
      </div>
    </div>
    <div className={styles.scrollIndicator}>
      <span>↓</span>
    </div>
  </header>
);

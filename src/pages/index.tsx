import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

import { HeroSection, TechStackSection, ProjectsSection } from '@site/src/components/home';
import projectsData from '@site/src/data/projects.json';
import type { ProjectCardProps } from '@site/src/types/home';

const Home: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  const projects: ProjectCardProps[] = projectsData.projects.map((project) => ({
    title: project.title,
    image: project.image,
    description: project.description,
    link: project.link,
    tags: project.tags,
  }));

  return (
    <Layout title={siteConfig.title} description="Engineering team documentation hub">
      <main className={styles.mainContent}>
        <HeroSection />
        <TechStackSection technologies={projectsData.technologies} />
        <ProjectsSection projects={projects} />
      </main>
    </Layout>
  );
};

export default Home;

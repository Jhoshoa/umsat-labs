import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from '@site/src/pages/index.module.css';
import type { ProjectCardProps } from '@site/src/types/home';

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image,
  description,
  link,
  tags,
}) => {
  const imageUrl = useBaseUrl(image);

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectImageContainer}>
        <img src={imageUrl} alt={title} className={styles.projectImage} />
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
            <span key={idx} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

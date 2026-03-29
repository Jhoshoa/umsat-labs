import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styles from '@site/src/pages/index.module.css';
import { ProjectCard } from './ProjectCard';
import type { ProjectCardProps } from '@site/src/types/home';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProjectsSectionProps {
  projects: ProjectCardProps[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => (
  <section className={styles.projectsSection}>
    <h2 className={styles.sectionTitle}>Active Projects</h2>
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={projects.length > 3}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className={styles.projectsSwiper}
      >
        {projects.map((project, idx) => (
          <SwiperSlide key={idx}>
            <ProjectCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

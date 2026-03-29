export interface ProjectCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
  tags: string[];
}

export interface Technology {
  name: string;
  icon: string;
}

export interface ProjectData {
  id: string;
  title: string;
  image: string;
  description: string;
  link: string;
  tags: string[];
  sidebar: string;
  sections: Array<{
    label: string;
    path: string;
  }>;
}

export interface ProjectsJson {
  projects: ProjectData[];
  technologies: Array<{
    name: string;
    icon: string;
  }>;
  navItems: Array<{
    label: string;
    to: string;
  }>;
}

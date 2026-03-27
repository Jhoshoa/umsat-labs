import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkSimplePlantuml from '@akebifiky/remark-simple-plantuml';
import projectsData from './src/data/projects.json';

// Generate navbar dropdown items from projects.json
const projectNavItems = projectsData.projects.map(project => ({
  label: project.title,
  to: project.link,
}));

const config: Config = {
  title: 'UMSAT Labs',
  tagline: 'Building the future with robotics, electronics, and software',
  favicon: 'img/favicon.ico',

  url: 'https://josoe.github.io',
  baseUrl: '/umsat-labs/',

  organizationName: 'josoe',
  projectName: 'umsat-labs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/josoe/umsat-labs/tree/main/',
          remarkPlugins: [remarkSimplePlantuml],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'UMSAT Labs',
      logo: {
        alt: 'Team Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Projects',
          position: 'left',
          items: projectNavItems,
        },
        {
          to: '/docs/resources/',
          label: 'Resources',
          position: 'left',
        },
        {
          href: 'https://github.com/josoe',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: projectsData.projects.map(project => ({
            label: project.title,
            to: project.link,
          })),
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/josoe' },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} UMSAT Labs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['cpp', 'arduino', 'python', 'bash', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

module.exports = {
  title: 'Muna | ᛗᚢᚾᚨ',
  tagline: 'Muna (remember) is a Sanity Studio with a data schema for describing and presenting cultural heritage objects.',
  url: 'https://docs.muna.xyz',
  baseUrl: '/',
  favicon: 'favicon/favicon.ico',
  organizationName: 'seidhr', // Usually your GitHub org/user name.
  projectName: 'muna-documentation', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Muna',
      logo: {
        alt: 'Muna logo',
        src: 'img/seidhrIcon.svg',
        srcDark: 'img/seidhrIcon.svg',
      },
      items: [
        {
          to: 'docs/introduction',
          activeBasePath: 'docs',
          label: 'Introduction',
          position: 'left',
        },
        {
          to: 'docs/model/introduction',
          activeBasePath: 'docs/model',
          label: 'Schemas',
          position: 'left',
        },
        {
          href: 'https://create.sanity.io/?template=seidhr/sanity-template-muna',
          label: 'Create Muna Studio',
          position: 'right',
        },
        {
          href: 'https://github.com/seidhr/sanity-template-muna',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    /* footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: 'docs/home',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/seidhr/sanity-template-muna',
            },
          ],
        },
      ],
      copyright: `Copyleft ${new Date().getFullYear()} Muna`,
    }, */
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};

module.exports = {
  title: 'Muna | ᛗᚢᚾᚨ',
  tagline: 'Muna (remember) is a Sanity Studio tieh a data schema for describing and presenting cultural heritage objects.',
  url: 'https://muna.xyz',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'tarjelavik', // Usually your GitHub org/user name.
  projectName: 'sanity-plugin-muna', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Muna',
      /* logo: {
        alt: 'Muna Logo',
        src: 'img/logo.svg',
      }, */
      items: [
        {
          to: 'docs/installation',
          activeBasePath: 'docs',
          label: 'Installation',
          position: 'left',
        },
        {
          to: 'docs/model/introduction',
          activeBasePath: 'docs/model',
          label: 'Model',
          position: 'left',
        },
        {
          href: 'https://www.sanity.io/create?template=seidhr/sanity-template-muna',
          label: 'Create your Muna Studio',
          position: 'right',
        },
        {
          href: 'https://github.com/seidhr/muna',
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
              href: 'https://github.com/tarjelavik/sanity-plugin-muna',
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

import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span>useWallet</span>,
  project: {
    link: 'https://github.com/CasperDash/useWallet',
  },
  darkMode: true,
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/CasperDash/useWallet',
  footer: {
    text: 'Built by CasperDash team',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – useWallet',
      description:
      'useWallet is a collection of React Hooks containing everything you need to start working with Casper.',
      openGraph: {
        description:
          'useWallet is a collection of React Hooks containing everything you need to start working with Casper.',
        titleTemplate: '%s – useWallet',
      },
    };
  },
};

export default config;

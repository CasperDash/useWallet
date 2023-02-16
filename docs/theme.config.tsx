import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span>useWallet</span>,
  project: {
    link: 'https://casperdash.io/',
  },
  darkMode: true,
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/CasperDash/useDApp',
  footer: {
    text: 'Built by CasperDash team',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – useWallet',
    };
  },
};

export default config;

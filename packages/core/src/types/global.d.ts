import type { CasperWalletProvider } from './casperWalletProvider';
import type { CasperLabsHelper } from './casperLabsHelper';

declare global {
  interface Window {
    casperDashHelper?: {
      isConnected: Promise<boolean>;
    };
    casperlabsHelper?: CasperLabsHelper;
    CasperWalletProvider: () => CasperWalletProvider;
  }
}

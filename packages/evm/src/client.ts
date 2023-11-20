import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

export const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

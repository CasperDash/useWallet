import { useState } from 'react';
import {
  OnConnectParams,
  useAccount,
  useDisconnect,
  useSetLedgerAccountIndex,
} from '@casperdash/usewallet';

import CasperDashButton from './component/CasperDashButton';
import CasperSignerButton from './component/CasperSignerButton';
import CasperWalletButton from './component/CasperWalletButton';
import FormSigner from './component/FormSigner';
import CasperDashWebButton from './component/CasperDashWebButton';
import FormSignerMessage from './component/FormSignerMessage';
import CasperLedgerButton from './component/CasperLedgerButton';
import { SelectLedgerAccount } from './component/SelectLedgerAccount';

import './App.css';

function App() {
  const [selectedIndex, setSelectedIndex] = useState<string>(null!);
  const { setLedgerAccountIndex } = useSetLedgerAccountIndex({
    onSuccess: ({ index }: { index: string }) => {
      return setSelectedIndex(index);
    },
  });
  const { publicKey, connector } = useAccount({
    onConnect: async ({ publicKey: publicKeyOnConnect }: OnConnectParams) => {
      console.log('publicKey: ', publicKeyOnConnect);
    },
    onDisconnect() {
      console.log('onDisconnect Wallet');
    },
    onError: (err: unknown) => {
      console.log((err as Error).message);
    },
  });
  const { disconnect } = useDisconnect();

  if (!selectedIndex && !!publicKey && connector && connector.id === 'ledger') {
    return (
      <div className="App">
          <div>
            <div>
              <div>
                Select Ledger Account
              </div>
              <div style={{ marginTop: '10px' }}>
                <SelectLedgerAccount onChange={(index: string) => setLedgerAccountIndex({ index })}/>
              </div>
            </div>
            <button style={{ marginTop: '40px' }} onClick={() => disconnect()}>Disconnect {publicKey}</button>
          </div>
      </div>
    );
  }

  return (
    <div className="App">
        {publicKey ? (
          <div>
            <button style={{ marginTop: '-40px' }} onClick={() => disconnect()}>Disconnect {publicKey}</button>
            <div className="signer-form-wrapper">
              <FormSigner />
              <br/>
              <FormSignerMessage/>
            </div>
          </div>
        ) : (
          <>
            <div>
              <a href="https://usewallet.casperdash.io/" target="_blank">
                <img
                  src="/casperdash.png"
                  className="logo"
                  alt="CasperDash logo"
                />
              </a>
            </div>
            <div className="card">
              <h1>useWallet Connector</h1>
              <CasperSignerButton />
              <br />
              <CasperDashButton />
              <br/>
              <CasperWalletButton />
              <br/>
              <CasperDashWebButton/>
              <br/>
              <CasperLedgerButton />
            </div>
          </>
        )}
    </div>
  );
}

export default App;

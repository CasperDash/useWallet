import { useState } from 'react';
import {
  Account,
  OnConnectParams,
  useAccount,
  useDisconnect,
  useSetLedgerAccountIndex,
} from '@casperdash/usewallet';

import CasperDashButton from './components/ConnectButton/CasperDashButton';
import { SelectLedgerAccount } from './components/Select/SelectLedgerAccount';
import FormSignerMessage from './components/Form/FormSignerMessage';
import CasperSignerButton from './components/ConnectButton/CasperSignerButton';
import CasperLedgerButton from './components/ConnectButton/CasperLedgerButton';
import CasperDashWebButton from './components/ConnectButton/CasperDashWebButton';
import CasperWalletButton from './components/ConnectButton/CasperWalletButton';
import CasperDashMobileButton from './components/ConnectButton/CasperDashMobileButton';
import FormSigner from './components/Form/FormSigner';

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
    onChange: async ({ publicKey: publicKeyOnChange, isConnected }: Account ) => {
      console.log('isConnected: ', isConnected);
      return alert(`Account changed: ${publicKeyOnChange}`);
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
            <button style={{ marginTop: '-40px' }} onClick={() => disconnect()}>Disconnect</button>
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
                  style={{ width: '100%', height: '40px' }}
                />
              </a>
            </div>
            <div className="card">
              <CasperSignerButton />
              <br />
              <CasperDashButton />
              <br/>
              <CasperWalletButton />
              <br/>
              <CasperDashWebButton/>
              <br/>
              <CasperLedgerButton />
              <br/>
              <CasperDashMobileButton />
            </div>
          </>
        )}
    </div>
  );
}

export default App;

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
import CasperSignerButton from './components/ConnectButton/CasperSignerButton';
import CasperLedgerButton from './components/ConnectButton/CasperLedgerButton';
import CasperDashWebButton from './components/ConnectButton/CasperDashWebButton';
import CasperWalletButton from './components/ConnectButton/CasperWalletButton';
import { Button } from './components/ui/Button';
import { FormTabs } from './components/Form/FormTabs';

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
      return console.log(`Account changed: ${publicKeyOnChange}`);
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
    <div className="flex justify-center mt-10">
      <div className="max-w-[300px] bg-red">
        {publicKey ? (
          <div>
            <div>
              <FormTabs />
            </div>
            <div className="mt-20 flex justify-center">
              <Button style={{ marginTop: '-40px' }} onClick={() => disconnect()}>Disconnect</Button>
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
            <div className="mt-10">
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
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { CapserDashConnector, CasperSignerConnector, connect, createClient, disconnect, isConnected,
  getActivePublicKey } from '@usedapp/core';

import './App.css';

function App() {
  const [activeKey, setActiveKey] = useState<string | false>(false);

  useEffect(() => {
    createClient({
      connectors: [new CasperSignerConnector({}), new CapserDashConnector({})],
    });

    window?.addEventListener('casper:change',
      (event: CustomEventInit<{ activeKey: string; isConnected: boolean }>) => {
        setActiveKey(event.detail ? event.detail.activeKey : false);

        return true;
      });
    window?.addEventListener('casper:disconnect', () => {
      setActiveKey(false);
    });
    window?.addEventListener('casper:connect',
      (event: CustomEventInit<{ activeKey: string; isConnected: boolean }>) => {
        setActiveKey(event.detail ? event.detail.activeKey : false);

        return true;
      });

    void getActivePublicKey().then((activeKey: string) => setActiveKey(activeKey));

  }, []);

  const loadConnected = () => {
    void isConnected();
  };


  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {
          activeKey ? (
            <button onClick={async () => disconnect().finally(() => loadConnected())}>
              Disconnect {activeKey}
            </button>
          ) : (
            <>
              <button onClick={async () => connect({ connector: new CapserDashConnector({}) })}>
                Connect with CasperDash
              </button>
              <button onClick={async () => connect({ connector: new CasperSignerConnector({}) })}>
                Connect with CasperSigner
              </button>
            </>
          )
        }
      </div>
    </div>
  );
}

export default App;

import { useAccount, useDisconnect } from '@usedapp/react';

import './App.css';
import CasperDashButton from './component/CasperDashButton';
import CasperSignerButton from './component/CasperSignerButton';
import FormSigner from './component/FormSigner';

function App() {
  const { publicKey } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="App">
        {publicKey ? (
          <div>
            <button style={{ marginTop: '-40px' }} onClick={() => disconnect()}>Disconnect {publicKey}</button>
            <div className="signer-form-wrapper">
              <FormSigner />
            </div>
          </div>
        ) : (
          <>
            <div>
              <a href="https://casperdash.io" target="_blank">
                <img
                  src="/casperdash.png"
                  className="logo"
                  alt="CasperDash logo"
                />
              </a>
            </div>
            <div className="card">
              <h1>UseDApp Connector</h1>
              <CasperSignerButton />
              <br />
              <CasperDashButton />
            </div>
          </>
        )}
    </div>
  );
}

export default App;

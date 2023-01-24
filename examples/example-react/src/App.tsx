import { useAccount, useDisconnect } from '@usedapp/react';

import './App.css';
import CasperDashButton from './component/CasperDashButton';
import CasperSignerButton from './component/CasperSignerButton';

function App() {
  const { publicKey } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="App">
      <div>
        <a href="https://casperdash.io" target="_blank">
          <img src="/casperdash.png" className="logo" alt="CasperDash logo" />
        </a>
      </div>
      <h1>UseDApp Connector</h1>
      <div className="card">
        {
          publicKey ? (
            <button onClick={() => disconnect()}>
              Disconnect {publicKey}
            </button>
          ) : (
            <>
              <CasperSignerButton/>
              <br/>
              <CasperDashButton/>
            </>
          )
        }
      </div>
    </div>
  );
}

export default App;

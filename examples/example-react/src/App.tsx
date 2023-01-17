import { useAccount } from '@usedapp/react';

import './App.css';
import CasperDashButton from './component/CasperDashButton';
import CasperSignerButton from './component/CasperSignerButton';

function App() {
  const { publicKey, disconnect } = useAccount();

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>UseDApp Connector</h1>
      <div className="card">
        {
          publicKey ? (
            <button onClick={async () => disconnect()}>
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

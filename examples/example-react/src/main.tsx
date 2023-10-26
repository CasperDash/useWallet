import {
  CasperDashConnector,
  CasperSignerConnector,
  CasperProvider,
  createClient,
  CasperWalletConnector,
} from '@casperdash/usewallet';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { CasperLedgerConnector } from '@casperdash/usewallet-ledger';

import App from './App';
import '../app/globals.css';

const client = createClient({
  connectors: [new CasperSignerConnector(), new CasperDashConnector(), new CasperWalletConnector(), new CasperLedgerConnector()],
  // autoConnect: true,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CasperProvider client={client}>
      <App />
    </CasperProvider>
  </React.StrictMode>,
);

import { CasperDashConnector, CasperSignerConnector } from '@usewallet/core';
import { CasperProvider, createClient } from '@usewallet/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

const client = createClient({
  connectors: [new CasperSignerConnector(), new CasperDashConnector()],
  autoConnect: true,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CasperProvider client={client}>
      <App />
    </CasperProvider>
  </React.StrictMode>,
);

import { CasperDashConnector, CasperSignerConnector } from '@usedapp/core';
import { CasperProvider, createClient } from '@usedapp/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

const client = createClient({
  connectors: [new CasperSignerConnector({}), new CasperDashConnector({})],
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CasperProvider client={client}>
      <App />
    </CasperProvider>
  </React.StrictMode>,
);

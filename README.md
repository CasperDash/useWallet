## Features

- 💼 Built-in wallet connectors for CasperDash, Casper Signer and more

- 🦄 TypeScript ready

... and a lot more.

## Documentation

## Installation

Install @usedapp/react and Casper dependency.

```bash
npm install @usedapp/react casper-js-sdk
```

## Quick Start

Connect a Casper Wallet likes 👻 speed.

```tsx
import { CasperDashConnector, CasperSignerConnector } from '@usedapp/core';
import { CasperProvider, createClient } from '@usedapp/react';

const client = createClient({
  connectors: [new CasperSignerConnector({}), new CasperDashConnector({})],
  autoConnect: true,
});

function App() {
  return (
    <CasperProvider client={client}>
      <Profile />
    </CasperProvider>
  )
}
```

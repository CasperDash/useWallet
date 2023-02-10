# useDApp

useDApp is a library/react component which designed for DApp to interact with CasperDash/Casper Signer on the Casper network.

## Features

- 💼 In-app support for CasperDash and CasperSigner Wallet

- 👟 Optimized with caching and duplicated request elimination

- 🌀 Automatic data updates during account switches and disconnections 

- 🦄 TypeScript compatibility included

... and a lot more.

## Documentation

### Installation

Install @usedapp/react and Casper dependency.

```bash
npm install @usedapp/react casper-js-sdk
```

### Quick Start

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

## Built With

- [React](https://reactjs.org) A JavaScript library for building user interfaces

- [TypeScript](https://www.typescriptlang.org/) is JavaScript with syntax for types

## Contributing

We welcome contributions to useDApp! If you're interested in helping out, take a look at our [contributing guidelines](https://github.com/CasperDash/useDApp/blob/master/CONTRIBUTING.md) for more information.

## License

useDApp is licensed under the [MIT License](https://github.com/CasperDash/useDApp/blob/master/LICENSE).




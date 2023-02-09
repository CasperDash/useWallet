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

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces

## Contributing

If you're interested in contributing, please read the [CONTRIBUTING](CONTRIBUTING) contributing docs before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
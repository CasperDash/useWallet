# useWallet

useWallet is a library/react component which designed for DApp to interact with CasperDash/Casper Signer on the Casper network.

## Features

- 💼 In-app support for CasperDash and CasperSigner Wallet

- 👟 Optimized with caching and duplicated request elimination

- 🌀 Automatic data updates during account switches and disconnections

- 🦄 TypeScript compatibility included

... and a lot more.

## Documentation

### Installation

Install @casperdash/usewallet and Casper dependency.

```bash
npm install @casperdash/usewallet casper-js-sdk
```

### Quick Start

Connect a Casper Wallet likes 👻 speed.

```tsx
import {
  CasperDashConnector,
  CasperSignerConnector,
  CasperProvider,
  createClient
} from '@casperdash/usewallet';


const client = createClient({
  connectors: [new CasperSignerConnector(), new CasperDashConnector()],
  autoConnect: true,
});

function App() {
  return (
    <CasperProvider client={client}>
      <WalletProfile />
    </CasperProvider>
  )
}
```

```tsx
import { useAccount, useDisconnect, useConnect, CasperSignerConnector, CasperDashConnector } from '@casperdash/usewallet';

function WalletProfile() {
  const { publicKey } = useAccount();
  const { disconnect } = useDisconnect();

  const { connect: connectWithCasperSigner } = useConnect({
    connector: new CasperSignerConnector(),
  });

  const { connect: connectWithCasperDash } = useConnect({
    connector: new CasperDashConnector(),
  });

  if (publicKey)
    return (
      <div>
        Connected to {publicKey}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )

  return (
    <div>
      <button onClick={() => connectWithCasperSigner()}>Connect with Casper Signer</button>
      </br>
      <button onClick={() => connectWithCasperDash()}>Connect with CasperDash</<utton>
    </div>

  )
}
```

In the above snippet, we create a useWallet ```client``` and pass it to the CasperProvider React Context. The client is set up to use the Casper Wallet Default Provider and automatically connect to previously connected wallets.

Next, we use the useConnect hook to connect injected supporting wallets (Casper Signer and CasperDash) to the app. Finally, we show the connected account's public key with useAccount and allow them to disconnect with useDisconnect.

## Built With

- [React](https://reactjs.org) A JavaScript library for building user interfaces

- [TypeScript](https://www.typescriptlang.org/) is JavaScript with syntax for types

## Contributing

We welcome contributions to useWallet! If you're interested in helping out, take a look at our [contributing guidelines](https://github.com/CasperDash/useWallet/blob/main/CONTRIBUTING.md) for more information.

## License

useWallet is licensed under the [MIT License](https://github.com/CasperDash/useWallet/blob/main/LICENSE).




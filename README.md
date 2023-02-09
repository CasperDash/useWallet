useDApp
=======

useDApp is a library/React component that makes it easy for DApps to interact with the [CasperDash](https://casperdash.io) and [Casper Signer](https://caspersigner.io) wallets on the [Casper Network](https://casper.network). With useDApp, you can quickly and easily add support for these popular wallets to your DApp, giving your users the ability to interact with their wallets directly within your app.

Key Features
------------

- **In-app support for CasperDash and CasperSigner:** No need for users to switch between your DApp and their wallets. useDApp integrates directly with the wallets, allowing for seamless interaction.
- **Optimized for performance:** useDApp is optimized for speed and efficiency, with caching and duplicated request elimination to minimize the impact on your users' devices.
- **Automatic data updates:** useDApp automatically updates account information during switches and disconnections, so you can be sure your users always have the most up-to-date information.
- **TypeScript compatibility:** If you're using TypeScript in your project, useDApp has you covered with included TypeScript compatibility.

Built With
----------

- [React](https://reactjs.org) A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) is JavaScript with syntax for types

Installation
------------

To install useDApp, simply run the following command in your project's root directory:

```
npm install usedapp

```

Usage
-----

Using useDApp is easy. First, import the library into your project:

```
import { useAccount } from 'usedapp'

```

Next, use the `useDApp` hook in your React component:

```
const { status, publicKey } = useAccount()

```

Finally, use the `status` and `publicKey` objects in your component's render method:

```
Update soon...

```

For more information and detailed usage examples, see the [useDApp documentation](https://usedapp.casperdash.io/docs).

Contributing
------------

We welcome contributions to useDApp! If you're interested in helping out, take a look at our [contributing guidelines](https://github.com/CasperDash/useDApp/blob/master/CONTRIBUTING.md) for more information.

License
-------

useDApp is licensed under the [MIT License](https://github.com/CasperDash/useDApp/blob/master/LICENSE).


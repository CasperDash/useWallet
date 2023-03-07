import * as React from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import type { Client } from './client';

type Props = {
  client: Client;
};

export const Context = React.createContext<Client | undefined>(undefined);

export const queryClientContext = React.createContext<QueryClient | undefined>(
  undefined,
);

/**
 * It takes a client and returns a provider
 * @param  - React.PropsWithChildren<Props>
 * @returns A React element.
 */
export const CasperProvider = ({ children, client }: React.PropsWithChildren<Props>): JSX.Element => {
  return React.createElement(
    Context.Provider,
    {
      children: React.createElement(
        QueryClientProvider,
        {
          children,
          client: client.queryClient,
          // context: queryClientContext,
        },
      ),
      value: client,
    },
  );
};

/**
 * `useClient` is a React hook that returns the client instance from the context
 * @returns The client object.
 */
export const useClient = () => {
  const client = React.useContext(Context);
  if (!client)
    throw new Error(
      [
        '`useClient` must be used within `CasperProvider`.\n',
      ].join('\n'),
    );
  return client;
};

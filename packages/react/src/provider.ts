import * as React from 'react';
import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import type { Client } from './client';

type Props = {
  children: React.ReactElement;
  client: Client;
};

export const Context = React.createContext<Client | undefined>(undefined);

export const queryClientContext = React.createContext<QueryClient | undefined>(
  undefined,
);

export const CasperProvider = ({ children, client }: Props): JSX.Element => {
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

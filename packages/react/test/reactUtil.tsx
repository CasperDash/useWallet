import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import { CasperDashConnector } from '@casperdash/usewallet-core';
import { CasperProvider, Client, createClient } from '@casperdash/usewallet';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      retry: false,
    },
  },
  logger: {
    error: () => {},
    log: console.log,
    warn: console.warn,
  },
});

type Props = { client?: Client } & {
  children?:
  | React.ReactElement
  | React.ReactNode;
};
export function wrapper({
  client = createClient({ connectors: [new CasperDashConnector()] }),
  ...rest
}: Props = {}) {
  return <CasperProvider client={client} {...rest} />;
}

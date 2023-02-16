import { QueryClient } from '@tanstack/react-query';
import { CasperDashConnector } from '@usewallet/core';
import { CasperProvider, Client, createClient } from '@usewallet/react';

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

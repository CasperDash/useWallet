import { QueryClient } from '@tanstack/react-query';
import {
  ClientConfig as CasperClientConfig,
  createClient as createCasperClient,
  Client as CasperClient,
} from '@usedapp/core';

export type CreateClientConfig = CasperClientConfig & {
  queryClient?: QueryClient;
};

export const createClient = ({
  queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 24,
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: false,
        retry: 0,
      },
      mutations: {
        networkMode: 'offlineFirst',
      },
    },
  }),
  ...config
}: CreateClientConfig): Client => {
  const casperClient = createCasperClient(config);

  return Object.assign(casperClient, {
    queryClient,
  });
};

export type Client = CasperClient & { queryClient: QueryClient };
export { CasperDashConnector, CasperSignerConnector } from '@usedapp/core';

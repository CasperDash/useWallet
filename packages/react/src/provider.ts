import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';

import type { Client } from './client';

type Props = {
  children: React.ReactElement;
  client: Client;
};

export const CasperProvider = ({ children, client }: Props): JSX.Element => {
  return React.createElement(
    QueryClientProvider,
    {
      children,
      client: client.queryClient,
    },
  );
};

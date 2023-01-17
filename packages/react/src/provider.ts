import * as React from 'react';
import { CapserDashConnector, CasperSignerConnector, createClient } from '@usedapp/core';

type Props = {
  children: React.ReactElement;
};

export const CasperDappProvider = ({ children }: Props): JSX.Element => {
  createClient({
    connectors: [new CasperSignerConnector({}), new CapserDashConnector({})],
  });

  return children;
};

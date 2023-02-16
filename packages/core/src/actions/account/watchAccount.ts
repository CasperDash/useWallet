import { shallow } from 'zustand/shallow';
import { Connector } from '@usewallet/core/connectors/base';
import { StatusEnum } from '@usewallet/core/enums';
import { getClient, StateParams } from '@usewallet/core/utils/client';

import { Account, getAccount } from './getAccount';

export type Acount = {
  publicKey: string;
};

export type WatchAccountSelectorParams = {
  publicKey?: string;
  connector?: Connector;
  status?: StatusEnum;
};

export type WatchAccountOptions = {
  selector?: ({
    publicKey,
    connector,
    status,
  }: WatchAccountSelectorParams) => any;
};

export const watchAccount = (
  callback: (account: Account | null) => void,
  { selector = (params: WatchAccountSelectorParams) => params } : WatchAccountOptions = {}): any => {
  const client = getClient();

  const handleOnChange = () => callback(getAccount());
  const unsubscribe = client.subscribe(
    ({ data, connector, status }: StateParams) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return selector?.({
        publicKey: data?.activeKey,
        status,
        connector,
      });
    },
    handleOnChange,
    {
      equalityFn: shallow,
    },
  );

  return unsubscribe;
};

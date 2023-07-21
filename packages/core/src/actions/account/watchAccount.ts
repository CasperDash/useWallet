import { shallow } from 'zustand/shallow';
import { Connector } from '@casperdash/usewallet-core/connectors/base';
import { StatusEnum } from '@casperdash/usewallet-core/enums';
import { getClient, StateParams } from '@casperdash/usewallet-core/utils/client';

import { Account, getAccount } from './getAccount';

export type Acount = {
  publicKey: string;
};

export type WatchAccountSelectorParams = {
  publicKey?: string;
  connector?: Connector;
  status?: StatusEnum;
  isConnected?: boolean;
};

export type WatchAccountOptions = {
  selector?: ({
    publicKey,
    connector,
    status,
  }: WatchAccountSelectorParams) => unknown;
};

/**
 * `watchAccount` is a function that takes a callback and returns a function that unsubscribes the
 * callback from the client
 * @param callback - (account: Account | null) => void
 * @param {WatchAccountOptions}  - `callback` - a function that will be called when the account
 * changes.
 * @returns A function that can be called to unsubscribe from the watchAccount function.
 */
export const watchAccount = (
  callback: (account: Account | null) => void,
  { selector = (params: WatchAccountSelectorParams) => params } : WatchAccountOptions = {}): unknown => {
  const client = getClient();

  /**
   * It takes a callback function as an argument, and then calls that callback function with the result
   * of another function as an argument
   */
  const handleOnChange = () => callback(getAccount());
  const unsubscribe = client.subscribe(
    ({ data, connector, status }: StateParams) => {
      return selector?.({
        isConnected: data?.isConnected,
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

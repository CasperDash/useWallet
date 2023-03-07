import { Connector } from '@casperdash/usewallet-core/connectors';
import { StatusEnum } from '@casperdash/usewallet-core/enums';
import { getClient } from '@casperdash/usewallet-core/utils';

export type Account = {
  publicKey?: string;
  status?: StatusEnum;
  connector?: Connector;
};

/**
 * It returns an object with the public key, status, and connector of the current account
 * @returns An object with the public key, status, and connector.
 */
export const getAccount = (): Account | null => {
  try {
    /* Getting the client from the `usewallet-core` package. */
    const client = getClient();
    const { data, status, connector } = client;

    return {
      publicKey: data?.activeKey,
      status,
      connector,
    };
  } catch (error) {
    console.error(error);

    return null;
  }
};

import { Connector } from '@usewallet/core/connectors';
import { StatusEnum } from '@usewallet/core/enums';
import { getClient } from '@usewallet/core/utils';

export type Account = {
  publicKey?: string;
  status?: StatusEnum;
  connector?: Connector;
};

export const getAccount = (): Account | null => {
  try {
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

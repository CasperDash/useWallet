import { Connector } from '@usedapp/core/connectors';
import { StatusEnum } from '@usedapp/core/enums';
import { getClient } from '@usedapp/core/utils';

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

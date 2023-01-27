import { Connector } from '@usedapp/core/connectors';
import { StatusEnum } from '@usedapp/core/enums';
import { getClient } from '@usedapp/core/utils/client';

export type Account = {
  publicKey?: string;
  status?: StatusEnum;
  connector?: Connector;
};

export const getAccount = (): Account | null => {

  try {
    const client = getClient();
    if (!client) {
      return null;
    }

    const { data, status, connector } = client;

    return {
      publicKey: data?.activeKey,
      status,
      connector,
    };
  } catch (error) {
    console.log(error);

    return null;
  }
};

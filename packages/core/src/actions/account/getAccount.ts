import { StatusEnum } from '@usedapp/core/enums';
import { getClient } from '@usedapp/core/utils/client';

export type Account = {
  publicKey?: string;
  status?: StatusEnum;
};

export const getAccount = (): Account | null => {

  try {
    const client = getClient();
    if (!client) {
      return null;
    }

    const { data, status } = client;

    return {
      publicKey: data?.activeKey,
      status,
    };
  } catch (error) {
    console.log(error);

    return null;
  }
};

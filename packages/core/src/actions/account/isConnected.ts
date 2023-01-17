import { getClient } from '@usedapp/core/utils/client';

export const isConnected = async (): Promise<boolean> => {
  const connector = getClient()?.connector;

  try {
    const hasConnected = await connector?.isConnected();

    return !!hasConnected;
  } catch (error) {
    console.log(error);
    return false;
  }
};

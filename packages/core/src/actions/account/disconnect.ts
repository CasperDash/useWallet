import { getClient } from '@usedapp/core/utils/client';

export const disconnect = async (): Promise<void> => {
  const connector = getClient()?.connector;

  try {
    await connector?.disconnect();
  } catch (error) {
    console.error(error);
  }
};

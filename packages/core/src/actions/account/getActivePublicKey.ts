import { getClient } from '@usedapp/core/utils/client';

export const getActivePublicKey = async (): Promise<void> => {
  const connector = getClient()?.connector;

  try {
    await connector?.getActivePublicKey();
  } catch (error) {
    console.log(error);
  }
};

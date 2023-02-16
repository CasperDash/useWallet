import { getClient } from '@usewallet/core/utils/client';

export const getActivePublicKey = async (): Promise<string | undefined> => {
  const connector = getClient()?.connector;

  try {
    const activeKey = await connector?.getActivePublicKey();

    return activeKey;
  } catch (error) {
    console.error(error);
  }
};

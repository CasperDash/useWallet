import { getClient } from '@casperdash/usewallet-core/utils/client';

export const isConnected = async (): Promise<boolean> => {
  const connector = getClient()?.connector;

  try {
    const hasConnected = await connector?.isConnected();

    return !!hasConnected;
  } catch (error) {
    console.error(error);
    return false;
  }
};

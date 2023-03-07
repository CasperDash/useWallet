import { getClient } from '@casperdash/usewallet-core/utils/client';

/**
 * It returns a boolean value that indicates whether the client is connected to the server
 * @returns A boolean value.
 */
export const isConnected = async (): Promise<boolean> => {
  /* Getting the connector from the client. */
  const connector = getClient()?.connector;

  try {
    /* Checking if the client is connected to the server. */
    const hasConnected = await connector?.isConnected();

    return !!hasConnected;
  } catch (error) {
    console.error(error);
    return false;
  }
};

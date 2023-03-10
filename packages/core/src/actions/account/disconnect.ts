import { getClient } from '@casperdash/usewallet-core/utils/client';

/**
 * It disconnects the client from the server, and updates the client's state to reflect the new status
 */
export const disconnect = async (): Promise<void> => {
  /* Getting the client from the core library. */
  const client = getClient();

  try {
    /* Calling the `disconnect` method of the connector. */
    await client.connector?.disconnect();
    client.clearState();
  } catch (error) {
    console.error(error);
  }
};

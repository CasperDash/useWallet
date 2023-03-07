import { StatusEnum } from '@casperdash/usewallet-core/enums';
import { getClient, StateParams } from '@casperdash/usewallet-core/utils/client';

/**
 * It disconnects the client from the server, and updates the client's state to reflect the new status
 */
export const disconnect = async (): Promise<void> => {
  /* Getting the client from the core library. */
  const client = getClient();

  try {
    /* Calling the `disconnect` method of the connector. */
    await client.connector?.disconnect();
   /* Updating the state of the client. */
    client.setState((oldState: StateParams) => ({
      ...oldState,
      status: StatusEnum.DISCONNECTED,
      data: {
        ...oldState.data,
        activeKey: undefined,
      },
    }));
  } catch (error) {
    console.error(error);
  }
};

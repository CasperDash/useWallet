import { Connector, StatusEnum, ConnectorAlreadyConnectedError } from '@casperdash/usewallet-core';
import { getClient, StateParams } from '@casperdash/usewallet-core/utils/client';

export type ConnectParams = {
  connector: Connector;
};

export type ConnectResult = {
  connector: Connector;
};

const getActiveKey = async (connector: Connector) => {
  const activeKey = await connector.getActivePublicKey();
  if (!activeKey) {
    throw new Error('Public key not found');
  }

  return {
    activeKey,
  };
};

export const connect = async ({ connector }: ConnectParams): Promise<ConnectResult> => {

  // get the client object of @casperdash/usewallet-core
  const client = getClient();

  /* check if there is an active connector available in the client object;
  if available, throw error if the active connector and this connector are not the same.*/
  const activeConnector = client?.connector;
  if (activeConnector && activeConnector.id !== connector.id) {
    throw new ConnectorAlreadyConnectedError();
  }

  try {
    // change the state of the client and set the status property as "CONNECTING"
    client.setState((x: StateParams) => ({ ...x, status: StatusEnum.CONNECTING }));

    // Call the `connect()` method on the specified connector and wait until the connection is established
    await connector.connect();

    // Declare and initialize variables for storing custom data and the status of connection establishment
    let isConnected = false;

    let customData: { activeKey?: string } = {};
    try {
      // Specify to check whether the connector is connected or not by calling the `isConnected()` method on connector
      isConnected = !!await connector.isConnected();
      if (isConnected) {
        // If the connection is established successfully, get the active public key from the connector
        const { activeKey } = await getActiveKey(connector);

        customData = {
          activeKey: activeKey,
        };
      }
    } catch (err) {
      await connector.connect();
      try {
        const { activeKey } = await getActiveKey(connector);
        customData = {
          activeKey,
        };
      } catch {
        customData = {};
      }
    }

    client.setLastUsedConnector(connector.id);

    client.setState((oldState: StateParams) => ({
      ...oldState,
      connector,
      status: customData.activeKey ? StatusEnum.CONNECTED : StatusEnum.CONNECTING,
      data: {
        ...oldState.data,
        ...customData,
      },
    }));

    // Finally, Return an object containing the connector that was passed in.
    return { connector };

  } catch (error) {
    client.setState((oldState: StateParams) => {
      return {
        ...oldState,
        status: oldState.connector ? StatusEnum.CONNECTED : StatusEnum.DISCONNECTED,
      };
    });
    console.error(error);

    // Propagate the error up the call stack by throwing the error
    throw error;
  }
};

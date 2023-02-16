import { Connector, StatusEnum, ConnectorAlreadyConnectedError } from '@casperdash/usewallet-core';
import { getClient, StateParams } from '@casperdash/usewallet-core/utils/client';

export type ConnectParams = {
  connector: Connector;
};

export type ConnectResult = {
  connector: Connector;
};

export const connect = async ({ connector }: ConnectParams): Promise<ConnectResult> => {
  const client = getClient();
  const activeConnector = client?.connector;

  if (activeConnector && activeConnector.id !== connector.id) {
    throw new ConnectorAlreadyConnectedError();
  }

  try {
    client.setState((x: StateParams) => ({ ...x, status: StatusEnum.CONNECTING }));
    await connector.connect();
    let customData = {};
    let isConnected = false;

    try {
      const activeKey = await connector.getActivePublicKey();
      customData = {
        activeKey: activeKey,
      };
      isConnected = !!activeKey;
    } catch (err) {
      console.error(err);
    }

    client.setState((oldState: StateParams) => ({
      ...oldState,
      connector,
      status: isConnected ? StatusEnum.CONNECTED : StatusEnum.CONNECTING,
      data: {
        ...oldState.data,
        ...customData,
      },
    }));

    return {
      connector,
    };
  } catch (error) {
    console.error(error);

    throw error;
  }
};

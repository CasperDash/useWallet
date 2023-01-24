import { Connector } from '@usedapp/core/connectors/base';
import { StatusEnum } from '@usedapp/core/enums';
import { ConnectorAlreadyConnectedError } from '@usedapp/core/errors';
import { getClient, StateParams } from '@usedapp/core/utils/client';

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
    client.setState((x: StateParams) => ({ ...x, status: StatusEnum.CONNETING }));
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
      console.log(err);
    }

    client.setState((oldState: StateParams) => ({
      ...oldState,
      connector,
      status: isConnected ? StatusEnum.CONNECTED : StatusEnum.CONNETING,
      data: {
        ...oldState.data,
        ...customData,
      },
    }));

    return {
      connector,
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
};

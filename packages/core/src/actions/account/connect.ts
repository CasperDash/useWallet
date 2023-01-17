import { Connector } from '@usedapp/core/connectors/base';
import { StatusEnum } from '@usedapp/core/enums';
import { ConnectorAlreadyConnectedError } from '@usedapp/core/errors';
import { getClient, StateParams } from '@usedapp/core/utils/client';

export type ConnectParams = {
  connector: Connector;
};

export const connect = async ({ connector }: ConnectParams): Promise<void> => {
  const client = getClient();
  const activeConnector = client?.connector;

  if (activeConnector && activeConnector.id !== connector.id) {
    throw new ConnectorAlreadyConnectedError();
  }

  console.log('connector: ', connector);

  try {
    await connector.connect();

    client?.setState((oldState: StateParams) => ({
      ...oldState,
      connector,
      status: StatusEnum.CONNECTED,
    }));
  } catch (error) {
    console.log(error);
  }
};

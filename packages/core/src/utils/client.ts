/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createStore, Mutate, StoreApi } from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

import { Connector, ConnectorData } from '../connectors/base';
import { ClientNotFoundError } from '../errors';
import { StatusEnum } from '../enums';

export type StateParams = {
  connectors: Connector[];
  connector?: Connector;
  data?: ConnectorData;
  status?: StatusEnum;
  autoConnect?: boolean;
};


export type ClientConfig = StateParams;

/* It's a wrapper around a state management library called Zustand */
export class Client {
  private store: Mutate<
  StoreApi<StateParams>,
  [
    ['zustand/subscribeWithSelector', never],
  ]
  >;

  private isAutoConnecting: boolean | undefined;

  constructor({
    autoConnect = false,
    connectors,
  }: ClientConfig) {
    this.store = createStore(subscribeWithSelector(() => ({
      connectors: connectors,
      status: StatusEnum.DISCONNECTED,
      autoConnect,
    })));

    this.triggerEvent();

    if (autoConnect) {
      let x = 0;
      const intervalID = setInterval(() => {
        let isReady = false;
        for (const connector of connectors) {
          if (connector.getProvider()) {
            isReady = true;
          }
        }

        if (++x === 5 || isReady) {
          setTimeout(async () => this.autoConnect(), 0);
          window.clearInterval(intervalID);
        }
      }, 1000);
    }
  }

  public get state() {
    return this.store.getState();
  }

  public get connector(): Connector | undefined {
    return this.store.getState().connector;
  }

  public get connectors(): Connector[] | undefined {
    return this.store.getState().connectors;
  }

  public get subscribe() {
    return this.store.subscribe;
  }

  public get data() {
    return this.store.getState().data;
  }

  public get status() {
    return this.store.getState().status;
  }

  public clearState() {
    this.setState((x: StateParams) => ({
      ...x,
      connector: undefined,
      data: undefined,
      status: StatusEnum.DISCONNECTED,
    }));
  }

  public setState(
    updater:
    | Partial<StateParams>
    | ((
      state: StateParams,
    ) => StateParams),
  ) {
    const newState =
      typeof updater === 'function' ? updater(this.store.getState()) : updater;
    this.store.setState(newState, true);
  }

  protected async autoConnect() {
    if (this.isAutoConnecting) {
      return;
    }
    if (this.status === StatusEnum.CONNECTED) {
      return;
    }
    this.isAutoConnecting = true;
    console.log('connectors: ', this.connectors);

    this.setState((x: StateParams) => ({
      ...x,
      status: x.data?.activeKey ? StatusEnum.RECONNECTING : StatusEnum.CONNECTING,
    }));

    let isConnected = false;
    for (const connector of this.connectors || []) {
      /* It's checking if the connector is connected. */
      const isConnectedWithConnector = await connector?.isConnected();
      if (isConnectedWithConnector) {
        let publicKey: string | undefined;
        try {
          publicKey = await connector?.getActivePublicKey();
        } catch (err) {
          publicKey = undefined;
        }
        if (!publicKey) {
          this.setState((x: StateParams) => ({
            ...x,
            connector,
          }));
          try {
            await connector.connect();
          } catch (err) {
            console.error(err);
          }
        }
        try {
          publicKey = await connector?.getActivePublicKey();

          this.setState((x: StateParams) => ({
            ...x,
            status: StatusEnum.CONNECTED,
            connector,
            data: {
              ...x.data,
              activeKey: publicKey,
            },
          }));
          isConnected = true;
          break;
        } catch (err) {
          console.error(err);
        }

      }
    }

    if (!isConnected) {
      this.setState((x: StateParams) => ({
        ...x,
        status: StatusEnum.DISCONNECTED,
      }));
    }

    this.isAutoConnecting = false;

    return this.data;
  }

  private triggerEvent(): void {
    /**
     * It sets the state of the component.
     * @param {ConnectorData} data - ConnectorData - The data that is passed to the connector.
     */
    const onChange = (data: ConnectorData) => {
      this.setState((x: StateParams) => ({
        ...x,
        data: { ...x.data, ...data },
      }));
    };

    /**
     * It clears the state of the component.
     */
    const onUnlock = async ({ isUnlocked }: { isUnlocked: boolean; isConnected:boolean }) => {
      if (!isUnlocked) {
        return;
      }
      let publicKey: string | undefined;
      try {
        publicKey = await this.connector?.getActivePublicKey();
      } catch (err) {
        console.error(err);
        publicKey = undefined;
      }

      this.setState((x: StateParams) => ({
        ...x,
        data: { ...x.data, activeKey: publicKey },
        status: publicKey ? StatusEnum.CONNECTED : StatusEnum.DISCONNECTED,
      }));
    };

    const onDisconnect = () => {
      this.clearState();
    };

    /**
     * It sets the state of the component to the data passed in.
     * @param {ConnectorData} data - ConnectorData - this is the data that is returned from the
     * connector.
     */
    const onConnect = (data: ConnectorData) => {
      this.setState((x: StateParams) => ({
        ...x,
        data: { ...x.data, ...data },
        status: StatusEnum.CONNECTED,
      }));
    };


    this.store.subscribe(
      ({ connector }: StateParams) => connector!,
      (connector: Connector) => {
        if (!connector) return;
        window?.addEventListener('casper:change',
          (event: CustomEventInit<{ activeKey: string; isConnected: boolean }>) => onChange(event.detail!));
        window?.addEventListener('casper:disconnect', () => onDisconnect());
        window?.addEventListener('casper:connect',
          (event: CustomEventInit<{ activeKey: string; isConnected: boolean }>) => onConnect(event.detail!));
        window?.addEventListener('casper:unlocked',
          async (event: CustomEventInit<{ isUnlocked: boolean; isConnected: boolean }>) => onUnlock(event.detail!));

      },
    );
  }


}

export let client: Client;

/**
 * It creates a new instance of the Client class and returns it
 * @param {ClientConfig} clientConfig - ClientConfig
 * @returns A Client object
 */
export const createClient = (clientConfig: ClientConfig): Client => {
  client = new Client(clientConfig);

  return client;
};

/* It's a function that returns the client. */
export const getClient = (): Client => {
  if (!client) {
    throw new ClientNotFoundError();
  }

  return client;
};

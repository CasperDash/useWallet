/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createStore, Mutate, StoreApi } from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

import { Connector, ConnectorData } from '../connectors/base';
import { ClientNotFoundError } from '../errors';
import { StatusEnum } from '../enums';

import { ClientStorage, createStorage, noopStorage } from './storage';
import { maybeParseDetailEvent } from './parser';

export type StateParams = {
  connectors: Connector[];
  connector?: Connector;
  data?: ConnectorData;
  status?: StatusEnum;
  autoConnect?: boolean;
};


export type ClientConfig = StateParams & {
  storage?: ClientStorage;
};

/* It's a wrapper around a state management library called Zustand */
export class Client {
  private store: Mutate<
  StoreApi<StateParams>,
  [
    ['zustand/subscribeWithSelector', never],
  ]
  >;

  private isAutoConnecting?: boolean;
  private lastUsedConnector?: string | null;
  private storage?: ClientStorage;

  constructor({
    autoConnect = false,
    connectors,
    storage = createStorage({
      storage:
        typeof window !== 'undefined' ? window.localStorage : noopStorage,
    }),
  }: ClientConfig) {
    this.store = createStore(subscribeWithSelector(() => ({
      connectors: connectors,
      status: StatusEnum.DISCONNECTED,
      autoConnect,
    })));

    this.triggerEvent();
    this.lastUsedConnector = storage.getItem('wallet');
    this.storage = storage;

    void this.triggerAutoConnect(autoConnect, connectors);
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

  public setLastUsedConnector(lastUsedConnector: string | null = null) {
    this.storage?.setItem('wallet', lastUsedConnector);
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

    this.setState((x: StateParams) => ({
      ...x,
      status: x.data?.activeKey ? StatusEnum.RECONNECTING : StatusEnum.CONNECTING,
    }));

    let isConnected = false;

    const sortedConnectors = this.lastUsedConnector && this.connectors
      ? [...this.connectors].sort((connector: Connector) =>
        connector.id === this.lastUsedConnector ? -1 : 1,
      )
      : this.connectors;

    for (const connector of sortedConnectors || []) {
      /* It's checking if the connector is connected. */
      const isConnectedWithConnector = await connector?.isConnected();
      if (isConnectedWithConnector) {
        let publicKey = await this.getPublicKeyFromConnector(connector);
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

  private async triggerAutoConnect(autoConnect: boolean, connectors: Connector[]) {
    if (autoConnect && typeof window !== 'undefined') {
      let x = 0;
      const intervalID = setInterval(() => {
        let isReady = false;
        for (const connector of connectors) {
          try {
            if (connector.getProvider()) {
              isReady = true;
            }
          } catch (err) {
            // No handle error.
          }
        }

        if (++x === 5 || isReady) {
          setTimeout(async () => this.autoConnect(), 0);
          window?.clearInterval(intervalID);
        }
      }, 100);
    }
  }

  private triggerEvent(): void {
    if (typeof window === 'undefined') {
      return;
    }

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
      const publicKey = await this.getPublicKeyFromConnector(this.connector);

      this.setState((oldState: StateParams) => ({
        ...oldState,
        data: { ...oldState.data, activeKey: publicKey },
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

    window?.addEventListener('casper:change',
      (event: CustomEventInit<{ activeKey: string; isConnected: boolean }>) => onChange(maybeParseDetailEvent(event.detail!)));
    window?.addEventListener('casper:disconnect', () => onDisconnect());
    window?.addEventListener('casper:connect',
      (event: CustomEventInit<{ activeKey: string; isConnected: boolean }>) => onConnect(maybeParseDetailEvent(event.detail!)));
    window?.addEventListener('casper:unlocked',
      async (event: CustomEventInit<{ isUnlocked: boolean; isConnected: boolean }>) => onUnlock(maybeParseDetailEvent(event.detail!)));

    // this.store.subscribe(
    //   ({ connector }: StateParams) => connector!,
    //   (connector: Connector, prevConnector: Connector) => {
    //     prevConnector?.off?.('change', console.log);
    //     prevConnector?.off?.('disconnect', console.log);
    //     prevConnector?.off?.('error', console.log);

    //     if (!connector) return;
    //     connector.on?.('change', console.log);
    //     connector.on?.('disconnect', console.log);
    //     connector.on?.('error', console.log);
    //   },
    // );
  }

  private async getPublicKeyFromConnector(connector?: Connector) {
    let publicKey: string | undefined;
    try {
      publicKey = await connector?.getActivePublicKey();
    } catch (err) {
      publicKey = undefined;
    }

    return publicKey;
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

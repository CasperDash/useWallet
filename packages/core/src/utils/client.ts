import { createStore, Mutate, StoreApi } from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';

import { Connector, ConnectorData } from '../connectors/base';

export type StateParams = {
  connectors: Connector[];
  connector?: Connector;
  data?: ConnectorData;
};


export type ClientConfig = StateParams;

export class Client {
  private store: Mutate<
  StoreApi<StateParams>,
  [
    ['zustand/subscribeWithSelector', never],
  ]
  >;

  constructor({
    connectors,
  }: ClientConfig) {
    this.store = createStore(subscribeWithSelector(() => ({
      connectors: connectors,
    })));

    this.triggerEvent();
  }

  public get connector(): Connector | undefined {
    return this.store.getState().connector;
  }

  public get subscribe() {
    return this.store.subscribe;
  }

  public clearState() {
    this.setState((x: StateParams) => ({
      ...x,
      connector: undefined,
      data: undefined,
    }));
  }

  public setState(
    updater:
    | StateParams
    | ((
      state: StateParams,
    ) => StateParams),
  ) {
    const newState =
      typeof updater === 'function' ? updater(this.store.getState()) : updater;
    this.store.setState(newState, true);
  }

  private triggerEvent(): void {
    const onChange = (data: ConnectorData) => {
      console.log('onChange', data);
      this.setState((x: StateParams) => ({
        ...x,
        data: { ...x.data, ...data },
      }));
    };

    const onDisconnect = () => {
      console.log('onDisconnect');
      this.clearState();
    };

    const onConnect = (data: ConnectorData) => {
      console.log('onConnect', data);
      this.setState((x: StateParams) => ({
        ...x,
        data: { ...x.data, ...data },
      }));
    };

    this.store.subscribe(
      ({ connector }: StateParams) => connector!,
      (connector: Connector) => {
        // prevConnector?.off?.('change', onChange);
        // prevConnector?.off?.('disconnect', onDisconnect);
        // prevConnector?.off?.('connect', onConnect);

        if (!connector) return;
        // console.log('connector');

        // connector.on?.('change', onChange);
        // connector.on?.('disconnect', onDisconnect);
        // connector.on?.('connect', onDisconnect);

        window?.addEventListener('casper:change',
          (event: CustomEventInit<{ activeKey: string; isConnected: boolean }>) => onChange(event.detail!));
        window?.addEventListener('casper:disconnect', () => onDisconnect());
        window?.addEventListener('casper:connect',
          (event: CustomEventInit<{ activeKey: string; isConnected: boolean }>) => onConnect(event.detail!));
      },
    );
  }
}

export let client: Client;

export const createClient = (clientConfig: ClientConfig): Client => {
  client = new Client(clientConfig);

  return client;
};

export const getClient = (): null | Client => {
  if (!client) {
    return null;
  }

  return client;
};

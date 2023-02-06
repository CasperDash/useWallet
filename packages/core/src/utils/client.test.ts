import { describe, expect, it, beforeEach, vi } from 'vitest';

import { CasperDashConnector, CasperSignerConnector, Connector } from '../connectors';
import { StatusEnum } from '../enums';
import { ClientNotFoundError } from '../errors';

import { Client, ClientConfig, createClient, getClient, StateParams } from './client';


describe('getClient', () => {
  it('throws an error if client is not created', () => {
    expect(() => getClient()).toThrowError(ClientNotFoundError);
  });

  it('returns the created client instance', () => {
    const client = createClient({ connectors: [] });

    expect(getClient()).toEqual(client);
  });
});

describe('createClient', () => {
  it('creates a new Client instance', () => {
    const client = createClient({ connectors: [] });

    expect(client).toBeInstanceOf(Client);
  });
});

describe('Client', () => {
  let client: Client;
  const mockConnectors = [new CasperDashConnector(), new CasperSignerConnector()];

  beforeEach(() => {
    const config: ClientConfig = {
      connectors: mockConnectors,
    };
    client = new Client(config);
  });

  describe('constructor', () => {
    it('creates a store with connector, status and autoConnect values', () => {
      expect(client.state).toEqual({ autoConnect: false, connectors: mockConnectors, status: StatusEnum.DISCONNECTED });
    });

    it('should initialize the store with the given config', () => {
      expect(client.state.connectors).toEqual(mockConnectors);
      expect(client.state.status).toEqual(StatusEnum.DISCONNECTED);
    });

    it('should not run if already autoConnecting is true', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      client.isAutoConnecting = true;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await client.autoConnect();

      expect(result).toBeUndefined();
    });

    it('should not run if already connected', async () => {
      client.setState((x: StateParams) => ({ ...x, status: StatusEnum.CONNECTED }));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await client.autoConnect();

      expect(result).toBeUndefined();
    });

    it('should set status to CONNECTING', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      void client.autoConnect();

      expect(client.status).toEqual(StatusEnum.CONNECTING);
    });

    it('should set status to DISCONNECTED when no connector is connected', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await client.autoConnect();

      expect(client.status).toEqual(StatusEnum.DISCONNECTED);
    });

    it('should set status to CONNECTED and set connector/data after successful connection', async () => {
      const dummyConnector = {
        isConnected: vi.fn().mockResolvedValue(true),
        connect: vi.fn().mockResolvedValue(null),
        getActivePublicKey: vi.fn().mockResolvedValue('publicKey'),
      } as unknown as Connector;

      client.setState({ connectors: [dummyConnector] });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await client.autoConnect();

      expect(client.status).toEqual(StatusEnum.CONNECTED);
      expect(client.connector).toEqual(dummyConnector);
      expect(client.data).toEqual({ activeKey: 'publicKey' });
    });
  });

  describe('get connector', () => {
    it('should return the connector from the store', () => {
      expect(client.connector).toEqual(undefined);
    });
  });

  describe('get subscribe', () => {
    it('should return the subscribe method from the store', () => {
      expect(typeof client.subscribe).toEqual('function');
    });
  });

  describe('get data', () => {
    it('should return the data from the store', () => {
      expect(client.data).toEqual(undefined);
    });
  });

  describe('get status', () => {
    it('should return the status from the store', () => {
      expect(client.status).toEqual(StatusEnum.DISCONNECTED);
    });
  });

  describe('get state', () => {
    it('should return the status from the store', () => {
      expect(client.state.connectors[0]).instanceOf(CasperDashConnector);
      expect(client.state.connectors[1]).instanceOf(CasperSignerConnector);
    });
  });

  describe('setState', () => {
    it('should set the new state with args', () => {
      client.setState({
        connector: new CasperDashConnector(),
        data: { isConnected: true },
        status: StatusEnum.CONNECTED,
      });
      expect(client.state.connector).instanceOf(CasperDashConnector);
      expect(client.state.data).toEqual({ isConnected: true });
      expect(client.state.status).toEqual(StatusEnum.CONNECTED);
    });

    it('should set the new state with callback', () => {
      client.setState((x: StateParams) => ({
        ...x,
        connector: new CasperDashConnector(),
        data: { isConnected: true },
        status: StatusEnum.CONNECTED,
      }));
      expect(client.state.connector).instanceOf(CasperDashConnector);
      expect(client.state.data).toEqual({ isConnected: true });
      expect(client.state.status).toEqual(StatusEnum.CONNECTED);
    });
  });

  describe('clearState', () => {
    it('should set the new state', () => {
      const setStateMock = vi
        .spyOn(client, 'setState').
        mockImplementation(() => ({}));
      client.clearState();
      expect(setStateMock.mock.calls).length(1);
      expect(setStateMock.mock.results[0]?.value).toEqual({
        status: undefined,
        connector: undefined,
      });
    });
  });
});

import { describe, expect, it, beforeEach, vi } from 'vitest';

import { CasperDashConnector, CasperSignerConnector } from '../connectors';
import { StatusEnum } from '../enums';

import { Client, ClientConfig, StateParams } from './client';

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
    it('should initialize the store with the given config', () => {
      expect(client.state.connectors).toEqual(mockConnectors);
      expect(client.state.status).toEqual(StatusEnum.DISCONNECTED);
    });

    // it('should call triggerEvent', () => {
    //   vi.spyOn(client, 'triggerEvent');
    //   client = new Client({ connectors: mockConnectors });
    //   expect(client.triggerEvent).toHaveBeenCalled();
    // });
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

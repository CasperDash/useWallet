import { JsonTypes } from 'typedjson';
import { describe, expect, it, beforeEach, vi, afterEach } from 'vitest';

import { ConnectorNotFoundError } from '../errors';

import { CasperDashConnector, CasperDashConnectorOptions } from './casperDash';

declare global {
  interface Window {
    casperDashHelper?: {
      isConnected: () => Promise<boolean>;
      signMessage: (
        message: string,
        signingPublicKey: string,
      ) => Promise<string>;
      sign: (
        deploy: unknown,
        signingPublicKey: string,
        targetPublicKey: string,
      ) => Promise<{ deploy: JsonTypes }>;
      disconnectFromSite: () => Promise<void>;
      requestConnection: () => Promise<void>;
      getActivePublicKey: () => Promise<string>;
    };
  }
}

describe('CasperDashConnector', () => {
  let connector: CasperDashConnector;
  let providerMock: Window['casperDashHelper'];
  let eventProviderMock: any;
  let options: CasperDashConnectorOptions;

  beforeEach(() => {
    providerMock = {
      isConnected: vi.fn().mockResolvedValue(true),
      signMessage: vi.fn(async () => Promise.resolve('signed message')),
      sign: vi.fn(async () => Promise.resolve({ deploy: {} })),
      disconnectFromSite: vi.fn(async () => Promise.resolve()),
      requestConnection: vi.fn(async () => Promise.resolve()),
      getActivePublicKey: vi.fn(async () => Promise.resolve('public key')),
    };

    eventProviderMock = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    options = {
      getProvider: vi.fn().mockReturnValue(providerMock),
      getEventProvider: vi.fn().mockReturnValue(eventProviderMock),
    };
    connector = new CasperDashConnector({ options });
  });

  describe('constructor', () => {
    afterEach(() => {
      window.casperDashHelper = undefined;
    });
    it('should get provider with casperDashHelper does exist', async () => {
      window.casperDashHelper = {
        isConnected: vi.fn().mockResolvedValue(true),
        signMessage: vi.fn(async () => Promise.resolve('signed message')),
        sign: vi.fn(async () => Promise.resolve({ deploy: {} })),
        disconnectFromSite: vi.fn(async () => Promise.resolve()),
        requestConnection: vi.fn(async () => Promise.resolve()),
        getActivePublicKey: vi.fn(async () => Promise.resolve('public key')),
      };
      const casperConnector = new CasperDashConnector({});

      expect(await casperConnector.getProvider()).equal(window.casperDashHelper);
    });

    it('should get provider with casperDashHelper does not exist', async () => {
      const casperConnector = new CasperDashConnector({});

      try {
        await casperConnector.getProvider();
      } catch (error) {
        expect(error).toBeInstanceOf(ConnectorNotFoundError);
      }
    });

    it('should get event provider', async () => {
      const casperConnector = new CasperDashConnector({});

      expect(await casperConnector.getEventProvider()).equal(window);
    });

    it('should set id as "casperDash"', () => {
      expect(connector.id).toBe('casperDash');
    });

    it('should set options with default values if no options are passed', () => {
      connector = new CasperDashConnector();

      const connectorOptions = connector.getOptions();

      expect(connectorOptions.name).toBe('CasperDash');
      expect(connectorOptions.getProvider).toBeDefined();
      expect(connectorOptions.getEventProvider).toBeDefined();
    });

    it('should set options with passed options', () => {
      options.name = 'Test';
      connector = new CasperDashConnector({ options });

      const connectorOptions = connector.getOptions();

      expect(connectorOptions.name).toBe('Test');
      expect(connectorOptions.getProvider).toBe(options.getProvider);
      expect(connectorOptions.getEventProvider).toBe(options.getEventProvider);
    });
  });

  it('has the correct id', () => {
    expect(connector.id).toBe('casperDash');
  });

  describe('getProvider', () => {
    it('returns the provider', async () => {
      const result = await connector.getProvider();
      expect(result).toBe(providerMock);
    });

    it('throws an error if the provider is not found', async () => {
      connector = new CasperDashConnector({
        options: {
          getProvider: (): any => undefined,
          getEventProvider: () => eventProviderMock,
        },
      });
      try {
        await connector.getProvider();
        new Error('expected error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ConnectorNotFoundError);
      }
    });
  });

  describe('getEventProvider', () => {
    it('returns the event provider', async () => {
      const result = await connector.getEventProvider();
      expect(result).toBe(eventProviderMock);
    });

    it('throws an error if the event provider is not found', async () => {
      connector = new CasperDashConnector({
        options: {
          getProvider: (): any => providerMock,
          getEventProvider: (): any => undefined,
        },
      });
      try {
        await connector.getEventProvider();
        new Error('expected error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(ConnectorNotFoundError);
      }
    });
  });

  describe('isConnected', () => {
    it('returns true if the provider is connected', async () => {
      const result = await connector.isConnected();

      expect(result).toBe(true);
    });

    it('returns false if there is an error', async () => {
      const provider = {
        isConnected: vi.fn().mockResolvedValue(true),
        disconnectFromSite: vi.fn().mockResolvedValue(undefined),
        requestConnection: vi.fn().mockResolvedValue(undefined),
        getActivePublicKey: vi.fn().mockResolvedValue('activeKey'),
        signMessage: vi.fn().mockResolvedValue('signedMessage'),
        sign: vi.fn().mockResolvedValue({ deploy: {} }),
      };

      const eventProvider = {
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      };

      const mockConnector = new CasperDashConnector({
        options: {
          getProvider: vi.fn().mockReturnValue(provider),
          getEventProvider: vi.fn().mockReturnValue(eventProvider),
        },
      });

      provider.isConnected.mockRejectedValue(new Error());

      const result = await mockConnector.isConnected();

      expect(result).toBe(false);
    });
  });

  describe('disconnect', () => {
    it('should remove all event listeners from the event provider', async () => {
      await connector.disconnect();

      expect(eventProviderMock.removeEventListener).toHaveBeenCalledTimes(3);
      expect(eventProviderMock.removeEventListener).toHaveBeenCalledWith(
        'casperdash:activeKeyChanged',
        connector.onActiveKeyChanged,
      );
      expect(eventProviderMock.removeEventListener).toHaveBeenCalledWith(
        'casperdash:disconnected',
        expect.any(Function),
      );
      expect(eventProviderMock.removeEventListener).toHaveBeenCalledWith(
        'casperdash:connected',
        connector.onConnected,
      );
    });

    it('should disconnect from the site', async () => {
      await connector.disconnect();

      expect(providerMock?.disconnectFromSite).toHaveBeenCalledTimes(1);
    });
  });

  describe('connect', () => {
    it('should add 3 event listeners to eventProvider', async () => {
      await connector.connect();

      expect(eventProviderMock.addEventListener).toHaveBeenCalledTimes(3);
      expect(eventProviderMock.addEventListener).toHaveBeenCalledWith(
        'casperdash:activeKeyChanged',
        connector.onActiveKeyChanged,
      );
      expect(eventProviderMock.addEventListener).toHaveBeenCalledWith(
        'casperdash:disconnected',
        connector.onDisconnected,
      );
      expect(eventProviderMock.addEventListener).toHaveBeenCalledWith(
        'casperdash:connected',
        connector.onConnected,
      );
    });

    it('should call requestConnection on provider', async () => {
      await connector.connect();

      expect(providerMock?.requestConnection).toHaveBeenCalledTimes(1);
    });

    describe('getActivePublicKey', () => {
      it('should return active public key from the provider', async () => {
        const activePublicKey = await connector.getActivePublicKey();

        expect(activePublicKey).toBe('public key');
        expect(providerMock?.getActivePublicKey).toHaveBeenCalledTimes(1);
      });
    });

    describe('signMessage', () => {
      it('should sign the message using the provider', async () => {
        const signedMessage = await connector.signMessage(
          'test-message',
          'test-signing-public-key',
        );

        expect(signedMessage).toBe('signed message');
        expect(providerMock?.signMessage).toHaveBeenCalledWith(
          'test-message',
          'test-signing-public-key',
        );
        expect(providerMock?.signMessage).toHaveBeenCalledTimes(1);
      });
    });

    describe('sign', () => {
      it('should sign the deploy using the provider', async () => {
        const signedDeploy = await connector.sign(
          'test-deploy',
          'test-signing-public-key',
          'test-target-public-key',
        );

        expect(signedDeploy).toEqual({ deploy: {} });
        expect(providerMock?.sign).toHaveBeenCalledWith(
          'test-deploy',
          'test-signing-public-key',
          'test-target-public-key',
        );
        expect(providerMock?.sign).toHaveBeenCalledTimes(1);
      });
    });

    describe('onDisconnected', () => {
      it('should dispatch a custom event with type "casper:disconnect"', () => {
        const spy = vi.spyOn(window, 'dispatchEvent');
        connector.onDisconnected();
        expect(spy).toHaveBeenCalledWith(new CustomEvent('casper:disconnect'));
      });
    });

    describe('onActiveKeyChanged', () => {
      it('should dispatch a custom event with type "casper:change" and event details', () => {
        const spy = vi.spyOn(window, 'dispatchEvent');
        const event = { detail: { activeKey: '12345', isConnected: true } };
        connector.onActiveKeyChanged(event);
        expect(spy).toHaveBeenCalledWith(
          new CustomEvent('casper:change', event),
        );
      });
    });

    describe('onConnected', () => {
      it('should dispatch a custom event with type "casper:connect" and event details', () => {
        const spy = vi.spyOn(window, 'dispatchEvent');
        const event = { detail: { activeKey: '12345', isConnected: true } };
        connector.onConnected(event);
        expect(spy).toHaveBeenCalledWith(
          new CustomEvent('casper:connect', event),
        );
      });
    });
  });
});

import { Connector } from '@casperdash/usewallet-core/connectors/base';
import { StatusEnum } from '@casperdash/usewallet-core/enums';
import { ConnectorAlreadyConnectedError, ConnectorNotFoundError } from '@casperdash/usewallet-core/errors';
import { StateParams } from '@casperdash/usewallet-core/utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { connect } from './connect';

const callBackSpy = vi.fn().mockImplementation((cb: (params: Partial<StateParams>) => StateParams) => cb({}));
vi.mock('@casperdash/usewallet-core/utils/client', () => ({
  getClient: vi.fn(() => ({
    data: { activeKey: 'testPublicKey' },
    connector: {
      id: 'test',
      connect: vi.fn(),
      getActivePublicKey: vi.fn(),
    } as unknown as Connector,
    setState: callBackSpy,
    setLastUsedConnector: vi.fn(),
  })),
}));

describe('connect', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should connect to the given connector and set the client state', async () => {
    const connector = {
      id: 'test',
      connect: vi.fn(),
      getActivePublicKey: vi.fn().mockReturnValue('active-key'),
      isConnected: vi.fn().mockResolvedValueOnce(true),
    } as unknown as Connector;
    const connectSpy = vi.spyOn(connector, 'connect');
    const getActivePublicKeySpy = vi.spyOn(connector, 'getActivePublicKey');

    await connect({ connector });

    expect(callBackSpy.mock.calls).length(2);
    expect(callBackSpy.mock.results[0]?.value).toEqual({
      status: StatusEnum.CONNECTING,
    });
    expect(callBackSpy.mock.results[1]?.value).toEqual({
      connector,
      status: StatusEnum.CONNECTED,
      data: {
        activeKey: 'active-key',
      },
    });
    expect(connectSpy).toHaveBeenCalledOnce();
    expect(getActivePublicKeySpy).toHaveBeenCalledOnce();
  });

  it('should throw an error if a connector is already connected', async () => {
    const connector = {
      id: 'test2',
      connect: vi.fn(),
      getActivePublicKey: vi.fn(),
      isConnected: vi.fn().mockRejectedValueOnce(false),
    } as unknown as Connector;
    const connectSpy = vi.spyOn(connector, 'connect');
    const getActivePublicKeySpy = vi.spyOn(connector, 'getActivePublicKey');

    try {
      await connect({ connector });
    } catch (error) {
      expect(error).toBeInstanceOf(ConnectorAlreadyConnectedError);
    }

    expect(connectSpy).toHaveBeenCalledTimes(0);
    expect(getActivePublicKeySpy).toHaveBeenCalledTimes(0);
  });

  it('should throw an error if a connector not found', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const connector = {
      id: 'test',
      connect: vi.fn().mockRejectedValueOnce(new ConnectorNotFoundError()),
      getActivePublicKey: vi.fn(),
      isConnected: vi.fn().mockResolvedValueOnce(true),
    } as unknown as Connector;
    const connectSpy = vi.spyOn(connector, 'connect');
    const getActivePublicKeySpy = vi.spyOn(connector, 'getActivePublicKey');
    try {
      await connect({ connector });
    } catch (error) {
      expect(error).toBeInstanceOf(ConnectorNotFoundError);
    }

    expect(connectSpy).toHaveBeenCalledOnce();
    expect(getActivePublicKeySpy).toBeCalledTimes(0);
    expect(errorSpy).toHaveBeenCalledOnce();
  });

  it('should throw an error if a connector not found when connecting', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const connector = {
      id: 'test',
      connect: vi.fn().mockRejectedValueOnce(new ConnectorNotFoundError()),
      getActivePublicKey: vi.fn(),
      isConnected: vi.fn().mockResolvedValueOnce(true),
    } as unknown as Connector;
    const connectSpy = vi.spyOn(connector, 'connect');
    const getActivePublicKeySpy = vi.spyOn(connector, 'getActivePublicKey');
    try {
      await connect({ connector });
    } catch (error) {
      expect(error).toBeInstanceOf(ConnectorNotFoundError);
    }

    expect(connectSpy).toHaveBeenCalledOnce();
    expect(getActivePublicKeySpy).toHaveBeenCalledTimes(0);
    expect(errorSpy).toHaveBeenCalledOnce();
  });
});

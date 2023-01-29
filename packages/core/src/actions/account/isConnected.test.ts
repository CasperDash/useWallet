import { describe, expect, it, vi, beforeEach } from 'vitest';
import { CapserDashConnector, CasperSignerConnector, Connector } from '@usedapp/core/connectors';
import { createClient, getClient } from '@usedapp/core/utils';
import { StatusEnum } from '@usedapp/core/enums';
import { ConnectorNotFoundError } from '@usedapp/core/errors';

import { isConnected } from './isConnected';

describe('isConnected', () => {
  beforeEach(() => {
    // reset the client state
    createClient({
      connectors: [new CapserDashConnector(), new CasperSignerConnector()],
    });
  });

  it('returns false when not connected', async () => {
    const isConnectedDapp = await isConnected();

    expect(isConnectedDapp).toBe(false);
  });

  it('returns true when connected', async () => {
    const mockConnector = {
      isConnected: vi.fn().mockResolvedValue(true),
    } as unknown as Connector;

    getClient().setState({ connector: mockConnector, status: StatusEnum.CONNECTED });

    const isConnectedDapp = await isConnected();

    expect(isConnectedDapp).toBe(true);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockConnector.isConnected).toHaveBeenCalled();
  });

  it('returns false when connector throws an error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const mockConnector = {
      isConnected: vi.fn().mockRejectedValue(new ConnectorNotFoundError()),
    } as unknown as Connector;

    getClient().setState({ connector: mockConnector, status: StatusEnum.CONNECTED });

    const isConnectedDapp = await isConnected();

    expect(isConnectedDapp).toBe(false);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockConnector.isConnected).toHaveBeenCalled();
  });

  it('returns false when client state is not set', async () => {
    getClient().setState({});

    const isConnectedDapp = await isConnected();

    expect(isConnectedDapp).toBe(false);
  });
});

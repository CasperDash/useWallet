import { CasperDashConnector, Connector } from '@usedapp/core/connectors';
import { ConnectorNotFoundError } from '@usedapp/core/errors';
import { getClient } from '@usedapp/core/utils/client';
import { createClient } from '@usedapp/core/utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { getActivePublicKey } from './getActivePublicKey';

describe('getActivePublicKey', () => {
  beforeEach(() => {
    // Reset the client state before each test
    createClient({
      connectors: [new CasperDashConnector()],
    });
  });

  it('should return the active public key', async () => {
    // Create a mock connector that returns a specific active key
    const mockConnector = {
      getActivePublicKey: vi.fn(async () => Promise.resolve('active-key')),
    } as unknown as Connector;

    // Set the client's connector to the mock connector
    getClient().setState({ connector: mockConnector });

    // Call the getActivePublicKey function
    const activeKey = await getActivePublicKey();

    // Assert that the function returns the expected key
    expect(activeKey).toEqual('active-key');

    // Assert that the mock connector's getActivePublicKey method was called
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockConnector.getActivePublicKey).toHaveBeenCalled();
  });

  it('should return undefined if there is no connector', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // Call the getActivePublicKey function
    const activeKey = await getActivePublicKey();

    // Assert that the function returns undefined
    expect(activeKey).toBeUndefined();
  });

  it('should return undefined if the connector throws an error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    // Create a mock connector that throws an error
    const mockConnector = {
      getActivePublicKey: vi.fn(async () => Promise.reject(new ConnectorNotFoundError())),
    } as unknown as Connector;

    // Set the client's connector to the mock connector
    getClient().setState({ connector: mockConnector });

    // Call the getActivePublicKey function
    const activeKey = await getActivePublicKey();

    // Assert that the function returns undefined
    expect(activeKey).toBeUndefined();

    // Assert that the mock connector's getActivePublicKey method was called
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockConnector.getActivePublicKey).toHaveBeenCalled();
  });
});

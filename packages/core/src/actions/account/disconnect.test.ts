import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createClient, getClient } from '@usewallet/core/utils/client';
import { CasperDashConnector, Connector } from '@usewallet/core/connectors';

import { disconnect } from './disconnect';

describe('disconnect', () => {
  beforeEach(() => {
    createClient({
      connectors: [new CasperDashConnector()],
    });
  });

  it('should call the disconnect method of the current connector', async () => {
    const disconnectSpy = vi.fn().mockResolvedValue(undefined);
    const connector = { disconnect: disconnectSpy } as unknown as Connector;
    vi.spyOn(getClient(), 'connector', 'get').mockReturnValue(connector);

    try {
      await disconnect();
    } catch (err) {
      console.log(err);
    }

    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should log any error thrown during the disconnect process', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const disconnectSpy = vi.fn().mockRejectedValue(new Error('disconnect error'));
    const connector = { disconnect: disconnectSpy } as unknown as Connector;
    vi.spyOn(getClient(), 'connector', 'get').mockReturnValue(connector);

    await disconnect();

    expect(spy).toHaveBeenCalledWith(new Error('disconnect error'));
    spy.mockRestore();
  });
});

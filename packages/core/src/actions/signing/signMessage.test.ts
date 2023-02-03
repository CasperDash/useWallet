import { ConnectorNotFoundError } from '@usedapp/core/errors';
import { Client, getClient } from '@usedapp/core/utils/client';
import { describe, expect, it, vi, afterEach, beforeEach, MockedFunction } from 'vitest';

import { signMessage } from './signMessage';

vi.mock('@usedapp/core/utils/client', () => ({
  getClient: vi.fn(),
}));

describe('signMessage', () => {
  const connector = {
    signMessage: vi.fn(async () => 'signedMessage'),
  };

  beforeEach(() => {
    (getClient as MockedFunction<typeof getClient>).mockReturnValue({ connector } as unknown as Client);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the signed message', async () => {
    const message = 'message';
    const signingPublicKey = 'signingPublicKey';

    const result = await signMessage({ message, signingPublicKey });
    expect(result).toBe('signedMessage');
    expect(connector.signMessage).toHaveBeenCalledWith(message, signingPublicKey);
  });

  it('should return undefined when an error occurs', async () => {
    const message = 'message';
    const signingPublicKey = 'signingPublicKey';
    connector.signMessage.mockImplementation(() => {
      throw new ConnectorNotFoundError();
    });

    console.error = vi.fn();
    const result = await signMessage({ message, signingPublicKey });
    expect(result).toBeUndefined();
    expect(connector.signMessage).toHaveBeenCalledWith(message, signingPublicKey);
    expect(console.error).toHaveBeenCalledWith(new ConnectorNotFoundError());
  });

  it('should return undefined when the connector is undefined', async () => {
    vi.spyOn(getClient(), 'connector', 'get').mockReturnValue(undefined);


    const result = await signMessage({ message: '', signingPublicKey: '' });
    expect(result).toBeUndefined();
  });
});

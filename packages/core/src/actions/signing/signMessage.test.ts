import { ConnectorNotFoundError } from '@casperdash/usewallet-core/errors';
import { Client, getClient } from '@casperdash/usewallet-core/utils/client';
import { describe, expect, it, vi, afterEach, beforeEach, MockedFunction } from 'vitest';

import { signMessage } from './signMessage';

vi.mock('@casperdash/usewallet-core/utils/client', () => ({
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
    const signingPublicKeyHex = 'signingPublicKeyHex';

    const result = await signMessage({ message, signingPublicKeyHex });
    expect(result).toBe('signedMessage');
    expect(connector.signMessage).toHaveBeenCalledWith(message, signingPublicKeyHex);
  });

  it('should return undefined when an error occurs', async () => {
    const message = 'message';
    const signingPublicKeyHex = 'signingPublicKeyHex';
    connector.signMessage.mockImplementation(() => {
      throw new ConnectorNotFoundError();
    });

    console.error = vi.fn();
    const result = await signMessage({ message, signingPublicKeyHex });
    expect(result).toBeUndefined();
    expect(connector.signMessage).toHaveBeenCalledWith(message, signingPublicKeyHex);
    expect(console.error).toHaveBeenCalledWith(new ConnectorNotFoundError());
  });

  it('should return undefined when the connector is undefined', async () => {
    vi.spyOn(getClient(), 'connector', 'get').mockReturnValue(undefined);


    const result = await signMessage({ message: '', signingPublicKeyHex: '' });
    expect(result).toBeUndefined();
  });
});

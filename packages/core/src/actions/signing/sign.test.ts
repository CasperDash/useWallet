import { ConnectorNotFoundError } from '@usewallet/core/errors';
import { Client, getClient } from '@usewallet/core/utils/client';
import { describe, expect, it, vi, MockedFunction, afterEach } from 'vitest';

import { sign, SignParams, SignResult } from './sign';

vi.mock('@usewallet/core/utils/client', () => ({
  getClient: vi.fn(),
}));

describe('sign', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return the deploy object if the connector is available and the sign method returns without errors', async () => {
    const connector = {
      sign: vi.fn().mockResolvedValue({ deploy: {} }),
    };
    (getClient as MockedFunction<typeof getClient>).mockReturnValue({ connector } as unknown as Client);

    const signParams: SignParams = {
      deploy: {
        deploy: {},
      },
      signingPublicKeyHex: 'signingPublicKeyHex',
      targetPublicKeyHex: 'targetPublicKeyHex',
    };

    const expectedResult: SignResult = { deploy: {} };

    const result = await sign(signParams);

    expect(result).toEqual(expectedResult);
    expect(connector.sign).toHaveBeenCalledWith(signParams.deploy, signParams.signingPublicKeyHex, signParams.targetPublicKeyHex);
    expect(getClient).toHaveBeenCalled();
  });

  it('should return undefined if the connector is not available', async () => {
    (getClient as MockedFunction<typeof getClient>).mockReturnValue(undefined as unknown as Client);

    const signParams: SignParams = {
      deploy: {
        deploy: {},
      },
      signingPublicKeyHex: 'signingPublicKeyHex',
      targetPublicKeyHex: 'targetPublicKeyHex',
    };

    const result = await sign(signParams);

    expect(result).toBeUndefined();
    expect(getClient).toHaveBeenCalled();
  });

  it('should log the error if the connector is available but the sign method throws an error', async () => {
    console.error = vi.fn();
    const connector = {
      sign: vi.fn().mockRejectedValue(new ConnectorNotFoundError()),
    };
    (getClient as MockedFunction<typeof getClient>).mockReturnValue({ connector } as unknown as Client);

    const signParams: SignParams = {
      deploy: {
        deploy: {},
      },
      signingPublicKeyHex: 'signingPublicKeyHex',
      targetPublicKeyHex: 'targetPublicKeyHex',
    };


    try {
      await sign(signParams);
    } catch (err) {
      expect(err).toBeInstanceOf(ConnectorNotFoundError);

      expect(connector.sign).toHaveBeenCalledWith(signParams.deploy, signParams.signingPublicKeyHex, signParams.targetPublicKeyHex);
      expect(getClient).toHaveBeenCalled();
    }

  });
});

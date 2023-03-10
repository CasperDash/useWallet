import { ConnectorNotFoundError } from '@casperdash/usewallet-core/errors';
import { Deploy } from '@casperdash/usewallet-core/types/deploy';
import { getClient } from '@casperdash/usewallet-core/utils/client';
import { JsonTypes } from 'typedjson';

export type SignParams = {
  deploy: { deploy: JsonTypes };
  signingPublicKeyHex: string;
  targetPublicKeyHex: string;
};

export type SignResult = Deploy | undefined;

/**
 * It signs a deploy with the signing public key and the target public key
 * @param {SignParams}  - `deploy` - the deploy object to sign
 * @returns The signature of the deploy.
 */
export const sign = async ({ deploy, signingPublicKeyHex, targetPublicKeyHex }: SignParams): Promise<SignResult> => {
  const connector = getClient()?.connector;

  try {
    if (!connector) {
      throw new ConnectorNotFoundError();
    }
    return connector.sign(deploy, signingPublicKeyHex, targetPublicKeyHex);
  } catch (error) {
    console.error(error);
  }
};

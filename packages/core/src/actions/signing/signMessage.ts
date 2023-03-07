import { getClient } from '@casperdash/usewallet-core/utils/client';

export type SignMessageParams = {
  message: string;
  signingPublicKeyHex: string;
};

export type SignMessageResult = string | undefined;

/**
 * It takes a message and a signing public key, and returns a signature
 * @param {SignMessageParams}  - `message` - the message to sign
 * @returns The result of the signMessage function.
 */
export const signMessage = async ({ message, signingPublicKeyHex }: SignMessageParams): Promise<SignMessageResult> => {
  const connector = getClient()?.connector;

  try {
    return await connector?.signMessage(message, signingPublicKeyHex);
  } catch (error) {
    console.error(error);
  }
};

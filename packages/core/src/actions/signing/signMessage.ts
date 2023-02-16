import { getClient } from '@usewallet/core/utils/client';

export type SignMessageParams = {
  message: string;
  signingPublicKeyHex: string;
};

export type SignMessageResult = string | undefined;

export const signMessage = async ({ message, signingPublicKeyHex }: SignMessageParams): Promise<SignMessageResult> => {
  const connector = getClient()?.connector;

  try {
    return await connector?.signMessage(message, signingPublicKeyHex);
  } catch (error) {
    console.error(error);
  }
};

import { getClient } from '@usedapp/core/utils/client';

export type SignMessageParams = {
  message: string;
  signingPublicKey: string;
};

export type SignMessageResult = string | undefined;

export const signMessage = async ({ message, signingPublicKey }: SignMessageParams): Promise<SignMessageResult> => {
  const connector = getClient()?.connector;

  try {
    return await connector?.signMessage(message, signingPublicKey);
  } catch (error) {
    console.log(error);
  }
};

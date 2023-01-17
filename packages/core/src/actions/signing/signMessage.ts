import { getClient } from '@usedapp/core/utils/client';

export type SignMessageParams = {
  message: string;
  signingPublicKey: string;
};

export const signMessage = async ({ message, signingPublicKey }: SignMessageParams): Promise<void> => {
  const connector = getClient()?.connector;

  try {
    await connector?.signMessage(message, signingPublicKey);
  } catch (error) {
    console.log(error);
  }
};

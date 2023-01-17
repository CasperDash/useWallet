import { getClient } from '@usedapp/core/utils/client';

export type SignParams = {
  deploy: any;
  signingPublicKey: string;
  targetPublicKeyHex: string;
};

export const sign = async ({ deploy, signingPublicKey, targetPublicKeyHex }: SignParams): Promise<void> => {
  const connector = getClient()?.connector;

  try {
    await connector?.sign(deploy, signingPublicKey, targetPublicKeyHex);
  } catch (error) {
    console.log(error);
  }
};

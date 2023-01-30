import { getClient } from '@usedapp/core/utils/client';
import { JsonTypes } from 'typedjson';

export type SignParams = {
  deploy: unknown;
  signingPublicKey: string;
  targetPublicKeyHex: string;
};

export type SignResult = { deploy: JsonTypes } | undefined;

export const sign = async ({ deploy, signingPublicKey, targetPublicKeyHex }: SignParams): Promise<SignResult> => {
  const connector = getClient()?.connector;

  try {
    return await connector?.sign(deploy, signingPublicKey, targetPublicKeyHex);
  } catch (error) {
    console.log(error);
  }
};

import { getClient } from '@usedapp/core/utils/client';
import { JsonTypes } from 'typedjson';

export type SignParams = {
  deploy: unknown;
  signingPublicKeyHex: string;
  targetPublicKeyHex: string;
};

export type SignResult = { deploy: JsonTypes } | undefined;

export const sign = async ({ deploy, signingPublicKeyHex, targetPublicKeyHex }: SignParams): Promise<SignResult> => {
  const connector = getClient()?.connector;

  try {
    return await connector?.sign(deploy, signingPublicKeyHex, targetPublicKeyHex);
  } catch (error) {
    console.error(error);
  }
};

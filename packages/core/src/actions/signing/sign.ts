import { Deploy } from '@usedapp/core/types/deploy';
import { getClient } from '@usedapp/core/utils/client';
import { JsonTypes } from 'typedjson';

export type SignParams = {
  deploy: { deploy: JsonTypes };
  signingPublicKeyHex: string;
  targetPublicKeyHex: string;
};

export type SignResult = Deploy | undefined;

export const sign = async ({ deploy, signingPublicKeyHex, targetPublicKeyHex }: SignParams): Promise<SignResult> => {
  const connector = getClient()?.connector;

  try {
    return await connector?.sign(deploy, signingPublicKeyHex, targetPublicKeyHex);
  } catch (error) {
    console.error(error);
  }
};

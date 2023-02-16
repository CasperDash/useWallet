import { Deploy } from '@usewallet/core/types/deploy';
import { getClient } from '@usewallet/core/utils/client';
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
    return connector?.sign(deploy, signingPublicKeyHex, targetPublicKeyHex);
  } catch (error) {
    console.error(error);
  }
};

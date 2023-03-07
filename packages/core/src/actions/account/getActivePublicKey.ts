import { getClient } from '@casperdash/usewallet-core/utils/client';

/**
 * It returns the active public key of the user's wallet
 * @returns The active public key of the user.
 */
export const getActivePublicKey = async (): Promise<string | undefined> => {
  const connector = getClient()?.connector;

  try {
    const activeKey = await connector?.getActivePublicKey();

    return activeKey;
  } catch (error) {
    console.error(error);
  }
};

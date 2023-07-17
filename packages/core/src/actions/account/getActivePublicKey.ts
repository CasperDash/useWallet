import { getClient } from '@casperdash/usewallet-core/utils/client';

/**
 * It returns the active public key of the user's wallet
 * @returns The active public key of the user.
 */
export const getActivePublicKey = async (): Promise<string | undefined> => {
  try {
    const connector = getClient()?.connector;
    const activeKey = await connector?.getActivePublicKey();

    return activeKey;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

import { ConnectorNotFoundError } from '@casperdash/usewallet-core/errors';
import { getClient } from '@casperdash/usewallet-core/utils/client';

/**
 * It returns the active public key of the user's wallet
 * @returns The active public key of the user.
 */
export const getActivePublicKey = async (): Promise<string | undefined> => {
  try {
    const { connector, data } = getClient();
    if (!connector) {
      throw new ConnectorNotFoundError();
    }

    if (connector.id === 'casperDashMobile' || connector.id === 'casperDashWeb') {
      return data?.activeKey;
    }

    const activeKey = await connector?.getActivePublicKey();

    return activeKey;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

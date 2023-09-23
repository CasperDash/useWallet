import { ConnectorNotLedgerError, client } from '@casperdash/usewallet-core';
import { CasperLedgerConnector } from '@casperdash/usewallet-core/types/casperLedgerConnector';

/**
 * It returns the active public key of the user's wallet
 * @returns The active public key of the user.
 */
export const getLedgerAccountIndex = async (): Promise<string> => {
  const connector = client?.connector;

  try {
    if (connector && connector.id !== 'ledger') {
      throw new ConnectorNotLedgerError();
    }
    const accountIndex = (connector as unknown as CasperLedgerConnector)?.getAccountIndex();
    if (!accountIndex) {
      throw new Error('Account index not found');
    }

    return accountIndex;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

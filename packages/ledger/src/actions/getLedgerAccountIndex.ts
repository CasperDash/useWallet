import { ConnectorNotLedgerError, getClient } from '@casperdash/usewallet-core';

import { CasperLedgerConnector } from '../casperLedger';

/**
 * It returns the active public key of the user's wallet
 * @returns The active public key of the user.
 */
export const getLedgerAccountIndex = async (): Promise<string> => {
  const connector = getClient()?.connector;

  try {
    if (connector && connector.id !== 'ledger') {
      throw new ConnectorNotLedgerError();
    }
    const accountIndex = (connector as CasperLedgerConnector)?.getAccountIndex();
    if (!accountIndex) {
      throw new Error('Account index not found');
    }

    return accountIndex;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

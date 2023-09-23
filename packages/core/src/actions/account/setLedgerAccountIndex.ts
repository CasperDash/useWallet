import { ConnectorNotLedgerError } from '@casperdash/usewallet-core/errors/ConnectorNotLedgerError';
import { StateParams, client } from '@casperdash/usewallet-core/utils/client';

type Params = { index?: string };

export const setLedgerAccountIndex = async ({ index = '0' }: Params = { index: '0' }): Promise<void> => {
  try {
    const connector = client?.connector;
    if (!connector || connector && connector.id !== 'ledger') {
      throw new ConnectorNotLedgerError();
    }

    const publicKey = await (connector as any).getPublicKey(index);

    client.setState((oldState: StateParams) => ({
      ...oldState,
      data: {
        ...oldState.data,
        ledgerAccountIndex: index,
        activeKey: publicKey,
      },
    }));

    (connector as any).setAccountIndex(index);
  } catch (error) {
    console.error(error);

    throw error;
  }
};

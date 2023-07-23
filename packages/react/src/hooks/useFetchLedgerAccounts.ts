import { getLedgerPath, getLedgerPublicKey } from '@casperdash/usewallet-core';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type Params = { total: number };

export type LedgerAccount = {
  path: string;
  publicKey?: string;
  index: string;
};

export const useFetchLedgerAccounts = (
  { total }: Params,
  options?: UseQueryOptions<LedgerAccount[], unknown, LedgerAccount[], [string]>) => {
  return useQuery(['ledger-accounts'], async () => {
    const accounts = [];
    for (let i = 0; i < total; i++) {
      const publicKey = await getLedgerPublicKey({ index: i.toString() });

      accounts.push({
        path: getLedgerPath(i.toString()),
        publicKey,
        index: i.toString(),
      });
    }

    return accounts;
  }, options);
};

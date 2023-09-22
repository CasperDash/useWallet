import {
  InfiniteData, QueryFunctionContext, useInfiniteQuery, UseInfiniteQueryOptions, UseInfiniteQueryResult,
} from '@tanstack/react-query';

import { getLedgerPath } from '../util';
import { getLedgerPublicKey } from '../actions/getLedgerPublicKey';

type Params = {
  startIndex?: number;
  total?: number;
};

export type LedgerAccount = {
  path: string;
  publicKey?: string;
  index: number;
};

type Options =
UseInfiniteQueryOptions<LedgerAccount[], unknown, LedgerAccount[]>;

type Result = Omit<UseInfiniteQueryResult<LedgerAccount[]>, 'data'> & {
  data?: LedgerAccount[];
  paggedData?: InfiniteData<LedgerAccount[]>;
};

export const useFetchLedgerAccounts = (
  { startIndex = 0, total = 10 }: Params,
  options?: Options,
): Result => {
  const { data, ...query } = useInfiniteQuery<LedgerAccount[]>(
    ['casper-ledger-accounts'],
    async (context: QueryFunctionContext) => {
      const accounts = [];
      const { pageParam = startIndex } = context;
      for (let i = pageParam; i < pageParam + total; i++) {
        const publicKey = await getLedgerPublicKey({ index: i.toString() });

        accounts.push({
          path: getLedgerPath(i.toString()),
          publicKey,
          index: i,
        });
      }

      return accounts;
    },
    {
      ...options,
      getNextPageParam: (lastPage: LedgerAccount[]) => (lastPage[lastPage.length - 1]?.index || 0) + 1,
    },
  );

  const flattedData = data?.pages.reduce((acc: LedgerAccount[], page: LedgerAccount[]) => {
    return [...acc, ...page];
  }, [] as LedgerAccount[]);

  return {
    data: flattedData,
    paggedData: data,
    ...query,
  };
};

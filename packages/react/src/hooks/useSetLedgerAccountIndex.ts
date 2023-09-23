import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  setLedgerAccountIndex as setLedgerAccountIndexDapp,
} from '@casperdash/usewallet-core';

export type UseSetLedgerAccountIndexParams = {
  index?: string;
};

export type UseSetLedgerAccountIndexConfig = Partial<
UseMutationOptions<{ index: string }, unknown, UseSetLedgerAccountIndexParams>
>;

export type UseSetLedgerAccountIndexProps = Partial<UseSetLedgerAccountIndexParams & UseSetLedgerAccountIndexConfig>;

const mutationFn = async ({ index }: UseSetLedgerAccountIndexParams) => {
  if (!index) {
    throw new Error('index must be a non-empty string');
  }

  await setLedgerAccountIndexDapp({ index });

  return {
    index,
  };
};

export const useSetLedgerAccountIndex = ({
  index,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSetLedgerAccountIndexProps = {}) => {
  const {
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
    mutate,
    mutateAsync,
  } = useMutation(['set_ledger_account_index'], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  const setLedgerAccountIndex = useCallback((params?: UseSetLedgerAccountIndexParams) => {
    return mutate(params || {
      index,
    });
  }, [index, mutate]);

  const setLedgerAccountIndexAsync = useCallback(async (params?: UseSetLedgerAccountIndexParams) => {
    return mutateAsync(params || {
      index,
    });
  }, [index, mutateAsync]);

  return {
    setLedgerAccountIndex,
    setLedgerAccountIndexAsync,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
  };
};

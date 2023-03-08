import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { connect as connectDapp, ConnectParams, ConnectResult } from '@casperdash/usewallet-core';
import { MutationKeysEnum } from '@casperdash/usewallet';

// define types required by useConnect hook
export type UseConnectParams = Partial<ConnectParams>;
export type UseConnectConfig = Partial<UseMutationOptions<ConnectResult, unknown, UseConnectParams>>;
export type UseConnectProps = UseConnectParams & UseConnectConfig;

// define mutation function required by react-query
const mutationFn = async (args: UseConnectParams) => {
  const { connector } = args;
  if (!connector) {
    throw new Error('connector is required');
  }

  return connectDapp({ connector });
};

// define useConnect custom hook using react-query's useMutation hook which will return data based on mutation function provided.
export const useConnect = ({
  connector,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseConnectProps) => {
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
  } = useMutation([MutationKeysEnum.CONNECT], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  // wrap mutate function in useCallback so we don't need to add it as dependency on useEffect hooks
  const connect = useCallback(() => {
    return mutate({
      connector,
    });
  }, [connector]);

  // wrap mutateAsync function in useCallback
  const connectAsync = useCallback(async () => {
    return mutateAsync({
      connector,
    });
  }, [connector]);

  // return object containing all state returned by react-query useMutation hook and our custom connect and connectAsync functions
  return {
    connect,
    connectAsync,
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

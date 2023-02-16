import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { connect as connectDapp, ConnectParams, ConnectResult } from '@usewallet/core';
import { MutationKeysEnum } from '@usewallet/react';

export type UseConnectParams = Partial<ConnectParams>;

export type UseConnectConfig = Partial<UseMutationOptions<ConnectResult, unknown, UseConnectParams>>;

export type UseConnectProps = UseConnectParams & UseConnectConfig;

const mutationFn = async (args: UseConnectParams) => {
  const { connector } = args;
  if (!connector) {
    throw new Error('connector is required');
  }

  return connectDapp({ connector });
};

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

  const connect = useCallback(() => {
    return mutate({
      connector,
    });
  }, [connector]);

  const connectAsync = useCallback(async () => {
    return mutateAsync({
      connector,
    });
  }, [connector]);

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

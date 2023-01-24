
import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { disconnect as disconnectDapp } from '@usedapp/core';
import { MutationKeysEnum } from '@usedapp/react';

export type UseDisconnectConfig = Partial<UseMutationOptions>;

export type UseDisconnectProps = UseDisconnectConfig;

const mutationFn = async () => {
  return disconnectDapp();
};

export const useDisconnect = ({
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseDisconnectProps = {}) => {
  const {
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    status,
    reset,
    mutate,
    mutateAsync,
  } = useMutation([MutationKeysEnum.DISCONNECT], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  const disconnect = useCallback(() => {
    return mutate();
  }, []);

  const disconnectAsync = useCallback(async () => {
    return mutateAsync();
  }, []);

  return {
    disconnect,
    disconnectAsync,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    status,
    reset,
  };
};

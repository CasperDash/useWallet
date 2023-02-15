import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { sign as signDapp, SignParams, SignResult } from '@usedapp/core';
import { MutationKeysEnum } from '@usedapp/react';

export type UseSignParams = Partial<SignParams>;

export type UseSignConfig = Partial<
UseMutationOptions<SignResult, unknown, UseSignParams>
>;

export type UseSignProps = Partial<UseSignParams & UseSignConfig>;

const mutationFn = async ({ deploy, signingPublicKeyHex, targetPublicKeyHex }: UseSignParams) => {
  if (!deploy) {
    throw new Error('Deploy must be a non-empty');
  }
  if (!signingPublicKeyHex) {
    throw new Error('signingPublicKeyHex must be a non-empty string');
  }
  if (!targetPublicKeyHex) {
    throw new Error('targetPublicKeyHex must be a non-empty string');
  }

  return signDapp({ deploy, signingPublicKeyHex, targetPublicKeyHex });
};

export const useSign = ({
  deploy,
  signingPublicKeyHex,
  targetPublicKeyHex,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSignProps = {}) => {
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
  } = useMutation([MutationKeysEnum.SIGN], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  const sign = useCallback((params?: UseSignParams) => {
    return mutate(params || {
      deploy,
      signingPublicKeyHex,
      targetPublicKeyHex,
    });
  }, [deploy, signingPublicKeyHex, targetPublicKeyHex, mutate]);

  const signAsync = useCallback(async (params?: UseSignParams) => {
    return mutateAsync(params || {
      deploy,
      signingPublicKeyHex,
      targetPublicKeyHex,
    });
  }, [deploy, signingPublicKeyHex, targetPublicKeyHex, mutateAsync]);

  return {
    sign,
    signAsync,
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

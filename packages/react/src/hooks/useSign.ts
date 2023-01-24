import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { sign as signDapp, SignParams, SignResult } from '@usedapp/core';
import { MutationKeysEnum } from '@usedapp/react';

export type UseSignParams = SignParams;

export type UseSignConfig = Partial<
UseMutationOptions<SignResult, unknown, UseSignParams>
>;

export type UseSignProps = UseSignParams & UseSignConfig;

const mutationFn = async (args: UseSignParams) => {
  const { deploy } = args;

  if (!deploy) {
    throw new Error('Deploy must be a non-empty');
  }

  return signDapp(args);
};

export const useSign = ({
  deploy,
  signingPublicKey,
  targetPublicKeyHex,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSignProps) => {
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

  const sign = useCallback(() => {
    return mutate({
      deploy,
      signingPublicKey,
      targetPublicKeyHex,
    });
  }, [deploy, signingPublicKey, targetPublicKeyHex]);

  const signAsync = useCallback(async () => {
    return mutateAsync({
      deploy,
      signingPublicKey,
      targetPublicKeyHex,
    });
  }, [deploy, signingPublicKey, targetPublicKeyHex]);

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

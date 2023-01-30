import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  signMessage as signMessageDapp,
  SignMessageParams,
  SignMessageResult,
} from '@usedapp/core';
import { MutationKeysEnum } from '@usedapp/react';

export type UseSignMessageParams = Partial<SignMessageParams>;

export type UseSignMessageConfig = Partial<
UseMutationOptions<SignMessageResult, unknown, UseSignMessageParams>
>;

export type UseSignMessageProps = Partial<UseSignMessageParams & UseSignMessageConfig>;

const mutationFn = async ({ message, signingPublicKey }: UseSignMessageParams) => {
  if (!message) {
    throw new Error('Message must be a non-empty string');
  }
  if (!signingPublicKey) {
    throw new Error('signingPublicKey must be a non-empty string');
  }

  return signMessageDapp({ message, signingPublicKey });
};

export const useSignMessage = ({
  message,
  signingPublicKey,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSignMessageProps = {}) => {
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
  } = useMutation([MutationKeysEnum.SIGN_MESSAGE, signingPublicKey, message], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  const signMessage = useCallback((params: UseSignMessageParams) => {
    return mutate(params || {
      message,
      signingPublicKey,
    });
  }, [message, signingPublicKey, mutate]);

  const signMessageAsync = useCallback(async (params: UseSignMessageParams) => {
    return mutateAsync(params || {
      message,
      signingPublicKey,
    });
  }, [message, signingPublicKey, mutateAsync]);

  return {
    signMessage,
    signMessageAsync,
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

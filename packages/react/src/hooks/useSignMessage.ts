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

const mutationFn = async ({ message, signingPublicKeyHex }: UseSignMessageParams) => {
  if (!message) {
    throw new Error('Message must be a non-empty string');
  }
  if (!signingPublicKeyHex) {
    throw new Error('signingPublicKeyHex must be a non-empty string');
  }

  return signMessageDapp({ message, signingPublicKeyHex });
};

export const useSignMessage = ({
  message,
  signingPublicKeyHex,
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
  } = useMutation([MutationKeysEnum.SIGN_MESSAGE, signingPublicKeyHex, message], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  const signMessage = useCallback((params?: UseSignMessageParams) => {
    return mutate(params || {
      message,
      signingPublicKeyHex,
    });
  }, [message, signingPublicKeyHex, mutate]);

  const signMessageAsync = useCallback(async (params?: UseSignMessageParams) => {
    return mutateAsync(params || {
      message,
      signingPublicKeyHex,
    });
  }, [message, signingPublicKeyHex, mutateAsync]);

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

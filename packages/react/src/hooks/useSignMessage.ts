import { useCallback } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import {
  signMessage as signMessageDapp,
  SignMessageParams,
  SignResult,
} from '@usedapp/core';
import { MutationKeysEnum } from '@usedapp/react';

export type UseSignMessageParams = SignMessageParams;

export type UseSignMessageConfig = Partial<
UseMutationOptions<SignResult, unknown, UseSignMessageParams>
>;

export type UseSignMessageProps = UseSignMessageParams & UseSignMessageConfig;

const mutationFn = async (args: UseSignMessageParams) => {
  const { message } = args;
  if (!message) {
    throw new Error('Message must be a non-empty string');
  }
  return signMessageDapp(args);
};

export const useSignMessage = ({
  message,
  signingPublicKey,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: UseSignMessageProps) => {
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
  } = useMutation([MutationKeysEnum.SIGN_MESSAGE], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess,
  });

  const signMessage = useCallback(() => {
    return mutate({
      message,
      signingPublicKey,
    });
  }, [message, signingPublicKey]);

  const signMessageAsync = useCallback(async () => {
    return mutateAsync({
      message,
      signingPublicKey,
    });
  }, [message, signingPublicKey]);

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

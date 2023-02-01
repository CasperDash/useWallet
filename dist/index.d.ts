import { StatusEnum, ConnectResult, ConnectParams, SignResult, SignParams, SignMessageResult, SignMessageParams, ClientConfig, Client as Client$1 } from '@usedapp/core';
import { UseMutationOptions, QueryClient } from '@tanstack/react-query';
import * as React from 'react';

declare const useAccount: () => {
    status: StatusEnum;
    publicKey: string | null;
};

type UseConnectParams = Partial<ConnectParams>;
type UseConnectConfig = Partial<UseMutationOptions<ConnectResult, unknown, UseConnectParams>>;
type UseConnectProps = UseConnectParams & UseConnectConfig;
declare const useConnect: ({ connector, onError, onMutate, onSettled, onSuccess, }: UseConnectProps) => {
    connect: () => void;
    connectAsync: () => Promise<ConnectResult>;
    data: ConnectResult | undefined;
    error: unknown;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    status: "error" | "idle" | "loading" | "success";
    variables: Partial<ConnectParams> | undefined;
};

type UseDisconnectConfig = Partial<UseMutationOptions>;
type UseDisconnectProps = UseDisconnectConfig;
declare const useDisconnect: ({ onError, onMutate, onSettled, onSuccess, }?: UseDisconnectProps) => {
    disconnect: () => void;
    disconnectAsync: () => Promise<void>;
    error: unknown;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    status: "error" | "idle" | "loading" | "success";
    reset: () => void;
};

type UseSignParams = Partial<SignParams>;
type UseSignConfig = Partial<UseMutationOptions<SignResult, unknown, UseSignParams>>;
type UseSignProps = Partial<UseSignParams & UseSignConfig>;
declare const useSign: ({ deploy, signingPublicKey, targetPublicKeyHex, onError, onMutate, onSettled, onSuccess, }?: UseSignProps) => {
    sign: (params: UseSignParams) => void;
    signAsync: (params: UseSignParams) => Promise<SignResult>;
    data: SignResult;
    error: unknown;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    status: "error" | "idle" | "loading" | "success";
    variables: Partial<SignParams> | undefined;
};

type UseSignMessageParams = Partial<SignMessageParams>;
type UseSignMessageConfig = Partial<UseMutationOptions<SignMessageResult, unknown, UseSignMessageParams>>;
type UseSignMessageProps = Partial<UseSignMessageParams & UseSignMessageConfig>;
declare const useSignMessage: ({ message, signingPublicKey, onError, onMutate, onSettled, onSuccess, }?: UseSignMessageProps) => {
    signMessage: (params: UseSignMessageParams) => void;
    signMessageAsync: (params: UseSignMessageParams) => Promise<SignMessageResult>;
    data: SignMessageResult;
    error: unknown;
    isError: boolean;
    isIdle: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    reset: () => void;
    status: "error" | "idle" | "loading" | "success";
    variables: Partial<SignMessageParams> | undefined;
};

type CreateClientConfig = ClientConfig & {
    queryClient?: QueryClient;
};
declare const createClient: ({ queryClient, ...config }: CreateClientConfig) => Client;
type Client = Client$1 & {
    queryClient: QueryClient;
};

type Props = {
    children: React.ReactElement;
    client: Client;
};
declare const CasperProvider: ({ children, client }: Props) => JSX.Element;

declare enum QueryKeysEnum {
    CONNECT = "connect"
}

declare enum MutationKeysEnum {
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    SIGN = "sign",
    SIGN_MESSAGE = "sign_message"
}

export { CasperProvider, Client, CreateClientConfig, MutationKeysEnum, QueryKeysEnum, createClient, useAccount, useConnect, useDisconnect, useSign, useSignMessage };

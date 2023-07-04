/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Account,
  watchAccount,
  StatusEnum,
  getAccount,
  deepEqual,
  Connector,
} from '@casperdash/usewallet-core';
import { useEffect, useRef, useState } from 'react';

export type OnConnectParams = { publicKey: string; connector?: Connector };

export type UseAccounProps<TError> = {
  onConnect?: ({ publicKey, connector }: OnConnectParams) => void;
  onDisconnect?: () => void;
  onError?: (error: TError) => void;
};

type Result = {
  status: StatusEnum;
  publicKey: string | null;
  ledgerAccountIndex: string | null;
  connector?: Connector;
};

export const useAccount = <TError = unknown>({ onConnect, onDisconnect, onError }: UseAccounProps<TError> = {}): Result => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [ledgerAccountIndex, setLedgerAccountIndex] = useState<string | null>(null);
  const [connector, setConnector] = useState<Connector>();
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.DISCONNECTED);
  const ref = useRef<Account>(null!);

  useEffect(() => {
    const initAccount = async (): Promise<void> => {
      try {
        const account = getAccount();

        if (account && account.status === StatusEnum.CONNECTED) {
          setPublicKey(account.publicKey || null);
          setStatus(account.status);
          setLedgerAccountIndex(account.ledgerAccountIndex || null);
          setConnector(account.connector);
        }
      } catch (error: unknown) {
        onError?.(error as TError);
      }
    };

    void initAccount();

    const unsubscribe = watchAccount((account: Account | null) => {
      if (!account) {
        return;
      }

      setPublicKey(account.publicKey || null);
      setStatus(account.status || StatusEnum.DISCONNECTED);
      setLedgerAccountIndex(account.ledgerAccountIndex || null);
      setConnector(account.connector);

      if (!deepEqual(account, ref.current)) {
        if (account?.publicKey && account.status === StatusEnum.CONNECTED) {
          onConnect?.({
            publicKey: account.publicKey,
            connector: account.connector,
          });
        }

        if (account.status === StatusEnum.DISCONNECTED) {
          onDisconnect?.();
        }
      }

      ref.current = account;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    status,
    publicKey,
    ledgerAccountIndex,
    connector,
  };
};

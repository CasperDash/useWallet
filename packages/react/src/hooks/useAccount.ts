/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Account,
  watchAccount,
  StatusEnum,
  getAccount,
  deepEqual,
  Connector,
  getActivePublicKey,
} from '@casperdash/usewallet-core';
import { useEffect, useRef, useState } from 'react';

export type OnConnectParams = { publicKey: string; connector?: Connector };

export type UseAccounProps<TError> = {
  onConnect?: ({ publicKey, connector }: OnConnectParams) => void;
  onChange?: (account: Account) => void;
  onDisconnect?: () => void;
  onError?: (error: TError) => void;
};

type Result = {
  status: StatusEnum;
  publicKey: string | null;
  ledgerAccountIndex: string | null;
  connector?: Connector;
};

export const useAccount = <TError = unknown>({ onConnect, onDisconnect, onError, onChange }: UseAccounProps<TError> = {}): Result => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [ledgerAccountIndex, setLedgerAccountIndex] = useState<string | null>(null);
  const [connector, setConnector] = useState<Connector>();
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.DISCONNECTED);
  const ref = useRef<Account>(null!);

  useEffect(() => {
    const initAccount = async (): Promise<void> => {
      try {
        const account = getAccount();
        const activePublicKey = await getActivePublicKey();

        if (activePublicKey && account && account.status === StatusEnum.CONNECTED) {
          setLedgerAccountIndex(account.ledgerAccountIndex || null);
          setConnector(account.connector);
          setPublicKey(activePublicKey);
          setStatus(account.status);
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

      if (ref.current?.publicKey && account.publicKey && account.publicKey !== ref.current?.publicKey) {
        onChange?.(account);
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

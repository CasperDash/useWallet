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

export type UserAccounProps = {
  onConnect?: ({ publicKey, connector }: OnConnectParams) => void;
  onDisconnect?: () => void;
};

export const useAccount = ({ onConnect, onDisconnect }: UserAccounProps = {}) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.DISCONNECTED);
  const ref = useRef<Account>(null!);

  useEffect(() => {
    const initAccount = async (): Promise<void> => {
      const account = getAccount();

      if (account?.publicKey && account.status === StatusEnum.CONNECTED) {
        setPublicKey(account.publicKey);
        setStatus(account.status);
      }
    };

    void initAccount();

    watchAccount((account: Account | null) => {
      if (!account) {
        return;
      }

      setPublicKey(account.publicKey || null);
      setStatus(account.status || StatusEnum.DISCONNECTED);

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
  }, []);

  return {
    status,
    publicKey,
  };
};

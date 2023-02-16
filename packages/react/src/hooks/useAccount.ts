import {
  Account,
  watchAccount,
  StatusEnum,
  getAccount,
} from '@usedapp/core';
import { useEffect, useState } from 'react';

export type UserAccounProps = {
  onConnect?: (status: StatusEnum) => void;
  onDisconnect?: (status: StatusEnum) => void;
};

export const useAccount = ({ onConnect, onDisconnect }: UserAccounProps) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.DISCONNECTED);

  useEffect(() => {
    const initAccount = async (): Promise<void> => {
      const account = getAccount();

      if (account?.publicKey && account.status === StatusEnum.CONNECTED) {
        setPublicKey(account.publicKey);
        setStatus(account.status);

        onConnect?.(account.status);
      }
    };

    void initAccount();

    watchAccount((account: Account | null) => {
      if (!account) {
        return;
      }

      const currentStatus = account.status ? account.status : StatusEnum.DISCONNECTED;

      setPublicKey(account.publicKey ? account.publicKey : null);
      setStatus(currentStatus);

      if (currentStatus === StatusEnum.DISCONNECTED) {
        onDisconnect?.(status);
      }
    });
  }, []);

  return {
    status,
    publicKey,
  };
};

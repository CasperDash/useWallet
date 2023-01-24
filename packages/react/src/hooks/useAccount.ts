import { Account,
  watchAccount, StatusEnum, createClient, CasperSignerConnector,
  CapserDashConnector,
} from '@usedapp/core';
import { useEffect, useState } from 'react';

export const useAccount = () => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.DISCONNECTED);

  useEffect(() => {
    createClient({
      connectors: [new CasperSignerConnector({}), new CapserDashConnector({})],
    });

    watchAccount((account: Account | null) => {
      if (!account) {
        return;
      }

      setPublicKey(account.publicKey ? account.publicKey : null);
      setStatus(account.status ? account.status : StatusEnum.DISCONNECTED);
    });
  }, []);

  return {
    status,
    publicKey,
  };
};

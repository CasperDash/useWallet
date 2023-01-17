import { Connector, connect as connectDapp, disconnect as disconnectDapp } from '@usedapp/core';

export type UserConnectProps = {
  connector: Connector;
};

export const useConnect = ({ connector }: UserConnectProps) => {
  const connect = async () => {
    await connectDapp({ connector });
  };

  const disconnect = async () => {
    await disconnectDapp();
  };

  return {
    connect,
    disconnect,
  };
};

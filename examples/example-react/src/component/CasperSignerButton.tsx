import {
  CasperSignerConnector,
} from '@usedapp/core';
import { useConnect } from '@usedapp/react';


export const CasperSignerButton = () => {
  const { connect } = useConnect({
    connector: new CasperSignerConnector(),
  });

  return (
    <div>
        <button onClick={() => connect()}>
          Connect with CasperSigner
        </button>
    </div>
  );
};

export default CasperSignerButton;

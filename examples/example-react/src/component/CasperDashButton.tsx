import {
  CasperDashConnector,
} from '@usedapp/core';
import { useConnect } from '@usedapp/react';


export const CasperDashButton = () => {
  const { connect } = useConnect({
    connector: new CasperDashConnector({}),
  });

  return (
    <div>
        <button onClick={() => connect()}>
          Connect with CasperDash
        </button>
    </div>
  );
};

export default CasperDashButton;

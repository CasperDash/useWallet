import {
  CasperDashConnector,
} from '@usewallet/core';
import { useConnect } from '@usewallet/react';


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

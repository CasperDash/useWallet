import {
  CasperDashMobileConnector,
  useConnect,
} from '@casperdash/usewallet';


export const CasperDashMobileButton = () => {
  const { connect } = useConnect({
    connector: new CasperDashMobileConnector(),
  });

  return (
    <div>
        <button onClick={() => connect()}>
          Connect with CasperDash Mobile
        </button>
    </div>
  );
};

export default CasperDashMobileButton;

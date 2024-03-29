import {
  CasperDashWebConnector,
  useConnect,
} from '@casperdash/usewallet';


export const CasperDashWebButton = () => {
  const { connect } = useConnect({
    connector: new CasperDashWebConnector({
      providerUrl: 'https://testnet.casperdash.io',
    }),
  });

  return (
    <div>
        <button onClick={() => connect()}>
          Connect with CasperDash Web
        </button>
    </div>
  );
};

export default CasperDashWebButton;

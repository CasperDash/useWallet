import {
  CasperWalletConnector,
  useConnect,
} from '@casperdash/usewallet';


export const CasperWalletButton = () => {
  const { connect } = useConnect({
    connector: new CasperWalletConnector({}),
  });

  return (
    <div>
        <button onClick={() => connect()}>
          Connect with Casper Wallet
        </button>
    </div>
  );
};

export default CasperWalletButton;

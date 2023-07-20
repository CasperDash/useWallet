import {
  CasperSignerConnector,
  useConnect,
} from '@casperdash/usewallet';

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

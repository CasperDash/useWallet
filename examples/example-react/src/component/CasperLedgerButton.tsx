import {
  LedgerConnector,
  useConnect,
} from '@casperdash/usewallet';

export const CasperLedgerButton = () => {
  const { connect } = useConnect({
    connector: new LedgerConnector(),
  });

  return (
    <div>
        <button onClick={() => connect()}>
          Connect with Ledger
        </button>
    </div>
  );
};

export default CasperLedgerButton;

import {
  CasperLedgerConnector,
  useConnect,
} from '@casperdash/usewallet';

export const CasperLedgerButton = () => {
  const { connect } = useConnect({
    connector: new CasperLedgerConnector(),
    onError: (err: unknown) => {
      console.log(err);
    },
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

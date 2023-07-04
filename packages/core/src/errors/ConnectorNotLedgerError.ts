export class ConnectorNotLedgerError extends Error {
  public name: string = 'ConnectorNotLedgerError';
  public message: string = 'Connector is not ledger';
}

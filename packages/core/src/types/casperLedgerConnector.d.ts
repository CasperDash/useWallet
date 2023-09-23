export type CasperLedgerConnector = {
  getAccountIndex: () => string;
  getPublicKey: (index: string) => Promise<string>;
};

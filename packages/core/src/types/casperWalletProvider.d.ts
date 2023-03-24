/* eslint-disable @typescript-eslint/member-ordering */
type SignatureResponse =
  | {
    cancelled: true; // if sign was cancelled
  }
  | {
    cancelled: false; // if sign was successfull
    signatureHex: string; // signature as hex hash
    signature: Uint8Array; // signature as byte array
  };

export class CasperWalletProvider {
  /**
   * Returns Signer version
   */
  public getVersion: () => Promise<string>;

  /**
   * Returns connection status from Signer
   */
  public isConnected: () => Promise<boolean>;

  public disconnectFromSite: () => Promise<boolean>;

  public requestConnection: () => Promise<boolean>;

  public sign: (
    deploy: string,
    signingPublicKeyHex: string,
  ) => Promise<SignatureResponse>;

  public signMessage: (
    rawMessage: string,
    signingPublicKeyHex: string
  ) => Promise<SignatureResponse>;


  public getActivePublicKey: () => Promise<string | undefined>;
}

import { DeployUtil, CLPublicKey, decodeBase16 } from 'casper-js-sdk';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import CasperApp from '@zondax/ledger-casper';
import { JsonTypes } from 'typedjson';

import { AlgoEnum, LedgerEnum } from '../enums';
import { CONNECT_ERROR_MESSAGE, getLedgerError } from '../utils';
import { Deploy } from '../types/deploy';

import { Connector } from './base';

type LedgerConnectorOptions = {
  enableDebugLogs?: boolean;
};

type Provider = CasperApp;


export class LedgerConnector extends Connector {
  public isReady!: boolean;
  public readonly id: string = 'ledger';
  public transport!: TransportWebUSB;
  public casperApp?: CasperApp;

  constructor({
    options: defaultOptions,
  }: { options?: LedgerConnectorOptions } = {}) {
    const options = {
      name: 'Ledger',
      ...defaultOptions,
    };

    super({ options });
  }

  public async getProvider(): Promise<Provider | undefined> {
    return this.casperApp;
  }

  public async getEventProvider(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }

  public async isConnected(): Promise<boolean> {
    return !! await this.getActivePublicKey();
  }

  public async disconnect(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async connect(): Promise<void> {
    const transport = <TransportWebUSB> await TransportWebUSB.create();

    this.transport = transport;
    this.casperApp = new CasperApp(transport);
  }

  public async getActivePublicKey(): Promise<string> {
    const casperApp = await this.getProvider();
    if (!casperApp) {
      throw new Error('Please connect to Casper Ledger');
    }
    const { publicKey = '' } = await casperApp.getAddressAndPubKey(`${LedgerEnum.CASPER_KEY_PATH}0`);

    if (!publicKey) {
      throw Error(CONNECT_ERROR_MESSAGE);
    }
    return `${AlgoEnum.SECP256K1}${publicKey.toString('hex')}`;
  }

  // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/no-unused-vars
  public async signMessage(message: string, _signingPublicKeyHex = ''): Promise<string> {
    const casperApp = await this.getProvider();
    if (!casperApp) {
      throw new Error('Please connect to Casper Ledger');
    }
    const chunks = await casperApp.signGetChunks(
      `${LedgerEnum.CASPER_KEY_PATH}0`,
      <Buffer> decodeBase16(message),
    );

    if (!chunks) {
      await this.transport.close();

      throw new Error('Error on sign message with ledger.');

    }

    await this.transport.close();

    return chunks.toString();
  }

  // eslint-disable-next-line @typescript-eslint/typedef, @typescript-eslint/no-unused-vars
  public async sign(deploy: { deploy: JsonTypes }, signingPublicKeyHex: string, _targetPublicKeyHex: string): Promise<Deploy> {
    const casperApp = await this.getProvider();
    if (!casperApp) {
      throw new Error('Please connect to Casper Ledger');
    }
    const deployCasper = DeployUtil.deployFromJson(deploy);
    const deployJson = deployCasper.unwrap();
    const responseDeploy = await casperApp.sign(
      `${LedgerEnum.CASPER_KEY_PATH}0`,
      <Buffer> DeployUtil.deployToBytes(deployJson),
    );

    if (!responseDeploy.signatureRS) {
      console.error(responseDeploy.errorMessage);
      await this.transport.close();
      throw Error(getLedgerError({
        message: responseDeploy.errorMessage,
        name: '',
      }, responseDeploy.returnCode));
    }

    const signedDeploy = DeployUtil.setSignature(
      deployJson,
      responseDeploy.signatureRS,
      CLPublicKey.fromHex(signingPublicKeyHex),
    );

    const deployValided: { ok?: boolean; val: DeployUtil.Deploy } =
    <{ ok?: boolean; val: DeployUtil.Deploy }><unknown> DeployUtil.validateDeploy(signedDeploy);
    if (deployValided?.ok) {
      await this.transport.close();

      return DeployUtil.deployToJson(deployValided.val);
    } else {
      await this.transport.close();
      throw new Error('Error on sign deploy with ledger.');
    }
  }

  public onConnected(event: CustomEventInit): void {
    console.log(event);
    throw new Error('Method not implemented.');
  }

  public onDisconnected(): void {
    throw new Error('Method not implemented.');
  }

  public onActiveKeyChanged(event: CustomEventInit): void {
    console.log(event);
    throw new Error('Method not implemented.');
  }

}

/* eslint-disable @typescript-eslint/no-unused-vars */
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { JsonTypes } from 'typedjson';
import {
  Connector,
  Deploy,
} from '@casperdash/usewallet-core';
import { WalletClient } from 'viem';

import { client } from './client';


type EVMConnectorOptions = {
  enableDebugLogs?: boolean;
  getEventProvider?: () => EventProvider;
};

type Provider = WalletClient;
type EventProvider = Window;

export class EVMConnector extends Connector<
Provider,
Window,
EVMConnectorOptions
>  {
  public isReady!: boolean;
  public readonly id: string = 'evm';
  public transport!: TransportWebUSB;
  public casperApp?: Provider;
  public accountIndex?: string;

  constructor({
    options: defaultOptions,
  }: { options?: EVMConnectorOptions } = {}) {
    const options = {
      name: 'EVM',
      ...defaultOptions,
    };

    super({ options });
  }

  public async getProvider(): Promise<Provider> {
    return client;
  }

  /**
   * > This function returns the event provider that was passed in the options object
   * @returns The event provider
   */
  public async getEventProvider(): Promise<EventProvider> {
    throw new Error('Method not implemented.');
  }

  public async isConnected(): Promise<boolean> {
    const publicKey = await this.getActivePublicKey();

    return !!publicKey;
  }

  public async disconnect(): Promise<void> {
    // Do nothing
    return;
  }

  public async connect(): Promise<void> {
    const provider = await this.getProvider();

    await provider.requestAddresses();
  }

  public async getActivePublicKey(): Promise<string> {
    const accounts = await (await this.getProvider()).getAddresses();

    if (!accounts.length) {
      throw new Error('No accounts found');
    }

    return accounts[0];
  }

  public async signMessage(message: string, signingPublicKeyHex?: string): Promise<string> {
    const account = signingPublicKeyHex || await this.getActivePublicKey();
    const provider = await this.getProvider();

    return provider.signMessage({
      account: account as `0x${string}`,
      message,
    });
  }

  public async sign(
    deploy: { deploy: JsonTypes },
    signingPublicKeyHex: string,
    _targetPublicKeyHex: string,
  ): Promise<Deploy> {
    throw new Error('Method not implemented.');
  }

  public onConnected(_event: CustomEventInit): void {
    throw new Error('Method not implemented.');
  }

  /**
   * It emits a custom event called 'casper:disconnect'
   */
  public onDisconnected(): void {
    throw new Error('Method not implemented.');
  }

  public onActiveKeyChanged(_event: CustomEventInit): void {
    throw new Error('Method not implemented.');
  }
}

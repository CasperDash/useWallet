import { JsonTypes } from 'typedjson';

import { ConnectorNotFoundError } from '../errors';
import { Deploy } from '../types/deploy';

import { Connector } from './base';

declare global {
  interface Window {
    casperDashHelper?: {
      isConnected: () => Promise<boolean>;
      signMessage: (message: string, signingPublicKeyHex: string) => Promise<string>;
      sign: (deploy: unknown, signingPublicKeyHex: string, targetPublicKey: string) => Promise<Deploy>;
      disconnectFromSite: () => Promise<void>;
      requestConnection: () => Promise<void>;
      getActivePublicKey: () => Promise<string>;
    };
  }
}

type CasperDashWindowGlobal = Window['casperDashHelper'];
type Provider = CasperDashWindowGlobal;
type EventProvider = Window;

export type CasperDashConnectorOptions = {
  name?: string;
  getProvider?: () => Provider;
  getEventProvider?: () => EventProvider;
};

/* It's a connector that uses the CasperDash browser extension to sign messages and deploys */
export class CasperDashConnector extends Connector<CasperDashWindowGlobal, Window, CasperDashConnectorOptions> {
  public readonly id: string = 'casperDash';

  private provider: Provider;
  private eventProvider: Window | undefined;

  constructor({
    options: defaultOptions,
  }: { options?: CasperDashConnectorOptions } = {}) {
    const options: CasperDashConnectorOptions = {
      name: 'CasperDash',
      getProvider: (): Provider | undefined => {
        return typeof window !== 'undefined' ? window.casperDashHelper : undefined;
      },
      getEventProvider: (): EventProvider => {
        return window;
      },
      ...defaultOptions,
    };

    super({ options });
  }

  /**
   * It returns a promise that resolves to the provider object
   * @returns The provider is being returned.
   */
  public async getProvider(): Promise<CasperDashWindowGlobal> {
    const provider = this.options.getProvider?.();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    this.provider = provider;

    return this.provider;
  }

  /**
   * > This function returns the event provider that was passed in the options object
   * @returns The event provider
   */
  public async getEventProvider(): Promise<EventProvider> {
    const eventProvider = this.options.getEventProvider?.();
    if (!eventProvider) {
      throw new ConnectorNotFoundError();
    }

    this.eventProvider = eventProvider;

    return this.eventProvider;
  }

  /**
   * It returns a boolean value that indicates whether the user is connected to the blockchain
   * @returns A boolean value.
   */
  public async isConnected(): Promise<boolean> {
    try {
      const provider = await this.getProvider();

      return await provider!.isConnected();
    } catch (err) {
      return false;
    }
  }

  /**
   * It removes all event listeners and disconnects from the site
   */
  public async disconnect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    eventProvider?.removeEventListener('casperdash:activeKeyChanged', this.onActiveKeyChanged);
    eventProvider?.removeEventListener('casperdash:disconnected', () => this.onDisconnected());
    eventProvider?.removeEventListener('casperdash:connected', this.onConnected);

    await provider?.disconnectFromSite();
  }

  /**
   * It gets the provider, gets the event provider, adds event listeners, and requests a connection
   */
  public async connect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    eventProvider?.addEventListener('casperdash:activeKeyChanged', this.onActiveKeyChanged);
    eventProvider?.addEventListener('casperdash:disconnected', this.onDisconnected);
    eventProvider?.addEventListener('casperdash:connected', this.onConnected);

    await provider!.requestConnection();
  }

  /**
   * It returns the active public key of the account.
   * @returns The public key of the active account.
   */
  public async getActivePublicKey(): Promise<any> {
    const provider = await this.getProvider();

    return provider!.getActivePublicKey();
  }

  /**
   * "This function takes a message and a signing public key, and returns a signature."
   * 
   * The first line of the function is a comment. Comments are ignored by the compiler
   * @param {string} message - The message to sign.
   * @param {string} signingPublicKeyHex - The public key of the account that will sign the message.
   * @returns A promise that resolves to a string.
   */
  public async signMessage(message: string, signingPublicKeyHex: string): Promise<string> {
    const provider = await this.getProvider();

    return provider!.signMessage(message, signingPublicKeyHex);
  }

  /**
   * "Sign a deploy using the given signing key and target key."
   * 
   * The first parameter is a deploy object. The second parameter is the signing key. The third
   * parameter is the target key
   * @param deploy - { deploy: JsonTypes }
   * @param {string} signingPublicKeyHex - The public key of the account that is signing the deploy.
   * @param {string} targetPublicKey - The public key of the account that will be signing the deploy.
   * @returns A deploy object.
   */
  public async sign(deploy: { deploy: JsonTypes }, signingPublicKeyHex: string, targetPublicKey: string): Promise<Deploy> {
    const provider = await this.getProvider();

    return provider!.sign(deploy, signingPublicKeyHex, targetPublicKey);
  }

  /**
   * It emits a custom event called 'casper:disconnect'
   */
  public onDisconnected(): void {
    const customEvent = new CustomEvent('casper:disconnect');
    window.dispatchEvent(customEvent);
    // this.emit('disconnect');
  }

  /**
   * An event trigger on user switch account
   * @param event - CustomEventInit<{ activeKey: string; isConnected: boolean }>
   */
  public onActiveKeyChanged(event: CustomEventInit<{ activeKey: string; isConnected: boolean }>): void {
    const customEvent = new CustomEvent('casper:change', event);
    window.dispatchEvent(customEvent);
    // this.emit('change', { isConnected: event.detail?.isConnected, activeKey: event.detail?.activeKey });
  }

  /**
   * An event trigger on user connect wallet with Dapp
   * @param event - CustomEventInit<{ activeKey: string; isConnected: boolean }>
   */
  public onConnected(event: CustomEventInit<{ activeKey: string; isConnected: boolean }>): void {
    const customEvent = new CustomEvent('casper:connect', event);
    window.dispatchEvent(customEvent);
    // this.emit('connect', { isConnected: event.detail?.isConnected, activeKey: event.detail?.activeKey });
  }
}

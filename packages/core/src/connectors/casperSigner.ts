import { JsonTypes } from 'typedjson';

import { ConnectorNotFoundError } from '../errors';
import { CasperLabsHelper } from '../types/casperLabsHelper';
import { Deploy } from '../types/deploy';

import { Connector } from './base';

type CasperLabWindowGlobal = CasperLabsHelper;
type Provider = CasperLabsHelper;
type EventProvider = Window;

export type CasperSignerConnectorOptions = {
  name?: string;
  getProvider?: () => Provider | undefined;
  getEventProvider?: () => EventProvider;
};

/* It's a connector that connects to the Casper Signer extension */
export class CasperSignerConnector extends Connector<
CasperLabWindowGlobal,
Window,
CasperSignerConnectorOptions
> {
  public readonly id: string = 'casperSigner';
  public isReady: boolean = false;
  private provider: Provider | undefined;
  private eventProvider: Window | undefined;

  constructor({
    options: defaultOptions,
  }: { options?: CasperSignerConnectorOptions } = {}) {
    const options = {
      name: 'CasperSigner',
      getProvider: (): Provider | undefined => {
        return typeof window !== 'undefined'
          ? window.casperlabsHelper
          : undefined;
      },
      getEventProvider: (): EventProvider => {
        return window;
      },
      ...defaultOptions,
    };
    super({ options });

    const provider = options.getProvider();
    this.isReady = !!provider;
  }


  // eslint-disable-next-line @typescript-eslint/require-await
  /**
   * It returns a promise that resolves to the provider object
   * @returns The provider is being returned.
   */
  public async getProvider(): Promise<CasperLabWindowGlobal> {
    const provider = this.options.getProvider?.();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    this.provider = provider;
    this.isReady = true;

    return this.provider;
  }


  // eslint-disable-next-line @typescript-eslint/require-await
  /**
  * It returns the event provider that was passed in the options object
  * @returns The eventProvider
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
   * It returns a promise that resolves to a boolean value that indicates whether the user is connected
   * to the blockchain
   * @returns A boolean value.
   */
  public async isConnected(): Promise<boolean> {
    try {
      const provider = await this.getProvider();

      return await provider.isConnected();
    } catch (err) {
      return false;
    }
  }

  /**
   * It disconnects the user from the site.
   */
  public async disconnect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    eventProvider?.removeEventListener(
      'signer:activeKeyChanged',
      this.onActiveKeyChanged,
    );
    eventProvider?.removeEventListener(
      'signer:disconnected',
      this.onDisconnected,
    );
    eventProvider?.removeEventListener('signer:connected', this.onConnected);
    eventProvider?.removeEventListener('signer:unlocked', this.onUnlocked);

    provider.disconnectFromSite();
  }

  /**
   * It requests a connection to the provider, and then adds event listeners to the event provider
   */
  public async connect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    eventProvider?.addEventListener(
      'signer:activeKeyChanged',
      this.onActiveKeyChanged,
    );
    eventProvider?.addEventListener('signer:disconnected', this.onDisconnected);
    eventProvider?.addEventListener('signer:connected', this.onConnected);
    eventProvider?.addEventListener('signer:unlocked', this.onUnlocked);

    provider.requestConnection();
  }

  /**
   * It returns the active public key of the account.
   * @returns The public key of the active account.
   */
  public async getActivePublicKey(): Promise<string> {
    const provider = await this.getProvider();

    return provider.getActivePublicKey();
  }

  /**
   * "Sign a message with the signing key of the account associated with the given public key."
   *
   * The first parameter is the message to sign. The second parameter is the public key of the account
   * that will sign the message
   * @param {string} message - The message to sign.
   * @param {string} signingPublicKeyHex - The public key of the account that will sign the message.
   * @returns A string
   */
  public async signMessage(
    message: string,
    signingPublicKeyHex: string,
  ): Promise<string> {
    const provider = await this.getProvider();

    return provider.signMessage(message, signingPublicKeyHex);
  }

  /**
   * It takes a deploy, a signing public key, and a target public key, and returns a signed deploy
   * @param deploy - { deploy: JsonTypes }
   * @param {string} signingPublicKeyHex - The public key of the account that is signing the deploy.
   * @param {string} targetPublicKeyHex - The public key of the account that will be paying for the
   * deploy.
   * @returns A deploy object.
   */
  public async sign(
    deploy: { deploy: JsonTypes },
    signingPublicKeyHex: string,
    targetPublicKeyHex: string,
  ): Promise<Deploy> {
    const provider = await this.getProvider();

    return provider.sign(deploy, signingPublicKeyHex, targetPublicKeyHex);
  }

  public onDisconnected(): void {
    const customEvent = new CustomEvent('casper:disconnect');
    window.dispatchEvent(customEvent);
    // this.emit('disconnect');
  }

  public onActiveKeyChanged(
    event: CustomEventInit<{ activeKey: string; isConnected: boolean }>,
  ): void {
    const customEvent = new CustomEvent('casper:change', event);
    window.dispatchEvent(customEvent);
    // this.emit('change', { isConnected: event.detail?.isConnected, activeKey: event.detail?.activeKey });
  }

  public onConnected(
    event: CustomEventInit<{ activeKey: string; isConnected: boolean }>,
  ): void {
    const customEvent = new CustomEvent('casper:connect', event);
    window.dispatchEvent(customEvent);
    // this.emit('connect', { isConnected: event.detail?.isConnected, activeKey: event.detail?.activeKey });
  }

  public onUnlocked(
    event: CustomEventInit<{ isUnlocked: string; isConnected: boolean }>,
  ): void {
    const customEvent = new CustomEvent('casper:unlocked', event);
    window.dispatchEvent(customEvent);
  }
}

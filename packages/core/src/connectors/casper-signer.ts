import { ConnectorNotFoundError } from '../errors';

import { Connector } from './base';

declare global {
  interface Window {
    casperlabsHelper?: {
      isConnected: () => Promise<boolean>;
      signMessage: (message: string, signingPublicKey: string) => Promise<string>;
      sign: (deploy: any, signingPublicKey: string, targetPublicKey: string) => Promise<string>;
      disconnectFromSite: () => Promise<void>;
      requestConnection: () => Promise<void>;
      getActivePublicKey: () => Promise<string>;
    };
  }
}


type CasperLabWindowGlobal = Window['casperlabsHelper'];
type Provider = CasperLabWindowGlobal;
type EventProvider = Window;

export type CapseSignerConnectorOptions = {
  name?: string;
  getProvider?: () => Provider;
  getEventProvider?: () => EventProvider;
};

export class CasperSignerConnector extends Connector<CasperLabWindowGlobal, Window, CapseSignerConnectorOptions> {
  public readonly id: string = 'casperSigner';

  private provider: Provider;
  private eventProvider: Window | undefined;

  constructor({
    options: defaultOptions,
  }: { options?: CapseSignerConnectorOptions }) {
    const options = {
      name: 'CasperSigner',
      getProvider: (): Provider | undefined => {
        return typeof window !== 'undefined' ? window.casperlabsHelper : undefined;
      },
      getEventProvider: (): EventProvider => {
        return window;
      },
      ...defaultOptions,
    };

    super({ options });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async getProvider(): Promise<CasperLabWindowGlobal> {
    const provider = this.options.getProvider?.();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    this.provider = provider;

    return this.provider;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async getEventProvider(): Promise<EventProvider> {
    const eventProvider = this.options.getEventProvider?.();
    if (!eventProvider) {
      throw new ConnectorNotFoundError();
    }

    this.eventProvider = eventProvider;

    return this.eventProvider;
  }

  public async isConnected(): Promise<boolean> {
    try {
      const provider = await this.getProvider();

      return await provider!.isConnected();
    } catch (err) {
      return false;
    }
  }

  public async disconnect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    eventProvider?.removeEventListener('signer:activeKeyChanged', this.onActiveKeyChanged);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    eventProvider?.removeEventListener('signer:disconnected', this.onDisconnected);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    eventProvider?.removeEventListener('signer:connected', this.onConnected);

    await provider!.disconnectFromSite();
  }

  public async connect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    // eslint-disable-next-line @typescript-eslint/unbound-method
    eventProvider?.addEventListener('signer:activeKeyChanged', this.onActiveKeyChanged);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    eventProvider?.addEventListener('signer:disconnected', () => this.onDisconnected());
    // eslint-disable-next-line @typescript-eslint/unbound-method
    eventProvider?.addEventListener('signer:connected', this.onConnected);

    await provider!.requestConnection();
  }

  public async getActivePublicKey(): Promise<string> {
    const provider = await this.getProvider();

    return provider!.getActivePublicKey();
  }

  public async signMessage(message: string, signingPublicKey: string): Promise<string> {
    const provider = await this.getProvider();

    return provider!.signMessage(message, signingPublicKey);
  }

  public async sign(deploy: any, signingPublicKeyHex: string, targetPublicKeyHex: string): Promise<string> {
    const provider = await this.getProvider();

    return provider!.sign(deploy, signingPublicKeyHex, targetPublicKeyHex);
  }

  public onDisconnected(): void {
    const customEvent = new CustomEvent('casper:disconnect');
    window.dispatchEvent(customEvent);
    // this.emit('disconnect');
  }

  public onActiveKeyChanged(event: CustomEventInit<{ activeKey: string; isConnected: boolean }>): void {
    const customEvent = new CustomEvent('casper:change', event);
    window.dispatchEvent(customEvent);
    // this.emit('change', { isConnected: event.detail?.isConnected, activeKey: event.detail?.activeKey });
  }

  public onConnected(event: CustomEventInit<{ activeKey: string; isConnected: boolean }>): void {
    const customEvent = new CustomEvent('casper:connect', event);
    window.dispatchEvent(customEvent);
    // this.emit('connect', { isConnected: event.detail?.isConnected, activeKey: event.detail?.activeKey });
  }
}

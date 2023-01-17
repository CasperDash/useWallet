import { ConnectorNotFoundError } from '../errors';

import { Connector } from './base';

type CasperLabWindowGlobal = Window['casperlabsHelper'];
type Provider = CasperLabWindowGlobal;
type EventProvider = Window;

export type CapseSignerConnectorOptions = {
  name?: string;
  getProvider?: () => Provider;
  getEventProvider: () => EventProvider;
};

export class CapseSignerConnector extends Connector<CasperLabWindowGlobal, Window, CapseSignerConnectorOptions> {
  private provider: Provider;
  private eventProvider: Window;

  constructor({
    options: defaultOptions,
  }) {
    const options = {
      name: 'CasperSigner',
      getProvider: (): EventProvider | undefined => {
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
    const provider = this.options.getProvider();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    this.provider = provider;

    return this.provider;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async getEventProvider(): Promise<EventProvider> {
    const eventProvider = this.options.getEventProvider();
    if (!eventProvider) {
      throw new ConnectorNotFoundError();
    }

    this.eventProvider = eventProvider;

    return this.eventProvider;
  }

  public async isConnected(): Promise<boolean> {
    try {
      const provider = await this.getProvider();

      return provider.isConnected();
    } catch (err) {
      return false;
    }
  }

  public async disconnect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    eventProvider?.removeListener('signer:activeKeyChanged', this.onActiveKeyChanged);
    eventProvider?.removeListener('signer:disconnected', this.onDisconnected);
    eventProvider?.removeListener('signer:connected', this.onConnected);

    await provider.disconnectFromSite();
  }

  public async connect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    eventProvider?.on('signer:activeKeyChanged', this.onActiveKeyChanged);
    eventProvider?.on('signer:disconnected', this.onDisconnected);
    eventProvider?.on('signer:connected', this.onConnected);

    await provider.requestConnection();
  }

  public async getActivePublicKey(): Promise<string> {
    const provider = await this.getProvider();

    await provider.getActivePublicKey();
  }

  public async signMessage(message: string, signingPublicKey: string): Promise<string> {
    const provider = await this.getProvider();

    return provider.signMessage(message, signingPublicKey);
  }

  public async sign(deploy: any, signingPublicKeyHex: string, targetPublicKeyHex: string): Promise<string> {
    const provider = await this.getProvider();

    return provider.sign(deploy, signingPublicKeyHex, targetPublicKeyHex);
  }

  protected onDisconnected(): void {
    this.emit('disconnect');
  }

  protected onActiveKeyChanged(event: EventListener): void {
    const { detail: { isUnlocked, activeKey } } = event;
    this.emit('change', { isUnlocked, activeKey });
    throw new Error('Method not implemented.');
  }

}

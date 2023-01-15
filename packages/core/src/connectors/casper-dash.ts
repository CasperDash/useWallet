import '@usedapp/core/types/global.d.ts';
import { ConnectorNotFoundError } from '../errors';

import { Connector } from './base';

declare global {
  interface Window {
    casperDashPluginHelpers?: {
      isConnected: Promise<boolean>;
    };
  }
}


type CasperDashWindowGlobal = Window['casperDashPluginHelpers'];
type Provider = CasperDashWindowGlobal;
type EventProvider = Window;

export type CasperDashConnectorOptions = {
  name?: string;
  getProvider?: () => Provider;
  getEventProvider: () => EventProvider;
};

export class CapserDashConnector extends Connector<CasperDashWindowGlobal, Window, CasperDashConnectorOptions> {
  private provider: Provider;
  private eventProvider: Window | undefined;

  constructor({
    options: defaultOptions,
  }: { options: CasperDashConnectorOptions }) {
    const options = {
      name: 'CasperDash',
      getProvider: (): EventProvider | undefined => {
        return typeof window !== 'undefined' ? window.casperDashPluginHelpers : undefined;
      },
      getEventProvider: (): EventProvider => {
        return window;
      },
      ...defaultOptions,
    };

    super({ options });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async getProvider(): Promise<CasperDashWindowGlobal> {
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

    eventProvider?.removeListener('casperdash:activeKeyChanged', this.onActiveKeyChanged);
    eventProvider?.removeListener('casperdash:disconnected', this.onDisconnected);
    eventProvider?.removeListener('casperdash:connected', this.onConnected);

    await provider.disconnectFromSite();
  }

  public async connect(): Promise<void> {
    const provider = await this.getProvider();

    const eventProvider = await this.getEventProvider();

    eventProvider?.on('casperdash:activeKeyChanged', this.onActiveKeyChanged);
    eventProvider?.on('casperdash:disconnected', this.onDisconnected);
    eventProvider?.on('casperdash:connected', this.onConnected);

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

    return provider.sign(message, signingPublicKey);
  }

  protected onDisconnected(): void {
    this.emit('disconnect');
  }

  protected onActiveKeyChanged(event: EventListener): void {
    const { detail: { isUnlocked, activeKey } } = event;
    this.emit('change', { isUnlocked, activeKey });
    throw new Error('Method not implemented.');
  }

  protected onConnected(): void {
    throw new Error('Method not implemented.');
  }

}

import EventEmitter from 'eventemitter3';

export interface ConnectorEvents {
  change(): void;
  connect(): void;
  message({ type, data }: { type: string; data?: unknown }): void;
  disconnect(): void;
  error(error: Error): void;
}

export abstract class Connector<Provider = unknown, EventProvider = unknown, Options = unknown> extends EventEmitter<ConnectorEvents> {
  protected readonly options: Options;

  constructor({
    options,
  }: {
    options: Options;
  }) {
    super();
    this.options = options;
  }

  public abstract getProvider(): Promise<Provider>;
  public abstract getEventProvider(): Promise<EventProvider>;

  public abstract isConnected(): Promise<boolean>;
  public abstract disconnect(): Promise<void>;
  public abstract connect(): Promise<void>;
  public abstract getActivePublicKey(): Promise<string>;
  public abstract signMessage(message:string, signingPublicKey: string): Promise<string>;
  public abstract sign(deploy: unknown, signingPublicKeyHex: string, targetPublicKeyHex: string): Promise<string>;

  protected abstract onConnected(): void;
  protected abstract onDisconnected(): void;
  protected abstract onActiveKeyChanged(error: Error): void;
}

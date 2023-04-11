import { default as EventEmitter } from 'eventemitter3';
import { JsonTypes } from 'typedjson';

import { Deploy } from '../types/deploy';

export type ConnectorData<Provider = unknown> = {
  activeKey?: string;
  isConnected?: boolean;
  provider?: Provider;
};

export type SignedParams = {
  deploy: {
    deploy: JsonTypes;
  };
};

export interface ConnectorEvents {
  change(data: ConnectorData): void;
  connect(data: ConnectorData): void;
  message({ type, data }: { type: string; data?: unknown }): void;
  disconnect(): void;
  error(error: Error): void;
  approvedSign(data: SignedParams): void;
  rejectedSign(): void;
  approvedSignMessage(signedMessage: string): void;
  rejectedSignMessage(): void;
}

export abstract class Connector<Provider = unknown, EventProvider = unknown, Options = unknown> extends EventEmitter<ConnectorEvents> {
  protected readonly options: Options;
  public abstract readonly id: string;
  public abstract isReady: boolean;

  constructor({
    options,
  }: {
    options: Options;
  }) {
    super();
    this.options = options;
  }

  public getOptions() {
    return this.options;
  }

  public emit<T extends keyof ConnectorEvents>(event: T,
    ...args: EventEmitter.ArgumentMap<ConnectorEvents>[Extract<T, keyof ConnectorEvents>]): boolean {
    return super.emit(event, ...args);
  }

  public abstract getProvider(): Provider;
  public abstract getEventProvider(): Promise<EventProvider>;

  public abstract isConnected(): Promise<boolean>;
  public abstract disconnect(): Promise<void>;
  public abstract connect(): Promise<void>;
  public abstract getActivePublicKey(): Promise<string | undefined>;
  public abstract signMessage(message:string, signingPublicKeyHex: string): Promise<string | undefined>;
  public abstract sign(deploy: { deploy: JsonTypes }, signingPublicKeyHex: string, targetPublicKeyHex: string): Promise<Deploy | undefined>;

  public abstract onConnected(event: CustomEventInit): void;
  public abstract onDisconnected(): void;
  public abstract onActiveKeyChanged(event: CustomEventInit): void;

}

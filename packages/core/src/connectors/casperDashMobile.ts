/* eslint-disable @typescript-eslint/no-unused-vars */
import { JsonTypes } from 'typedjson';

import { ConnectorNotFoundError, RejectedSignMessageError } from '../errors';
import { Deploy } from '../types/deploy';
import { PostMessageMethodEnums, RepliedMessageMethodEnums } from '../enums/postMessageMethod';
import { RejectedSignDeployError } from '../errors/RejectedSignDeployError';
import { maybeParseDetailEvent } from '../utils/parser';

import { Connector, SignedParams } from './base';

type Provider = Window;
type EventProvider = Window;
type ReplyEvent<T> = CustomEventInit<{
  id: number;
  method: string;
  params: T;
  result?: string;
  error?: string;
}>;
type SendPostMessage = {
  method: PostMessageMethodEnums;
  params?: Record<string, string | undefined>;
};
type Data = { publicKey: string } | SignedParams | { signedMessage: string };


export type CasperDashMobileConnectorOptions = {
  name?: string;
  getProvider?: () => Provider | undefined;
  getEventProvider?: () => EventProvider;
};

export class CasperDashMobileConnector extends Connector<
Provider,
Window,
CasperDashMobileConnectorOptions
> {
  public readonly id: string = 'casperDashMobile';
  public isReady: boolean = false;
  private provider: Provider | undefined;
  private eventProvider: Window | undefined;
  private publicKey?: string;

  constructor({
    options: defaultOptions,
  }: { options?: CasperDashMobileConnectorOptions; providerUrl?: string } = {}) {
    const options = {
      name: 'casperDashMobile',
      getProvider: (): Provider | undefined => {
        return this.provider;
      },
      getEventProvider: (): EventProvider => {
        return window;
      },
      ...defaultOptions,
    };

    super({ options });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  /**
   * It returns a promise that resolves to the provider object
   * @returns The provider is being returned.
   */
  public async getProvider(): Promise<Provider> {
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
    return !!this.publicKey;
  }

  /**
   * It disconnects the user from the site.
   */
  public async disconnect(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }

  /**
   * It requests a connection to the provider, and then adds event listeners to the event provider
   */
  public async connect(): Promise<void> {
    this.sendPostMessage({
      method: PostMessageMethodEnums.CONNECT,
    });

    const eventProvider = await this.getEventProvider();
    eventProvider?.addEventListener(
      'cmb:message',
      (e: ReplyEvent<Data>) => this.handleMessage(e),
    );
  }

  /**
   * It returns the active public key of the account.
   * @returns The public key of the active account.
   */
  public async getActivePublicKey(): Promise<string | undefined> {
    return undefined;
  }

  /**
   * "Sign a message with the signing key of the account associated with the given public key."
   *
   * The first parameter is the message to sign. The second parameter is the public key of the account
   * that will sign the message
   * @param {string} _message - The message to sign.
   * @param {string} _signingPublicKeyHex - The public key of the account that will sign the message.
   * @returns A string
   */
  public async signMessage(
    message: string,
    signingPublicKeyHex: string,
  ): Promise<string | undefined> {
    this.sendPostMessage({
      method: PostMessageMethodEnums.SIGN_MESSAGE,
      params: {
        message,
        signingPublicKeyHex,
      },
    });

    return new Promise((resolve: (message: string) => void, reject: (err: RejectedSignMessageError) => void) => {
      super.on('approvedSignMessage', (signedMessage: string) => {
        return resolve(signedMessage);
      });
      super.on('rejectedSignMessage', () => {
        reject(new RejectedSignMessageError());
      });
    });
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
  ): Promise<Deploy | undefined> {
    this.sendPostMessage({
      method: PostMessageMethodEnums.SIGN,
      params: {
        deploy: JSON.stringify(deploy),
        signingPublicKeyHex,
        targetPublicKeyHex,
      },
    });

    return new Promise((resolve: (deployResult: Deploy) => void, reject: (err: RejectedSignDeployError) => void) => {
      super.on('approvedSign', (params: SignedParams) => {
        return resolve(params.deploy as unknown as Deploy);
      });
      super.on('rejectedSign', () => {
        reject(new RejectedSignDeployError());
      });
    });
  }

  public onDisconnected() {
    const customEvent = new CustomEvent('casper:disconnect');
    window.dispatchEvent(customEvent);
  }

  public onActiveKeyChanged(_event: CustomEventInit<string>): void {
    // TODO:
  }

  public onConnected(
    event: CustomEventInit<{ activeKey: string; isConnected: boolean }>,
  ): void {
    const customEvent = new CustomEvent('casper:connect', event);
    window.dispatchEvent(customEvent);
    // this.emit('connect', { isConnected: event.detail?.isConnected, activeKey: event.detail?.activeKey });
  }

  public onUnlocked(_event: CustomEventInit<string>): void {
    // TODO:
  }

  private handleMessage(event: ReplyEvent<Data>) {
    console.log('message: ', event);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = maybeParseDetailEvent<{ params: { publicKey: string; signedMessage: string }; method: string }>(event.detail as any);
    console.log('replied Data: ', data);
    switch (data.method) {
      case RepliedMessageMethodEnums.CONNECTED: {
        this.publicKey = data.params.publicKey;
        console.log('publicKey: ', this.publicKey);
        this.onConnected(new CustomEvent('casperDashWeb:connect', { detail: { activeKey: this.publicKey, isConnected: true } }));
        break;
      }
      case RepliedMessageMethodEnums.DISCONNECTED: {
        void this.disconnect();
        break;
      }
      case RepliedMessageMethodEnums.APPROVED_SIGN:
        super.emit('approvedSign', data.params as unknown as SignedParams);
        break;
      case RepliedMessageMethodEnums.REJECTED_SIGN:
        super.emit('rejectedSign');
        break;
      case RepliedMessageMethodEnums.APPROVED_SIGN_MESSAGE:{
        super.emit('approvedSignMessage', data.params.signedMessage);

        break;
      }
      case RepliedMessageMethodEnums.REJECTED_SIGN_MESSAGE:
        super.emit('rejectedSignMessage');

        break;
      default:
    }
  }

  private sendPostMessage({
    method,
    params,
  }: SendPostMessage) {
    if (!window.ReactNativeWebView) {
      throw new ConnectorNotFoundError();
    }
    console.log('method: ', method);

    window.ReactNativeWebView.postMessage(JSON.stringify({
      id: Date.now(),
      method,
      params,
    }));
  }
}

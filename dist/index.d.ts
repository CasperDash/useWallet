import EventEmitter from 'eventemitter3';
import { JsonTypes } from 'typedjson';

type ConnectorData<Provider = unknown> = {
    activeKey?: string;
    isConnected?: boolean;
    provider?: Provider;
};
interface ConnectorEvents {
    change(data: ConnectorData): void;
    connect(data: ConnectorData): void;
    message({ type, data }: {
        type: string;
        data?: unknown;
    }): void;
    disconnect(): void;
    error(error: Error): void;
}
declare abstract class Connector<Provider = unknown, EventProvider = unknown, Options = unknown> extends EventEmitter<ConnectorEvents> {
    protected readonly options: Options;
    abstract readonly id: string;
    constructor({ options, }: {
        options: Options;
    });
    abstract getProvider(): Promise<Provider>;
    abstract getEventProvider(): Promise<EventProvider>;
    abstract isConnected(): Promise<boolean>;
    abstract disconnect(): Promise<void>;
    abstract connect(): Promise<void>;
    abstract getActivePublicKey(): Promise<string>;
    abstract signMessage(message: string, signingPublicKey: string): Promise<string>;
    abstract sign(deploy: unknown, signingPublicKeyHex: string, targetPublicKeyHex: string): Promise<{
        deploy: JsonTypes;
    }>;
    abstract onConnected(event: CustomEventInit): void;
    abstract onDisconnected(): void;
    abstract onActiveKeyChanged(event: CustomEventInit): void;
}

type ConnectParams = {
    connector: Connector;
};
type ConnectResult = {
    connector: Connector;
};
declare const connect: ({ connector }: ConnectParams) => Promise<ConnectResult>;

declare const disconnect: () => Promise<void>;

declare const isConnected: () => Promise<boolean>;

declare const getActivePublicKey: () => Promise<string | undefined>;

declare enum StatusEnum {
    CONNECTED = "connected",
    CONNECTING = "connecting",
    RECONNECTING = "reconnecting",
    DISCONNECTED = "disconnected"
}

declare global {
    interface Window {
        casperDashPluginHelpers?: {
            isConnected: () => Promise<boolean>;
            signMessage: (message: string, signingPublicKey: string) => Promise<string>;
            sign: (deploy: unknown, signingPublicKey: string, targetPublicKey: string) => Promise<{
                deploy: JsonTypes;
            }>;
            disconnectFromSite: () => Promise<void>;
            requestConnection: () => Promise<void>;
            getActivePublicKey: () => Promise<string>;
        };
    }
}
type CasperDashWindowGlobal = Window['casperDashPluginHelpers'];
type Provider$1 = CasperDashWindowGlobal;
type EventProvider$1 = Window;
type CasperDashConnectorOptions = {
    name?: string;
    getProvider?: () => Provider$1;
    getEventProvider?: () => EventProvider$1;
};
declare class CapserDashConnector extends Connector<CasperDashWindowGlobal, Window, CasperDashConnectorOptions> {
    readonly id: string;
    private provider;
    private eventProvider;
    constructor({ options: defaultOptions, }?: {
        options?: CasperDashConnectorOptions;
    });
    getProvider(): Promise<CasperDashWindowGlobal>;
    getEventProvider(): Promise<EventProvider$1>;
    isConnected(): Promise<boolean>;
    disconnect(): Promise<void>;
    connect(): Promise<void>;
    getActivePublicKey(): Promise<any>;
    signMessage(message: string, signingPublicKey: string): Promise<string>;
    sign(deploy: any, signingPublicKey: string, targetPublicKey: string): Promise<{
        deploy: JsonTypes;
    }>;
    onDisconnected(): void;
    onActiveKeyChanged(event: CustomEventInit<{
        activeKey: string;
        isConnected: boolean;
    }>): void;
    onConnected(event: CustomEventInit<{
        activeKey: string;
        isConnected: boolean;
    }>): void;
}

interface CasperLabsHelper {
  /**
   * Returns Signer version
   */
  getVersion: () => Promise<string>;

  /**
   * Returns connection status from Signer
   */
  isConnected: () => Promise<boolean>;

  /**
   * Attempt connection to Signer
   */
  requestConnection: () => void;

  /**
   * Send Deploy in JSON format to Signer extension to be signed.
   *
   * @param deploy - deploy in JSON format
   * @param signingPublicKeyHex - Hex-formatted public key. The corresponding secret key is used to sign the deploy.
   * @param {string} [targetPublicKeyHex] - Hex-formatted public key.
   * If the `target` in the deploy is an account hash this can be used to verify it and display the hex-formatted public key in the UI.
   *
   * @throws Errors if the Signer extension is not connected.
   * @throws Errors if signingPublicKey is not available or does not match the Active Key in the Signer.
   * @throws Errors if targetPublicKeyHex is not the same as the key (or corresponding account hash) that is used as target in deploy.
   */
  sign: (
    deploy: { deploy: JsonTypes },
    signingPublicKeyHex: string,
    targetPublicKeyHex?: string
  ) => Promise<{ deploy: JsonTypes }>;

  /**
   * Send raw string message to Signer for signing.
   * @param message string to be signed.
   * @param signingPublicKey public key in hex format, the corresponding secret key (from the vault) will be used to sign.
   * @returns `Base16` signature
   */
  signMessage: (
    rawMessage: string,
    signingPublicKey: string
  ) => Promise<string>;

  /*
   * Returns base64 encoded public key of user current selected account.
   */
  getSelectedPublicKeyBase64: () => Promise<string>;

  /**
   * Retrieve the active public key.
   * @returns {string} Hex-encoded public key with algorithm prefix.
   */
  getActivePublicKey: () => Promise<string>;

  /*
   * Forces Signer to disconnect from the currently open site.
   */
  disconnectFromSite: () => void;
}

declare global {
    interface Window {
        casperlabsHelper: CasperLabsHelper;
    }
}
type CasperLabWindowGlobal = CasperLabsHelper;
type Provider = CasperLabsHelper;
type EventProvider = Window;
type CapseSignerConnectorOptions = {
    name?: string;
    getProvider?: () => Provider | undefined;
    getEventProvider?: () => EventProvider;
};
declare class CasperSignerConnector extends Connector<CasperLabWindowGlobal, Window, CapseSignerConnectorOptions> {
    readonly id: string;
    private provider;
    private eventProvider;
    constructor({ options: defaultOptions, }?: {
        options?: CapseSignerConnectorOptions;
    });
    getProvider(): Promise<CasperLabWindowGlobal>;
    getEventProvider(): Promise<EventProvider>;
    isConnected(): Promise<boolean>;
    disconnect(): Promise<void>;
    connect(): Promise<void>;
    getActivePublicKey(): Promise<string>;
    signMessage(message: string, signingPublicKey: string): Promise<string>;
    sign(deploy: any, signingPublicKeyHex: string, targetPublicKeyHex: string): Promise<{
        deploy: JsonTypes;
    }>;
    onDisconnected(): void;
    onActiveKeyChanged(event: CustomEventInit<{
        activeKey: string;
        isConnected: boolean;
    }>): void;
    onConnected(event: CustomEventInit<{
        activeKey: string;
        isConnected: boolean;
    }>): void;
}

type Account = {
    publicKey?: string;
    status?: StatusEnum;
    connector?: Connector;
};
declare const getAccount: () => Account | null;

type Acount = {
    publicKey: string;
};
type WatchAccountSelectorParams = {
    publicKey?: string;
    connector?: Connector;
    status?: StatusEnum;
};
type WatchAccountOptions = {
    selector?: ({ publicKey, connector, status, }: WatchAccountSelectorParams) => any;
};
declare const watchAccount: (callback: (account: Account | null) => void, { selector }?: WatchAccountOptions) => any;

type SignParams = {
    deploy: unknown;
    signingPublicKey: string;
    targetPublicKeyHex: string;
};
type SignResult = {
    deploy: JsonTypes;
} | undefined;
declare const sign: ({ deploy, signingPublicKey, targetPublicKeyHex }: SignParams) => Promise<SignResult>;

type SignMessageParams = {
    message: string;
    signingPublicKey: string;
};
type SignMessageResult = string | undefined;
declare const signMessage: ({ message, signingPublicKey }: SignMessageParams) => Promise<SignMessageResult>;

type StateParams = {
    connectors: Connector[];
    connector?: Connector;
    data?: ConnectorData;
    status?: StatusEnum;
};
type ClientConfig = StateParams;
declare class Client {
    private store;
    constructor({ connectors, }: ClientConfig);
    get connector(): Connector | undefined;
    get subscribe(): {
        (listener: (selectedState: StateParams, previousSelectedState: StateParams) => void): () => void;
        <U>(selector: (state: StateParams) => U, listener: (selectedState: U, previousSelectedState: U) => void, options?: {
            equalityFn?: ((a: U, b: U) => boolean) | undefined;
            fireImmediately?: boolean | undefined;
        } | undefined): () => void;
    };
    get data(): ConnectorData<unknown> | undefined;
    get status(): StatusEnum | undefined;
    clearState(): void;
    setState(updater: Partial<StateParams> | ((state: StateParams) => StateParams)): void;
    private triggerEvent;
}
declare let client: Client;
declare const createClient: (clientConfig: ClientConfig) => Client;
declare const getClient: () => Client;

declare const deepEqual: (a: any, b: any) => boolean;

export { Account, Acount, CapseSignerConnectorOptions, CapserDashConnector, CasperDashConnectorOptions, CasperSignerConnector, Client, ClientConfig, ConnectParams, ConnectResult, Connector, ConnectorData, ConnectorEvents, SignMessageParams, SignMessageResult, SignParams, SignResult, StateParams, StatusEnum, WatchAccountOptions, WatchAccountSelectorParams, client, connect, createClient, deepEqual, disconnect, getAccount, getActivePublicKey, getClient, isConnected, sign, signMessage, watchAccount };

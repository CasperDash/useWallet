"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  CasperDashConnector: () => CasperDashConnector,
  CasperSignerConnector: () => CasperSignerConnector,
  Client: () => Client,
  ClientNotFoundError: () => ClientNotFoundError,
  Connector: () => Connector2,
  ConnectorAlreadyConnectedError: () => ConnectorAlreadyConnectedError,
  ConnectorNotFoundError: () => ConnectorNotFoundError,
  StatusEnum: () => StatusEnum,
  client: () => client,
  connect: () => connect,
  createClient: () => createClient,
  deepEqual: () => deepEqual,
  disconnect: () => disconnect,
  getAccount: () => getAccount,
  getActivePublicKey: () => getActivePublicKey,
  getClient: () => getClient,
  isConnected: () => isConnected,
  sign: () => sign,
  signMessage: () => signMessage,
  watchAccount: () => watchAccount
});
module.exports = __toCommonJS(src_exports);

// src/utils/client.ts
var import_vanilla = require("zustand/vanilla");
var import_middleware = require("zustand/middleware");

// src/errors/ConnectorNotFoundError.ts
var ConnectorNotFoundError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ConnectorNotFoundError";
    this.message = "Connector not found";
  }
};

// src/errors/ConnectorAlreadyConnectedError.ts
var ConnectorAlreadyConnectedError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ConnectorAlreadyConnectedError";
    this.message = "Connector already connected";
  }
};

// src/errors/ClientNotFoundError.ts
var ClientNotFoundError = class extends Error {
  constructor() {
    super(...arguments);
    this.name = "ClientNotFoundError";
    this.message = "Client not found";
  }
};

// src/enums/status.ts
var StatusEnum = /* @__PURE__ */ ((StatusEnum2) => {
  StatusEnum2["CONNECTED"] = "connected";
  StatusEnum2["CONNECTING"] = "connecting";
  StatusEnum2["RECONNECTING"] = "reconnecting";
  StatusEnum2["DISCONNECTED"] = "disconnected";
  return StatusEnum2;
})(StatusEnum || {});

// src/utils/client.ts
var Client = class {
  constructor({
    autoConnect = false,
    connectors
  }) {
    this.store = (0, import_vanilla.createStore)((0, import_middleware.subscribeWithSelector)(() => ({
      connectors,
      status: "disconnected" /* DISCONNECTED */,
      autoConnect
    })));
    this.triggerEvent();
    if (autoConnect) {
      setTimeout(async () => this.autoConnect(), 0);
    }
  }
  get state() {
    return this.store.getState();
  }
  get connector() {
    return this.store.getState().connector;
  }
  get connectors() {
    return this.store.getState().connectors;
  }
  get subscribe() {
    return this.store.subscribe;
  }
  get data() {
    return this.store.getState().data;
  }
  get status() {
    return this.store.getState().status;
  }
  clearState() {
    this.setState((x) => ({
      ...x,
      connector: void 0,
      data: void 0
    }));
  }
  setState(updater) {
    const newState = typeof updater === "function" ? updater(this.store.getState()) : updater;
    this.store.setState(newState, true);
  }
  async autoConnect() {
    if (this.isAutoConnecting) {
      return;
    }
    if (this.status === "connected" /* CONNECTED */) {
      return;
    }
    this.isAutoConnecting = true;
    this.setState((x) => ({
      ...x,
      status: x.data?.activeKey ? "reconnecting" /* RECONNECTING */ : "connecting" /* CONNECTING */
    }));
    let isConnected2 = false;
    for (const connector of this.connectors || []) {
      const isConnectedWithConnector = await connector?.isConnected();
      if (isConnectedWithConnector) {
        await this.connector?.connect();
        const publicKey = await connector?.getActivePublicKey();
        this.setState((x) => ({
          ...x,
          status: "connected" /* CONNECTED */,
          connector,
          data: {
            ...x.data,
            activeKey: publicKey
          }
        }));
        isConnected2 = true;
        break;
      }
    }
    if (!isConnected2) {
      this.setState((x) => ({
        ...x,
        status: "disconnected" /* DISCONNECTED */
      }));
    }
    this.isAutoConnecting = false;
    return this.data;
  }
  triggerEvent() {
    const onChange = (data) => {
      this.setState((x) => ({
        ...x,
        data: { ...x.data, ...data }
      }));
    };
    const onDisconnect = () => {
      this.clearState();
    };
    const onConnect = (data) => {
      this.setState((x) => ({
        ...x,
        data: { ...x.data, ...data },
        status: "connected" /* CONNECTED */
      }));
    };
    this.store.subscribe(
      ({ connector }) => connector,
      (connector) => {
        if (!connector)
          return;
        window?.addEventListener(
          "casper:change",
          (event) => onChange(event.detail)
        );
        window?.addEventListener("casper:disconnect", () => onDisconnect());
        window?.addEventListener(
          "casper:connect",
          (event) => onConnect(event.detail)
        );
      }
    );
  }
};
var client;
var createClient = (clientConfig) => {
  client = new Client(clientConfig);
  return client;
};
var getClient = () => {
  if (!client) {
    throw new ClientNotFoundError();
  }
  return client;
};

// src/actions/account/connect.ts
var connect = async ({ connector }) => {
  const client2 = getClient();
  const activeConnector = client2?.connector;
  if (activeConnector && activeConnector.id !== connector.id) {
    throw new ConnectorAlreadyConnectedError();
  }
  try {
    client2.setState((x) => ({ ...x, status: "connecting" /* CONNECTING */ }));
    await connector.connect();
    let customData = {};
    let isConnected2 = false;
    try {
      const activeKey = await connector.getActivePublicKey();
      customData = {
        activeKey
      };
      isConnected2 = !!activeKey;
    } catch (err) {
      console.error(err);
    }
    client2.setState((oldState) => ({
      ...oldState,
      connector,
      status: isConnected2 ? "connected" /* CONNECTED */ : "connecting" /* CONNECTING */,
      data: {
        ...oldState.data,
        ...customData
      }
    }));
    return {
      connector
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// src/actions/account/disconnect.ts
var disconnect = async () => {
  const client2 = getClient();
  try {
    await client2.connector?.disconnect();
    client2.setState((oldState) => ({
      ...oldState,
      status: "disconnected" /* DISCONNECTED */,
      data: {
        ...oldState.data,
        activeKey: void 0
      }
    }));
  } catch (error) {
    console.error(error);
  }
};

// src/actions/account/isConnected.ts
var isConnected = async () => {
  const connector = getClient()?.connector;
  try {
    const hasConnected = await connector?.isConnected();
    return !!hasConnected;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// src/actions/account/getActivePublicKey.ts
var getActivePublicKey = async () => {
  const connector = getClient()?.connector;
  try {
    const activeKey = await connector?.getActivePublicKey();
    return activeKey;
  } catch (error) {
    console.error(error);
  }
};

// src/actions/account/watchAccount.ts
var import_shallow = require("zustand/shallow");

// src/utils/deepEqual.ts
var deepEqual = (a, b) => {
  if (a === null && b === null)
    return true;
  if (a === void 0 && b === void 0)
    return true;
  if (typeof a !== typeof b)
    return false;
  if (typeof a !== "object")
    return a === b;
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!Object.prototype.hasOwnProperty.call(b, key))
      return false;
    if (!deepEqual(a[key], b[key]))
      return false;
  }
  return true;
};

// src/actions/account/getAccount.ts
var getAccount = () => {
  try {
    const client2 = getClient();
    const { data, status, connector } = client2;
    return {
      publicKey: data?.activeKey,
      status,
      connector
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

// src/actions/account/watchAccount.ts
var watchAccount = (callback, { selector = (params) => params } = {}) => {
  const client2 = getClient();
  const handleOnChange = () => callback(getAccount());
  const unsubscribe = client2.subscribe(
    ({ data, connector, status }) => {
      return selector?.({
        publicKey: data?.activeKey,
        status,
        connector
      });
    },
    handleOnChange,
    {
      equalityFn: import_shallow.shallow
    }
  );
  return unsubscribe;
};

// src/actions/signing/sign.ts
var sign = async ({ deploy, signingPublicKey, targetPublicKeyHex }) => {
  const connector = getClient()?.connector;
  try {
    return await connector?.sign(deploy, signingPublicKey, targetPublicKeyHex);
  } catch (error) {
    console.error(error);
  }
};

// src/actions/signing/signMessage.ts
var signMessage = async ({ message, signingPublicKey }) => {
  const connector = getClient()?.connector;
  try {
    return await connector?.signMessage(message, signingPublicKey);
  } catch (error) {
    console.error(error);
  }
};

// src/connectors/base.ts
var import_eventemitter3 = __toESM(require("eventemitter3"), 1);
var Connector2 = class extends import_eventemitter3.default {
  constructor({
    options
  }) {
    super();
    this.options = options;
  }
  getOptions() {
    return this.options;
  }
};

// src/connectors/casperDash.ts
var CasperDashConnector = class extends Connector2 {
  constructor({
    options: defaultOptions
  } = {}) {
    const options = {
      name: "CasperDash",
      getProvider: () => {
        return typeof window !== "undefined" ? window.casperDashPluginHelpers : void 0;
      },
      getEventProvider: () => {
        return window;
      },
      ...defaultOptions
    };
    super({ options });
    this.id = "casperDash";
  }
  async getProvider() {
    const provider = this.options.getProvider?.();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    this.provider = provider;
    return this.provider;
  }
  async getEventProvider() {
    const eventProvider = this.options.getEventProvider?.();
    if (!eventProvider) {
      throw new ConnectorNotFoundError();
    }
    this.eventProvider = eventProvider;
    return this.eventProvider;
  }
  async isConnected() {
    try {
      const provider = await this.getProvider();
      return await provider.isConnected();
    } catch (err) {
      return false;
    }
  }
  async disconnect() {
    const provider = await this.getProvider();
    const eventProvider = await this.getEventProvider();
    eventProvider?.removeEventListener("casperdash:activeKeyChanged", this.onActiveKeyChanged);
    eventProvider?.removeEventListener("casperdash:disconnected", () => this.onDisconnected());
    eventProvider?.removeEventListener("casperdash:connected", this.onConnected);
    await provider.disconnectFromSite();
  }
  async connect() {
    const provider = await this.getProvider();
    const eventProvider = await this.getEventProvider();
    eventProvider?.addEventListener("casperdash:activeKeyChanged", this.onActiveKeyChanged);
    eventProvider?.addEventListener("casperdash:disconnected", this.onDisconnected);
    eventProvider?.addEventListener("casperdash:connected", this.onConnected);
    await provider.requestConnection();
  }
  async getActivePublicKey() {
    const provider = await this.getProvider();
    return provider.getActivePublicKey();
  }
  async signMessage(message, signingPublicKey) {
    const provider = await this.getProvider();
    return provider.signMessage(message, signingPublicKey);
  }
  async sign(deploy, signingPublicKey, targetPublicKey) {
    const provider = await this.getProvider();
    return provider.sign(deploy, signingPublicKey, targetPublicKey);
  }
  onDisconnected() {
    const customEvent = new CustomEvent("casper:disconnect");
    window.dispatchEvent(customEvent);
  }
  onActiveKeyChanged(event) {
    const customEvent = new CustomEvent("casper:change", event);
    window.dispatchEvent(customEvent);
  }
  onConnected(event) {
    const customEvent = new CustomEvent("casper:connect", event);
    window.dispatchEvent(customEvent);
  }
};

// src/connectors/casperSigner.ts
var CasperSignerConnector = class extends Connector2 {
  constructor({
    options: defaultOptions
  } = {}) {
    const options = {
      name: "CasperSigner",
      getProvider: () => {
        return typeof window !== "undefined" ? window.casperlabsHelper : void 0;
      },
      getEventProvider: () => {
        return window;
      },
      ...defaultOptions
    };
    super({ options });
    this.id = "casperSigner";
  }
  async getProvider() {
    const provider = this.options.getProvider?.();
    if (!provider) {
      throw new ConnectorNotFoundError();
    }
    this.provider = provider;
    return this.provider;
  }
  async getEventProvider() {
    const eventProvider = this.options.getEventProvider?.();
    if (!eventProvider) {
      throw new ConnectorNotFoundError();
    }
    this.eventProvider = eventProvider;
    return this.eventProvider;
  }
  async isConnected() {
    try {
      const provider = await this.getProvider();
      return await provider.isConnected();
    } catch (err) {
      return false;
    }
  }
  async disconnect() {
    const provider = await this.getProvider();
    const eventProvider = await this.getEventProvider();
    eventProvider?.removeEventListener("signer:activeKeyChanged", this.onActiveKeyChanged);
    eventProvider?.removeEventListener("signer:disconnected", this.onDisconnected);
    eventProvider?.removeEventListener("signer:connected", this.onConnected);
    provider.disconnectFromSite();
  }
  async connect() {
    const provider = await this.getProvider();
    const eventProvider = await this.getEventProvider();
    eventProvider?.addEventListener("signer:activeKeyChanged", this.onActiveKeyChanged);
    eventProvider?.addEventListener("signer:disconnected", this.onDisconnected);
    eventProvider?.addEventListener("signer:connected", this.onConnected);
    provider.requestConnection();
  }
  async getActivePublicKey() {
    const provider = await this.getProvider();
    return provider.getActivePublicKey();
  }
  async signMessage(message, signingPublicKey) {
    const provider = await this.getProvider();
    return provider.signMessage(message, signingPublicKey);
  }
  async sign(deploy, signingPublicKeyHex, targetPublicKeyHex) {
    const provider = await this.getProvider();
    return provider.sign(deploy, signingPublicKeyHex, targetPublicKeyHex);
  }
  onDisconnected() {
    const customEvent = new CustomEvent("casper:disconnect");
    window.dispatchEvent(customEvent);
  }
  onActiveKeyChanged(event) {
    const customEvent = new CustomEvent("casper:change", event);
    window.dispatchEvent(customEvent);
  }
  onConnected(event) {
    const customEvent = new CustomEvent("casper:connect", event);
    window.dispatchEvent(customEvent);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CasperDashConnector,
  CasperSignerConnector,
  Client,
  ClientNotFoundError,
  Connector,
  ConnectorAlreadyConnectedError,
  ConnectorNotFoundError,
  StatusEnum,
  client,
  connect,
  createClient,
  deepEqual,
  disconnect,
  getAccount,
  getActivePublicKey,
  getClient,
  isConnected,
  sign,
  signMessage,
  watchAccount
});
//# sourceMappingURL=index.cjs.map
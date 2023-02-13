"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

  // ../../node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "../../node_modules/.pnpm/eventemitter3@4.0.7/node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__)
          prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt])
          emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn)
          emitter._events[evt].push(listener);
        else
          emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0)
          emitter._events = new Events();
        else
          delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0)
          return names;
        for (name in events = this._events) {
          if (has.call(events, name))
            names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers)
          return [];
        if (handlers.fn)
          return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners)
          return 0;
        if (listeners.fn)
          return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once)
            this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once)
              this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args)
                  for (j = 1, args = new Array(len - 1); j < len; j++) {
                    args[j - 1] = arguments[j];
                  }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt])
          return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length)
            this._events[evt] = events.length === 1 ? events[0] : events;
          else
            clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt])
            clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // ../../node_modules/.pnpm/zustand@4.3.2/node_modules/zustand/esm/vanilla.mjs
  var import_meta = {};
  var createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace != null ? replace : typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);
        listeners.forEach((listener) => listener(state, previousState));
      }
    };
    const getState = () => state;
    const subscribe = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const destroy = () => {
      if ((import_meta.env && import_meta.env.MODE) !== "production") {
        console.warn(
          "[DEPRECATED] The destroy method will be unsupported in the future version. You should use unsubscribe function returned by subscribe. Everything will be garbage collected if store is garbage collected."
        );
      }
      listeners.clear();
    };
    const api = { setState, getState, subscribe, destroy };
    state = createState(setState, getState, api);
    return api;
  };
  var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

  // ../../node_modules/.pnpm/zustand@4.3.2/node_modules/zustand/esm/middleware.mjs
  var subscribeWithSelectorImpl = (fn) => (set, get, api) => {
    const origSubscribe = api.subscribe;
    api.subscribe = (selector, optListener, options) => {
      let listener = selector;
      if (optListener) {
        const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
        let currentSlice = selector(api.getState());
        listener = (state) => {
          const nextSlice = selector(state);
          if (!equalityFn(currentSlice, nextSlice)) {
            const previousSlice = currentSlice;
            optListener(currentSlice = nextSlice, previousSlice);
          }
        };
        if (options == null ? void 0 : options.fireImmediately) {
          optListener(currentSlice, currentSlice);
        }
      }
      return origSubscribe(listener);
    };
    const initialState = fn(set, get, api);
    return initialState;
  };
  var subscribeWithSelector = subscribeWithSelectorImpl;

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
      this.store = createStore(subscribeWithSelector(() => ({
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

  // ../../node_modules/.pnpm/zustand@4.3.2/node_modules/zustand/esm/shallow.mjs
  function shallow(objA, objB) {
    if (Object.is(objA, objB)) {
      return true;
    }
    if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
      return false;
    }
    if (objA instanceof Map && objB instanceof Map) {
      if (objA.size !== objB.size)
        return false;
      for (const [key, value] of objA) {
        if (!Object.is(value, objB.get(key))) {
          return false;
        }
      }
      return true;
    }
    if (objA instanceof Set && objB instanceof Set) {
      if (objA.size !== objB.size)
        return false;
      for (const value of objA) {
        if (!objB.has(value)) {
          return false;
        }
      }
      return true;
    }
    const keysA = Object.keys(objA);
    if (keysA.length !== Object.keys(objB).length) {
      return false;
    }
    for (let i = 0; i < keysA.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }
    return true;
  }

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
        equalityFn: shallow
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
  var import_eventemitter3 = __toESM(require_eventemitter3(), 1);
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
})();
//# sourceMappingURL=index.global.js.map
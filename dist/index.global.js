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

  // ../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a)
          return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a)
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b)
          for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)
            J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g)
          c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++)
            f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps)
          for (d in g = a.defaultProps, g)
            void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k)
          a = null;
        var h = false;
        if (null === a)
          h = true;
        else
          switch (k) {
            case "string":
            case "number":
              h = true;
              break;
            case "object":
              switch (a.$$typeof) {
                case l:
                case n:
                  h = true;
              }
          }
        if (h)
          return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
            return a2;
          })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a))
          for (var g = 0; g < a.length; g++) {
            k = a[g];
            var f = d + Q(k, g);
            h += R(k, b, e, f, c);
          }
        else if (f = A(a), "function" === typeof f)
          for (a = f.call(a), g = 0; !(k = a.next()).done; )
            k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k)
          throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a)
          return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status)
              a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status)
              a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status)
          return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a))
          throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a)
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps)
            var g = a.type.defaultProps;
          for (f in b)
            J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f)
          d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++)
            g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = function() {
        throw Error("act(...) is not supported in production builds of React.");
      };
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.2.0";
    }
  });

  // ../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      if (process.env.NODE_ENV !== "production") {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var ReactVersion = "18.2.0";
          var REACT_ELEMENT_TYPE = Symbol.for("react.element");
          var REACT_PORTAL_TYPE = Symbol.for("react.portal");
          var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
          var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
          var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
          var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
          var REACT_CONTEXT_TYPE = Symbol.for("react.context");
          var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
          var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
          var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
          var REACT_MEMO_TYPE = Symbol.for("react.memo");
          var REACT_LAZY_TYPE = Symbol.for("react.lazy");
          var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
          var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
          var FAUX_ITERATOR_SYMBOL = "@@iterator";
          function getIteratorFn(maybeIterable) {
            if (maybeIterable === null || typeof maybeIterable !== "object") {
              return null;
            }
            var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
            if (typeof maybeIterator === "function") {
              return maybeIterator;
            }
            return null;
          }
          var ReactCurrentDispatcher = {
            current: null
          };
          var ReactCurrentBatchConfig = {
            transition: null
          };
          var ReactCurrentActQueue = {
            current: null,
            isBatchingLegacy: false,
            didScheduleLegacyUpdate: false
          };
          var ReactCurrentOwner = {
            current: null
          };
          var ReactDebugCurrentFrame = {};
          var currentExtraStackFrame = null;
          function setExtraStackFrame(stack) {
            {
              currentExtraStackFrame = stack;
            }
          }
          {
            ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
              {
                currentExtraStackFrame = stack;
              }
            };
            ReactDebugCurrentFrame.getCurrentStack = null;
            ReactDebugCurrentFrame.getStackAddendum = function() {
              var stack = "";
              if (currentExtraStackFrame) {
                stack += currentExtraStackFrame;
              }
              var impl = ReactDebugCurrentFrame.getCurrentStack;
              if (impl) {
                stack += impl() || "";
              }
              return stack;
            };
          }
          var enableScopeAPI = false;
          var enableCacheElement = false;
          var enableTransitionTracing = false;
          var enableLegacyHidden = false;
          var enableDebugTracing = false;
          var ReactSharedInternals = {
            ReactCurrentDispatcher,
            ReactCurrentBatchConfig,
            ReactCurrentOwner
          };
          {
            ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
            ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
          }
          function warn(format) {
            {
              {
                for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                  args[_key - 1] = arguments[_key];
                }
                printWarning("warn", format, args);
              }
            }
          }
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame2.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          var didWarnStateUpdateForUnmountedComponent = {};
          function warnNoop(publicInstance, callerName) {
            {
              var _constructor = publicInstance.constructor;
              var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
              var warningKey = componentName + "." + callerName;
              if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
                return;
              }
              error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
              didWarnStateUpdateForUnmountedComponent[warningKey] = true;
            }
          }
          var ReactNoopUpdateQueue = {
            isMounted: function(publicInstance) {
              return false;
            },
            enqueueForceUpdate: function(publicInstance, callback, callerName) {
              warnNoop(publicInstance, "forceUpdate");
            },
            enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
              warnNoop(publicInstance, "replaceState");
            },
            enqueueSetState: function(publicInstance, partialState, callback, callerName) {
              warnNoop(publicInstance, "setState");
            }
          };
          var assign = Object.assign;
          var emptyObject = {};
          {
            Object.freeze(emptyObject);
          }
          function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          Component.prototype.isReactComponent = {};
          Component.prototype.setState = function(partialState, callback) {
            if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
              throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
            }
            this.updater.enqueueSetState(this, partialState, callback, "setState");
          };
          Component.prototype.forceUpdate = function(callback) {
            this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
          };
          {
            var deprecatedAPIs = {
              isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
              replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
            };
            var defineDeprecationWarning = function(methodName, info) {
              Object.defineProperty(Component.prototype, methodName, {
                get: function() {
                  warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                  return void 0;
                }
              });
            };
            for (var fnName in deprecatedAPIs) {
              if (deprecatedAPIs.hasOwnProperty(fnName)) {
                defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
              }
            }
          }
          function ComponentDummy() {
          }
          ComponentDummy.prototype = Component.prototype;
          function PureComponent(props, context, updater) {
            this.props = props;
            this.context = context;
            this.refs = emptyObject;
            this.updater = updater || ReactNoopUpdateQueue;
          }
          var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
          pureComponentPrototype.constructor = PureComponent;
          assign(pureComponentPrototype, Component.prototype);
          pureComponentPrototype.isPureReactComponent = true;
          function createRef() {
            var refObject = {
              current: null
            };
            {
              Object.seal(refObject);
            }
            return refObject;
          }
          var isArrayImpl = Array.isArray;
          function isArray(a) {
            return isArrayImpl(a);
          }
          function typeName(value) {
            {
              var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
              var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
              return type;
            }
          }
          function willCoercionThrow(value) {
            {
              try {
                testStringCoercion(value);
                return false;
              } catch (e) {
                return true;
              }
            }
          }
          function testStringCoercion(value) {
            return "" + value;
          }
          function checkKeyStringCoercion(value) {
            {
              if (willCoercionThrow(value)) {
                error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
                return testStringCoercion(value);
              }
            }
          }
          function getWrappedName(outerType, innerType, wrapperName) {
            var displayName = outerType.displayName;
            if (displayName) {
              return displayName;
            }
            var functionName = innerType.displayName || innerType.name || "";
            return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
          }
          function getContextName(type) {
            return type.displayName || "Context";
          }
          function getComponentNameFromType(type) {
            if (type == null) {
              return null;
            }
            {
              if (typeof type.tag === "number") {
                error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
              }
            }
            if (typeof type === "function") {
              return type.displayName || type.name || null;
            }
            if (typeof type === "string") {
              return type;
            }
            switch (type) {
              case REACT_FRAGMENT_TYPE:
                return "Fragment";
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_PROFILER_TYPE:
                return "Profiler";
              case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
              case REACT_SUSPENSE_TYPE:
                return "Suspense";
              case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_CONTEXT_TYPE:
                  var context = type;
                  return getContextName(context) + ".Consumer";
                case REACT_PROVIDER_TYPE:
                  var provider = type;
                  return getContextName(provider._context) + ".Provider";
                case REACT_FORWARD_REF_TYPE:
                  return getWrappedName(type, type.render, "ForwardRef");
                case REACT_MEMO_TYPE:
                  var outerName = type.displayName || null;
                  if (outerName !== null) {
                    return outerName;
                  }
                  return getComponentNameFromType(type.type) || "Memo";
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return getComponentNameFromType(init(payload));
                  } catch (x) {
                    return null;
                  }
                }
              }
            }
            return null;
          }
          var hasOwnProperty = Object.prototype.hasOwnProperty;
          var RESERVED_PROPS = {
            key: true,
            ref: true,
            __self: true,
            __source: true
          };
          var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
          {
            didWarnAboutStringRefs = {};
          }
          function hasValidRef(config) {
            {
              if (hasOwnProperty.call(config, "ref")) {
                var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.ref !== void 0;
          }
          function hasValidKey(config) {
            {
              if (hasOwnProperty.call(config, "key")) {
                var getter = Object.getOwnPropertyDescriptor(config, "key").get;
                if (getter && getter.isReactWarning) {
                  return false;
                }
              }
            }
            return config.key !== void 0;
          }
          function defineKeyPropWarningGetter(props, displayName) {
            var warnAboutAccessingKey = function() {
              {
                if (!specialPropKeyWarningShown) {
                  specialPropKeyWarningShown = true;
                  error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          function defineRefPropWarningGetter(props, displayName) {
            var warnAboutAccessingRef = function() {
              {
                if (!specialPropRefWarningShown) {
                  specialPropRefWarningShown = true;
                  error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
                }
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
          function warnIfStringRefCannotBeAutoConverted(config) {
            {
              if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
                var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
                if (!didWarnAboutStringRefs[componentName]) {
                  error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                  didWarnAboutStringRefs[componentName] = true;
                }
              }
            }
          }
          var ReactElement = function(type, key, ref, self, source, owner, props) {
            var element = {
              $$typeof: REACT_ELEMENT_TYPE,
              type,
              key,
              ref,
              props,
              _owner: owner
            };
            {
              element._store = {};
              Object.defineProperty(element._store, "validated", {
                configurable: false,
                enumerable: false,
                writable: true,
                value: false
              });
              Object.defineProperty(element, "_self", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: self
              });
              Object.defineProperty(element, "_source", {
                configurable: false,
                enumerable: false,
                writable: false,
                value: source
              });
              if (Object.freeze) {
                Object.freeze(element.props);
                Object.freeze(element);
              }
            }
            return element;
          };
          function createElement3(type, config, children) {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            var self = null;
            var source = null;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                {
                  warnIfStringRefCannotBeAutoConverted(config);
                }
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              self = config.__self === void 0 ? null : config.__self;
              source = config.__source === void 0 ? null : config.__source;
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  props[propName] = config[propName];
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              {
                if (Object.freeze) {
                  Object.freeze(childArray);
                }
              }
              props.children = childArray;
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            {
              if (key || ref) {
                var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
                if (key) {
                  defineKeyPropWarningGetter(props, displayName);
                }
                if (ref) {
                  defineRefPropWarningGetter(props, displayName);
                }
              }
            }
            return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
          }
          function cloneAndReplaceKey(oldElement, newKey) {
            var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
            return newElement;
          }
          function cloneElement(element, config, children) {
            if (element === null || element === void 0) {
              throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
            }
            var propName;
            var props = assign({}, element.props);
            var key = element.key;
            var ref = element.ref;
            var self = element._self;
            var source = element._source;
            var owner = element._owner;
            if (config != null) {
              if (hasValidRef(config)) {
                ref = config.ref;
                owner = ReactCurrentOwner.current;
              }
              if (hasValidKey(config)) {
                {
                  checkKeyStringCoercion(config.key);
                }
                key = "" + config.key;
              }
              var defaultProps;
              if (element.type && element.type.defaultProps) {
                defaultProps = element.type.defaultProps;
              }
              for (propName in config) {
                if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                  if (config[propName] === void 0 && defaultProps !== void 0) {
                    props[propName] = defaultProps[propName];
                  } else {
                    props[propName] = config[propName];
                  }
                }
              }
            }
            var childrenLength = arguments.length - 2;
            if (childrenLength === 1) {
              props.children = children;
            } else if (childrenLength > 1) {
              var childArray = Array(childrenLength);
              for (var i = 0; i < childrenLength; i++) {
                childArray[i] = arguments[i + 2];
              }
              props.children = childArray;
            }
            return ReactElement(element.type, key, ref, self, source, owner, props);
          }
          function isValidElement(object) {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
          var SEPARATOR = ".";
          var SUBSEPARATOR = ":";
          function escape(key) {
            var escapeRegex = /[=:]/g;
            var escaperLookup = {
              "=": "=0",
              ":": "=2"
            };
            var escapedString = key.replace(escapeRegex, function(match) {
              return escaperLookup[match];
            });
            return "$" + escapedString;
          }
          var didWarnAboutMaps = false;
          var userProvidedKeyEscapeRegex = /\/+/g;
          function escapeUserProvidedKey(text) {
            return text.replace(userProvidedKeyEscapeRegex, "$&/");
          }
          function getElementKey(element, index) {
            if (typeof element === "object" && element !== null && element.key != null) {
              {
                checkKeyStringCoercion(element.key);
              }
              return escape("" + element.key);
            }
            return index.toString(36);
          }
          function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
            var type = typeof children;
            if (type === "undefined" || type === "boolean") {
              children = null;
            }
            var invokeCallback = false;
            if (children === null) {
              invokeCallback = true;
            } else {
              switch (type) {
                case "string":
                case "number":
                  invokeCallback = true;
                  break;
                case "object":
                  switch (children.$$typeof) {
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                      invokeCallback = true;
                  }
              }
            }
            if (invokeCallback) {
              var _child = children;
              var mappedChild = callback(_child);
              var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
              if (isArray(mappedChild)) {
                var escapedChildKey = "";
                if (childKey != null) {
                  escapedChildKey = escapeUserProvidedKey(childKey) + "/";
                }
                mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                  return c;
                });
              } else if (mappedChild != null) {
                if (isValidElement(mappedChild)) {
                  {
                    if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                      checkKeyStringCoercion(mappedChild.key);
                    }
                  }
                  mappedChild = cloneAndReplaceKey(
                    mappedChild,
                    escapedPrefix + (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? escapeUserProvidedKey("" + mappedChild.key) + "/" : "") + childKey
                  );
                }
                array.push(mappedChild);
              }
              return 1;
            }
            var child;
            var nextName;
            var subtreeCount = 0;
            var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
            if (isArray(children)) {
              for (var i = 0; i < children.length; i++) {
                child = children[i];
                nextName = nextNamePrefix + getElementKey(child, i);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else {
              var iteratorFn = getIteratorFn(children);
              if (typeof iteratorFn === "function") {
                var iterableChildren = children;
                {
                  if (iteratorFn === iterableChildren.entries) {
                    if (!didWarnAboutMaps) {
                      warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                    }
                    didWarnAboutMaps = true;
                  }
                }
                var iterator = iteratorFn.call(iterableChildren);
                var step;
                var ii = 0;
                while (!(step = iterator.next()).done) {
                  child = step.value;
                  nextName = nextNamePrefix + getElementKey(child, ii++);
                  subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
                }
              } else if (type === "object") {
                var childrenString = String(children);
                throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
              }
            }
            return subtreeCount;
          }
          function mapChildren(children, func, context) {
            if (children == null) {
              return children;
            }
            var result = [];
            var count = 0;
            mapIntoArray(children, result, "", "", function(child) {
              return func.call(context, child, count++);
            });
            return result;
          }
          function countChildren(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          }
          function forEachChildren(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
              forEachFunc.apply(this, arguments);
            }, forEachContext);
          }
          function toArray(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          }
          function onlyChild(children) {
            if (!isValidElement(children)) {
              throw new Error("React.Children.only expected to receive a single React element child.");
            }
            return children;
          }
          function createContext3(defaultValue) {
            var context = {
              $$typeof: REACT_CONTEXT_TYPE,
              _currentValue: defaultValue,
              _currentValue2: defaultValue,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
              _defaultValue: null,
              _globalName: null
            };
            context.Provider = {
              $$typeof: REACT_PROVIDER_TYPE,
              _context: context
            };
            var hasWarnedAboutUsingNestedContextConsumers = false;
            var hasWarnedAboutUsingConsumerProvider = false;
            var hasWarnedAboutDisplayNameOnConsumer = false;
            {
              var Consumer = {
                $$typeof: REACT_CONTEXT_TYPE,
                _context: context
              };
              Object.defineProperties(Consumer, {
                Provider: {
                  get: function() {
                    if (!hasWarnedAboutUsingConsumerProvider) {
                      hasWarnedAboutUsingConsumerProvider = true;
                      error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                    }
                    return context.Provider;
                  },
                  set: function(_Provider) {
                    context.Provider = _Provider;
                  }
                },
                _currentValue: {
                  get: function() {
                    return context._currentValue;
                  },
                  set: function(_currentValue) {
                    context._currentValue = _currentValue;
                  }
                },
                _currentValue2: {
                  get: function() {
                    return context._currentValue2;
                  },
                  set: function(_currentValue2) {
                    context._currentValue2 = _currentValue2;
                  }
                },
                _threadCount: {
                  get: function() {
                    return context._threadCount;
                  },
                  set: function(_threadCount) {
                    context._threadCount = _threadCount;
                  }
                },
                Consumer: {
                  get: function() {
                    if (!hasWarnedAboutUsingNestedContextConsumers) {
                      hasWarnedAboutUsingNestedContextConsumers = true;
                      error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                    }
                    return context.Consumer;
                  }
                },
                displayName: {
                  get: function() {
                    return context.displayName;
                  },
                  set: function(displayName) {
                    if (!hasWarnedAboutDisplayNameOnConsumer) {
                      warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                      hasWarnedAboutDisplayNameOnConsumer = true;
                    }
                  }
                }
              });
              context.Consumer = Consumer;
            }
            {
              context._currentRenderer = null;
              context._currentRenderer2 = null;
            }
            return context;
          }
          var Uninitialized = -1;
          var Pending = 0;
          var Resolved = 1;
          var Rejected = 2;
          function lazyInitializer(payload) {
            if (payload._status === Uninitialized) {
              var ctor = payload._result;
              var thenable = ctor();
              thenable.then(function(moduleObject2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var resolved = payload;
                  resolved._status = Resolved;
                  resolved._result = moduleObject2;
                }
              }, function(error2) {
                if (payload._status === Pending || payload._status === Uninitialized) {
                  var rejected = payload;
                  rejected._status = Rejected;
                  rejected._result = error2;
                }
              });
              if (payload._status === Uninitialized) {
                var pending = payload;
                pending._status = Pending;
                pending._result = thenable;
              }
            }
            if (payload._status === Resolved) {
              var moduleObject = payload._result;
              {
                if (moduleObject === void 0) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
                }
              }
              {
                if (!("default" in moduleObject)) {
                  error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
                }
              }
              return moduleObject.default;
            } else {
              throw payload._result;
            }
          }
          function lazy(ctor) {
            var payload = {
              _status: Uninitialized,
              _result: ctor
            };
            var lazyType = {
              $$typeof: REACT_LAZY_TYPE,
              _payload: payload,
              _init: lazyInitializer
            };
            {
              var defaultProps;
              var propTypes;
              Object.defineProperties(lazyType, {
                defaultProps: {
                  configurable: true,
                  get: function() {
                    return defaultProps;
                  },
                  set: function(newDefaultProps) {
                    error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    defaultProps = newDefaultProps;
                    Object.defineProperty(lazyType, "defaultProps", {
                      enumerable: true
                    });
                  }
                },
                propTypes: {
                  configurable: true,
                  get: function() {
                    return propTypes;
                  },
                  set: function(newPropTypes) {
                    error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                    propTypes = newPropTypes;
                    Object.defineProperty(lazyType, "propTypes", {
                      enumerable: true
                    });
                  }
                }
              });
            }
            return lazyType;
          }
          function forwardRef(render) {
            {
              if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
                error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
              } else if (typeof render !== "function") {
                error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
              } else {
                if (render.length !== 0 && render.length !== 2) {
                  error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
                }
              }
              if (render != null) {
                if (render.defaultProps != null || render.propTypes != null) {
                  error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
                }
              }
            }
            var elementType = {
              $$typeof: REACT_FORWARD_REF_TYPE,
              render
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!render.name && !render.displayName) {
                    render.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          var REACT_MODULE_REFERENCE;
          {
            REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
          }
          function isValidElementType(type) {
            if (typeof type === "string" || typeof type === "function") {
              return true;
            }
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
              return true;
            }
            if (typeof type === "object" && type !== null) {
              if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
                return true;
              }
            }
            return false;
          }
          function memo(type, compare) {
            {
              if (!isValidElementType(type)) {
                error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
              }
            }
            var elementType = {
              $$typeof: REACT_MEMO_TYPE,
              type,
              compare: compare === void 0 ? null : compare
            };
            {
              var ownName;
              Object.defineProperty(elementType, "displayName", {
                enumerable: false,
                configurable: true,
                get: function() {
                  return ownName;
                },
                set: function(name) {
                  ownName = name;
                  if (!type.name && !type.displayName) {
                    type.displayName = name;
                  }
                }
              });
            }
            return elementType;
          }
          function resolveDispatcher() {
            var dispatcher = ReactCurrentDispatcher.current;
            {
              if (dispatcher === null) {
                error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
              }
            }
            return dispatcher;
          }
          function useContext3(Context2) {
            var dispatcher = resolveDispatcher();
            {
              if (Context2._context !== void 0) {
                var realContext = Context2._context;
                if (realContext.Consumer === Context2) {
                  error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
                } else if (realContext.Provider === Context2) {
                  error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
                }
              }
            }
            return dispatcher.useContext(Context2);
          }
          function useState3(initialState) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useState(initialState);
          }
          function useReducer(reducer, initialArg, init) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useReducer(reducer, initialArg, init);
          }
          function useRef(initialValue) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useRef(initialValue);
          }
          function useEffect4(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useEffect(create, deps);
          }
          function useInsertionEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useInsertionEffect(create, deps);
          }
          function useLayoutEffect(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useLayoutEffect(create, deps);
          }
          function useCallback6(callback, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useCallback(callback, deps);
          }
          function useMemo(create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useMemo(create, deps);
          }
          function useImperativeHandle(ref, create, deps) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useImperativeHandle(ref, create, deps);
          }
          function useDebugValue(value, formatterFn) {
            {
              var dispatcher = resolveDispatcher();
              return dispatcher.useDebugValue(value, formatterFn);
            }
          }
          function useTransition() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useTransition();
          }
          function useDeferredValue(value) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDeferredValue(value);
          }
          function useId() {
            var dispatcher = resolveDispatcher();
            return dispatcher.useId();
          }
          function useSyncExternalStore2(subscribe, getSnapshot, getServerSnapshot) {
            var dispatcher = resolveDispatcher();
            return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
          }
          var disabledDepth = 0;
          var prevLog;
          var prevInfo;
          var prevWarn;
          var prevError;
          var prevGroup;
          var prevGroupCollapsed;
          var prevGroupEnd;
          function disabledLog() {
          }
          disabledLog.__reactDisabledLog = true;
          function disableLogs() {
            {
              if (disabledDepth === 0) {
                prevLog = console.log;
                prevInfo = console.info;
                prevWarn = console.warn;
                prevError = console.error;
                prevGroup = console.group;
                prevGroupCollapsed = console.groupCollapsed;
                prevGroupEnd = console.groupEnd;
                var props = {
                  configurable: true,
                  enumerable: true,
                  value: disabledLog,
                  writable: true
                };
                Object.defineProperties(console, {
                  info: props,
                  log: props,
                  warn: props,
                  error: props,
                  group: props,
                  groupCollapsed: props,
                  groupEnd: props
                });
              }
              disabledDepth++;
            }
          }
          function reenableLogs() {
            {
              disabledDepth--;
              if (disabledDepth === 0) {
                var props = {
                  configurable: true,
                  enumerable: true,
                  writable: true
                };
                Object.defineProperties(console, {
                  log: assign({}, props, {
                    value: prevLog
                  }),
                  info: assign({}, props, {
                    value: prevInfo
                  }),
                  warn: assign({}, props, {
                    value: prevWarn
                  }),
                  error: assign({}, props, {
                    value: prevError
                  }),
                  group: assign({}, props, {
                    value: prevGroup
                  }),
                  groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                  }),
                  groupEnd: assign({}, props, {
                    value: prevGroupEnd
                  })
                });
              }
              if (disabledDepth < 0) {
                error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
              }
            }
          }
          var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
          var prefix;
          function describeBuiltInComponentFrame(name, source, ownerFn) {
            {
              if (prefix === void 0) {
                try {
                  throw Error();
                } catch (x) {
                  var match = x.stack.trim().match(/\n( *(at )?)/);
                  prefix = match && match[1] || "";
                }
              }
              return "\n" + prefix + name;
            }
          }
          var reentry = false;
          var componentFrameCache;
          {
            var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
            componentFrameCache = new PossiblyWeakMap();
          }
          function describeNativeComponentFrame(fn, construct) {
            if (!fn || reentry) {
              return "";
            }
            {
              var frame = componentFrameCache.get(fn);
              if (frame !== void 0) {
                return frame;
              }
            }
            var control;
            reentry = true;
            var previousPrepareStackTrace = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            var previousDispatcher;
            {
              previousDispatcher = ReactCurrentDispatcher$1.current;
              ReactCurrentDispatcher$1.current = null;
              disableLogs();
            }
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if (typeof Reflect === "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x) {
                    control = x;
                  }
                  fn.call(Fake.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (x) {
                  control = x;
                }
                fn();
              }
            } catch (sample) {
              if (sample && control && typeof sample.stack === "string") {
                var sampleLines = sample.stack.split("\n");
                var controlLines = control.stack.split("\n");
                var s = sampleLines.length - 1;
                var c = controlLines.length - 1;
                while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                  c--;
                }
                for (; s >= 1 && c >= 0; s--, c--) {
                  if (sampleLines[s] !== controlLines[c]) {
                    if (s !== 1 || c !== 1) {
                      do {
                        s--;
                        c--;
                        if (c < 0 || sampleLines[s] !== controlLines[c]) {
                          var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                          if (fn.displayName && _frame.includes("<anonymous>")) {
                            _frame = _frame.replace("<anonymous>", fn.displayName);
                          }
                          {
                            if (typeof fn === "function") {
                              componentFrameCache.set(fn, _frame);
                            }
                          }
                          return _frame;
                        }
                      } while (s >= 1 && c >= 0);
                    }
                    break;
                  }
                }
              }
            } finally {
              reentry = false;
              {
                ReactCurrentDispatcher$1.current = previousDispatcher;
                reenableLogs();
              }
              Error.prepareStackTrace = previousPrepareStackTrace;
            }
            var name = fn ? fn.displayName || fn.name : "";
            var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
            {
              if (typeof fn === "function") {
                componentFrameCache.set(fn, syntheticFrame);
              }
            }
            return syntheticFrame;
          }
          function describeFunctionComponentFrame(fn, source, ownerFn) {
            {
              return describeNativeComponentFrame(fn, false);
            }
          }
          function shouldConstruct(Component2) {
            var prototype = Component2.prototype;
            return !!(prototype && prototype.isReactComponent);
          }
          function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
            if (type == null) {
              return "";
            }
            if (typeof type === "function") {
              {
                return describeNativeComponentFrame(type, shouldConstruct(type));
              }
            }
            if (typeof type === "string") {
              return describeBuiltInComponentFrame(type);
            }
            switch (type) {
              case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
              case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
            }
            if (typeof type === "object") {
              switch (type.$$typeof) {
                case REACT_FORWARD_REF_TYPE:
                  return describeFunctionComponentFrame(type.render);
                case REACT_MEMO_TYPE:
                  return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
                case REACT_LAZY_TYPE: {
                  var lazyComponent = type;
                  var payload = lazyComponent._payload;
                  var init = lazyComponent._init;
                  try {
                    return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                  } catch (x) {
                  }
                }
              }
            }
            return "";
          }
          var loggedTypeFailures = {};
          var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
          function setCurrentlyValidatingElement(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
              } else {
                ReactDebugCurrentFrame$1.setExtraStackFrame(null);
              }
            }
          }
          function checkPropTypes(typeSpecs, values, location, componentName, element) {
            {
              var has = Function.call.bind(hasOwnProperty);
              for (var typeSpecName in typeSpecs) {
                if (has(typeSpecs, typeSpecName)) {
                  var error$1 = void 0;
                  try {
                    if (typeof typeSpecs[typeSpecName] !== "function") {
                      var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                      err.name = "Invariant Violation";
                      throw err;
                    }
                    error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                  } catch (ex) {
                    error$1 = ex;
                  }
                  if (error$1 && !(error$1 instanceof Error)) {
                    setCurrentlyValidatingElement(element);
                    error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                    setCurrentlyValidatingElement(null);
                  }
                  if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                    loggedTypeFailures[error$1.message] = true;
                    setCurrentlyValidatingElement(element);
                    error("Failed %s type: %s", location, error$1.message);
                    setCurrentlyValidatingElement(null);
                  }
                }
              }
            }
          }
          function setCurrentlyValidatingElement$1(element) {
            {
              if (element) {
                var owner = element._owner;
                var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
                setExtraStackFrame(stack);
              } else {
                setExtraStackFrame(null);
              }
            }
          }
          var propTypesMisspellWarningShown;
          {
            propTypesMisspellWarningShown = false;
          }
          function getDeclarationErrorAddendum() {
            if (ReactCurrentOwner.current) {
              var name = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
          function getSourceInfoErrorAddendum(source) {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
          function getSourceInfoErrorAddendumForProps(elementProps) {
            if (elementProps !== null && elementProps !== void 0) {
              return getSourceInfoErrorAddendum(elementProps.__source);
            }
            return "";
          }
          var ownerHasKeyUseWarning = {};
          function getCurrentComponentErrorInfo(parentType) {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
          function validateExplicitKey(element, parentType) {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            {
              setCurrentlyValidatingElement$1(element);
              error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
              setCurrentlyValidatingElement$1(null);
            }
          }
          function validateChildKeys(node, parentType) {
            if (typeof node !== "object") {
              return;
            }
            if (isArray(node)) {
              for (var i = 0; i < node.length; i++) {
                var child = node[i];
                if (isValidElement(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement(node)) {
              if (node._store) {
                node._store.validated = true;
              }
            } else if (node) {
              var iteratorFn = getIteratorFn(node);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node.entries) {
                  var iterator = iteratorFn.call(node);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
          function validatePropTypes(element) {
            {
              var type = element.type;
              if (type === null || type === void 0 || typeof type === "string") {
                return;
              }
              var propTypes;
              if (typeof type === "function") {
                propTypes = type.propTypes;
              } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) {
                propTypes = type.propTypes;
              } else {
                return;
              }
              if (propTypes) {
                var name = getComponentNameFromType(type);
                checkPropTypes(propTypes, element.props, "prop", name, element);
              } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
                propTypesMisspellWarningShown = true;
                var _name = getComponentNameFromType(type);
                error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
              }
              if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
                error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
              }
            }
          }
          function validateFragmentProps(fragment) {
            {
              var keys = Object.keys(fragment.props);
              for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (key !== "children" && key !== "key") {
                  setCurrentlyValidatingElement$1(fragment);
                  error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                  setCurrentlyValidatingElement$1(null);
                  break;
                }
              }
              if (fragment.ref !== null) {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid attribute `ref` supplied to `React.Fragment`.");
                setCurrentlyValidatingElement$1(null);
              }
            }
          }
          function createElementWithValidation(type, props, children) {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendumForProps(props);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              {
                error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
              }
            }
            var element = createElement3.apply(this, arguments);
            if (element == null) {
              return element;
            }
            if (validType) {
              for (var i = 2; i < arguments.length; i++) {
                validateChildKeys(arguments[i], type);
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
          var didWarnAboutDeprecatedCreateFactory = false;
          function createFactoryWithValidation(type) {
            var validatedFactory = createElementWithValidation.bind(null, type);
            validatedFactory.type = type;
            {
              if (!didWarnAboutDeprecatedCreateFactory) {
                didWarnAboutDeprecatedCreateFactory = true;
                warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
              }
              Object.defineProperty(validatedFactory, "type", {
                enumerable: false,
                get: function() {
                  warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                  Object.defineProperty(this, "type", {
                    value: type
                  });
                  return type;
                }
              });
            }
            return validatedFactory;
          }
          function cloneElementWithValidation(element, props, children) {
            var newElement = cloneElement.apply(this, arguments);
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], newElement.type);
            }
            validatePropTypes(newElement);
            return newElement;
          }
          function startTransition(scope, options) {
            var prevTransition = ReactCurrentBatchConfig.transition;
            ReactCurrentBatchConfig.transition = {};
            var currentTransition = ReactCurrentBatchConfig.transition;
            {
              ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
            }
            try {
              scope();
            } finally {
              ReactCurrentBatchConfig.transition = prevTransition;
              {
                if (prevTransition === null && currentTransition._updatedFibers) {
                  var updatedFibersCount = currentTransition._updatedFibers.size;
                  if (updatedFibersCount > 10) {
                    warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                  }
                  currentTransition._updatedFibers.clear();
                }
              }
            }
          }
          var didWarnAboutMessageChannel = false;
          var enqueueTaskImpl = null;
          function enqueueTask(task) {
            if (enqueueTaskImpl === null) {
              try {
                var requireString = ("require" + Math.random()).slice(0, 7);
                var nodeRequire = module && module[requireString];
                enqueueTaskImpl = nodeRequire.call(module, "timers").setImmediate;
              } catch (_err) {
                enqueueTaskImpl = function(callback) {
                  {
                    if (didWarnAboutMessageChannel === false) {
                      didWarnAboutMessageChannel = true;
                      if (typeof MessageChannel === "undefined") {
                        error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                      }
                    }
                  }
                  var channel = new MessageChannel();
                  channel.port1.onmessage = callback;
                  channel.port2.postMessage(void 0);
                };
              }
            }
            return enqueueTaskImpl(task);
          }
          var actScopeDepth = 0;
          var didWarnNoAwaitAct = false;
          function act(callback) {
            {
              var prevActScopeDepth = actScopeDepth;
              actScopeDepth++;
              if (ReactCurrentActQueue.current === null) {
                ReactCurrentActQueue.current = [];
              }
              var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
              var result;
              try {
                ReactCurrentActQueue.isBatchingLegacy = true;
                result = callback();
                if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                  var queue = ReactCurrentActQueue.current;
                  if (queue !== null) {
                    ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                    flushActQueue(queue);
                  }
                }
              } catch (error2) {
                popActScope(prevActScopeDepth);
                throw error2;
              } finally {
                ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
              }
              if (result !== null && typeof result === "object" && typeof result.then === "function") {
                var thenableResult = result;
                var wasAwaited = false;
                var thenable = {
                  then: function(resolve, reject) {
                    wasAwaited = true;
                    thenableResult.then(function(returnValue2) {
                      popActScope(prevActScopeDepth);
                      if (actScopeDepth === 0) {
                        recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                      } else {
                        resolve(returnValue2);
                      }
                    }, function(error2) {
                      popActScope(prevActScopeDepth);
                      reject(error2);
                    });
                  }
                };
                {
                  if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                    Promise.resolve().then(function() {
                    }).then(function() {
                      if (!wasAwaited) {
                        didWarnNoAwaitAct = true;
                        error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                      }
                    });
                  }
                }
                return thenable;
              } else {
                var returnValue = result;
                popActScope(prevActScopeDepth);
                if (actScopeDepth === 0) {
                  var _queue = ReactCurrentActQueue.current;
                  if (_queue !== null) {
                    flushActQueue(_queue);
                    ReactCurrentActQueue.current = null;
                  }
                  var _thenable = {
                    then: function(resolve, reject) {
                      if (ReactCurrentActQueue.current === null) {
                        ReactCurrentActQueue.current = [];
                        recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                      } else {
                        resolve(returnValue);
                      }
                    }
                  };
                  return _thenable;
                } else {
                  var _thenable2 = {
                    then: function(resolve, reject) {
                      resolve(returnValue);
                    }
                  };
                  return _thenable2;
                }
              }
            }
          }
          function popActScope(prevActScopeDepth) {
            {
              if (prevActScopeDepth !== actScopeDepth - 1) {
                error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
              }
              actScopeDepth = prevActScopeDepth;
            }
          }
          function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
            {
              var queue = ReactCurrentActQueue.current;
              if (queue !== null) {
                try {
                  flushActQueue(queue);
                  enqueueTask(function() {
                    if (queue.length === 0) {
                      ReactCurrentActQueue.current = null;
                      resolve(returnValue);
                    } else {
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    }
                  });
                } catch (error2) {
                  reject(error2);
                }
              } else {
                resolve(returnValue);
              }
            }
          }
          var isFlushing = false;
          function flushActQueue(queue) {
            {
              if (!isFlushing) {
                isFlushing = true;
                var i = 0;
                try {
                  for (; i < queue.length; i++) {
                    var callback = queue[i];
                    do {
                      callback = callback(true);
                    } while (callback !== null);
                  }
                  queue.length = 0;
                } catch (error2) {
                  queue = queue.slice(i + 1);
                  throw error2;
                } finally {
                  isFlushing = false;
                }
              }
            }
          }
          var createElement$1 = createElementWithValidation;
          var cloneElement$1 = cloneElementWithValidation;
          var createFactory = createFactoryWithValidation;
          var Children = {
            map: mapChildren,
            forEach: forEachChildren,
            count: countChildren,
            toArray,
            only: onlyChild
          };
          exports.Children = Children;
          exports.Component = Component;
          exports.Fragment = REACT_FRAGMENT_TYPE;
          exports.Profiler = REACT_PROFILER_TYPE;
          exports.PureComponent = PureComponent;
          exports.StrictMode = REACT_STRICT_MODE_TYPE;
          exports.Suspense = REACT_SUSPENSE_TYPE;
          exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
          exports.cloneElement = cloneElement$1;
          exports.createContext = createContext3;
          exports.createElement = createElement$1;
          exports.createFactory = createFactory;
          exports.createRef = createRef;
          exports.forwardRef = forwardRef;
          exports.isValidElement = isValidElement;
          exports.lazy = lazy;
          exports.memo = memo;
          exports.startTransition = startTransition;
          exports.unstable_act = act;
          exports.useCallback = useCallback6;
          exports.useContext = useContext3;
          exports.useDebugValue = useDebugValue;
          exports.useDeferredValue = useDeferredValue;
          exports.useEffect = useEffect4;
          exports.useId = useId;
          exports.useImperativeHandle = useImperativeHandle;
          exports.useInsertionEffect = useInsertionEffect;
          exports.useLayoutEffect = useLayoutEffect;
          exports.useMemo = useMemo;
          exports.useReducer = useReducer;
          exports.useRef = useRef;
          exports.useState = useState3;
          exports.useSyncExternalStore = useSyncExternalStore2;
          exports.useTransition = useTransition;
          exports.version = ReactVersion;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
  var require_react = __commonJS({
    "../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"(exports, module) {
      "use strict";
      if (process.env.NODE_ENV === "production") {
        module.exports = require_react_production_min();
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // ../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js
  var require_use_sync_external_store_shim_production_min = __commonJS({
    "../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.min.js"(exports) {
      "use strict";
      var e = require_react();
      function h(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var k = "function" === typeof Object.is ? Object.is : h;
      var l = e.useState;
      var m = e.useEffect;
      var n = e.useLayoutEffect;
      var p = e.useDebugValue;
      function q(a, b) {
        var d = b(), f = l({ inst: { value: d, getSnapshot: b } }), c = f[0].inst, g = f[1];
        n(function() {
          c.value = d;
          c.getSnapshot = b;
          r(c) && g({ inst: c });
        }, [a, d, b]);
        m(function() {
          r(c) && g({ inst: c });
          return a(function() {
            r(c) && g({ inst: c });
          });
        }, [a]);
        p(d);
        return d;
      }
      function r(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var d = b();
          return !k(a, d);
        } catch (f) {
          return true;
        }
      }
      function t(a, b) {
        return b();
      }
      var u = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t : q;
      exports.useSyncExternalStore = void 0 !== e.useSyncExternalStore ? e.useSyncExternalStore : u;
    }
  });

  // ../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
  var require_use_sync_external_store_shim_development = __commonJS({
    "../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js"(exports) {
      "use strict";
      if (process.env.NODE_ENV !== "production") {
        (function() {
          "use strict";
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
          }
          var React4 = require_react();
          var ReactSharedInternals = React4.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
          function error(format) {
            {
              {
                for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                  args[_key2 - 1] = arguments[_key2];
                }
                printWarning("error", format, args);
              }
            }
          }
          function printWarning(level, format, args) {
            {
              var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
              var stack = ReactDebugCurrentFrame.getStackAddendum();
              if (stack !== "") {
                format += "%s";
                args = args.concat([stack]);
              }
              var argsWithFormat = args.map(function(item) {
                return String(item);
              });
              argsWithFormat.unshift("Warning: " + format);
              Function.prototype.apply.call(console[level], console, argsWithFormat);
            }
          }
          function is(x, y) {
            return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
          }
          var objectIs = typeof Object.is === "function" ? Object.is : is;
          var useState3 = React4.useState, useEffect4 = React4.useEffect, useLayoutEffect = React4.useLayoutEffect, useDebugValue = React4.useDebugValue;
          var didWarnOld18Alpha = false;
          var didWarnUncachedGetSnapshot = false;
          function useSyncExternalStore2(subscribe, getSnapshot, getServerSnapshot) {
            {
              if (!didWarnOld18Alpha) {
                if (React4.startTransition !== void 0) {
                  didWarnOld18Alpha = true;
                  error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.");
                }
              }
            }
            var value = getSnapshot();
            {
              if (!didWarnUncachedGetSnapshot) {
                var cachedValue = getSnapshot();
                if (!objectIs(value, cachedValue)) {
                  error("The result of getSnapshot should be cached to avoid an infinite loop");
                  didWarnUncachedGetSnapshot = true;
                }
              }
            }
            var _useState = useState3({
              inst: {
                value,
                getSnapshot
              }
            }), inst = _useState[0].inst, forceUpdate = _useState[1];
            useLayoutEffect(function() {
              inst.value = value;
              inst.getSnapshot = getSnapshot;
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
            }, [subscribe, value, getSnapshot]);
            useEffect4(function() {
              if (checkIfSnapshotChanged(inst)) {
                forceUpdate({
                  inst
                });
              }
              var handleStoreChange = function() {
                if (checkIfSnapshotChanged(inst)) {
                  forceUpdate({
                    inst
                  });
                }
              };
              return subscribe(handleStoreChange);
            }, [subscribe]);
            useDebugValue(value);
            return value;
          }
          function checkIfSnapshotChanged(inst) {
            var latestGetSnapshot = inst.getSnapshot;
            var prevValue = inst.value;
            try {
              var nextValue = latestGetSnapshot();
              return !objectIs(prevValue, nextValue);
            } catch (error2) {
              return true;
            }
          }
          function useSyncExternalStore$12(subscribe, getSnapshot, getServerSnapshot) {
            return getSnapshot();
          }
          var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
          var isServerEnvironment = !canUseDOM;
          var shim = isServerEnvironment ? useSyncExternalStore$12 : useSyncExternalStore2;
          var useSyncExternalStore$2 = React4.useSyncExternalStore !== void 0 ? React4.useSyncExternalStore : shim;
          exports.useSyncExternalStore = useSyncExternalStore$2;
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
          }
        })();
      }
    }
  });

  // ../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/shim/index.js
  var require_shim = __commonJS({
    "../../node_modules/.pnpm/use-sync-external-store@1.2.0_react@18.2.0/node_modules/use-sync-external-store/shim/index.js"(exports, module) {
      "use strict";
      if (process.env.NODE_ENV === "production") {
        module.exports = require_use_sync_external_store_shim_production_min();
      } else {
        module.exports = require_use_sync_external_store_shim_development();
      }
    }
  });

  // ../core/src/errors/ConnectorAlreadyConnectedError.ts
  var ConnectorAlreadyConnectedError = class extends Error {
    constructor() {
      super(...arguments);
      this.name = "ConnectorAlreadyConnectedError";
      this.message = "Connector already connected";
    }
  };

  // ../core/src/errors/ClientNotFoundError.ts
  var ClientNotFoundError = class extends Error {
    constructor() {
      super(...arguments);
      this.name = "ClientNotFoundError";
      this.message = "Client not found";
    }
  };

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

  // ../core/src/utils/client.ts
  var Client = class {
    constructor({
      connectors
    }) {
      this.store = createStore(subscribeWithSelector(() => ({
        connectors,
        status: "disconnected" /* DISCONNECTED */
      })));
      this.triggerEvent();
    }
    get connector() {
      return this.store.getState().connector;
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
    triggerEvent() {
      const onChange = (data) => {
        console.log("onChange", data);
        this.setState((x) => ({
          ...x,
          data: { ...x.data, ...data }
        }));
      };
      const onDisconnect = () => {
        console.log("onDisconnect");
        this.clearState();
      };
      const onConnect = (data) => {
        console.log("onConnect", data);
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

  // ../core/src/actions/account/connect.ts
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
      let isConnected = false;
      try {
        const activeKey = await connector.getActivePublicKey();
        customData = {
          activeKey
        };
        isConnected = !!activeKey;
      } catch (err) {
        console.error(err);
      }
      client2.setState((oldState) => ({
        ...oldState,
        connector,
        status: isConnected ? "connected" /* CONNECTED */ : "connecting" /* CONNECTING */,
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

  // ../core/src/actions/account/disconnect.ts
  var disconnect = async () => {
    const connector = getClient()?.connector;
    try {
      await connector?.disconnect();
    } catch (error) {
      console.error(error);
    }
  };

  // ../core/src/actions/account/getActivePublicKey.ts
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

  // ../core/src/actions/account/getAccount.ts
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

  // ../core/src/actions/account/watchAccount.ts
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

  // ../core/src/actions/signing/sign.ts
  var sign = async ({ deploy, signingPublicKey, targetPublicKeyHex }) => {
    const connector = getClient()?.connector;
    try {
      return await connector?.sign(deploy, signingPublicKey, targetPublicKeyHex);
    } catch (error) {
      console.log(error);
    }
  };

  // ../core/src/actions/signing/signMessage.ts
  var signMessage = async ({ message, signingPublicKey }) => {
    const connector = getClient()?.connector;
    try {
      return await connector?.signMessage(message, signingPublicKey);
    } catch (error) {
      console.log(error);
    }
  };

  // ../core/src/connectors/base.ts
  var import_eventemitter3 = __toESM(require_eventemitter3(), 1);

  // src/hooks/useAccount.ts
  var import_react = __toESM(require_react(), 1);
  var useAccount = () => {
    const [publicKey, setPublicKey] = (0, import_react.useState)(null);
    const [status, setStatus] = (0, import_react.useState)("disconnected" /* DISCONNECTED */);
    (0, import_react.useEffect)(() => {
      const initAccount = async () => {
        const fetchedPublicKey = await getActivePublicKey();
        if (fetchedPublicKey) {
          setPublicKey(fetchedPublicKey);
        }
      };
      void initAccount();
      watchAccount((account) => {
        if (!account) {
          return;
        }
        setPublicKey(account.publicKey ? account.publicKey : null);
        setStatus(account.status ? account.status : "disconnected" /* DISCONNECTED */);
      });
    }, []);
    return {
      status,
      publicKey
    };
  };

  // src/hooks/useConnect.ts
  var import_react2 = __toESM(require_react(), 1);

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/subscribable.mjs
  var Subscribable = class {
    constructor() {
      this.listeners = [];
      this.subscribe = this.subscribe.bind(this);
    }
    subscribe(listener) {
      this.listeners.push(listener);
      this.onSubscribe();
      return () => {
        this.listeners = this.listeners.filter((x) => x !== listener);
        this.onUnsubscribe();
      };
    }
    hasListeners() {
      return this.listeners.length > 0;
    }
    onSubscribe() {
    }
    onUnsubscribe() {
    }
  };

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/utils.mjs
  var isServer = typeof window === "undefined" || "Deno" in window;
  function noop() {
    return void 0;
  }
  function functionalUpdate(updater, input) {
    return typeof updater === "function" ? updater(input) : updater;
  }
  function isValidTimeout(value) {
    return typeof value === "number" && value >= 0 && value !== Infinity;
  }
  function timeUntilStale(updatedAt, staleTime) {
    return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
  }
  function parseQueryArgs(arg1, arg2, arg3) {
    if (!isQueryKey(arg1)) {
      return arg1;
    }
    if (typeof arg2 === "function") {
      return {
        ...arg3,
        queryKey: arg1,
        queryFn: arg2
      };
    }
    return {
      ...arg2,
      queryKey: arg1
    };
  }
  function parseMutationArgs(arg1, arg2, arg3) {
    if (isQueryKey(arg1)) {
      if (typeof arg2 === "function") {
        return {
          ...arg3,
          mutationKey: arg1,
          mutationFn: arg2
        };
      }
      return {
        ...arg2,
        mutationKey: arg1
      };
    }
    if (typeof arg1 === "function") {
      return {
        ...arg2,
        mutationFn: arg1
      };
    }
    return {
      ...arg1
    };
  }
  function parseFilterArgs(arg1, arg2, arg3) {
    return isQueryKey(arg1) ? [{
      ...arg2,
      queryKey: arg1
    }, arg3] : [arg1 || {}, arg2];
  }
  function matchQuery(filters, query) {
    const {
      type = "all",
      exact,
      fetchStatus,
      predicate,
      queryKey,
      stale
    } = filters;
    if (isQueryKey(queryKey)) {
      if (exact) {
        if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
          return false;
        }
      } else if (!partialMatchKey(query.queryKey, queryKey)) {
        return false;
      }
    }
    if (type !== "all") {
      const isActive = query.isActive();
      if (type === "active" && !isActive) {
        return false;
      }
      if (type === "inactive" && isActive) {
        return false;
      }
    }
    if (typeof stale === "boolean" && query.isStale() !== stale) {
      return false;
    }
    if (typeof fetchStatus !== "undefined" && fetchStatus !== query.state.fetchStatus) {
      return false;
    }
    if (predicate && !predicate(query)) {
      return false;
    }
    return true;
  }
  function matchMutation(filters, mutation) {
    const {
      exact,
      fetching,
      predicate,
      mutationKey
    } = filters;
    if (isQueryKey(mutationKey)) {
      if (!mutation.options.mutationKey) {
        return false;
      }
      if (exact) {
        if (hashQueryKey(mutation.options.mutationKey) !== hashQueryKey(mutationKey)) {
          return false;
        }
      } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
        return false;
      }
    }
    if (typeof fetching === "boolean" && mutation.state.status === "loading" !== fetching) {
      return false;
    }
    if (predicate && !predicate(mutation)) {
      return false;
    }
    return true;
  }
  function hashQueryKeyByOptions(queryKey, options) {
    const hashFn = (options == null ? void 0 : options.queryKeyHashFn) || hashQueryKey;
    return hashFn(queryKey);
  }
  function hashQueryKey(queryKey) {
    return JSON.stringify(queryKey, (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val);
  }
  function partialMatchKey(a, b) {
    return partialDeepEqual(a, b);
  }
  function partialDeepEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (a && b && typeof a === "object" && typeof b === "object") {
      return !Object.keys(b).some((key) => !partialDeepEqual(a[key], b[key]));
    }
    return false;
  }
  function replaceEqualDeep(a, b) {
    if (a === b) {
      return a;
    }
    const array = isPlainArray(a) && isPlainArray(b);
    if (array || isPlainObject(a) && isPlainObject(b)) {
      const aSize = array ? a.length : Object.keys(a).length;
      const bItems = array ? b : Object.keys(b);
      const bSize = bItems.length;
      const copy = array ? [] : {};
      let equalItems = 0;
      for (let i = 0; i < bSize; i++) {
        const key = array ? i : bItems[i];
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key]) {
          equalItems++;
        }
      }
      return aSize === bSize && equalItems === aSize ? a : copy;
    }
    return b;
  }
  function shallowEqualObjects(a, b) {
    if (a && !b || b && !a) {
      return false;
    }
    for (const key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }
  function isPlainArray(value) {
    return Array.isArray(value) && value.length === Object.keys(value).length;
  }
  function isPlainObject(o) {
    if (!hasObjectPrototype(o)) {
      return false;
    }
    const ctor = o.constructor;
    if (typeof ctor === "undefined") {
      return true;
    }
    const prot = ctor.prototype;
    if (!hasObjectPrototype(prot)) {
      return false;
    }
    if (!prot.hasOwnProperty("isPrototypeOf")) {
      return false;
    }
    return true;
  }
  function hasObjectPrototype(o) {
    return Object.prototype.toString.call(o) === "[object Object]";
  }
  function isQueryKey(value) {
    return Array.isArray(value);
  }
  function sleep(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  function scheduleMicrotask(callback) {
    sleep(0).then(callback);
  }
  function getAbortController() {
    if (typeof AbortController === "function") {
      return new AbortController();
    }
    return;
  }
  function replaceData(prevData, data, options) {
    if (options.isDataEqual != null && options.isDataEqual(prevData, data)) {
      return prevData;
    } else if (typeof options.structuralSharing === "function") {
      return options.structuralSharing(prevData, data);
    } else if (options.structuralSharing !== false) {
      return replaceEqualDeep(prevData, data);
    }
    return data;
  }

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/focusManager.mjs
  var FocusManager = class extends Subscribable {
    constructor() {
      super();
      this.setup = (onFocus) => {
        if (!isServer && window.addEventListener) {
          const listener = () => onFocus();
          window.addEventListener("visibilitychange", listener, false);
          window.addEventListener("focus", listener, false);
          return () => {
            window.removeEventListener("visibilitychange", listener);
            window.removeEventListener("focus", listener);
          };
        }
        return;
      };
    }
    onSubscribe() {
      if (!this.cleanup) {
        this.setEventListener(this.setup);
      }
    }
    onUnsubscribe() {
      if (!this.hasListeners()) {
        var _this$cleanup;
        (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
        this.cleanup = void 0;
      }
    }
    setEventListener(setup) {
      var _this$cleanup2;
      this.setup = setup;
      (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
      this.cleanup = setup((focused) => {
        if (typeof focused === "boolean") {
          this.setFocused(focused);
        } else {
          this.onFocus();
        }
      });
    }
    setFocused(focused) {
      this.focused = focused;
      if (focused) {
        this.onFocus();
      }
    }
    onFocus() {
      this.listeners.forEach((listener) => {
        listener();
      });
    }
    isFocused() {
      if (typeof this.focused === "boolean") {
        return this.focused;
      }
      if (typeof document === "undefined") {
        return true;
      }
      return [void 0, "visible", "prerender"].includes(document.visibilityState);
    }
  };
  var focusManager = new FocusManager();

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/onlineManager.mjs
  var OnlineManager = class extends Subscribable {
    constructor() {
      super();
      this.setup = (onOnline) => {
        if (!isServer && window.addEventListener) {
          const listener = () => onOnline();
          window.addEventListener("online", listener, false);
          window.addEventListener("offline", listener, false);
          return () => {
            window.removeEventListener("online", listener);
            window.removeEventListener("offline", listener);
          };
        }
        return;
      };
    }
    onSubscribe() {
      if (!this.cleanup) {
        this.setEventListener(this.setup);
      }
    }
    onUnsubscribe() {
      if (!this.hasListeners()) {
        var _this$cleanup;
        (_this$cleanup = this.cleanup) == null ? void 0 : _this$cleanup.call(this);
        this.cleanup = void 0;
      }
    }
    setEventListener(setup) {
      var _this$cleanup2;
      this.setup = setup;
      (_this$cleanup2 = this.cleanup) == null ? void 0 : _this$cleanup2.call(this);
      this.cleanup = setup((online) => {
        if (typeof online === "boolean") {
          this.setOnline(online);
        } else {
          this.onOnline();
        }
      });
    }
    setOnline(online) {
      this.online = online;
      if (online) {
        this.onOnline();
      }
    }
    onOnline() {
      this.listeners.forEach((listener) => {
        listener();
      });
    }
    isOnline() {
      if (typeof this.online === "boolean") {
        return this.online;
      }
      if (typeof navigator === "undefined" || typeof navigator.onLine === "undefined") {
        return true;
      }
      return navigator.onLine;
    }
  };
  var onlineManager = new OnlineManager();

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/retryer.mjs
  function defaultRetryDelay(failureCount) {
    return Math.min(1e3 * 2 ** failureCount, 3e4);
  }
  function canFetch(networkMode) {
    return (networkMode != null ? networkMode : "online") === "online" ? onlineManager.isOnline() : true;
  }
  var CancelledError = class {
    constructor(options) {
      this.revert = options == null ? void 0 : options.revert;
      this.silent = options == null ? void 0 : options.silent;
    }
  };
  function isCancelledError(value) {
    return value instanceof CancelledError;
  }
  function createRetryer(config) {
    let isRetryCancelled = false;
    let failureCount = 0;
    let isResolved = false;
    let continueFn;
    let promiseResolve;
    let promiseReject;
    const promise = new Promise((outerResolve, outerReject) => {
      promiseResolve = outerResolve;
      promiseReject = outerReject;
    });
    const cancel = (cancelOptions) => {
      if (!isResolved) {
        reject(new CancelledError(cancelOptions));
        config.abort == null ? void 0 : config.abort();
      }
    };
    const cancelRetry = () => {
      isRetryCancelled = true;
    };
    const continueRetry = () => {
      isRetryCancelled = false;
    };
    const shouldPause = () => !focusManager.isFocused() || config.networkMode !== "always" && !onlineManager.isOnline();
    const resolve = (value) => {
      if (!isResolved) {
        isResolved = true;
        config.onSuccess == null ? void 0 : config.onSuccess(value);
        continueFn == null ? void 0 : continueFn();
        promiseResolve(value);
      }
    };
    const reject = (value) => {
      if (!isResolved) {
        isResolved = true;
        config.onError == null ? void 0 : config.onError(value);
        continueFn == null ? void 0 : continueFn();
        promiseReject(value);
      }
    };
    const pause = () => {
      return new Promise((continueResolve) => {
        continueFn = (value) => {
          if (isResolved || !shouldPause()) {
            return continueResolve(value);
          }
        };
        config.onPause == null ? void 0 : config.onPause();
      }).then(() => {
        continueFn = void 0;
        if (!isResolved) {
          config.onContinue == null ? void 0 : config.onContinue();
        }
      });
    };
    const run = () => {
      if (isResolved) {
        return;
      }
      let promiseOrValue;
      try {
        promiseOrValue = config.fn();
      } catch (error) {
        promiseOrValue = Promise.reject(error);
      }
      Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
        var _config$retry, _config$retryDelay;
        if (isResolved) {
          return;
        }
        const retry = (_config$retry = config.retry) != null ? _config$retry : 3;
        const retryDelay = (_config$retryDelay = config.retryDelay) != null ? _config$retryDelay : defaultRetryDelay;
        const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
        const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
        if (isRetryCancelled || !shouldRetry) {
          reject(error);
          return;
        }
        failureCount++;
        config.onFail == null ? void 0 : config.onFail(failureCount, error);
        sleep(delay).then(() => {
          if (shouldPause()) {
            return pause();
          }
          return;
        }).then(() => {
          if (isRetryCancelled) {
            reject(error);
          } else {
            run();
          }
        });
      });
    };
    if (canFetch(config.networkMode)) {
      run();
    } else {
      pause().then(run);
    }
    return {
      promise,
      cancel,
      continue: () => {
        continueFn == null ? void 0 : continueFn();
      },
      cancelRetry,
      continueRetry
    };
  }

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/logger.mjs
  var defaultLogger = console;

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/notifyManager.mjs
  function createNotifyManager() {
    let queue = [];
    let transactions = 0;
    let notifyFn = (callback) => {
      callback();
    };
    let batchNotifyFn = (callback) => {
      callback();
    };
    const batch = (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    };
    const schedule = (callback) => {
      if (transactions) {
        queue.push(callback);
      } else {
        scheduleMicrotask(() => {
          notifyFn(callback);
        });
      }
    };
    const batchCalls = (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    };
    const flush = () => {
      const originalQueue = queue;
      queue = [];
      if (originalQueue.length) {
        scheduleMicrotask(() => {
          batchNotifyFn(() => {
            originalQueue.forEach((callback) => {
              notifyFn(callback);
            });
          });
        });
      }
    };
    const setNotifyFunction = (fn) => {
      notifyFn = fn;
    };
    const setBatchNotifyFunction = (fn) => {
      batchNotifyFn = fn;
    };
    return {
      batch,
      batchCalls,
      schedule,
      setNotifyFunction,
      setBatchNotifyFunction
    };
  }
  var notifyManager = createNotifyManager();

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/removable.mjs
  var Removable = class {
    destroy() {
      this.clearGcTimeout();
    }
    scheduleGc() {
      this.clearGcTimeout();
      if (isValidTimeout(this.cacheTime)) {
        this.gcTimeout = setTimeout(() => {
          this.optionalRemove();
        }, this.cacheTime);
      }
    }
    updateCacheTime(newCacheTime) {
      this.cacheTime = Math.max(this.cacheTime || 0, newCacheTime != null ? newCacheTime : isServer ? Infinity : 5 * 60 * 1e3);
    }
    clearGcTimeout() {
      if (this.gcTimeout) {
        clearTimeout(this.gcTimeout);
        this.gcTimeout = void 0;
      }
    }
  };

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/query.mjs
  var Query = class extends Removable {
    constructor(config) {
      super();
      this.abortSignalConsumed = false;
      this.defaultOptions = config.defaultOptions;
      this.setOptions(config.options);
      this.observers = [];
      this.cache = config.cache;
      this.logger = config.logger || defaultLogger;
      this.queryKey = config.queryKey;
      this.queryHash = config.queryHash;
      this.initialState = config.state || getDefaultState(this.options);
      this.state = this.initialState;
    }
    get meta() {
      return this.options.meta;
    }
    setOptions(options) {
      this.options = {
        ...this.defaultOptions,
        ...options
      };
      this.updateCacheTime(this.options.cacheTime);
    }
    optionalRemove() {
      if (!this.observers.length && this.state.fetchStatus === "idle") {
        this.cache.remove(this);
      }
    }
    setData(newData, options) {
      const data = replaceData(this.state.data, newData, this.options);
      this.dispatch({
        data,
        type: "success",
        dataUpdatedAt: options == null ? void 0 : options.updatedAt,
        manual: options == null ? void 0 : options.manual
      });
      return data;
    }
    setState(state, setStateOptions) {
      this.dispatch({
        type: "setState",
        state,
        setStateOptions
      });
    }
    cancel(options) {
      var _this$retryer;
      const promise = this.promise;
      (_this$retryer = this.retryer) == null ? void 0 : _this$retryer.cancel(options);
      return promise ? promise.then(noop).catch(noop) : Promise.resolve();
    }
    destroy() {
      super.destroy();
      this.cancel({
        silent: true
      });
    }
    reset() {
      this.destroy();
      this.setState(this.initialState);
    }
    isActive() {
      return this.observers.some((observer) => observer.options.enabled !== false);
    }
    isDisabled() {
      return this.getObserversCount() > 0 && !this.isActive();
    }
    isStale() {
      return this.state.isInvalidated || !this.state.dataUpdatedAt || this.observers.some((observer) => observer.getCurrentResult().isStale);
    }
    isStaleByTime(staleTime = 0) {
      return this.state.isInvalidated || !this.state.dataUpdatedAt || !timeUntilStale(this.state.dataUpdatedAt, staleTime);
    }
    onFocus() {
      var _this$retryer2;
      const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
      if (observer) {
        observer.refetch({
          cancelRefetch: false
        });
      }
      (_this$retryer2 = this.retryer) == null ? void 0 : _this$retryer2.continue();
    }
    onOnline() {
      var _this$retryer3;
      const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
      if (observer) {
        observer.refetch({
          cancelRefetch: false
        });
      }
      (_this$retryer3 = this.retryer) == null ? void 0 : _this$retryer3.continue();
    }
    addObserver(observer) {
      if (this.observers.indexOf(observer) === -1) {
        this.observers.push(observer);
        this.clearGcTimeout();
        this.cache.notify({
          type: "observerAdded",
          query: this,
          observer
        });
      }
    }
    removeObserver(observer) {
      if (this.observers.indexOf(observer) !== -1) {
        this.observers = this.observers.filter((x) => x !== observer);
        if (!this.observers.length) {
          if (this.retryer) {
            if (this.abortSignalConsumed) {
              this.retryer.cancel({
                revert: true
              });
            } else {
              this.retryer.cancelRetry();
            }
          }
          this.scheduleGc();
        }
        this.cache.notify({
          type: "observerRemoved",
          query: this,
          observer
        });
      }
    }
    getObserversCount() {
      return this.observers.length;
    }
    invalidate() {
      if (!this.state.isInvalidated) {
        this.dispatch({
          type: "invalidate"
        });
      }
    }
    fetch(options, fetchOptions) {
      var _this$options$behavio, _context$fetchOptions;
      if (this.state.fetchStatus !== "idle") {
        if (this.state.dataUpdatedAt && fetchOptions != null && fetchOptions.cancelRefetch) {
          this.cancel({
            silent: true
          });
        } else if (this.promise) {
          var _this$retryer4;
          (_this$retryer4 = this.retryer) == null ? void 0 : _this$retryer4.continueRetry();
          return this.promise;
        }
      }
      if (options) {
        this.setOptions(options);
      }
      if (!this.options.queryFn) {
        const observer = this.observers.find((x) => x.options.queryFn);
        if (observer) {
          this.setOptions(observer.options);
        }
      }
      if (!Array.isArray(this.options.queryKey)) {
        if (process.env.NODE_ENV !== "production") {
          this.logger.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']");
        }
      }
      const abortController = getAbortController();
      const queryFnContext = {
        queryKey: this.queryKey,
        pageParam: void 0,
        meta: this.meta
      };
      const addSignalProperty = (object) => {
        Object.defineProperty(object, "signal", {
          enumerable: true,
          get: () => {
            if (abortController) {
              this.abortSignalConsumed = true;
              return abortController.signal;
            }
            return void 0;
          }
        });
      };
      addSignalProperty(queryFnContext);
      const fetchFn = () => {
        if (!this.options.queryFn) {
          return Promise.reject("Missing queryFn");
        }
        this.abortSignalConsumed = false;
        return this.options.queryFn(queryFnContext);
      };
      const context = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        state: this.state,
        fetchFn
      };
      addSignalProperty(context);
      (_this$options$behavio = this.options.behavior) == null ? void 0 : _this$options$behavio.onFetch(context);
      this.revertState = this.state;
      if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((_context$fetchOptions = context.fetchOptions) == null ? void 0 : _context$fetchOptions.meta)) {
        var _context$fetchOptions2;
        this.dispatch({
          type: "fetch",
          meta: (_context$fetchOptions2 = context.fetchOptions) == null ? void 0 : _context$fetchOptions2.meta
        });
      }
      const onError = (error) => {
        if (!(isCancelledError(error) && error.silent)) {
          this.dispatch({
            type: "error",
            error
          });
        }
        if (!isCancelledError(error)) {
          var _this$cache$config$on, _this$cache$config;
          (_this$cache$config$on = (_this$cache$config = this.cache.config).onError) == null ? void 0 : _this$cache$config$on.call(_this$cache$config, error, this);
          if (process.env.NODE_ENV !== "production") {
            this.logger.error(error);
          }
        }
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      };
      this.retryer = createRetryer({
        fn: context.fetchFn,
        abort: abortController == null ? void 0 : abortController.abort.bind(abortController),
        onSuccess: (data) => {
          var _this$cache$config$on2, _this$cache$config2;
          if (typeof data === "undefined") {
            if (process.env.NODE_ENV !== "production") {
              this.logger.error("Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: " + this.queryHash);
            }
            onError(new Error("undefined"));
            return;
          }
          this.setData(data);
          (_this$cache$config$on2 = (_this$cache$config2 = this.cache.config).onSuccess) == null ? void 0 : _this$cache$config$on2.call(_this$cache$config2, data, this);
          if (!this.isFetchingOptimistic) {
            this.scheduleGc();
          }
          this.isFetchingOptimistic = false;
        },
        onError,
        onFail: (failureCount, error) => {
          this.dispatch({
            type: "failed",
            failureCount,
            error
          });
        },
        onPause: () => {
          this.dispatch({
            type: "pause"
          });
        },
        onContinue: () => {
          this.dispatch({
            type: "continue"
          });
        },
        retry: context.options.retry,
        retryDelay: context.options.retryDelay,
        networkMode: context.options.networkMode
      });
      this.promise = this.retryer.promise;
      return this.promise;
    }
    dispatch(action) {
      const reducer = (state) => {
        var _action$meta, _action$dataUpdatedAt;
        switch (action.type) {
          case "failed":
            return {
              ...state,
              fetchFailureCount: action.failureCount,
              fetchFailureReason: action.error
            };
          case "pause":
            return {
              ...state,
              fetchStatus: "paused"
            };
          case "continue":
            return {
              ...state,
              fetchStatus: "fetching"
            };
          case "fetch":
            return {
              ...state,
              fetchFailureCount: 0,
              fetchFailureReason: null,
              fetchMeta: (_action$meta = action.meta) != null ? _action$meta : null,
              fetchStatus: canFetch(this.options.networkMode) ? "fetching" : "paused",
              ...!state.dataUpdatedAt && {
                error: null,
                status: "loading"
              }
            };
          case "success":
            return {
              ...state,
              data: action.data,
              dataUpdateCount: state.dataUpdateCount + 1,
              dataUpdatedAt: (_action$dataUpdatedAt = action.dataUpdatedAt) != null ? _action$dataUpdatedAt : Date.now(),
              error: null,
              isInvalidated: false,
              status: "success",
              ...!action.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null
              }
            };
          case "error":
            const error = action.error;
            if (isCancelledError(error) && error.revert && this.revertState) {
              return {
                ...this.revertState
              };
            }
            return {
              ...state,
              error,
              errorUpdateCount: state.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: state.fetchFailureCount + 1,
              fetchFailureReason: error,
              fetchStatus: "idle",
              status: "error"
            };
          case "invalidate":
            return {
              ...state,
              isInvalidated: true
            };
          case "setState":
            return {
              ...state,
              ...action.state
            };
        }
      };
      this.state = reducer(this.state);
      notifyManager.batch(() => {
        this.observers.forEach((observer) => {
          observer.onQueryUpdate(action);
        });
        this.cache.notify({
          query: this,
          type: "updated",
          action
        });
      });
    }
  };
  function getDefaultState(options) {
    const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
    const hasData = typeof data !== "undefined";
    const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
    return {
      data,
      dataUpdateCount: 0,
      dataUpdatedAt: hasData ? initialDataUpdatedAt != null ? initialDataUpdatedAt : Date.now() : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchMeta: null,
      isInvalidated: false,
      status: hasData ? "success" : "loading",
      fetchStatus: "idle"
    };
  }

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/queryCache.mjs
  var QueryCache = class extends Subscribable {
    constructor(config) {
      super();
      this.config = config || {};
      this.queries = [];
      this.queriesMap = {};
    }
    build(client2, options, state) {
      var _options$queryHash;
      const queryKey = options.queryKey;
      const queryHash = (_options$queryHash = options.queryHash) != null ? _options$queryHash : hashQueryKeyByOptions(queryKey, options);
      let query = this.get(queryHash);
      if (!query) {
        query = new Query({
          cache: this,
          logger: client2.getLogger(),
          queryKey,
          queryHash,
          options: client2.defaultQueryOptions(options),
          state,
          defaultOptions: client2.getQueryDefaults(queryKey)
        });
        this.add(query);
      }
      return query;
    }
    add(query) {
      if (!this.queriesMap[query.queryHash]) {
        this.queriesMap[query.queryHash] = query;
        this.queries.push(query);
        this.notify({
          type: "added",
          query
        });
      }
    }
    remove(query) {
      const queryInMap = this.queriesMap[query.queryHash];
      if (queryInMap) {
        query.destroy();
        this.queries = this.queries.filter((x) => x !== query);
        if (queryInMap === query) {
          delete this.queriesMap[query.queryHash];
        }
        this.notify({
          type: "removed",
          query
        });
      }
    }
    clear() {
      notifyManager.batch(() => {
        this.queries.forEach((query) => {
          this.remove(query);
        });
      });
    }
    get(queryHash) {
      return this.queriesMap[queryHash];
    }
    getAll() {
      return this.queries;
    }
    find(arg1, arg2) {
      const [filters] = parseFilterArgs(arg1, arg2);
      if (typeof filters.exact === "undefined") {
        filters.exact = true;
      }
      return this.queries.find((query) => matchQuery(filters, query));
    }
    findAll(arg1, arg2) {
      const [filters] = parseFilterArgs(arg1, arg2);
      return Object.keys(filters).length > 0 ? this.queries.filter((query) => matchQuery(filters, query)) : this.queries;
    }
    notify(event) {
      notifyManager.batch(() => {
        this.listeners.forEach((listener) => {
          listener(event);
        });
      });
    }
    onFocus() {
      notifyManager.batch(() => {
        this.queries.forEach((query) => {
          query.onFocus();
        });
      });
    }
    onOnline() {
      notifyManager.batch(() => {
        this.queries.forEach((query) => {
          query.onOnline();
        });
      });
    }
  };

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/mutation.mjs
  var Mutation = class extends Removable {
    constructor(config) {
      super();
      this.options = {
        ...config.defaultOptions,
        ...config.options
      };
      this.mutationId = config.mutationId;
      this.mutationCache = config.mutationCache;
      this.logger = config.logger || defaultLogger;
      this.observers = [];
      this.state = config.state || getDefaultState2();
      this.updateCacheTime(this.options.cacheTime);
      this.scheduleGc();
    }
    get meta() {
      return this.options.meta;
    }
    setState(state) {
      this.dispatch({
        type: "setState",
        state
      });
    }
    addObserver(observer) {
      if (this.observers.indexOf(observer) === -1) {
        this.observers.push(observer);
        this.clearGcTimeout();
        this.mutationCache.notify({
          type: "observerAdded",
          mutation: this,
          observer
        });
      }
    }
    removeObserver(observer) {
      this.observers = this.observers.filter((x) => x !== observer);
      this.scheduleGc();
      this.mutationCache.notify({
        type: "observerRemoved",
        mutation: this,
        observer
      });
    }
    optionalRemove() {
      if (!this.observers.length) {
        if (this.state.status === "loading") {
          this.scheduleGc();
        } else {
          this.mutationCache.remove(this);
        }
      }
    }
    continue() {
      if (this.retryer) {
        this.retryer.continue();
        return this.retryer.promise;
      }
      return this.execute();
    }
    async execute() {
      const executeMutation = () => {
        var _this$options$retry;
        this.retryer = createRetryer({
          fn: () => {
            if (!this.options.mutationFn) {
              return Promise.reject("No mutationFn found");
            }
            return this.options.mutationFn(this.state.variables);
          },
          onFail: (failureCount, error) => {
            this.dispatch({
              type: "failed",
              failureCount,
              error
            });
          },
          onPause: () => {
            this.dispatch({
              type: "pause"
            });
          },
          onContinue: () => {
            this.dispatch({
              type: "continue"
            });
          },
          retry: (_this$options$retry = this.options.retry) != null ? _this$options$retry : 0,
          retryDelay: this.options.retryDelay,
          networkMode: this.options.networkMode
        });
        return this.retryer.promise;
      };
      const restored = this.state.status === "loading";
      try {
        var _this$mutationCache$c3, _this$mutationCache$c4, _this$options$onSucce, _this$options2, _this$options$onSettl, _this$options3;
        if (!restored) {
          var _this$mutationCache$c, _this$mutationCache$c2, _this$options$onMutat, _this$options;
          this.dispatch({
            type: "loading",
            variables: this.options.variables
          });
          await ((_this$mutationCache$c = (_this$mutationCache$c2 = this.mutationCache.config).onMutate) == null ? void 0 : _this$mutationCache$c.call(_this$mutationCache$c2, this.state.variables, this));
          const context = await ((_this$options$onMutat = (_this$options = this.options).onMutate) == null ? void 0 : _this$options$onMutat.call(_this$options, this.state.variables));
          if (context !== this.state.context) {
            this.dispatch({
              type: "loading",
              context,
              variables: this.state.variables
            });
          }
        }
        const data = await executeMutation();
        await ((_this$mutationCache$c3 = (_this$mutationCache$c4 = this.mutationCache.config).onSuccess) == null ? void 0 : _this$mutationCache$c3.call(_this$mutationCache$c4, data, this.state.variables, this.state.context, this));
        await ((_this$options$onSucce = (_this$options2 = this.options).onSuccess) == null ? void 0 : _this$options$onSucce.call(_this$options2, data, this.state.variables, this.state.context));
        await ((_this$options$onSettl = (_this$options3 = this.options).onSettled) == null ? void 0 : _this$options$onSettl.call(_this$options3, data, null, this.state.variables, this.state.context));
        this.dispatch({
          type: "success",
          data
        });
        return data;
      } catch (error) {
        try {
          var _this$mutationCache$c5, _this$mutationCache$c6, _this$options$onError, _this$options4, _this$options$onSettl2, _this$options5;
          await ((_this$mutationCache$c5 = (_this$mutationCache$c6 = this.mutationCache.config).onError) == null ? void 0 : _this$mutationCache$c5.call(_this$mutationCache$c6, error, this.state.variables, this.state.context, this));
          if (process.env.NODE_ENV !== "production") {
            this.logger.error(error);
          }
          await ((_this$options$onError = (_this$options4 = this.options).onError) == null ? void 0 : _this$options$onError.call(_this$options4, error, this.state.variables, this.state.context));
          await ((_this$options$onSettl2 = (_this$options5 = this.options).onSettled) == null ? void 0 : _this$options$onSettl2.call(_this$options5, void 0, error, this.state.variables, this.state.context));
          throw error;
        } finally {
          this.dispatch({
            type: "error",
            error
          });
        }
      }
    }
    dispatch(action) {
      const reducer = (state) => {
        switch (action.type) {
          case "failed":
            return {
              ...state,
              failureCount: action.failureCount,
              failureReason: action.error
            };
          case "pause":
            return {
              ...state,
              isPaused: true
            };
          case "continue":
            return {
              ...state,
              isPaused: false
            };
          case "loading":
            return {
              ...state,
              context: action.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: !canFetch(this.options.networkMode),
              status: "loading",
              variables: action.variables
            };
          case "success":
            return {
              ...state,
              data: action.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: false
            };
          case "error":
            return {
              ...state,
              data: void 0,
              error: action.error,
              failureCount: state.failureCount + 1,
              failureReason: action.error,
              isPaused: false,
              status: "error"
            };
          case "setState":
            return {
              ...state,
              ...action.state
            };
        }
      };
      this.state = reducer(this.state);
      notifyManager.batch(() => {
        this.observers.forEach((observer) => {
          observer.onMutationUpdate(action);
        });
        this.mutationCache.notify({
          mutation: this,
          type: "updated",
          action
        });
      });
    }
  };
  function getDefaultState2() {
    return {
      context: void 0,
      data: void 0,
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      status: "idle",
      variables: void 0
    };
  }

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/mutationCache.mjs
  var MutationCache = class extends Subscribable {
    constructor(config) {
      super();
      this.config = config || {};
      this.mutations = [];
      this.mutationId = 0;
    }
    build(client2, options, state) {
      const mutation = new Mutation({
        mutationCache: this,
        logger: client2.getLogger(),
        mutationId: ++this.mutationId,
        options: client2.defaultMutationOptions(options),
        state,
        defaultOptions: options.mutationKey ? client2.getMutationDefaults(options.mutationKey) : void 0
      });
      this.add(mutation);
      return mutation;
    }
    add(mutation) {
      this.mutations.push(mutation);
      this.notify({
        type: "added",
        mutation
      });
    }
    remove(mutation) {
      this.mutations = this.mutations.filter((x) => x !== mutation);
      this.notify({
        type: "removed",
        mutation
      });
    }
    clear() {
      notifyManager.batch(() => {
        this.mutations.forEach((mutation) => {
          this.remove(mutation);
        });
      });
    }
    getAll() {
      return this.mutations;
    }
    find(filters) {
      if (typeof filters.exact === "undefined") {
        filters.exact = true;
      }
      return this.mutations.find((mutation) => matchMutation(filters, mutation));
    }
    findAll(filters) {
      return this.mutations.filter((mutation) => matchMutation(filters, mutation));
    }
    notify(event) {
      notifyManager.batch(() => {
        this.listeners.forEach((listener) => {
          listener(event);
        });
      });
    }
    resumePausedMutations() {
      const pausedMutations = this.mutations.filter((x) => x.state.isPaused);
      return notifyManager.batch(() => pausedMutations.reduce((promise, mutation) => promise.then(() => mutation.continue().catch(noop)), Promise.resolve()));
    }
  };

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/infiniteQueryBehavior.mjs
  function infiniteQueryBehavior() {
    return {
      onFetch: (context) => {
        context.fetchFn = () => {
          var _context$fetchOptions, _context$fetchOptions2, _context$fetchOptions3, _context$fetchOptions4, _context$state$data, _context$state$data2;
          const refetchPage = (_context$fetchOptions = context.fetchOptions) == null ? void 0 : (_context$fetchOptions2 = _context$fetchOptions.meta) == null ? void 0 : _context$fetchOptions2.refetchPage;
          const fetchMore = (_context$fetchOptions3 = context.fetchOptions) == null ? void 0 : (_context$fetchOptions4 = _context$fetchOptions3.meta) == null ? void 0 : _context$fetchOptions4.fetchMore;
          const pageParam = fetchMore == null ? void 0 : fetchMore.pageParam;
          const isFetchingNextPage = (fetchMore == null ? void 0 : fetchMore.direction) === "forward";
          const isFetchingPreviousPage = (fetchMore == null ? void 0 : fetchMore.direction) === "backward";
          const oldPages = ((_context$state$data = context.state.data) == null ? void 0 : _context$state$data.pages) || [];
          const oldPageParams = ((_context$state$data2 = context.state.data) == null ? void 0 : _context$state$data2.pageParams) || [];
          let newPageParams = oldPageParams;
          let cancelled = false;
          const addSignalProperty = (object) => {
            Object.defineProperty(object, "signal", {
              enumerable: true,
              get: () => {
                var _context$signal;
                if ((_context$signal = context.signal) != null && _context$signal.aborted) {
                  cancelled = true;
                } else {
                  var _context$signal2;
                  (_context$signal2 = context.signal) == null ? void 0 : _context$signal2.addEventListener("abort", () => {
                    cancelled = true;
                  });
                }
                return context.signal;
              }
            });
          };
          const queryFn = context.options.queryFn || (() => Promise.reject("Missing queryFn"));
          const buildNewPages = (pages, param, page, previous) => {
            newPageParams = previous ? [param, ...newPageParams] : [...newPageParams, param];
            return previous ? [page, ...pages] : [...pages, page];
          };
          const fetchPage = (pages, manual, param, previous) => {
            if (cancelled) {
              return Promise.reject("Cancelled");
            }
            if (typeof param === "undefined" && !manual && pages.length) {
              return Promise.resolve(pages);
            }
            const queryFnContext = {
              queryKey: context.queryKey,
              pageParam: param,
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext);
            const queryFnResult = queryFn(queryFnContext);
            const promise2 = Promise.resolve(queryFnResult).then((page) => buildNewPages(pages, param, page, previous));
            return promise2;
          };
          let promise;
          if (!oldPages.length) {
            promise = fetchPage([]);
          } else if (isFetchingNextPage) {
            const manual = typeof pageParam !== "undefined";
            const param = manual ? pageParam : getNextPageParam(context.options, oldPages);
            promise = fetchPage(oldPages, manual, param);
          } else if (isFetchingPreviousPage) {
            const manual = typeof pageParam !== "undefined";
            const param = manual ? pageParam : getPreviousPageParam(context.options, oldPages);
            promise = fetchPage(oldPages, manual, param, true);
          } else {
            newPageParams = [];
            const manual = typeof context.options.getNextPageParam === "undefined";
            const shouldFetchFirstPage = refetchPage && oldPages[0] ? refetchPage(oldPages[0], 0, oldPages) : true;
            promise = shouldFetchFirstPage ? fetchPage([], manual, oldPageParams[0]) : Promise.resolve(buildNewPages([], oldPageParams[0], oldPages[0]));
            for (let i = 1; i < oldPages.length; i++) {
              promise = promise.then((pages) => {
                const shouldFetchNextPage = refetchPage && oldPages[i] ? refetchPage(oldPages[i], i, oldPages) : true;
                if (shouldFetchNextPage) {
                  const param = manual ? oldPageParams[i] : getNextPageParam(context.options, pages);
                  return fetchPage(pages, manual, param);
                }
                return Promise.resolve(buildNewPages(pages, oldPageParams[i], oldPages[i]));
              });
            }
          }
          const finalPromise = promise.then((pages) => ({
            pages,
            pageParams: newPageParams
          }));
          return finalPromise;
        };
      }
    };
  }
  function getNextPageParam(options, pages) {
    return options.getNextPageParam == null ? void 0 : options.getNextPageParam(pages[pages.length - 1], pages);
  }
  function getPreviousPageParam(options, pages) {
    return options.getPreviousPageParam == null ? void 0 : options.getPreviousPageParam(pages[0], pages);
  }

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/queryClient.mjs
  var QueryClient = class {
    constructor(config = {}) {
      this.queryCache = config.queryCache || new QueryCache();
      this.mutationCache = config.mutationCache || new MutationCache();
      this.logger = config.logger || defaultLogger;
      this.defaultOptions = config.defaultOptions || {};
      this.queryDefaults = [];
      this.mutationDefaults = [];
      this.mountCount = 0;
      if (process.env.NODE_ENV !== "production" && config.logger) {
        this.logger.error("Passing a custom logger has been deprecated and will be removed in the next major version.");
      }
    }
    mount() {
      this.mountCount++;
      if (this.mountCount !== 1)
        return;
      this.unsubscribeFocus = focusManager.subscribe(() => {
        if (focusManager.isFocused()) {
          this.resumePausedMutations();
          this.queryCache.onFocus();
        }
      });
      this.unsubscribeOnline = onlineManager.subscribe(() => {
        if (onlineManager.isOnline()) {
          this.resumePausedMutations();
          this.queryCache.onOnline();
        }
      });
    }
    unmount() {
      var _this$unsubscribeFocu, _this$unsubscribeOnli;
      this.mountCount--;
      if (this.mountCount !== 0)
        return;
      (_this$unsubscribeFocu = this.unsubscribeFocus) == null ? void 0 : _this$unsubscribeFocu.call(this);
      this.unsubscribeFocus = void 0;
      (_this$unsubscribeOnli = this.unsubscribeOnline) == null ? void 0 : _this$unsubscribeOnli.call(this);
      this.unsubscribeOnline = void 0;
    }
    isFetching(arg1, arg2) {
      const [filters] = parseFilterArgs(arg1, arg2);
      filters.fetchStatus = "fetching";
      return this.queryCache.findAll(filters).length;
    }
    isMutating(filters) {
      return this.mutationCache.findAll({
        ...filters,
        fetching: true
      }).length;
    }
    getQueryData(queryKey, filters) {
      var _this$queryCache$find;
      return (_this$queryCache$find = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find.state.data;
    }
    ensureQueryData(arg1, arg2, arg3) {
      const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
      const cachedData = this.getQueryData(parsedOptions.queryKey);
      return cachedData ? Promise.resolve(cachedData) : this.fetchQuery(parsedOptions);
    }
    getQueriesData(queryKeyOrFilters) {
      return this.getQueryCache().findAll(queryKeyOrFilters).map(({
        queryKey,
        state
      }) => {
        const data = state.data;
        return [queryKey, data];
      });
    }
    setQueryData(queryKey, updater, options) {
      const query = this.queryCache.find(queryKey);
      const prevData = query == null ? void 0 : query.state.data;
      const data = functionalUpdate(updater, prevData);
      if (typeof data === "undefined") {
        return void 0;
      }
      const parsedOptions = parseQueryArgs(queryKey);
      const defaultedOptions = this.defaultQueryOptions(parsedOptions);
      return this.queryCache.build(this, defaultedOptions).setData(data, {
        ...options,
        manual: true
      });
    }
    setQueriesData(queryKeyOrFilters, updater, options) {
      return notifyManager.batch(() => this.getQueryCache().findAll(queryKeyOrFilters).map(({
        queryKey
      }) => [queryKey, this.setQueryData(queryKey, updater, options)]));
    }
    getQueryState(queryKey, filters) {
      var _this$queryCache$find2;
      return (_this$queryCache$find2 = this.queryCache.find(queryKey, filters)) == null ? void 0 : _this$queryCache$find2.state;
    }
    removeQueries(arg1, arg2) {
      const [filters] = parseFilterArgs(arg1, arg2);
      const queryCache = this.queryCache;
      notifyManager.batch(() => {
        queryCache.findAll(filters).forEach((query) => {
          queryCache.remove(query);
        });
      });
    }
    resetQueries(arg1, arg2, arg3) {
      const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
      const queryCache = this.queryCache;
      const refetchFilters = {
        type: "active",
        ...filters
      };
      return notifyManager.batch(() => {
        queryCache.findAll(filters).forEach((query) => {
          query.reset();
        });
        return this.refetchQueries(refetchFilters, options);
      });
    }
    cancelQueries(arg1, arg2, arg3) {
      const [filters, cancelOptions = {}] = parseFilterArgs(arg1, arg2, arg3);
      if (typeof cancelOptions.revert === "undefined") {
        cancelOptions.revert = true;
      }
      const promises = notifyManager.batch(() => this.queryCache.findAll(filters).map((query) => query.cancel(cancelOptions)));
      return Promise.all(promises).then(noop).catch(noop);
    }
    invalidateQueries(arg1, arg2, arg3) {
      const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
      return notifyManager.batch(() => {
        var _ref, _filters$refetchType;
        this.queryCache.findAll(filters).forEach((query) => {
          query.invalidate();
        });
        if (filters.refetchType === "none") {
          return Promise.resolve();
        }
        const refetchFilters = {
          ...filters,
          type: (_ref = (_filters$refetchType = filters.refetchType) != null ? _filters$refetchType : filters.type) != null ? _ref : "active"
        };
        return this.refetchQueries(refetchFilters, options);
      });
    }
    refetchQueries(arg1, arg2, arg3) {
      const [filters, options] = parseFilterArgs(arg1, arg2, arg3);
      const promises = notifyManager.batch(() => this.queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
        var _options$cancelRefetc;
        return query.fetch(void 0, {
          ...options,
          cancelRefetch: (_options$cancelRefetc = options == null ? void 0 : options.cancelRefetch) != null ? _options$cancelRefetc : true,
          meta: {
            refetchPage: filters.refetchPage
          }
        });
      }));
      let promise = Promise.all(promises).then(noop);
      if (!(options != null && options.throwOnError)) {
        promise = promise.catch(noop);
      }
      return promise;
    }
    fetchQuery(arg1, arg2, arg3) {
      const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
      const defaultedOptions = this.defaultQueryOptions(parsedOptions);
      if (typeof defaultedOptions.retry === "undefined") {
        defaultedOptions.retry = false;
      }
      const query = this.queryCache.build(this, defaultedOptions);
      return query.isStaleByTime(defaultedOptions.staleTime) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
    }
    prefetchQuery(arg1, arg2, arg3) {
      return this.fetchQuery(arg1, arg2, arg3).then(noop).catch(noop);
    }
    fetchInfiniteQuery(arg1, arg2, arg3) {
      const parsedOptions = parseQueryArgs(arg1, arg2, arg3);
      parsedOptions.behavior = infiniteQueryBehavior();
      return this.fetchQuery(parsedOptions);
    }
    prefetchInfiniteQuery(arg1, arg2, arg3) {
      return this.fetchInfiniteQuery(arg1, arg2, arg3).then(noop).catch(noop);
    }
    resumePausedMutations() {
      return this.mutationCache.resumePausedMutations();
    }
    getQueryCache() {
      return this.queryCache;
    }
    getMutationCache() {
      return this.mutationCache;
    }
    getLogger() {
      return this.logger;
    }
    getDefaultOptions() {
      return this.defaultOptions;
    }
    setDefaultOptions(options) {
      this.defaultOptions = options;
    }
    setQueryDefaults(queryKey, options) {
      const result = this.queryDefaults.find((x) => hashQueryKey(queryKey) === hashQueryKey(x.queryKey));
      if (result) {
        result.defaultOptions = options;
      } else {
        this.queryDefaults.push({
          queryKey,
          defaultOptions: options
        });
      }
    }
    getQueryDefaults(queryKey) {
      if (!queryKey) {
        return void 0;
      }
      const firstMatchingDefaults = this.queryDefaults.find((x) => partialMatchKey(queryKey, x.queryKey));
      if (process.env.NODE_ENV !== "production") {
        const matchingDefaults = this.queryDefaults.filter((x) => partialMatchKey(queryKey, x.queryKey));
        if (matchingDefaults.length > 1) {
          this.logger.error("[QueryClient] Several query defaults match with key '" + JSON.stringify(queryKey) + "'. The first matching query defaults are used. Please check how query defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults.");
        }
      }
      return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
    }
    setMutationDefaults(mutationKey, options) {
      const result = this.mutationDefaults.find((x) => hashQueryKey(mutationKey) === hashQueryKey(x.mutationKey));
      if (result) {
        result.defaultOptions = options;
      } else {
        this.mutationDefaults.push({
          mutationKey,
          defaultOptions: options
        });
      }
    }
    getMutationDefaults(mutationKey) {
      if (!mutationKey) {
        return void 0;
      }
      const firstMatchingDefaults = this.mutationDefaults.find((x) => partialMatchKey(mutationKey, x.mutationKey));
      if (process.env.NODE_ENV !== "production") {
        const matchingDefaults = this.mutationDefaults.filter((x) => partialMatchKey(mutationKey, x.mutationKey));
        if (matchingDefaults.length > 1) {
          this.logger.error("[QueryClient] Several mutation defaults match with key '" + JSON.stringify(mutationKey) + "'. The first matching mutation defaults are used. Please check how mutation defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetmutationdefaults.");
        }
      }
      return firstMatchingDefaults == null ? void 0 : firstMatchingDefaults.defaultOptions;
    }
    defaultQueryOptions(options) {
      if (options != null && options._defaulted) {
        return options;
      }
      const defaultedOptions = {
        ...this.defaultOptions.queries,
        ...this.getQueryDefaults(options == null ? void 0 : options.queryKey),
        ...options,
        _defaulted: true
      };
      if (!defaultedOptions.queryHash && defaultedOptions.queryKey) {
        defaultedOptions.queryHash = hashQueryKeyByOptions(defaultedOptions.queryKey, defaultedOptions);
      }
      if (typeof defaultedOptions.refetchOnReconnect === "undefined") {
        defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
      }
      if (typeof defaultedOptions.useErrorBoundary === "undefined") {
        defaultedOptions.useErrorBoundary = !!defaultedOptions.suspense;
      }
      return defaultedOptions;
    }
    defaultMutationOptions(options) {
      if (options != null && options._defaulted) {
        return options;
      }
      return {
        ...this.defaultOptions.mutations,
        ...this.getMutationDefaults(options == null ? void 0 : options.mutationKey),
        ...options,
        _defaulted: true
      };
    }
    clear() {
      this.queryCache.clear();
      this.mutationCache.clear();
    }
  };

  // ../../node_modules/.pnpm/@tanstack+query-core@4.22.0/node_modules/@tanstack/query-core/build/lib/mutationObserver.mjs
  var MutationObserver = class extends Subscribable {
    constructor(client2, options) {
      super();
      this.client = client2;
      this.setOptions(options);
      this.bindMethods();
      this.updateResult();
    }
    bindMethods() {
      this.mutate = this.mutate.bind(this);
      this.reset = this.reset.bind(this);
    }
    setOptions(options) {
      const prevOptions = this.options;
      this.options = this.client.defaultMutationOptions(options);
      if (!shallowEqualObjects(prevOptions, this.options)) {
        this.client.getMutationCache().notify({
          type: "observerOptionsUpdated",
          mutation: this.currentMutation,
          observer: this
        });
      }
    }
    onUnsubscribe() {
      if (!this.listeners.length) {
        var _this$currentMutation;
        (_this$currentMutation = this.currentMutation) == null ? void 0 : _this$currentMutation.removeObserver(this);
      }
    }
    onMutationUpdate(action) {
      this.updateResult();
      const notifyOptions = {
        listeners: true
      };
      if (action.type === "success") {
        notifyOptions.onSuccess = true;
      } else if (action.type === "error") {
        notifyOptions.onError = true;
      }
      this.notify(notifyOptions);
    }
    getCurrentResult() {
      return this.currentResult;
    }
    reset() {
      this.currentMutation = void 0;
      this.updateResult();
      this.notify({
        listeners: true
      });
    }
    mutate(variables, options) {
      this.mutateOptions = options;
      if (this.currentMutation) {
        this.currentMutation.removeObserver(this);
      }
      this.currentMutation = this.client.getMutationCache().build(this.client, {
        ...this.options,
        variables: typeof variables !== "undefined" ? variables : this.options.variables
      });
      this.currentMutation.addObserver(this);
      return this.currentMutation.execute();
    }
    updateResult() {
      const state = this.currentMutation ? this.currentMutation.state : getDefaultState2();
      const result = {
        ...state,
        isLoading: state.status === "loading",
        isSuccess: state.status === "success",
        isError: state.status === "error",
        isIdle: state.status === "idle",
        mutate: this.mutate,
        reset: this.reset
      };
      this.currentResult = result;
    }
    notify(options) {
      notifyManager.batch(() => {
        if (this.mutateOptions) {
          if (options.onSuccess) {
            var _this$mutateOptions$o, _this$mutateOptions, _this$mutateOptions$o2, _this$mutateOptions2;
            (_this$mutateOptions$o = (_this$mutateOptions = this.mutateOptions).onSuccess) == null ? void 0 : _this$mutateOptions$o.call(_this$mutateOptions, this.currentResult.data, this.currentResult.variables, this.currentResult.context);
            (_this$mutateOptions$o2 = (_this$mutateOptions2 = this.mutateOptions).onSettled) == null ? void 0 : _this$mutateOptions$o2.call(_this$mutateOptions2, this.currentResult.data, null, this.currentResult.variables, this.currentResult.context);
          } else if (options.onError) {
            var _this$mutateOptions$o3, _this$mutateOptions3, _this$mutateOptions$o4, _this$mutateOptions4;
            (_this$mutateOptions$o3 = (_this$mutateOptions3 = this.mutateOptions).onError) == null ? void 0 : _this$mutateOptions$o3.call(_this$mutateOptions3, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
            (_this$mutateOptions$o4 = (_this$mutateOptions4 = this.mutateOptions).onSettled) == null ? void 0 : _this$mutateOptions$o4.call(_this$mutateOptions4, void 0, this.currentResult.error, this.currentResult.variables, this.currentResult.context);
          }
        }
        if (options.listeners) {
          this.listeners.forEach((listener) => {
            listener(this.currentResult);
          });
        }
      });
    }
  };

  // ../../node_modules/.pnpm/@tanstack+react-query@4.22.3_react@18.2.0/node_modules/@tanstack/react-query/build/lib/useSyncExternalStore.mjs
  var import_shim = __toESM(require_shim(), 1);
  var useSyncExternalStore = import_shim.useSyncExternalStore;

  // ../../node_modules/.pnpm/@tanstack+react-query@4.22.3_react@18.2.0/node_modules/@tanstack/react-query/build/lib/QueryClientProvider.mjs
  var React = __toESM(require_react(), 1);
  var defaultContext = /* @__PURE__ */ React.createContext(void 0);
  var QueryClientSharingContext = /* @__PURE__ */ React.createContext(false);
  function getQueryClientContext(context, contextSharing) {
    if (context) {
      return context;
    }
    if (contextSharing && typeof window !== "undefined") {
      if (!window.ReactQueryClientContext) {
        window.ReactQueryClientContext = defaultContext;
      }
      return window.ReactQueryClientContext;
    }
    return defaultContext;
  }
  var useQueryClient = ({
    context
  } = {}) => {
    const queryClient = React.useContext(getQueryClientContext(context, React.useContext(QueryClientSharingContext)));
    if (!queryClient) {
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    }
    return queryClient;
  };
  var QueryClientProvider = ({
    client: client2,
    children,
    context,
    contextSharing = false
  }) => {
    React.useEffect(() => {
      client2.mount();
      return () => {
        client2.unmount();
      };
    }, [client2]);
    if (process.env.NODE_ENV !== "production" && contextSharing) {
      client2.getLogger().error("The contextSharing option has been deprecated and will be removed in the next major version");
    }
    const Context2 = getQueryClientContext(context, contextSharing);
    return /* @__PURE__ */ React.createElement(QueryClientSharingContext.Provider, {
      value: !context && contextSharing
    }, /* @__PURE__ */ React.createElement(Context2.Provider, {
      value: client2
    }, children));
  };

  // ../../node_modules/.pnpm/@tanstack+react-query@4.22.3_react@18.2.0/node_modules/@tanstack/react-query/build/lib/utils.mjs
  function shouldThrowError(_useErrorBoundary, params) {
    if (typeof _useErrorBoundary === "function") {
      return _useErrorBoundary(...params);
    }
    return !!_useErrorBoundary;
  }

  // ../../node_modules/.pnpm/@tanstack+react-query@4.22.3_react@18.2.0/node_modules/@tanstack/react-query/build/lib/useMutation.mjs
  var React2 = __toESM(require_react(), 1);
  function useMutation(arg1, arg2, arg3) {
    const options = parseMutationArgs(arg1, arg2, arg3);
    const queryClient = useQueryClient({
      context: options.context
    });
    const [observer] = React2.useState(() => new MutationObserver(queryClient, options));
    React2.useEffect(() => {
      observer.setOptions(options);
    }, [observer, options]);
    const result = useSyncExternalStore(React2.useCallback((onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)), [observer]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
    const mutate = React2.useCallback((variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop2);
    }, [observer]);
    if (result.error && shouldThrowError(observer.options.useErrorBoundary, [result.error])) {
      throw result.error;
    }
    return {
      ...result,
      mutate,
      mutateAsync: result.mutate
    };
  }
  function noop2() {
  }

  // src/hooks/useConnect.ts
  var mutationFn = async (args) => {
    const { connector } = args;
    if (!connector) {
      throw new Error("connector is required");
    }
    return connect({ connector });
  };
  var useConnect = ({
    connector,
    onError,
    onMutate,
    onSettled,
    onSuccess
  }) => {
    const {
      data,
      error,
      isError: isError2,
      isIdle,
      isLoading,
      isSuccess,
      reset,
      status,
      variables,
      mutate,
      mutateAsync
    } = useMutation(["connect" /* CONNECT */], mutationFn, {
      onError,
      onMutate,
      onSettled,
      onSuccess
    });
    const connect2 = (0, import_react2.useCallback)(() => {
      return mutate({
        connector
      });
    }, [connector]);
    const connectAsync = (0, import_react2.useCallback)(async () => {
      return mutateAsync({
        connector
      });
    }, [connector]);
    return {
      connect: connect2,
      connectAsync,
      data,
      error,
      isError: isError2,
      isIdle,
      isLoading,
      isSuccess,
      reset,
      status,
      variables
    };
  };

  // src/hooks/useDisconnect.ts
  var import_react4 = __toESM(require_react(), 1);
  var mutationFn2 = async () => {
    return disconnect();
  };
  var useDisconnect = ({
    onError,
    onMutate,
    onSettled,
    onSuccess
  } = {}) => {
    const {
      error,
      isError: isError2,
      isIdle,
      isLoading,
      isSuccess,
      status,
      reset,
      mutate,
      mutateAsync
    } = useMutation(["disconnect" /* DISCONNECT */], mutationFn2, {
      onError,
      onMutate,
      onSettled,
      onSuccess
    });
    const disconnect2 = (0, import_react4.useCallback)(() => {
      return mutate();
    }, []);
    const disconnectAsync = (0, import_react4.useCallback)(async () => {
      return mutateAsync();
    }, []);
    return {
      disconnect: disconnect2,
      disconnectAsync,
      error,
      isError: isError2,
      isIdle,
      isLoading,
      isSuccess,
      status,
      reset
    };
  };

  // src/hooks/useSign.ts
  var import_react6 = __toESM(require_react(), 1);
  var mutationFn3 = async ({ deploy, signingPublicKey, targetPublicKeyHex }) => {
    if (!deploy) {
      throw new Error("Deploy must be a non-empty");
    }
    if (!signingPublicKey) {
      throw new Error("signingPublicKey must be a non-empty string");
    }
    if (!targetPublicKeyHex) {
      throw new Error("targetPublicKeyHex must be a non-empty string");
    }
    return sign({ deploy, signingPublicKey, targetPublicKeyHex });
  };
  var useSign = ({
    deploy,
    signingPublicKey,
    targetPublicKeyHex,
    onError,
    onMutate,
    onSettled,
    onSuccess
  } = {}) => {
    const {
      data,
      error,
      isError: isError2,
      isIdle,
      isLoading,
      isSuccess,
      reset,
      status,
      variables,
      mutate,
      mutateAsync
    } = useMutation(["sign" /* SIGN */], mutationFn3, {
      onError,
      onMutate,
      onSettled,
      onSuccess
    });
    const sign2 = (0, import_react6.useCallback)((params) => {
      return mutate(params || {
        deploy,
        signingPublicKey,
        targetPublicKeyHex
      });
    }, [deploy, signingPublicKey, targetPublicKeyHex, mutate]);
    const signAsync = (0, import_react6.useCallback)(async (params) => {
      return mutateAsync(params || {
        deploy,
        signingPublicKey,
        targetPublicKeyHex
      });
    }, [deploy, signingPublicKey, targetPublicKeyHex, mutateAsync]);
    return {
      sign: sign2,
      signAsync,
      data,
      error,
      isError: isError2,
      isIdle,
      isLoading,
      isSuccess,
      reset,
      status,
      variables
    };
  };

  // src/hooks/useSignMessage.ts
  var import_react8 = __toESM(require_react(), 1);
  var mutationFn4 = async ({ message, signingPublicKey }) => {
    if (!message) {
      throw new Error("Message must be a non-empty string");
    }
    if (!signingPublicKey) {
      throw new Error("signingPublicKey must be a non-empty string");
    }
    return signMessage({ message, signingPublicKey });
  };
  var useSignMessage = ({
    message,
    signingPublicKey,
    onError,
    onMutate,
    onSettled,
    onSuccess
  } = {}) => {
    const {
      data,
      error,
      isError: isError2,
      isIdle,
      isLoading,
      isSuccess,
      reset,
      status,
      variables,
      mutate,
      mutateAsync
    } = useMutation(["sign_message" /* SIGN_MESSAGE */, signingPublicKey, message], mutationFn4, {
      onError,
      onMutate,
      onSettled,
      onSuccess
    });
    const signMessage2 = (0, import_react8.useCallback)((params) => {
      return mutate(params || {
        message,
        signingPublicKey
      });
    }, [message, signingPublicKey, mutate]);
    const signMessageAsync = (0, import_react8.useCallback)(async (params) => {
      return mutateAsync(params || {
        message,
        signingPublicKey
      });
    }, [message, signingPublicKey, mutateAsync]);
    return {
      signMessage: signMessage2,
      signMessageAsync,
      data,
      error,
      isError: isError2,
      isIdle,
      isLoading,
      isSuccess,
      reset,
      status,
      variables
    };
  };

  // src/provider.ts
  var React3 = __toESM(require_react(), 1);
  var Context = React3.createContext(void 0);
  var queryClientContext = React3.createContext(
    void 0
  );
  var CasperProvider = ({ children, client: client2 }) => {
    return React3.createElement(
      Context.Provider,
      {
        children: React3.createElement(
          QueryClientProvider,
          {
            children,
            client: client2.queryClient
          }
        ),
        value: client2
      }
    );
  };

  // src/client.ts
  var createClient2 = ({
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1e3 * 60 * 60 * 24,
          networkMode: "offlineFirst",
          refetchOnWindowFocus: false,
          retry: 0
        },
        mutations: {
          networkMode: "offlineFirst"
        }
      }
    }),
    ...config
  }) => {
    const casperClient = createClient(config);
    return Object.assign(casperClient, {
      queryClient
    });
  };

  // src/enums/queryKeys.ts
  var QueryKeysEnum = /* @__PURE__ */ ((QueryKeysEnum2) => {
    QueryKeysEnum2["CONNECT"] = "connect";
    return QueryKeysEnum2;
  })(QueryKeysEnum || {});

  // src/enums/mutationKeys.ts
  var MutationKeysEnum = /* @__PURE__ */ ((MutationKeysEnum2) => {
    MutationKeysEnum2["CONNECT"] = "connect";
    MutationKeysEnum2["DISCONNECT"] = "disconnect";
    MutationKeysEnum2["SIGN"] = "sign";
    MutationKeysEnum2["SIGN_MESSAGE"] = "sign_message";
    return MutationKeysEnum2;
  })(MutationKeysEnum || {});
})();
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
//# sourceMappingURL=index.global.js.map
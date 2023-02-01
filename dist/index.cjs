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
  CasperProvider: () => CasperProvider,
  MutationKeysEnum: () => MutationKeysEnum,
  QueryKeysEnum: () => QueryKeysEnum,
  createClient: () => createClient,
  useAccount: () => useAccount,
  useConnect: () => useConnect,
  useDisconnect: () => useDisconnect,
  useSign: () => useSign,
  useSignMessage: () => useSignMessage
});
module.exports = __toCommonJS(src_exports);

// src/hooks/useAccount.ts
var import_core = require("@usedapp/core");
var import_react = require("react");
var useAccount = () => {
  const [publicKey, setPublicKey] = (0, import_react.useState)(null);
  const [status, setStatus] = (0, import_react.useState)(import_core.StatusEnum.DISCONNECTED);
  (0, import_react.useEffect)(() => {
    const initAccount = async () => {
      const fetchedPublicKey = await (0, import_core.getActivePublicKey)();
      if (fetchedPublicKey) {
        setPublicKey(fetchedPublicKey);
      }
    };
    void initAccount();
    (0, import_core.watchAccount)((account) => {
      if (!account) {
        return;
      }
      setPublicKey(account.publicKey ? account.publicKey : null);
      setStatus(account.status ? account.status : import_core.StatusEnum.DISCONNECTED);
    });
  }, []);
  return {
    status,
    publicKey
  };
};

// src/hooks/useConnect.ts
var import_react2 = require("react");
var import_react_query = require("@tanstack/react-query");
var import_core2 = require("@usedapp/core");
var mutationFn = async (args) => {
  const { connector } = args;
  if (!connector) {
    throw new Error("connector is required");
  }
  return (0, import_core2.connect)({ connector });
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
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
    mutate,
    mutateAsync
  } = (0, import_react_query.useMutation)(["connect" /* CONNECT */], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const connect = (0, import_react2.useCallback)(() => {
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
    connect,
    connectAsync,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables
  };
};

// src/hooks/useDisconnect.ts
var import_react4 = require("react");
var import_react_query2 = require("@tanstack/react-query");
var import_core3 = require("@usedapp/core");
var mutationFn2 = async () => {
  return (0, import_core3.disconnect)();
};
var useDisconnect = ({
  onError,
  onMutate,
  onSettled,
  onSuccess
} = {}) => {
  const {
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    status,
    reset,
    mutate,
    mutateAsync
  } = (0, import_react_query2.useMutation)(["disconnect" /* DISCONNECT */], mutationFn2, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const disconnect = (0, import_react4.useCallback)(() => {
    return mutate();
  }, []);
  const disconnectAsync = (0, import_react4.useCallback)(async () => {
    return mutateAsync();
  }, []);
  return {
    disconnect,
    disconnectAsync,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    status,
    reset
  };
};

// src/hooks/useSign.ts
var import_react6 = require("react");
var import_react_query3 = require("@tanstack/react-query");
var import_core4 = require("@usedapp/core");
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
  return (0, import_core4.sign)({ deploy, signingPublicKey, targetPublicKeyHex });
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
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
    mutate,
    mutateAsync
  } = (0, import_react_query3.useMutation)(["sign" /* SIGN */], mutationFn3, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const sign = (0, import_react6.useCallback)((params) => {
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
    sign,
    signAsync,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables
  };
};

// src/hooks/useSignMessage.ts
var import_react8 = require("react");
var import_react_query4 = require("@tanstack/react-query");
var import_core5 = require("@usedapp/core");
var mutationFn4 = async ({ message, signingPublicKey }) => {
  if (!message) {
    throw new Error("Message must be a non-empty string");
  }
  if (!signingPublicKey) {
    throw new Error("signingPublicKey must be a non-empty string");
  }
  return (0, import_core5.signMessage)({ message, signingPublicKey });
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
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables,
    mutate,
    mutateAsync
  } = (0, import_react_query4.useMutation)(["sign_message" /* SIGN_MESSAGE */, signingPublicKey, message], mutationFn4, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const signMessage = (0, import_react8.useCallback)((params) => {
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
    signMessage,
    signMessageAsync,
    data,
    error,
    isError,
    isIdle,
    isLoading,
    isSuccess,
    reset,
    status,
    variables
  };
};

// src/provider.ts
var React = __toESM(require("react"), 1);
var import_react_query5 = require("@tanstack/react-query");
var Context = React.createContext(void 0);
var queryClientContext = React.createContext(
  void 0
);
var CasperProvider = ({ children, client }) => {
  return React.createElement(
    Context.Provider,
    {
      children: React.createElement(
        import_react_query5.QueryClientProvider,
        {
          children,
          client: client.queryClient
        }
      ),
      value: client
    }
  );
};

// src/client.ts
var import_react_query6 = require("@tanstack/react-query");
var import_core6 = require("@usedapp/core");
var createClient = ({
  queryClient = new import_react_query6.QueryClient({
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
  const casperClient = (0, import_core6.createClient)(config);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CasperProvider,
  MutationKeysEnum,
  QueryKeysEnum,
  createClient,
  useAccount,
  useConnect,
  useDisconnect,
  useSign,
  useSignMessage
});
//# sourceMappingURL=index.cjs.map
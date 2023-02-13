// src/hooks/useAccount.ts
import {
  watchAccount,
  StatusEnum,
  getAccount
} from "@usedapp/core";
import { useEffect, useState } from "react";
var useAccount = () => {
  const [publicKey, setPublicKey] = useState(null);
  const [status, setStatus] = useState(StatusEnum.DISCONNECTED);
  useEffect(() => {
    const initAccount = async () => {
      const account = getAccount();
      if (account && account.status === StatusEnum.CONNECTED) {
        setPublicKey(account.publicKey);
        setStatus(account.status);
      }
    };
    void initAccount();
    watchAccount((account) => {
      if (!account) {
        return;
      }
      setPublicKey(account.publicKey ? account.publicKey : null);
      setStatus(account.status ? account.status : StatusEnum.DISCONNECTED);
    });
  }, []);
  return {
    status,
    publicKey
  };
};

// src/hooks/useConnect.ts
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { connect as connectDapp } from "@usedapp/core";
var mutationFn = async (args) => {
  const { connector } = args;
  if (!connector) {
    throw new Error("connector is required");
  }
  return connectDapp({ connector });
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
  } = useMutation(["connect" /* CONNECT */], mutationFn, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const connect = useCallback(() => {
    return mutate({
      connector
    });
  }, [connector]);
  const connectAsync = useCallback(async () => {
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
import { useCallback as useCallback2 } from "react";
import { useMutation as useMutation2 } from "@tanstack/react-query";
import { disconnect as disconnectDapp } from "@usedapp/core";
var mutationFn2 = async () => {
  return disconnectDapp();
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
  } = useMutation2(["disconnect" /* DISCONNECT */], mutationFn2, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const disconnect = useCallback2(() => {
    return mutate();
  }, []);
  const disconnectAsync = useCallback2(async () => {
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
import { useCallback as useCallback3 } from "react";
import { useMutation as useMutation3 } from "@tanstack/react-query";
import { sign as signDapp } from "@usedapp/core";
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
  return signDapp({ deploy, signingPublicKey, targetPublicKeyHex });
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
  } = useMutation3(["sign" /* SIGN */], mutationFn3, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const sign = useCallback3((params) => {
    return mutate(params || {
      deploy,
      signingPublicKey,
      targetPublicKeyHex
    });
  }, [deploy, signingPublicKey, targetPublicKeyHex, mutate]);
  const signAsync = useCallback3(async (params) => {
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
import { useCallback as useCallback4 } from "react";
import { useMutation as useMutation4 } from "@tanstack/react-query";
import {
  signMessage as signMessageDapp
} from "@usedapp/core";
var mutationFn4 = async ({ message, signingPublicKey }) => {
  if (!message) {
    throw new Error("Message must be a non-empty string");
  }
  if (!signingPublicKey) {
    throw new Error("signingPublicKey must be a non-empty string");
  }
  return signMessageDapp({ message, signingPublicKey });
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
  } = useMutation4(["sign_message" /* SIGN_MESSAGE */, signingPublicKey, message], mutationFn4, {
    onError,
    onMutate,
    onSettled,
    onSuccess
  });
  const signMessage = useCallback4((params) => {
    return mutate(params || {
      message,
      signingPublicKey
    });
  }, [message, signingPublicKey, mutate]);
  const signMessageAsync = useCallback4(async (params) => {
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
import * as React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
var Context = React.createContext(void 0);
var queryClientContext = React.createContext(
  void 0
);
var CasperProvider = ({ children, client }) => {
  return React.createElement(
    Context.Provider,
    {
      children: React.createElement(
        QueryClientProvider,
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
import { QueryClient } from "@tanstack/react-query";
import {
  createClient as createCasperClient
} from "@usedapp/core";
import { CasperDashConnector, CasperSignerConnector } from "@usedapp/core";
var createClient = ({
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
  const casperClient = createCasperClient(config);
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
export {
  CasperDashConnector,
  CasperProvider,
  CasperSignerConnector,
  MutationKeysEnum,
  QueryKeysEnum,
  createClient,
  useAccount,
  useConnect,
  useDisconnect,
  useSign,
  useSignMessage
};
//# sourceMappingURL=index.js.map
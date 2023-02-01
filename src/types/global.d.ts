declare global {
  interface Window {
    casperDashPluginHelpers?: {
      isConnected: Promise<boolean>;
    };
    casperlabsHelper?: {
      isConnected: Promise<boolean>;
    };
  }
}

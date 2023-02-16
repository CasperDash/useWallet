declare global {
  interface Window {
    casperDashHelper?: {
      isConnected: Promise<boolean>;
    };
    casperlabsHelper?: {
      isConnected: Promise<boolean>;
    };
  }
}

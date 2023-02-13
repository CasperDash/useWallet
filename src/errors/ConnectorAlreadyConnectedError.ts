export class ConnectorAlreadyConnectedError extends Error {
  public name: string = 'ConnectorAlreadyConnectedError';
  public message: string = 'Connector already connected';
}

export class ConnectorNotFoundError extends Error {
  public name: string = 'ConnectorNotFoundError';
  public message: string = 'Connector not found';
}

export class ProviderUrlDoesNotExistError extends Error {
  public name: string = 'ProviderUrlDoesNotExistError';
  public message: string = 'Provider URL does not exist';
}

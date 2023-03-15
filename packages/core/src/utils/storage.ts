/* eslint-disable @typescript-eslint/no-unused-vars */
type BaseStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export type ClientStorage = {
  getItem<T>(key: string, defaultState?: T | null): T | null;
  setItem<T>(key: string, value: T | null): void;
  removeItem(key: string): void;
};

export const noopStorage: BaseStorage = {
  getItem: (_key: string) => '',
  setItem: (_key: string, _value: unknown) => null,
  removeItem: (_key: string) => null,
};

export function createStorage({
  key: prefix = 'casperdash-usewallet',
  storage,
}: {
  key?: string;
  storage: BaseStorage;
}): ClientStorage {
  return {
    ...storage,
    getItem: (key: string, defaultState: null = null) => {
      const value = storage.getItem(`${prefix}.${key}`);

      try {
        return value ? JSON.parse(value) : value;
      } catch (error) {
        console.warn(error);
        return defaultState;
      }
    },
    setItem: (key: string, value: unknown) => {
      if (value === null) {
        storage.removeItem(`${prefix}.${key}`);
        return;
      }

      try {
        storage.setItem(`${prefix}.${key}`, JSON.stringify(value));
      } catch (err) {
        console.error(err);
      }
    },
    removeItem: (key: string) => storage.removeItem(`${prefix}.${key}`),
  };
}

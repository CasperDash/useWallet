import { useMemo, useSyncExternalStore } from 'react';

export const useAccount = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const [getSnapshot, subscribe] = useMemo(() => {
    return [
      () => window.innerWidth,
      (notify: () => void) => {
        window.addEventListener('resize', notify);
        return () => {
          window.removeEventListener('resize', notify);
        };
      },
    ];
  }, [window]);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
  );
};

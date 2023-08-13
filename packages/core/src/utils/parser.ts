/* eslint-disable @typescript-eslint/no-explicit-any */
export const maybeParseDetailEvent = <T extends Record<any, any>>(detail: Record<string, unknown> | string): T => {
  if (typeof detail === 'string') {
    return JSON.parse(detail);
  }

  return detail as T;
};

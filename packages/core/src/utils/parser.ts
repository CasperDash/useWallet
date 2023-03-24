export const maybeParseDetailEvent = (detail: Record<string, unknown> | string) => {
  if (typeof detail === 'string') {
    return JSON.parse(detail);
  }

  return detail;
};

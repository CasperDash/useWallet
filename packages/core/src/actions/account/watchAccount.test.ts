import { CasperDashConnector } from '@usedapp/core/connectors';
import { createClient } from '@usedapp/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { watchAccount } from './watchAccount';

vi.mock('./getAccount', () => ({
  getAccount: vi.fn().mockReturnValue(null),
}));

const callback = vi.fn();
const selector = vi.fn();

describe('watchAccount', () => {
  beforeEach(() => {
    // Reset the client state before each test
    createClient({
      connectors: [new CasperDashConnector()],
    });
  });

  it('should return unsubscribe function', () => {
    const unsubscribe = watchAccount(callback, { selector });
    expect(selector).toHaveBeenCalled();

    selector.mockClear();
    callback.mockClear();

    unsubscribe();
  });
});

import { renderHook } from '@testing-library/react';
import { getAccount, StatusEnum } from '@casperdash/usewallet-core';
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';

import { useAccount } from './useAccount';

vi.mock('@casperdash/usewallet-core', () => ({
  getAccount: vi.fn(),
  watchAccount: vi.fn(),
  StatusEnum: {
    DISCONNECTED: 'DISCONNECTED',
    CONNECTED: 'CONNECTED',
  },
}));

describe('useAccount', () => {
  const getAccountMock = getAccount as MockedFunction<typeof getAccount>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set initial values correctly when account is connected', () => {
    const publicKey = 'some_public_key';
    const status = StatusEnum.CONNECTED;
    getAccountMock.mockImplementationOnce(() => ({ publicKey, status }));

    const { result } = renderHook(() => useAccount());
    expect(result.current).toEqual({
      publicKey,
      status,
    });
  });
});

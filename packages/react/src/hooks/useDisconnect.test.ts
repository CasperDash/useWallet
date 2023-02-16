import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Connector } from '@casperdash/usewallet-core';

import { wrapper } from '../../test';

import { useDisconnect } from './useDisconnect';

vi.mock('@casperdash/usewallet-core/actions/account', () => ({
  disconnect: vi.fn(),
}));

vi.mock('@casperdash/usewallet-core/utils/client', () => ({
  getClient: vi.fn(() => ({
    data: { activeKey: 'testPublicKey' },
    connector: {
      id: 'casperDash',
    } as unknown as Connector,
    setState: vi.fn(),
  })),
  createClient: vi.fn().mockReturnValue({}),
}));

describe('useDisconnect', () => {
  it('should isSuccess return false when not disconnect', async () => {
    const { result } = renderHook(
      () =>
        useDisconnect({
        }),
      {
        wrapper,
      },
    );

    expect(result.current.isSuccess).toBe(false);
  });

  it('should call onSuccess after disconnecting to a dapp', async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () =>
        useDisconnect({
          onSuccess,
        }),
      {
        wrapper,
      },
    );

    await act(async () => {
      result.current.disconnect();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it('should call onSuccess after disconnecting to a dapp with async function', async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () =>
        useDisconnect({
          onSuccess,
        }),
      {
        wrapper,
      },
    );

    await act(async () => {
      await result.current.disconnectAsync();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(onSuccess).toHaveBeenCalledOnce();
  });

});

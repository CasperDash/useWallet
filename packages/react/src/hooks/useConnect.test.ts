import { describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { CasperDashConnector, Connector } from '@usewallet/core';

import { wrapper } from '../../test';

import { useConnect } from './useConnect';

vi.mock('@usewallet/core/actions/account', () => ({
  connect: vi.fn(),
}));

vi.mock('@usewallet/core/utils/client', () => ({
  getClient: vi.fn(() => ({
    data: { activeKey: 'testPublicKey' },
    connector: {
      id: 'casperDash',
    } as unknown as Connector,
    setState: vi.fn(),
  })),
  createClient: vi.fn().mockReturnValue({}),
}));

describe('useConnect', () => {
  it('throws an error if connector is not passed', async () => {
    console.error = vi.fn();
    const { result } = renderHook(() => useConnect({}), {
      wrapper,
    });

    await act(async () => {
      result.current.connect();
    });

    expect(console.error).toHaveBeenCalledOnce();
    expect(console.error).toHaveBeenCalledWith(new Error('connector is required'));
  });

  it('should isSuccess return false when not connect', async () => {

    const { result } = renderHook(
      () =>
        useConnect({
          connector: new CasperDashConnector(),
        }),
      {
        wrapper,
      },
    );

    expect(result.current.isSuccess).toBe(false);
  });

  it('should call onSuccess after connecting to a dapp', async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () =>
        useConnect({
          connector: new CasperDashConnector(),
          onSuccess,
        }),
      {
        wrapper,
      },
    );

    await act(async () => {
      result.current.connect();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it('should call onSuccess after connecting to a dapp with connectAsync', async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(
      () =>
        useConnect({
          connector: new CasperDashConnector(),
          onSuccess,
        }),
      {
        wrapper,
      },
    );

    await act(async () => {
      await result.current.connectAsync();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(onSuccess).toHaveBeenCalledOnce();
  });

});

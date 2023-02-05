import { act, renderHook, waitFor } from '@testing-library/react';
import { Connector } from '@usedapp/core';
import { describe, expect, it, vi } from 'vitest';

import { wrapper } from '../../test';

import { useSignMessage } from './useSignMessage';

vi.mock('@usedapp/core/actions/account', () => ({
  signMessage: vi.fn().mockResolvedValue('signed'),
}));

vi.mock('@usedapp/core/utils/client', () => ({
  getClient: vi.fn(() => ({
    data: { activeKey: 'testPublicKey' },
    connector: {
      id: 'casperDash',
    } as unknown as Connector,
    setState: vi.fn(),
  })),
  createClient: vi.fn().mockReturnValue({}),
}));

describe('useSignMessage', () => {
  it('should return signed message with hook params and signMessageAsync function', async () => {
    console.error = vi.fn();
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSignMessage({
      message: '123',
      signingPublicKey: '123',
      onSuccess,
    }), {
      wrapper: wrapper,
    });

    await act(async () => {
      await result.current.signMessageAsync();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSuccess.mock.calls[0]).toEqual([
      undefined,
      {
        message: '123',
        signingPublicKey: '123',
      },
      undefined,
    ]);
  });

  it('should return deploy hash data with hook params and sign function', async () => {
    console.error = vi.fn();
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSignMessage({
      message: '123',
      signingPublicKey: '123',
      onSuccess,
    }), {
      wrapper: wrapper,
    });

    act( () => {
      result.current.signMessage();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSuccess.mock.calls[0]).toEqual([
      undefined,
      {
        message: '123',
        signingPublicKey: '123',
      },
      undefined,
    ]);
  });

  it('should throw an error if signingPublicKey is not provided', async () => {
    console.error = vi.fn();
    const { result } = renderHook(() => useSignMessage(), {
      wrapper: wrapper,
    });

    await act(async () => {
      try {
        await result.current.signMessageAsync({
          message: 'abc',
        });
      } catch (error) {
        expect(error).toEqual(new Error('signingPublicKey must be a non-empty string'));
      }
    });

    expect(console.error).toHaveBeenCalledOnce();
  });

  it('should throw an error if message is not provided', async () => {
    console.error = vi.fn();
    const { result } = renderHook(() => useSignMessage(), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.signMessageAsync({
          signingPublicKey: 'abc',
        });
      } catch (error) {
        expect(error).toEqual(
          new Error('Message must be a non-empty string'),
        );
      }
    });

    expect(console.error).toHaveBeenCalledOnce();
  });
});

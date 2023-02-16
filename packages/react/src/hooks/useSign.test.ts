import { act, renderHook, waitFor } from '@testing-library/react';
import { Connector } from '@casperdash/usewallet-core';
import { describe, expect, it, vi } from 'vitest';

import { wrapper } from '../../test';

import { useSign } from './useSign';

vi.mock('@casperdash/usewallet-core/actions/account', () => ({
  sign: vi.fn().mockResolvedValue({ deploy: { hash: '123' } }),
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

describe('useSign', () => {
  it('should return deploy hash data with hook params and signAsync function', async () => {
    console.error = vi.fn();
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSign({
      deploy: { id: '123' },
      signingPublicKeyHex: '123',
      targetPublicKeyHex: '456',
      onSuccess,
    }), {
      wrapper: wrapper,
    });

    await act(async () => {
      await result.current.signAsync();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSuccess.mock.calls[0]).toEqual([
      undefined,
      {
        deploy: { id: '123' },
        signingPublicKeyHex: '123',
        targetPublicKeyHex: '456',
      },
      undefined,
    ]);
  });

  it('should return deploy hash data with hook params and sign function', async () => {
    console.error = vi.fn();
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSign({
      deploy: { id: '123' },
      signingPublicKeyHex: '123',
      targetPublicKeyHex: '456',
      onSuccess,
    }), {
      wrapper: wrapper,
    });

    act( () => {
      result.current.sign();
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(onSuccess).toHaveBeenCalledOnce();
    expect(onSuccess.mock.calls[0]).toEqual([
      undefined,
      {
        deploy: { id: '123' },
        signingPublicKeyHex: '123',
        targetPublicKeyHex: '456',
      },
      undefined,
    ]);
  });

  it('should throw an error if deploy is not provided', async () => {
    console.error = vi.fn();
    const { result } = renderHook(() => useSign(), {
      wrapper: wrapper,
    });

    await act(async () => {
      try {
        await result.current.signAsync({
          signingPublicKeyHex: '',
          targetPublicKeyHex: '',
        });
      } catch (error) {
        expect(error).toEqual(new Error('Deploy must be a non-empty'));
      }
    });

    expect(console.error).toHaveBeenCalledOnce();
  });

  it('should throw an error if signingPublicKeyHex is not provided', async () => {
    console.error = vi.fn();
    const { result } = renderHook(() => useSign({ deploy: 'test' }), {
      wrapper,
    });

    await act(async () => {
      try {
        await result.current.signAsync({
          deploy: {},
          targetPublicKeyHex: 'abc',
        });
      } catch (error) {
        expect(error).toEqual(
          new Error('signingPublicKeyHex must be a non-empty string'),
        );
      }
    });

    expect(console.error).toHaveBeenCalledOnce();
  });

  it('should throw an error if targetPublicKeyHex is not provided', async () => {
    console.error = vi.fn();
    const { result } = renderHook(
      () => useSign({ deploy: 'test', signingPublicKeyHex: 'test' }),
      {
        wrapper,
      },
    );

    await act(async () => {
      try {
        await result.current.signAsync({
          deploy: {},
          signingPublicKeyHex: 'abc',
        });
      } catch (error) {
        expect(error).toEqual(
          new Error('targetPublicKeyHex must be a non-empty string'),
        );
      }
    });

    expect(console.error).toHaveBeenCalledOnce();
  });

  it('should throw an error if targetPublicKeyHex is not provided', async () => {
    console.error = vi.fn();
    const { result } = renderHook(
      () => useSign({ deploy: 'test', signingPublicKeyHex: 'test' }),
      {
        wrapper,
      },
    );

    await act(async () => {
      try {
        await result.current.signAsync({
          deploy: {},
          signingPublicKeyHex: 'abc',
        });
      } catch (error) {
        expect(error).toEqual(
          new Error('targetPublicKeyHex must be a non-empty string'),
        );
      }
    });

    expect(console.error).toHaveBeenCalledOnce();
  });
});

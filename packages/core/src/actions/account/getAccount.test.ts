import { createClient, getClient } from '@usedapp/core/utils';
import { describe, expect, it, vi } from 'vitest';
import { CapserDashConnector } from '@usedapp/core/connectors';
import { StatusEnum } from '@usedapp/core/enums';

import { getAccount } from './getAccount';

describe('getAccount', () => {

  it('should return null if the client is not set', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(getAccount()).toBeNull();
  });

  it('should return the account details if the client is set', () => {
    const connector = new CapserDashConnector();
    const publicKey = 'abc123';
    const status = StatusEnum.CONNECTED;

    createClient({
      connectors: [new CapserDashConnector()],
    });
    getClient().setState({
      connector,
      status,
      data: {
        activeKey: publicKey,
      },
    });

    const account = getAccount();

    expect(account).toEqual({
      publicKey,
      status,
      connector,
    });
  });

  it('should return the account details with undefined publicKey if data is not set', () => {
    const connector = new CapserDashConnector();
    const status = StatusEnum.DISCONNECTED;

    createClient({
      connectors: [new CapserDashConnector()],
    });
    getClient().setState({
      connector,
      status,
    });

    const account = getAccount();

    expect(account).toEqual({
      publicKey: undefined,
      status,
      connector,
    });
  });
});

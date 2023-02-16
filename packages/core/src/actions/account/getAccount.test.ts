import { createClient, getClient } from '@usewallet/core/utils';
import { describe, expect, it, vi } from 'vitest';
import { CasperDashConnector } from '@usewallet/core/connectors';
import { StatusEnum } from '@usewallet/core/enums';

import { getAccount } from './getAccount';

describe('getAccount', () => {

  it('should return null if the client is not set', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(getAccount()).toBeNull();
  });

  it('should return the account details if the client is set', () => {
    const connector = new CasperDashConnector();
    const publicKey = 'abc123';
    const status = StatusEnum.CONNECTED;

    createClient({
      connectors: [new CasperDashConnector()],
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
    const connector = new CasperDashConnector();
    const status = StatusEnum.DISCONNECTED;

    createClient({
      connectors: [new CasperDashConnector()],
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

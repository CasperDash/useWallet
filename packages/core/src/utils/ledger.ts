import { LedgerEnum } from '../enums';

export const CONNECT_ERROR_MESSAGE = 'You must open the Casper app on your Ledger device to connect.';

/**
 * Get Ledger error message
 * @param {object} error
 * @param {number} code
 */
export const getLedgerError = (error: Error, code?: number) => {
  if ('TransportInterfaceNotAvailable' === error.name || code === 27014) {
    return CONNECT_ERROR_MESSAGE;
  }
  if (code === 27012) {
    return 'Unsupported Deploy';
  }
  return error.message;
};

export const getLedgerPath = (index: string) => {
  return `${LedgerEnum.CASPER_KEY_PATH}${index}`;
};

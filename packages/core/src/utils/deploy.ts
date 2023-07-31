import { DeployUtil } from 'casper-js-sdk';

import { DeployTypes } from '../enums/deployTypes';

export const getDeployType = (deploy: DeployUtil.Deploy) => {
  return deploy.isTransfer()
    ? DeployTypes.TRANSFER
    : deploy.session.isModuleBytes()
      ? DeployTypes.WASM
      : deploy.session.isStoredContractByHash() ||
        deploy.session.isStoredContractByName()
        ? DeployTypes.CONTRACT_CALL
        : DeployTypes.CONTRACT_PACKAGE_CALL;
};

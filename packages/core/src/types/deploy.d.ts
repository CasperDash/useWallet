import { DeployUtil } from 'casper-js-sdk';

export type Deploy = {
  deploy: {
    session: Record<string, any>;
    approvals: { signature: string; signer: string }[];
    header: DeployUtil.DeployHeader;
    payment: Record<string, any>;
    hash: string;
  } | JsonTypes;
};

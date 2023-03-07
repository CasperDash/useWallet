import { DeployUtil } from 'casper-js-sdk';

export type Deploy = {
  deploy: {
    session: Record<string, unknown>;
    approvals: { signature: string; signer: string }[];
    header: DeployUtil.DeployHeader;
    payment: Record<string, unknown>;
    hash: string;
  } | JsonTypes;
};

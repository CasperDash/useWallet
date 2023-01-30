import { DeployUtil, CLPublicKey } from 'casper-js-sdk';

type TransactionDetail = {
  fromAddress: string;
  toAddress: string;
  amount: number;
  transferId: number;
  fee: number;
};

/**
 * It builds a transfer deploy.
 * @param transactionDetail
 * @returns The transfer deploy.
 */
export const getTransferDeploy = (transactionDetail: TransactionDetail) => {
  try {
    const { fromAddress, toAddress, amount, transferId = 0, fee } = transactionDetail;
    const fromPbKey = CLPublicKey.fromHex(fromAddress);
    const toPbKey = CLPublicKey.fromHex(toAddress);

    const deployParams = new DeployUtil.DeployParams(fromPbKey, 'casper-test');
    const transferParams = DeployUtil.ExecutableDeployItem.newTransfer(amount, toPbKey, null, transferId);
    const payment = DeployUtil.standardPayment(fee * 1000000000);
    const deploy = DeployUtil.makeDeploy(deployParams, transferParams, payment);

    return DeployUtil.deployToJson(deploy);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to build transfer deploy.');
  }
};

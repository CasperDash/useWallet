import { useAccount, useSign } from '@usedapp/react';
import { useForm } from 'react-hook-form';

import { getTransferDeploy } from '../utils/valueBuilder';

type FormValues = {
  walletAddress: string;
  amount: number;
};

const FormSigner = () => {
  const { publicKey } = useAccount();
  const { sign, data } = useSign();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      walletAddress: '',
      amount: 0,
    },
  });
  const onSubmit = (formValues: FormValues) => {
    const transferDeploy = getTransferDeploy({
      fromAddress: publicKey!,
      toAddress: formValues.walletAddress,
      amount: formValues.amount,
      transferId: 1,
      fee: 0.2,
    });

    sign({
      deploy: transferDeploy,
      signingPublicKey: publicKey!,
      targetPublicKeyHex: formValues.walletAddress,
    });
  };

  return (
    <form className="signer-form" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Wallet Address" {...register('walletAddress', { required: true, maxLength: 80 })} />
      <input type="text" placeholder="Amount" {...register('amount', { required: true, maxLength: 100 })} />

      <button type="submit">
        Send
      </button>

      {data?.deploy ? (data?.deploy as Record<string, string>).hash : ''}
    </form>
  );
};

export default FormSigner;

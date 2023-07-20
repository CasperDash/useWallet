import { useAccount, useSign } from '@casperdash/usewallet';
import { useForm } from 'react-hook-form';

import { getTransferDeploy } from '../../utils/valueBuilder';

type FormValues = {
  walletAddress: string;
  amount: number;
};

const FormSigner = () => {
  const { publicKey } = useAccount();
  const { sign, data } = useSign({
    onError: (err: unknown) => {
      console.log(err);
    },
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      walletAddress: '0106ae2a9cd180f2160bd87ed4bf564f34dffc40d71870bd425800f00f1e450ce3',
      amount: 0,
    },
  });
  const onSubmit = (formValues: FormValues) => {
    if (!publicKey) {
      return;
    }
    const transferDeploy = getTransferDeploy({
      fromAddress: publicKey,
      toAddress: formValues.walletAddress,
      amount: formValues.amount,
      transferId: 1,
      fee: 0.1,
    });

    sign({
      deploy: transferDeploy,
      signingPublicKeyHex: publicKey,
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

      {data?.deploy.hash}
    </form>
  );
};

export default FormSigner;

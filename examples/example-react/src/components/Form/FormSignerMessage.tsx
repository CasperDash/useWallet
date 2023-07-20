import { useAccount, useSignMessage } from '@casperdash/usewallet';
import { useForm } from 'react-hook-form';


type FormValues = {
  message: string;
};

const FormSignerMessage = () => {
  const { publicKey } = useAccount();
  const { signMessage, data } = useSignMessage({
    onError: (err: unknown) => {
      console.log(err);
    },
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      message: '',
    },
  });
  const onSubmit = ({ message }: FormValues) => {
    if (!publicKey) {
      return;
    }

    signMessage({
      message,
      signingPublicKeyHex: publicKey,
    });
  };

  return (
    <form className="signer-form" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="message" {...register('message', { required: true, maxLength: 100 })} />

      <button type="submit">
        Sign
      </button>

      {data}
    </form>
  );
};

export default FormSignerMessage;

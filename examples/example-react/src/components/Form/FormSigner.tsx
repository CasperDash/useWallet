import { useAccount, useSign } from '@casperdash/usewallet';
import { useForm } from 'react-hook-form';

import { getTransferDeploy } from '../../utils/valueBuilder';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/textarea';

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
  const form = useForm({
    defaultValues: {
      walletAddress: '',
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

  const { handleSubmit } = form;

  return (
    <Form {...form}>
        <form className="signer-form" onSubmit={handleSubmit(onSubmit)}>
          <FormField
              control={form.control}
              name="walletAddress"
              // eslint-disable-next-line @typescript-eslint/typedef
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your wallet address" {...field} />
                  </FormControl>
                  <FormDescription>
                    The wallet address you want to send to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              // eslint-disable-next-line @typescript-eslint/typedef
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount" {...field} />
                  </FormControl>
                  <FormDescription>
                    The amount you want to send.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-10">
              <Button type="submit" className="w-full">
                Send
              </Button>
            </div>

            <div className="mt-10">
              <FormItem>
                <FormLabel>Result</FormLabel>
                <FormDescription>
                  Signed Deploy
                </FormDescription>
                <Textarea placeholder="Amount" value={data?.deploy.hash}/>
                <FormMessage />
              </FormItem>
            </div>
        </form>
    </Form>
  );
};

export default FormSigner;

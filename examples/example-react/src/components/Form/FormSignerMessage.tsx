import { useAccount, useSignMessage } from '@casperdash/usewallet';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/textarea';


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
  const form = useForm({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = ({ message }: FormValues) => {
    console.log('publicKey: ', publicKey);
    if (!publicKey) {
      return;
    }


    signMessage({
      message,
      signingPublicKeyHex: publicKey,
    });
  };

  const { handleSubmit } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="message"
            // eslint-disable-next-line @typescript-eslint/typedef
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Input placeholder="Your message" {...field} />
                </FormControl>
                <FormDescription>
                  The message you want to sign.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-10">
            <Button type="submit" className="w-full">
              Sign Message
            </Button>
          </div>

          <div className="mt-10">
            <FormItem>
              <FormLabel>Result</FormLabel>
              <FormDescription>
                Signed Message
              </FormDescription>
              <Textarea placeholder="Amount" value={data}/>
              <FormMessage />
            </FormItem>
          </div>
      </form>
    </Form>
  );
};

export default FormSignerMessage;

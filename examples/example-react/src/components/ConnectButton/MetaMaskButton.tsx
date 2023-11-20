import { EVMConnector } from '@casperdash/usewallet-evm';
import {
  useConnect,
} from '@casperdash/usewallet';

import { Button } from '../ui/Button';


export const MetaMaskButton = () => {
  const { connect } = useConnect({
    connector: new EVMConnector({}),
  });

  return (
    <div>
        <Button onClick={async () => connect()} className='w-full'>
          Connect with MetaMask
        </Button>
    </div>
  );
};

export default MetaMaskButton;

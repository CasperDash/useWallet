import {
  CasperWalletConnector,
  useConnect,
} from '@casperdash/usewallet';

import { Button } from '../ui/Button';


export const CasperWalletButton = () => {
  const { connect } = useConnect({
    connector: new CasperWalletConnector({}),
  });

  return (
    <div>
        <Button onClick={() => connect()} className='w-full'>
          Connect with Casper Wallet
        </Button>
    </div>
  );
};

export default CasperWalletButton;

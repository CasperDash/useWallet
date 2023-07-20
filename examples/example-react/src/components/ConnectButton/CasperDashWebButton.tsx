import {
  CasperDashWebConnector,
  useConnect,
} from '@casperdash/usewallet';

import { Button } from '../ui/Button';


export const CasperDashWebButton = () => {
  const { connect } = useConnect({
    connector: new CasperDashWebConnector({
      providerUrl: 'https://testnet.casperdash.io',
    }),
  });

  return (
    <div>
        <Button onClick={() => connect()} className='w-full'>
          Connect with CasperDash Web
        </Button>
    </div>
  );
};

export default CasperDashWebButton;

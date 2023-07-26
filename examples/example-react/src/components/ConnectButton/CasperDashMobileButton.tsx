import {
  CasperDashMobileConnector,
  useConnect,
} from '@casperdash/usewallet';

import { Button } from '../ui/Button';


export const CasperDashMobileButton = () => {
  const { connect } = useConnect({
    connector: new CasperDashMobileConnector(),
  });

  return (
    <div>
        <Button onClick={() => connect()} className='w-full'>
          Connect with CasperDash Mobile
        </Button>
    </div>
  );
};

export default CasperDashMobileButton;

import {
  CasperDashConnector,
  useConnect,
} from '@casperdash/usewallet';

import { Button } from '../ui/Button';


export const CasperDashButton = () => {
  const { connect } = useConnect({
    connector: new CasperDashConnector({}),
  });

  return (
    <div>
        <Button onClick={() => connect()} className='w-full'>
          Connect with CasperDash
        </Button>
    </div>
  );
};

export default CasperDashButton;

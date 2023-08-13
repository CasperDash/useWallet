import {
  CasperSignerConnector,
  useConnect,
} from '@casperdash/usewallet';

import { Button } from '../ui/Button';

export const CasperSignerButton = () => {
  const { connect } = useConnect({
    connector: new CasperSignerConnector(),
  });

  return (
    <div>
        <Button onClick={() => connect()} className='w-full'>
          Connect with CasperSigner
        </Button>
    </div>
  );
};

export default CasperSignerButton;

import { LedgerAccount, useFetchLedgerAccounts } from '@casperdash/usewallet';
import { ChangeEvent } from 'react';

type Props = {
  onChange?: (index: string) => void;
};

export const SelectLedgerAccount = ({ onChange }: Props) => {
  const { data: accounts } = useFetchLedgerAccounts({
    total: 5,
  });

  return (
    <div>
      <select defaultValue={'0'} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value)}>
        {accounts?.map((account: LedgerAccount) => (
          <option key={account.publicKey} value={account.index}>
            {account.path} - {account.publicKey}
          </option>
        ))}
      </select>
    </div>
  );
};

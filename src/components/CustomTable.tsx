import { FC, memo } from 'react';

export const CustomTable: FC = memo(
  () => {
    return (
      <table className="table">
        <tr className="table__row" v-if="currency !== selectedCurrency">
          <td className="table__colum">1</td>
          <td className="table__colum">1</td>
        </tr>
    </table >
    );
  },
);

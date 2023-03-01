import { FC, memo } from 'react';

export const CustomTable: FC = memo(
  () => {
    return (
      <table className="table">
        <tbody>
          <tr className="table__row">
            <td className="table__colum">1</td>
            <td className="table__colum">1</td>
          </tr>
        </tbody>
      </table>
    );
  },
);

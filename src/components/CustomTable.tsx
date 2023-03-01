import { FC, Fragment, memo } from 'react';

interface Props {
  tableRows: [string, string | number][];
}

export const CustomTable: FC<Props> = memo(
  ({ tableRows }) => {
    return (
      <table className="table">
        <tbody>
          {tableRows.map(row => (
            <tr className="table__row" key={row[0]}>
              <td className="table__colum" style={{ fontWeight: 'bold' }}>{row[0]}</td>
              <td className="table__colum">{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import dayjs from 'dayjs';
import { QueryContainer } from './QueryContainer';

export interface MxTableColProps<T> {
  field: keyof T | 'actions';
  title?: string;
  render?: (row: T, value: any) => React.ReactNode;
  type?: 'datetime';
}

export type MxTableCols<T> = MxTableColProps<T>[];

export interface MxTableProps<T> {
  rows?: T[];
  columns: MxTableCols<T>;
  rowKey?: string;
  isLoading?: boolean;
  error?: unknown;
}

export function MxTable<T extends Record<string, any> = any>({
  isLoading,
  error,
  rows = [],
  columns,
  rowKey = 'id',
}: MxTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field as string}>{col.title || ''}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <QueryContainer
          data={rows}
          isLoading={isLoading}
          error={error as Error}
          component={TableBody}
          // eslint-disable-next-line react/no-unstable-nested-components
          wrapStateElement={(children) => (
            <tr>
              <td colSpan={columns.length}>{children}</td>
            </tr>
          )}
        >
          {rows.map((row) => (
            <TableRow key={row[rowKey]}>
              {columns.map((col) => {
                const value = row[col.field];
                let content: React.ReactNode;
                if (col.render) {
                  content = col.render(row, value);
                } else if (col.type === 'datetime') {
                  content = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
                } else {
                  content = value;
                }
                return <TableCell key={col.field as string}>{content}</TableCell>;
              })}
            </TableRow>
          ))}
        </QueryContainer>
      </Table>
    </TableContainer>
  );
}

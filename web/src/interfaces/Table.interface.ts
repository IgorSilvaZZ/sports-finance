/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ColumnsFieldsTable {
  field: string;
  label: string;
  renderRow?: (
    valueRow?: any
  ) => JSX.Element | JSX.Element[] | string | number | boolean;
  getActions?: (rowValues?: any) => JSX.Element | JSX.Element[];
}

export interface TableProps {
  columns: ColumnsFieldsTable[];
  isLoading?: boolean;
  data?: any[];
}

export interface ColumnCellProps {
  text: string;
}

export interface RowCellProps {
  column: ColumnsFieldsTable;
  item: any;
}

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ClipLoader } from "react-spinners";

import { EmptyList } from "../EmptyList";

export interface ColumnsFieldsTable {
  field: string;
  label: string;
  renderRow?: (
    valueRow?: any
  ) => JSX.Element | JSX.Element[] | string | number | boolean;
  getActions?: (rowValues?: any) => JSX.Element | JSX.Element[];
}

interface TableProps {
  columns: ColumnsFieldsTable[];
  isLoading?: boolean;
  data?: any[];
}

interface ColumnCellProps {
  text: string;
}

interface RowCellProps {
  column: ColumnsFieldsTable;
  item: any;
}

export const ColumnCell = ({ text }: ColumnCellProps) => {
  return <span className='text-sm text-center w-40 font-medium'>{text}</span>;
};

export const RowCell = ({ column, item }: RowCellProps) => {
  return (
    <span className='text-sm w-40 text-center flex justify-center items-center'>
      {column.field === "actions" && column.getActions ? (
        <>{column.getActions(item)}</>
      ) : (
        <>
          {column.renderRow
            ? column.renderRow(item[column.field] ?? "")
            : item[column.field] ?? ""}
        </>
      )}
    </span>
  );
};

export const Table = ({ columns, isLoading, data }: TableProps) => {
  return (
    <>
      <div className='w-full h-full flex flex-col gap-y-2 py-1 shadow-md overflow-y-auto overflow-x-auto bg-slate-100 border border-slate-200 rounded-md'>
        {isLoading ? (
          <ClipLoader color='white' size={20} />
        ) : (
          <>
            <div className='w-full h-12 flex gap-2 py-2 px-1.5 items-center justify-around border-b border-zinc-300 bg-slate-100'>
              {columns.map((column) => (
                <ColumnCell text={column.label} />
              ))}
            </div>

            {data && data?.length > 0 ? (
              <>
                {data.map((item) => (
                  <>
                    <div className='w-full min-h-[52px] flex gap-3 py-3 px-4 items-center justify-between rounded-md shadow-md'>
                      {columns.map((column) => (
                        <RowCell item={item} column={column} />
                      ))}
                    </div>
                  </>
                ))}
              </>
            ) : (
              <>
                <EmptyList>
                  <span className='text-zinc-500 text-lg'>
                    Não foi encontrado nenhum registro no momento!
                  </span>
                </EmptyList>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

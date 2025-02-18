/* eslint-disable @typescript-eslint/no-explicit-any */

import { ClipLoader } from "react-spinners";

import { EmptyList } from "../EmptyList";

export interface ColumnsFieldsTable {
  field: string;
  label: string;
  renderRow?: (valueRow?: any) => JSX.Element[] | string | number | boolean;
  getActions?: (rowValues?: any) => JSX.Element[];
}

interface TableProps {
  columns: ColumnsFieldsTable[];
  isLoading?: boolean;
  data?: any[];
}

interface ColumnCellProps {
  text: string;
}

export const ColumnCell = ({ text }: ColumnCellProps) => {
  return <span className='text-sm font-semibold w-40'>{text}</span>;
};

export const Table = ({ columns, isLoading, data }: TableProps) => {
  return (
    <>
      <div className='w-full h-full flex flex-col gap-2 py-1 shadow-md overflow-y-auto overflow-x-auto'>
        {isLoading ? (
          <ClipLoader color='white' size={20} />
        ) : (
          <>
            <div className='w-full h-16 flex gap-2 py-2 items-center justify-around border-b border-zinc-200'>
              {columns.map((column) => (
                <ColumnCell text={column.label} />
              ))}
            </div>

            {data && data?.length > 0 ? (
              <>
                {data.map((item) => (
                  <div className='w-full h-10 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
                    {columns.map((column) => (
                      <>
                        <span className='text-sm w-40 text-zinc-500'>
                          {column.field === "actions" && column.getActions ? (
                            <span className='flex gap-2'>
                              {column.getActions(item)}
                            </span>
                          ) : (
                            <>
                              {column.renderRow
                                ? column.renderRow(item[column.field] ?? "")
                                : item[column.field] ?? ""}
                            </>
                          )}
                        </span>
                      </>
                    ))}
                  </div>
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

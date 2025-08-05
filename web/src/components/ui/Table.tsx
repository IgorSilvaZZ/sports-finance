import { ClipLoader } from "react-spinners";

import { EmptyList } from "../EmptyList";
import {
  ColumnCellProps,
  RowCellProps,
  TableProps,
} from "../../interfaces/Table.interface";

export const ColumnCell = ({ text }: ColumnCellProps) => {
  return <span className='text-sm text-center font-medium'>{text}</span>;
};

export const RowCell = ({ column, item }: RowCellProps) => {
  return (
    <span className='text-sm text-center flex justify-center'>
      {column.field === "actions" && column.getActions ? (
        <div className='flex gap-1'>{column.getActions(item)}</div>
      ) : (
        <>
          {column.renderRow
            ? column.renderRow(item[column.field] || "-")
            : item[column.field] || "-"}
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
            {/* Colunas */}
            <div
              className='w-full grid py-2 px-1.5 items-center border-b border-zinc-300 bg-slate-100'
              style={{
                gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
              }}
            >
              {columns.map((column) => (
                <ColumnCell text={column.label} />
              ))}
            </div>

            {/* Linhas */}
            {data && data?.length > 0 ? (
              <>
                {data.map((item) => (
                  <>
                    <div
                      className='w-full min-h-[52px] grid items-center py-3 px-4 rounded-md border-b-2'
                      style={{
                        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                      }}
                    >
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

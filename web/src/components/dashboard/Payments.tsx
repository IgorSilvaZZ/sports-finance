import { useSelector } from "react-redux";

import { Table } from "../ui/Table";

import { selectEvent } from "../../store/events/event.slice";
import { getPaymentsColumns } from "../utils/tablesColumns/payments";

export const Payments = () => {
  const { name, payments } = useSelector(selectEvent);

  const paymentsColumns = getPaymentsColumns();

  return (
    <>
      <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3'>
        <div className=' w-full flex items-center justify-between'>
          <span className='font-semibold text-xl'>{name}</span>
        </div>

        <Table columns={paymentsColumns} data={payments} />
      </div>
    </>
  );
};

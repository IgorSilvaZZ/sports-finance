import { useSelector } from "react-redux";
import { format } from "date-fns";

import { Card } from "../Card";
import { Table } from "../ui/Table";

import { selectEvent } from "../../store/events/event.slice";

import { getPaymentsColumns } from "../utils/tablesColumns/payments";

export const Payments = () => {
  const { name, payments, paymentsCount } = useSelector(selectEvent);

  const totalValuesPayments = payments.reduce(
    (acc, curr) => acc + Number(curr.value),
    0
  );

  const lastPayment = payments.reduce((recentPayment, currPayment) => {
    return new Date(currPayment.datePayment) >
      new Date(recentPayment.datePayment)
      ? currPayment
      : recentPayment;
  }, payments[0]);

  const dateRefLastPayment = new Date(lastPayment.datePayment);

  const monthRefLastPayment = format(dateRefLastPayment, "MMMM");

  const paymentsColumns = getPaymentsColumns();

  return (
    <>
      <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3'>
        <div className=' w-full flex items-center justify-between'>
          <span className='font-semibold text-xl'>{name}</span>
        </div>

        {/* Cards */}
        <div className="className='w-full flex flex-wrap justify-evenly gap-4 mb-3">
          <Card
            label='Valor total de pagamentos'
            value={`R$ ${totalValuesPayments.toFixed(2)}`}
          />
          <Card label='Quantidade de pagamentos' value={paymentsCount} />
          <Card
            label='Valor último Pagamento'
            value={`R$ ${Number(lastPayment.value).toFixed(2)}`}
          />
          <Card
            label='Mês referência do último Pagamento'
            value={`${monthRefLastPayment}`}
          />
        </div>

        <Table columns={paymentsColumns} data={payments} />
      </div>
    </>
  );
};

import { useSelector } from "react-redux";

import { EmptyList } from "../EmptyList";

import { selectEvent } from "../../store/events/event.slice";

export const Payments = () => {
  const event = useSelector(selectEvent);

  return (
    <>
      <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3'>
        <div className=' w-full flex items-center justify-between'>
          <span className='font-semibold text-xl'>{event.name}</span>
        </div>

        <div className='w-full h-full flex flex-col gap-2 py-1 shadow-md overflow-y-auto'>
          <div className='w-full h-16 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
            <span className='text-sm font-semibold w-2/6'>Nome</span>
            <span className='text-sm w-36 font-semibold'>Valor</span>
            <span className='text-sm w-36 font-semibold'>Mês Referencia</span>
            <span className='text-sm w-36 font-semibold'>Data Pagamento</span>
          </div>
          {event.payments.length > 0 ? (
            <>
              {event.payments.map((payment) => (
                <div className='w-full h-10 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
                  <span className='text-sm font-semibold w-2/6'>
                    {payment.name}
                  </span>
                  <span className='text-sm w-36 text-zinc-500'>
                    {payment.value}
                  </span>
                  <span className='text-sm w-36 text-zinc-500'>
                    {payment.paymentRef}
                  </span>
                  <span className='text-sm w-36 text-zinc-500'>
                    {payment.datePayment}
                  </span>
                </div>
              ))}
            </>
          ) : (
            <EmptyList>
              <span className='text-zinc-500 text-lg'>
                O evento não contem nenhum participante
              </span>
            </EmptyList>
          )}
        </div>
      </div>
    </>
  );
};

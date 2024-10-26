import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { ModalBase } from "./ui/ModalBase";
import { Button } from "./ui/Button";
import { FormModalBase } from "./ui/FormModalBase";

import { getValueCurrencyFormatted } from "../utils/history";
import { getFormatDate } from "../utils/date";
import { getMonthPaymentRef } from "../utils/payment";

import { selectEvent } from "../store/events/event.slice";
import { selectDashboard } from "../store/dashboard/dashboard.slice";

import { api } from "../lib/axios";

interface ModalCreatePaymentProps {
  remainingValue: number;
  getPaymentsEvent: (eventId: string) => void;
}

export const ModalCreatePayment = ({
  remainingValue,
  getPaymentsEvent,
}: ModalCreatePaymentProps) => {
  const { id: eventId, name, valueMonthly } = useSelector(selectEvent);
  const {
    appliedFilters: { year, month },
  } = useSelector(selectDashboard);

  const [modalOpen, setModalOpen] = useState(false);

  const paymentRef = `${year}-${month}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const newPayment = {
        name: `Pagamento referente ao mês: ${month}`,
        value: Number(valueMonthly),
        datePayment: getFormatDate(new Date(), "yyyy-MM-dd"),
        eventId,
        paymentRef,
      };

      await api.post("/payments", newPayment);

      toast.success("Pagamento realizado com sucesso!");

      getPaymentsEvent(eventId);

      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao realizar pagamento!");
    }
  }

  return (
    <>
      <ModalBase
        title='Realizar pagamento?'
        isOpen={modalOpen}
        handleOpen={() => setModalOpen(!modalOpen)}
        handleClose={() => setModalOpen(false)}
        trigger={() => (
          <Button className='py-1 px-1 w-40 rounded-md bg-green-500 hover:bg-green-600'>
            Novo pagamento
          </Button>
        )}
      >
        <FormModalBase onSubmit={handleSubmit}>
          <h3>
            Pagamento referente:{" "}
            <strong>{getMonthPaymentRef(paymentRef)}</strong>
          </h3>
          <span>
            Evento: <strong>{name}</strong>
          </span>
          <span>
            Valor a ser pago:{" "}
            <strong>{getValueCurrencyFormatted(valueMonthly)}</strong>
          </span>
          {remainingValue > 0 ? (
            <span className='text-xs text-red-400'>
              Faltam R$ {getValueCurrencyFormatted(remainingValue)}, para o
              pagamento ser realizado corretamente
            </span>
          ) : (
            <span className='text-xs text-green-400'>
              Todo o valor foi arrecadado corretamente!
            </span>
          )}
          <div className='w-full flex gap-2 items-center justify-between'>
            <Button
              className='py-1 px-1 w-40 rounded-md'
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              type='submit'
              className='py-1 px-1 w-40 rounded-md bg-green-500 hover:bg-green-700'
            >
              Confirmar
            </Button>
          </div>
        </FormModalBase>
      </ModalBase>
    </>
  );
};

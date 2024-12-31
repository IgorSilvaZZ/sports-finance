import { FormEvent, useState } from "react";
import { parseISO } from "date-fns";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Payment } from "../interfaces/Payment.interface";

import { ModalBase } from "./ui/ModalBase";
import { Button } from "./ui/Button";
import { FormModalBase } from "./ui/FormModalBase";

import { getMonthPaymentRef } from "../utils/payment";
import { getFormatDate } from "../utils/date";
import { getValueCurrencyFormatted } from "../utils/history";

import { selectEvent } from "../store/events/event.slice";

import { api } from "../lib/axios";

interface ModalUndoPaymentProps {
  payment: Payment;
  getPaymentsEvent: (eventId: string) => void;
}

export const ModalUndoPayment = ({
  payment,
  getPaymentsEvent,
}: ModalUndoPaymentProps) => {
  const { id: eventId, name } = useSelector(selectEvent);

  const [modalOpen, setModalOpen] = useState(false);

  const datePaymentParsed = parseISO(payment.datePayment);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await api.delete(`/payments/${payment.id}/event/${eventId}`);

      toast.success("Pagamento removido com sucesso!");

      getPaymentsEvent(eventId);

      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error("Erro ao desfazer pagamento!");
    }
  }

  return (
    <>
      <ModalBase
        title="Desfazer o pagamento?"
        isOpen={modalOpen}
        handleOpen={() => setModalOpen(!modalOpen)}
        handleClose={() => setModalOpen(false)}
        trigger={() => (
          <Button className="py-1 px-1 w-48 rounded-md bg-skyLight hover:bg-skyBold">
            Desfazer pagamento
          </Button>
        )}
      >
        <FormModalBase onSubmit={handleSubmit}>
          <h3>
            Pagamento referente:{" "}
            <strong>{getMonthPaymentRef(payment.paymentRef)}</strong>
          </h3>
          <span>
            Evento: <strong>{name}</strong>
          </span>
          <span>
            Valor pago:{" "}
            <strong>{getValueCurrencyFormatted(Number(payment.value))}</strong>
          </span>
          <span>
            Data de Pagamento:{" "}
            <strong>{getFormatDate(datePaymentParsed, "dd/MM/yyyy")}</strong>
          </span>

          <div className="w-full flex gap-2 items-center justify-between">
            <Button
              className="py-1 px-1 w-40 rounded-md"
              onClick={() => setModalOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="py-1 px-1 w-40 rounded-md bg-skyLight hover:bg-skyBold"
            >
              Desfazer
            </Button>
          </div>
        </FormModalBase>
      </ModalBase>
    </>
  );
};

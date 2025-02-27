import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { DashCard } from "./DashCard";
import { ModalCreateHistory } from "../ModalCreateHistory";
import { ModalCreatePayment } from "../ModalCreatePayment";
import { ModalUndoPayment } from "../ModalUndoPayment";

import { TypeHistory } from "../../enums/TypeHistory.enum";
import { StatusHistory } from "../../enums/StatusHistory.enum";

import { History } from "../../interfaces/History.interface";
import { DashBoardFilters } from "../../interfaces/Dashboard.interface";
import { Table } from "../ui/Table";

import { selectResponsible } from "../../store/responsible/responsible.slice";
import { eventActions, selectEvent } from "../../store/events/event.slice";
import {
  dashboardActions,
  selectDashboard,
} from "../../store/dashboard/dashboard.slice";

import {
  getValueCurrencyFormatted,
  getYears,
  months,
  statusTranslate,
} from "../../utils/history";
import { getCurrentStatusEvent } from "../../utils/event";
import { getColumnsHistory } from "../utils/tablesColumns/dashboard";

import { api } from "../../lib/axios";

export const MainDashboard = () => {
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const event = useSelector(selectEvent);
  const { id: responsibleId } = useSelector(selectResponsible);
  const { editingFilters, appliedFilters } = useSelector(selectDashboard);

  const [isUpdating, setIsUpdating] = useState<boolean>(false); // Flag de controle de atualização dos valores abaixo
  const [initialTotalPaid, setInitialTotalPaid] = useState<number>(0); // Valor pago (Sem filtros)
  const [initialRemaining, setInitialRemaining] = useState<number>(0); // Valor restante (Sem filtros)

  const {
    data: allHistories,
    isLoading,
    refetch,
  } = useQuery<History[]>(["getHistories"], () => getHistories(), {
    refetchOnWindowFocus: false,
    enabled: event.id !== "",
    onSuccess: (data) => {
      const paidHistories = data?.filter((history) => history.status);

      // Valor total do historico (Apenas pagos)
      const calculatedTotalPaid = paidHistories?.reduce((acc, history) => {
        return acc + Number(history.value);
      }, 0);

      const remaining = getDifferenceValue(
        Number(event.valueMonthly),
        calculatedTotalPaid
      );

      if (!initialTotalPaid) setInitialTotalPaid(calculatedTotalPaid);
      if (!initialRemaining) setInitialRemaining(remaining);

      if (isUpdating) {
        setInitialTotalPaid(calculatedTotalPaid);
        setInitialRemaining(remaining);
        setIsUpdating(false);
      }
    },
  });

  const years = getYears();

  const getDifferenceValue = (primaryValue: number, subValue: number) => {
    const result = primaryValue - subValue;

    if (result < 0) {
      return 0;
    }

    return result;
  };

  // Valor arrecadado
  const amountCollected = getDifferenceValue(
    initialTotalPaid,
    event.valueMonthly
  );

  const currentPaymentEvent = getCurrentStatusEvent(
    appliedFilters.year,
    String(appliedFilters.month).padStart(2, "0"),
    event.payments
  );

  const colorStatusPayment = currentPaymentEvent
    ? "text-green-500"
    : "text-red-500";

  function getQueryParams(filtersSearch: DashBoardFilters) {
    const queryParams: { [key: string]: string | number | boolean } = {
      ...filtersSearch,
    };

    Object.keys(queryParams).forEach((key: string | number) => {
      if (["", "all", "select"].includes(String(queryParams[key]))) {
        delete queryParams[key];
      }

      if (key === "month") {
        queryParams[key] = String(queryParams[key]).padStart(2, "0");
      }

      if (key === "status") {
        queryParams[key] = statusTranslate[String(queryParams[key])];
      }
    });

    return queryParams;
  }

  async function getEvent() {
    try {
      const { data } = await api.get(
        `/events/${eventId}/responsible/${responsibleId}`
      );

      dispatch(eventActions.setEvent(data));
    } catch (error) {
      toast.error("Erro ao carregar informações de eventos!");
      console.log(error);

      dispatch(eventActions.clear());
      navigate("/events");
    }
  }

  async function getHistories(): Promise<History[]> {
    try {
      dispatch(dashboardActions.applyFilters());

      const { data } = await api.get("/history", {
        params: { ...getQueryParams(editingFilters), eventId },
      });

      return data;
    } catch (error) {
      console.log(error);
      toast.error("Erro ao coletar o historico!");

      return [];
    }
  }

  async function getPaymentsEvent(eventId: string) {
    try {
      const { data: paymentsEvent } = await api.get(
        `/payments/event/${eventId}`
      );

      dispatch(eventActions.setPayments(paymentsEvent));
    } catch (error) {
      console.log(error);

      toast.error("Erro ao coletar pagamentos de um evento");
    }
  }

  function handleFilters(key: string, value: string | number) {
    dispatch(dashboardActions.changeEditingFilters({ key, value }));
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      editingFilters.month !== appliedFilters.month ||
      editingFilters.year !== appliedFilters.year
    ) {
      setIsUpdating(true);
    }

    refetch();
  }

  async function handleStatusHistory(historyId: string, status: string) {
    const newStatus = status === StatusHistory.PAID ? true : false;

    try {
      await api.put(`/history/${historyId}/event/${event.id}`, {
        status: newStatus,
      });

      setIsUpdating(true);

      refetch();
    } catch (error) {
      console.log(error);

      toast.error("Erro ao atualizar status! Tente novamente!");
    }
  }

  const columnsHistory = getColumnsHistory({ handleStatusHistory });

  useEffect(() => {
    if (eventId) {
      getEvent();
    }
  }, []);

  return (
    <>
      <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3 overflow-hidden'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <span className='font-semibold text-xl'>{event.name}</span>
            <span className='text-zinc-700'>
              {format(
                new Date(`${appliedFilters.year}-${appliedFilters.month}-02`),
                "LLLL",
                {
                  locale: ptBR,
                }
              )}
              {" - "}
            </span>
            <span className={`font-semibold ${colorStatusPayment}`}>
              {currentPaymentEvent
                ? "Pagamento Efetuado"
                : "Pagamento Pendente"}
            </span>
          </div>
          <div className='flex gap-5'>
            <ModalCreateHistory handleUpdating={() => setIsUpdating(true)} />
            {currentPaymentEvent ? (
              <ModalUndoPayment
                getPaymentsEvent={getPaymentsEvent}
                payment={currentPaymentEvent}
              />
            ) : (
              <ModalCreatePayment
                remainingValue={initialRemaining}
                getPaymentsEvent={getPaymentsEvent}
              />
            )}
          </div>
        </div>
        <form
          className='w-full h-[12%] flex items-center justify-around py-2 px-2 shadow-md mb-4'
          onSubmit={handleSearch}
        >
          <input
            className='w-2/6 h-full outline-none'
            placeholder='Nome ou email do participante'
            value={editingFilters.textParticipant}
            onChange={(e) => handleFilters("textParticipant", e.target.value)}
          />
          <select
            className='w-36 h-full outline-none'
            value={editingFilters.status}
            defaultValue='select'
            onChange={(e) => handleFilters("status", e.target.value)}
          >
            <option value='select'>Status</option>
            <option value='all'>Todos</option>
            <option value={StatusHistory.PAID}>Pago</option>
            <option value={StatusHistory.NOT_PAID}>Não Pago</option>
          </select>
          <select
            className='w-36 h-full outline-none'
            value={editingFilters.type}
            defaultValue='select'
            onChange={(e) => handleFilters("type", e.target.value)}
          >
            <option value='select'>Tipo</option>
            <option value='all'>Todos</option>
            <option value={TypeHistory.MONTHLY}>Mensalista</option>
            <option value={TypeHistory.AGGREGATE}>Agregado</option>
          </select>
          <select
            className='w-36 h-full outline-none'
            value={editingFilters.month}
            defaultValue={editingFilters.month}
            onChange={(e) => handleFilters("month", Number(e.target.value))}
          >
            <option value='all'>Mês</option>
            {months.map((item, index) => (
              <option value={index + 1}>{item}</option>
            ))}
          </select>
          <select
            className='w-36 h-full outline-none'
            value={editingFilters.year}
            defaultValue={editingFilters.year}
            onChange={(e) => handleFilters("year", e.target.value)}
          >
            {years.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </select>
          <button type='submit' title='Pesquisar'>
            <MagnifyingGlass size={25} />
          </button>
        </form>

        <div className='h-full w-full flex flex-col'>
          <div className='w-full h-40 flex gap-3 items-center mb-4'>
            <DashCard
              label='Dia de Pagamento'
              subTitle='(Dia do mês)'
              value={String(event?.dayMonthly).padStart(2, "0")}
            />
            <DashCard
              label='Total Pago'
              subTitle='(Pagamentos feitos)'
              value={getValueCurrencyFormatted(Number(initialTotalPaid))}
            />
            <DashCard
              label='Mensalidade'
              subTitle='(Valor mensal)'
              value={getValueCurrencyFormatted(event?.valueMonthly)}
            />
            <DashCard
              label='Restante'
              subTitle='(Falta pagar)'
              value={getValueCurrencyFormatted(initialRemaining)}
            />
            <DashCard
              label='Saldo'
              subTitle='(Valor em caixa)'
              value={getValueCurrencyFormatted(amountCollected)}
            />
          </div>

          <Table
            columns={columnsHistory}
            data={allHistories}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

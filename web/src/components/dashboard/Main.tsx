import { FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import {
  Calendar,
  CalendarCheck,
  CreditCard,
  MagnifyingGlass,
  MoneyWavy,
  TrayArrowDown,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { getMonth, getYear, parseISO } from "date-fns";

import { DatesProvider, MonthPickerInput } from "@mantine/dates";

import "dayjs/locale/pt-br";

import { Card } from "../Card";
import { ModalCreateHistory } from "../ModalCreateHistory";
import { ModalCreatePayment } from "../ModalCreatePayment";
import { ModalUndoPayment } from "../ModalUndoPayment";

import { StatusHistory } from "../../enums/StatusHistory.enum";

import { History } from "../../interfaces/History.interface";
import { Table } from "../ui/Table";

import { selectResponsible } from "../../store/responsible/responsible.slice";
import { eventActions, selectEvent } from "../../store/events/event.slice";
import {
  dashboardActions,
  selectDashboard,
} from "../../store/dashboard/dashboard.slice";

import {
  getValueCurrencyFormatted,
  selectTypeHistory,
} from "../../utils/history";
import { getCurrentStatusEvent } from "../../utils/event";
import { getColumnsHistory } from "../utils/tablesColumns/dashboard";

import { HistoryService } from "../../services/History";
import { EventService } from "../../services/Event";
import { Event } from "../../interfaces/Event.interface";

import { api } from "../../lib/axios";

dayjs.locale("pt-br");

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
  } = useQuery<History[]>(
    ["getHistories", appliedFilters.year, appliedFilters.month],
    () => getHistories(),
    {
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
    }
  );

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

  async function getEvent() {
    try {
      const event = await EventService.getEventByResponsibleId(
        String(eventId),
        responsibleId
      );

      dispatch(eventActions.setEvent(event as Event));
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

      const histories = HistoryService.getHistories(
        String(eventId),
        editingFilters
      );

      return histories;
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

  function handleRefetchSearch() {
    setIsUpdating(true);

    refetch();
  }

  function handleFilters(key: string, value: string | number) {
    dispatch(dashboardActions.changeEditingFilters({ key, value }));
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    handleRefetchSearch();
  }

  async function handleChangeYearMonth(value: string | undefined | null) {
    if (!value) {
      return;
    }

    const valueDateParsed = parseISO(value);

    const yearToDateParsed = getYear(valueDateParsed);
    const monthToDateParsed = getMonth(valueDateParsed) + 1;

    dispatch(
      dashboardActions.changeApplyFilters({
        year: String(yearToDateParsed),
        month: monthToDateParsed,
      })
    );

    // Pesquisando a cada mudança de mes e/ou ano selecionado
    handleRefetchSearch();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3 overflow-hidden'>
        {/* Header */}
        <div className='w-full flex items-center justify-between'>
          <div className='flex gap-x-2 items-center'>
            <span className='font-semibold text-xl'>{event.name}</span>
            <span className={`font-semibold ${colorStatusPayment}`}>
              {currentPaymentEvent
                ? "Pagamento Efetuado"
                : "Pagamento Pendente"}
            </span>
            <DatesProvider settings={{ locale: "ptBR" }}>
              <MonthPickerInput
                placeholder=''
                variant='filled'
                className='font-medium text-center bg-slate-100 ring-0 border border-slate-200 rounded-md hover:ring-1'
                value={
                  new Date(`${appliedFilters.year}-${appliedFilters.month}-02`)
                }
                onChange={handleChangeYearMonth}
                leftSection={<Calendar />}
                maxDate={new Date()}
                withAsterisk
              />
            </DatesProvider>
          </div>
          <div className='flex gap-x-5'>
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

        <div className='h-full w-full flex flex-col'>
          <div className='w-full flex flex-wrap justify-between gap-4 mb-3'>
            <Card
              label='Dia de Pagamento'
              icon={CreditCard}
              titleSize='extraLarge'
              value={String(event?.dayMonthly).padStart(2, "0")}
            />
            <Card
              label='Total Pago'
              icon={MoneyWavy}
              value={getValueCurrencyFormatted(Number(initialTotalPaid))}
            />
            <Card
              label='Mensalidade'
              icon={CalendarCheck}
              value={getValueCurrencyFormatted(event?.valueMonthly)}
            />
            <Card
              label='Restante'
              icon={TrayArrowDown}
              value={getValueCurrencyFormatted(initialRemaining)}
            />
            <Card
              label='Saldo'
              icon={TrayArrowDown}
              value={getValueCurrencyFormatted(amountCollected)}
            />
          </div>

          <form
            className='w-full flex flex-col gap-3 md:flex-row md:items:center md:gap-4 py-3'
            onSubmit={handleSearch}
          >
            <input
              className='flex-1 p-2 bg-slate-100 border border-slate-200 rounded-md outline-none'
              value={editingFilters.textParticipant}
              placeholder='Nome ou email do participante'
              onChange={(e) => handleFilters("textParticipant", e.target.value)}
            />
            <select
              className='flex-1 md:max-w-[200px] p-2 bg-slate-100 border border-slate-200 rounded-md outline-none'
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
              className='flex-1 md:max-w-[200px] p-1 bg-slate-100 border border-slate-200 rounded-md outline-none'
              value={editingFilters.type}
              defaultValue='select'
              onChange={(e) => handleFilters("type", e.target.value)}
            >
              <option value='select'>Tipo</option>
              <option value='all'>Todos</option>
              {selectTypeHistory.map((item) => (
                <option value={item.value}>{item.value}</option>
              ))}
            </select>
            <button
              type='submit'
              className='w-full md:w-auto px-4 py-1 bg-skyLight text-white rounded-md'
            >
              <MagnifyingGlass size={22} />
            </button>
          </form>

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

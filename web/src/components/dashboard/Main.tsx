import { FormEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ClipLoader } from "react-spinners";

import { DashCard } from "./DashCard";
import { EmptyList } from "../EmptyList";
import { ModalCreateHistory } from "../ModalCreateHistory";
import { Button } from "../ui/Button";

import { TypeHistory } from "../../enums/TypeHistory.enum";

import { History } from "../../interfaces/History.interface";
import { DashBoardFilters } from "../../interfaces/Dashboard.interface";

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
  typeTranslate,
} from "../../utils/history";
import { getCurrentStatusEvent } from "../../utils/event";

import { api } from "../../lib/axios";
import { StatusHistory } from "../../enums/StatusHistory.enum";

export const MainDashboard = () => {
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const event = useSelector(selectEvent);
  const { id: responsibleId } = useSelector(selectResponsible);
  const { editingFilters, appliedFilters } = useSelector(selectDashboard);

  const {
    data: allHistories,
    isLoading,
    refetch,
  } = useQuery<History[]>(["getHistories"], () => getHistories(), {
    refetchOnWindowFocus: false,
  });

  const paidHistories = allHistories?.filter((history) => history.status);

  const years = getYears();

  // Valor total do historico (Apenas pagos)
  const totalValue = paidHistories?.reduce((acc, history) => {
    return acc + Number(history.value);
  }, 0);

  const getDifferenceValue = (primaryValue: number, subValue: number) => {
    const result = primaryValue - subValue;

    if (result < 0) {
      return 0;
    }

    return result;
  };

  // Valor arrecadado
  const amountCollected = getDifferenceValue(
    Number(totalValue),
    event.valueMonthly
  );

  const remaining = getDifferenceValue(
    Number(event.valueMonthly),
    Number(totalValue)
  );

  const currentPaymentStatus = getCurrentStatusEvent(
    appliedFilters.year,
    String(appliedFilters.month).padStart(2, "0"),
    event.payments
  );

  const colorStatusPayment = currentPaymentStatus
    ? "text-green-500"
    : "text-red-500";

  function getQueryParams(filtersSearch: DashBoardFilters) {
    const queryParams: { [key: string]: string | number | boolean } = {
      ...filtersSearch,
    };

    Object.keys(queryParams).forEach((key: string | number) => {
      if (
        queryParams[key] === "" ||
        queryParams[key] === "all" ||
        queryParams[key] === "select"
      ) {
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

  function handleFilters(key: string, value: string | number) {
    dispatch(dashboardActions.changeEditingFilters({ key, value }));
  }

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    refetch();
  }

  async function handleStatusHistory(historyId: string, status: string) {
    const newStatus = status === StatusHistory.PAID ? true : false;

    try {
      await api.put(`/history/${historyId}/event/${event.id}`, {
        status: newStatus,
      });

      toast.success("Status atualizado com sucesso!");

      refetch();
    } catch (error) {
      console.log(error);

      toast.error("Erro ao atualizar status! Tente novamente!");
    }
  }

  useEffect(() => {
    if (eventId) {
      getEvent();
    }
  }, []);

  return (
    <>
      <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <span className='font-semibold text-xl'>{event.name}</span>
            <span className='text-zinc-700'>
              {format(
                new Date(
                  `${appliedFilters.year}-${appliedFilters.month + 1}-01`
                ),
                "LLLL",
                {
                  locale: ptBR,
                }
              )}
              {" - "}
            </span>
            <span className={`font-semibold ${colorStatusPayment}`}>
              {currentPaymentStatus
                ? "Pagamento Efetuado"
                : "Pagamento Pendente"}
            </span>
          </div>
          <div className='flex gap-5'>
            <ModalCreateHistory />
            {!currentPaymentStatus && (
              <Button className='py-1 px-1 w-40 rounded-md bg-skyLight hover:bg-skyBold'>
                Novo pagamento
              </Button>
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
          <div className='w-full h-40 flex gap-3 items-center'>
            <DashCard
              label='Dia de Pagamento'
              subTitle='(Dia do mês)'
              value={String(event?.dayMonthly).padStart(2, "0")}
            />
            <DashCard
              label='Total Pago'
              subTitle='(Pagamentos feitos)'
              value={getValueCurrencyFormatted(Number(totalValue))}
            />
            <DashCard
              label='Mensalidade'
              subTitle='(Valor mensal)'
              value={getValueCurrencyFormatted(event?.valueMonthly)}
            />
            <DashCard
              label='Restante'
              subTitle='(Falta pagar)'
              value={getValueCurrencyFormatted(remaining)}
            />
            <DashCard
              label='Saldo'
              subTitle='(Valor em caixa)'
              value={getValueCurrencyFormatted(amountCollected)}
            />
          </div>

          {!isLoading ? (
            <>
              {allHistories && allHistories?.length > 0 ? (
                <>
                  <div className='w-full h-96 max-h-[700px] flex flex-col gap-2 py-1 shadow-md overflow-y-auto'>
                    <div className='w-full h-16 flex gap-2 py-2 items-center justify-around border-b border-zinc-200'>
                      <span className='text-sm font-semibold w-36'>
                        Descrição
                      </span>
                      <span className='text-sm font-semibold w-36'>
                        Participante
                      </span>
                      <span className='text-sm w-36 font-semibold'>Status</span>
                      <span className='text-sm w-36 font-semibold'>Tipo</span>
                      <span className='text-sm w-32 font-semibold'>Valor</span>
                      <span className='text-sm w-40 font-semibold'>
                        Data de pagamento
                      </span>
                    </div>
                    {allHistories.map((history) => (
                      <>
                        <div
                          className='w-full h-10 flex gap-2 py-2 items-center justify-around border-b border-zinc-200'
                          key={history.id}
                        >
                          <span className='text-sm font-semibold w-36'>
                            {history.name}
                          </span>
                          <span className='text-sm font-semibold w-36'>
                            {history.participant.name}
                          </span>
                          <select
                            className='text-sm w-36 text-zinc-500 border-2 border-zinc-200 outline-none rounded-md py-1'
                            value={
                              history.status
                                ? StatusHistory.PAID
                                : StatusHistory.NOT_PAID
                            }
                            onChange={(e) =>
                              handleStatusHistory(history.id, e.target.value)
                            }
                          >
                            <option value={StatusHistory.PAID}>Pago</option>
                            <option value={StatusHistory.NOT_PAID}>
                              Não pago
                            </option>
                          </select>
                          <span className='text-sm w-36 text-zinc-500'>
                            {typeTranslate[history.type]}
                          </span>
                          <span className='text-sm w-32'>
                            {getValueCurrencyFormatted(Number(history.value))}
                          </span>
                          <span className='text-sm w-40'>
                            {format(
                              new Date(history.updateDate),
                              "dd/MM/yyyy HH:mm"
                            )}
                          </span>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <EmptyList>
                    <span className='text-zinc-500 text-lg'>
                      Não foi encontrado nenhuma transação no momento!
                    </span>
                  </EmptyList>
                </>
              )}
            </>
          ) : (
            <div className='w-full flex flex-1 items-center justify-center'>
              <ClipLoader color='white' size={20} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

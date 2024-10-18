import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { toast } from "sonner";

import { MagnifyingGlass, UserCircle } from "@phosphor-icons/react";

import { DashCard } from "./DashCard";
import { EmptyList } from "../EmptyList";
import { ModalCreateHistory } from "../ModalCreateHistory";
import { Button } from "../ui/Button";

import { History } from "../../interfaces/History.interface";

import { selectResponsible } from "../../store/responsible/responsible.slice";
import { eventActions, selectEvent } from "../../store/events/event.slice";

import {
  getValueCurrencyFormatted,
  getYears,
  typeTranslate,
} from "../../utils/history";

import { api } from "../../lib/axios";
import { format } from "date-fns";
import { TypeHistory } from "../../enums/TypeHistory.enum";

export const MainDashboard = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const event = useSelector(selectEvent);
  const { id: responsibleId } = useSelector(selectResponsible);

  const { data: allHistories } = useQuery<History[]>(
    ["getHistories"],
    () => getHistories(),
    { refetchOnWindowFocus: false }
  );

  const paidHistories = allHistories?.filter((history) => history.status);

  const years = getYears();

  // Valor total do historico
  const totalValue = paidHistories?.reduce((acc, history) => {
    return acc + Number(history.value);
  }, 0);

  const getAmountCollected = (
    totalValueHistory: number,
    valueMonthly: number
  ) => {
    const result = totalValueHistory - valueMonthly;

    if (result < 0) {
      return 0;
    }

    return result;
  };

  const amountCollected = getAmountCollected(
    Number(totalValue),
    event.valueMonthly
  );

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
      const { data } = await api.get("/history", { params: { eventId } });

      return data;
    } catch (error) {
      console.log(error);
      toast.error("Erro ao coletar o historico!");

      return [];
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
        <div className=' w-full flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <span className='font-semibold text-xl'>Meu evento</span>
            <span className='text-zinc-700'>Outubro</span>
          </div>
          <div className='flex gap-5'>
            <ModalCreateHistory />
            <Button className='py-1 px-1 w-40 rounded-md bg-skyLight hover:bg-skyBold'>
              Novo pagamento
            </Button>
          </div>
        </div>
        <div className='w-full h-[12%] flex items-center justify-around gap-4 py-2 px-2 shadow-md mb-4'>
          <input
            className='w-2/6 h-full outline-none'
            placeholder='Nome ou email do participante'
          />
          <select className='w-36 h-full outline-none'>
            <option value='all'>Status</option>
            <option value='paid'>Pago</option>
            <option value='not-paid'>Não Pago</option>
          </select>
          <select className='w-36 h-full outline-none'>
            <option value='all'>Tipo</option>
            <option value={TypeHistory.MONTHLY}>Mensalista</option>
            <option value={TypeHistory.AGGREGATE}>Agregado</option>
          </select>
          <select className='w-36 h-full outline-none'>
            <option value='all'>Mês</option>
          </select>
          {/* Colocar a lib react-calendar */}
          <select className='w-36 h-full outline-none'>
            {years.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </select>
          <button>
            <MagnifyingGlass size={25} />
          </button>
        </div>

        <div className='h-full w-full flex flex-col'>
          <div className='w-full h-40 flex gap-3 items-center'>
            <DashCard
              label='Dia de pagamento'
              value={String(event?.dayMonthly).padStart(2, "0")}
            />
            <DashCard
              label='Valor Arrecadado'
              value={getValueCurrencyFormatted(Number(totalValue))}
            />
            <DashCard
              label='Valor mensalidade'
              value={getValueCurrencyFormatted(event?.valueMonthly)}
            />
            <DashCard
              label='Valor caixa'
              value={getValueCurrencyFormatted(amountCollected)}
            />
          </div>

          {allHistories && allHistories?.length > 0 ? (
            <>
              <div className='w-full h-96 max-h-[700px] flex flex-col gap-2 py-1 shadow-md overflow-y-auto'>
                <div className='w-full h-16 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
                  <span className='text-sm font-semibold w-2/6'>Nome</span>
                  <span className='text-sm w-36 font-semibold'>Status</span>
                  <span className='text-sm w-36 font-semibold'>Tipo</span>
                  <span className='text-sm w-32 font-semibold'>Valor</span>
                  <span className='text-sm w-40 font-semibold'>
                    Data de pagamento
                  </span>
                </div>
                {allHistories.map((history) => (
                  <>
                    <div className='w-full h-10 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
                      <div className='flex gap-3 items-center w-2/6'>
                        <UserCircle size={25} />
                        <span className='text-sm font-semibold'>
                          {history.participant.name}
                        </span>
                      </div>
                      <select
                        className='text-sm w-36 text-zinc-500 border-2 border-zinc-200 outline-none rounded-md py-1'
                        value={history.status ? "paid" : "not-paid"}
                      >
                        <option value='paid'>Pago</option>
                        <option value='not-paid'>Não pago</option>
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
        </div>
      </div>
    </>
  );
};

import { useState, useEffect } from "react";
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
import { eventActions } from "../../store/events/event.slice";

import { api } from "../../lib/axios";

export const MainDashboard = () => {
  const { eventId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: responsibleId } = useSelector(selectResponsible);

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

  const { data: allHistories } = useQuery<History[]>(
    ["getHistories"],
    () => getHistories(),
    { refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (eventId) {
      getEvent();
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEventListEmpty, setIsEventListEmpty] = useState<boolean>(false);

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
          </select>
          <select className='w-36 h-full outline-none'>
            <option value='all'>Tipo</option>
          </select>
          <select className='w-36 h-full outline-none'>
            <option value='all'>Mês</option>
          </select>
          <select className='w-36 h-full outline-none'>
            <option value='all'>Ano</option>
          </select>
          <button>
            <MagnifyingGlass size={25} />
          </button>
        </div>

        <div className='h-full w-full flex flex-col'>
          <div className='w-full h-40 flex gap-3 items-center'>
            <DashCard label='Dia de pagamento' value={"04"} />
            <DashCard label='Valor Arrecadado' value={"R$ 100,00"} />
            <DashCard label='Valor mensalidade' value={"R$ 300,00"} />
            <DashCard label='Valor caixa' value={"R$ 50,00"} />
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
                        value={history.status ? "sim" : "nao"}
                      >
                        <option value='sim'>Pago</option>
                        <option value='nao'>Não pago</option>
                      </select>
                      <span className='text-sm w-36 text-zinc-500'>
                        {history.type}
                      </span>
                      <span className='text-sm w-32'>{history.value}</span>
                      <span className='text-sm w-40'>{history.updateDate}</span>
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

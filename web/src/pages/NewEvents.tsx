// #e5eaf6 => Cor de fundo

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "@phosphor-icons/react";

import { NewCardsEvent } from "../components/NewCardsEvent";

import { dashboardActions } from "../store/dashboard/dashboard.slice";
import { responsibleActions } from "../store/responsible/responsible.slice";

export default function NewEvents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function goToBack() {
    dispatch(dashboardActions.clearFilters());
    dispatch(responsibleActions.clear());
    navigate("/");
  }

  return (
    <>
      <div className='min-h-screen w-full bg-backgroundEvents px-4'>
        <div className='h-full max-w-[1200px] mx-auto py-10 flex flex-col gap-10'>
          <span
            className='flex gap-2 font-semibold text-zinc-500 text-lg cursor-pointer transition-all hover:text-zinc-800'
            onClick={goToBack}
          >
            <ArrowLeft size={22} /> Voltar
          </span>

          {/* h-[calc(100vh-160px)] => Altura do viewport menos o padding do header (Botao de voltar), juntamente com o padding da tela geral */}
          <div className='w-full flex flex-col gap-5 items-center justify-center leading-tight h-[calc(100vh-160px)]'>
            <p className='text-5xl font-medium mb-4'>Meus Eventos</p>

            <div className='flex flex-col gap-4 overflow-y-auto'>
              <NewCardsEvent />
              <NewCardsEvent />
              <NewCardsEvent />
              <NewCardsEvent />
              <NewCardsEvent />
              <NewCardsEvent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

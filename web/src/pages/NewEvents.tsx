// #e5eaf6 => Cor de fundo

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "@phosphor-icons/react";

import { dashboardActions } from "../store/dashboard/dashboard.slice";
import { responsibleActions } from "../store/responsible/responsible.slice";
import { IconSport } from "../components/IconSport";

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
      <div className='h-full w-full bg-backgroundEvents px-4'>
        <div className='max-w-[1200px] mx-auto py-10 flex flex-col gap-10'>
          <span
            className='flex gap-2 font-semibold text-zinc-500 text-lg cursor-pointer transition-all hover:text-zinc-800'
            onClick={goToBack}
          >
            <ArrowLeft size={22} /> Voltar
          </span>

          <div className='h-full w-full flex flex-col gap-5 items-center justify-center leading-tight'>
            <p className='text-5xl font-medium'>Meus Eventos</p>

            <div className='w-full h-[160px] bg-white rounded-xl flex gap-3 items-center justify-evenly px-7'>
              <IconSport size={75} type='soccer' />

              <div className='flex flex-col gap-1 w-[700px]'>
                <p className='text-sm font-medium'>Tenis com os amigos</p>
                <p className='text-zinc-500 overflow-clip text-xs'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                  magni sapiente consequuntur voluptatum modi aut incidunt
                  doloribus nesciunt maxime quas esse veniam velit reiciendis
                  odit, reprehenderit dignissimos similique? Quis, nihil?
                </p>
              </div>

              <div className='flex gap-1 items-center'>
                <button className='px-3 py-2 rounded-xl bg-red-500 text-white'>
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

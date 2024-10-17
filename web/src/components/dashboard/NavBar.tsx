import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SoccerBall, UserCircle } from "@phosphor-icons/react";

import { OptionsNavBar } from "../../enums/OptionsNavBar.enum";

import { ItemNavBar } from "./ItemNavBar";

import { eventActions } from "../../store/events/event.slice";

interface NavBarProps {
  handleOption: (option: OptionsNavBar) => void;
}

export const NavBar = ({ handleOption }: NavBarProps) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(eventActions.clear());
    navigation("/events");
  }

  return (
    <>
      <div className='w-[14%] h-full flex flex-col gap-5 border-1 border-r border-zinc-300 px-3 py-3'>
        <SoccerBall size={40} className='mb-8' />

        <div className='w-full flex flex-1 flex-col gap-3'>
          <ItemNavBar handleClick={() => handleOption(OptionsNavBar.DASHBOARD)}>
            Inicio
          </ItemNavBar>
          <ItemNavBar
            handleClick={() => handleOption(OptionsNavBar.PARTICIPANTS)}
          >
            Participantes
          </ItemNavBar>
          <ItemNavBar
            handleClick={() => handleOption(OptionsNavBar.PARTICIPANTS)}
          >
            Pagamentos
          </ItemNavBar>
          <ItemNavBar
            handleClick={() => handleOption(OptionsNavBar.EDIT_EVENT)}
          >
            Editar evento
          </ItemNavBar>
          <ItemNavBar handleClick={handleLogout}>Sair</ItemNavBar>
        </div>

        <div className='flex items-center gap-2 cursor-pointer'>
          <UserCircle size={28} />
          <span className='text-zinc-500 text-lg'>Igor Silva</span>
        </div>
      </div>
    </>
  );
};

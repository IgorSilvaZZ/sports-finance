import { SoccerBall, UserCircle } from "@phosphor-icons/react";

export const NavBar = () => {
  return (
    <>
      <div className='w-[14%] h-full flex flex-col gap-5 border-1 border-r border-zinc-300 px-3 py-3'>
        <SoccerBall size={40} className='mb-8' />

        <div className='w-full flex flex-1 flex-col gap-3'>
          <span className='text-lg text-zinc-500 font-semibold cursor-pointer transition-colors hover:text-skyBold'>
            Inicio
          </span>
          <span className='text-lg text-zinc-500 font-semibold cursor-pointer transition-colors hover:text-skyBold'>
            Perfil
          </span>
          <span className='text-lg text-zinc-500 font-semibold cursor-pointer transition-colors hover:text-skyBold'>
            Participantes
          </span>
          <span className='text-lg text-zinc-500 font-semibold cursor-pointer transition-colors hover:text-skyBold'>
            Editar evento
          </span>
          <span className='text-lg text-zinc-500 font-semibold cursor-pointer transition-colors hover:text-skyBold'>
            Sair
          </span>
        </div>

        <div className='flex items-center gap-2'>
          <UserCircle size={28} />
          <span className='text-zinc-500 text-lg'>Igor Silva</span>
        </div>
      </div>
    </>
  );
};

import { Pencil, TrashSimple, Users } from "@phosphor-icons/react";

import { IconSport } from "./IconSport";

export const NewCardsEvent = () => {
  return (
    <>
      <div className='w-full h-[160px] bg-white rounded-xl flex gap-3 items-center justify-evenly px-7 relative shadow-sm hover:shadow-md transition'>
        <div className='flex gap-4 absolute top-2 right-6'>
          <button
            title='Editar'
            className='text-gray-500 transition-colors hover:text-gray-600'
          >
            <Pencil size={20} />
          </button>
          <button
            title='Remover'
            className='text-red-500 transition-colors hover:text-red-600'
          >
            <TrashSimple size={20} />
          </button>
        </div>

        <IconSport size={75} type='soccer' />

        <div className='flex flex-col gap-3 w-[650px]'>
          <p className='text-sm font-medium'>Tenis com os amigos</p>
          <p className='text-zinc-500 line-clamp-3 text-xs'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit magni
            sapiente consequuntur voluptatum modi aut incidunt doloribus
            nesciunt maxime quas esse veniam velit reiciendis odit,
            reprehenderit dignissimos similique? Quis, nihil?
          </p>
          <section className='flex gap-2 items-center'>
            <span className='flex items-center gap-2 bg-gray-100 text-gray-700 text-xs px-1.5 py-1.5 rounded-full '>
              <Users /> 10 participante(s)
            </span>
          </section>
        </div>

        <button className='flex items-center px-3 py-2 rounded-xl bg-skyLight text-white transition-colors hover:bg-skyBold'>
          Ver Detalhes
        </button>
      </div>
    </>
  );
};

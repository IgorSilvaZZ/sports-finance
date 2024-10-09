import { MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react";

import { Button } from "../ui/Button";

export const Participants = () => {
  return (
    <>
      <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3'>
        <div className=' w-full flex items-center justify-between'>
          <span className='font-semibold text-xl'>Meu evento</span>
          <Button className='py-1 px-1 w-40 rounded-md'>
            Novo participante
          </Button>
        </div>

        <div className='h-full w-full flex flex-col'>
          <div className='w-full h-[12%] flex items-center justify-around gap-4 py-2 shadow-md mb-4'>
            <input className='w-64 h-full outline-none' placeholder='Nome' />
            <input className='w-64 h-full outline-none' placeholder='Email' />
            <input
              className='w-64 h-full outline-none'
              placeholder='Telefone'
            />
            <button>
              <MagnifyingGlass size={25} />
            </button>
          </div>
          <div className='w-full h-full flex flex-col gap-2 py-1 shadow-md overflow-y-auto'>
            <div className='w-full h-16 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
              <span className='text-sm font-semibold w-2/6'>Nome</span>
              <span className='text-sm w-36 font-semibold'>Email</span>
              <span className='text-sm w-36 font-semibold'>Telefone</span>
              <span className='text-sm w-40 font-semibold'>Ações</span>
            </div>
            <div className='w-full h-10 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
              <span className='text-sm w-2/6 text-zinc-500'>Nome</span>
              <span className='text-sm w-36 text-zinc-500'>
                email@email.com
              </span>
              <span className='text-sm w-36 text-zinc-500'>
                (11) 95555-9000
              </span>
              <div className='text-sm flex items-center w-40 gap-5 font-semibold'>
                <button title='Excluir'>
                  <PencilSimple size={20} />
                </button>
                <button title='Excluir'>
                  <Trash size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

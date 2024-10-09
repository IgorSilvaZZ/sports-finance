import { MagnifyingGlass, SoccerBall, UserCircle } from "@phosphor-icons/react";

import { Button } from "../components/ui/Button";

export default function Dashboard() {
  return (
    <>
      <div className='h-full w-full flex gap-10 py-10'>
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

        <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3'>
          <div className=' w-full flex items-center justify-between'>
            <span className='font-semibold text-xl'>Meu evento</span>
            <Button className='py-1 px-1 w-40 rounded-md'>
              Nova transação
            </Button>
          </div>
          <div className='w-full h-40 flex gap-3 items-center'>
            <div className='flex flex-col items-center justify-center py-5 px-5 gap-3 h-full w-72 rounded-lg shadow-lg'>
              <span className='text-xl font-semibold text-skyLight'>
                Total de participantes
              </span>
              <span className='text-lg'>10</span>
            </div>
            <div className='flex flex-col items-center justify-center py-5 px-5 gap-3 h-full w-72 rounded-lg shadow-lg'>
              <span className='text-xl font-semibold text-skyLight'>
                Dia de pagamento
              </span>
              <span className='text-lg'>04</span>
            </div>
            <div className='flex flex-col items-center justify-center py-5 px-5 gap-3 h-full w-72 rounded-lg shadow-lg'>
              <span className='text-xl font-semibold text-skyLight'>
                Valor mensalidade
              </span>
              <span className='text-lg'>R$ 300,00</span>
            </div>
            <div className='flex flex-col items-center justify-center py-5 px-5 gap-3 h-full w-72 rounded-lg shadow-lg'>
              <span className='text-xl font-semibold text-skyLight'>
                Valor caixa
              </span>
              <span className='text-lg'>R$ 50,00</span>
            </div>
          </div>
          <div className='h-full w-full flex flex-col'>
            <div className='w-full h-14 flex items-center justify-around gap-4 py-2 px-2 shadow-md mb-4'>
              <input
                className='w-2/5 h-full outline-none'
                placeholder='Nome ou email do participante'
              />
              <select className='w-36 h-full outline-none'>
                <option value='all'>Status</option>
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
            <div className='w-full h-full flex flex-col gap-2 py-1 shadow-md overflow-y-auto'>
              <div className='w-full h-16 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
                <span className='text-sm font-semibold w-2/5'>Nome</span>
                <span className='text-sm w-36 font-semibold'>Tipo</span>
                <span className='text-sm w-36 font-semibold'>Valor</span>
                <span className='text-sm w-36 font-semibold'>
                  Data da transação
                </span>
              </div>
              <div className='w-full h-10 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
                <span className='text-sm w-2/5 text-zinc-500'>Nome</span>
                <select className='text-sm w-36 bg-red-500 text-white'>
                  <option value='nao'>Não pago</option>
                  <option value='sim'>Pago</option>
                </select>
                <span className='text-sm w-36'>Valor</span>
                <span className='text-sm w-36'>Data da transação</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { ArrowRight, Trash } from "@phosphor-icons/react";

import { Event } from "../interfaces/Event.interface";

import cardImage from "../assets/card-image.png";

interface CardsProps {
  event: Event;
}

export const Cards = ({ event }: CardsProps) => {
  function handleDeletEvent(eventId: string) {
    console.log(eventId);
  }

  return (
    <>
      <div className='flex flex-col px-5 gap-5 items-center w-64 h-[400px] border border-gray-200 rounded-lg shadow-md'>
        <section className='w-full flex justify-end py-3'>
          <button title='Remover' onClick={() => handleDeletEvent(event.id)}>
            <Trash
              size={20}
              className='text-red-500 opacity-50 transition-all hover:opacity-100'
            />
          </button>
        </section>
        <img src={cardImage} alt='Icon card image' className='w-[60px]' />
        <section className='w-full flex gap-2 items-center'>
          <span className='h-5 w-5 flex justify-center items-center text-xs text-white rounded-full bg-skyBold'>
            <p>3</p>
          </span>
          <p className='text-sm text-skyLight'>Participantes</p>
        </section>
        <section className='w-full flex h-52 flex-col justify-between'>
          <div>
            <p className='font-medium mb-2'>{event.name}</p>
            <div className='flex flex-1 overflow-y-auto'>
              <p className='text-zinc-500 text-sm'>{event.description}</p>
            </div>
          </div>
          <div className='flex justify-end'>
            <button className='py-2 px-3 rounded-xl bg-skyBold font-semibold text-white border-none outline-none'>
              <ArrowRight size={20} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

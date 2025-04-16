import { ArrowRight, TrashSimple } from "@phosphor-icons/react";

import { IconSport } from "./IconSport";

import { Event } from "../interfaces/Event.interface";
interface CardsProps {
  event: Event;
  selectEvent: (eventId: string) => void;
  deleteEvent: (eventId: string, responsibleId: string) => void;
}

export const Cards = ({ event, selectEvent, deleteEvent }: CardsProps) => {
  function handleSelectEvent(eventId: string) {
    selectEvent(eventId);
  }

  function handleDeleteEvent(eventId: string, responsibleId: string) {
    deleteEvent(eventId, responsibleId);
  }

  return (
    <>
      <div className='flex flex-col px-5 gap-3 items-center w-64 h-[300px] border border-gray-200 rounded-xl shadow-md'>
        <section className='w-full flex justify-end py-3'>
          <button
            title='Remover'
            onClick={() => handleDeleteEvent(event.id, event.responsibleId)}
          >
            <TrashSimple
              size={20}
              className='text-red-500 transition-all hover:text-red-700'
            />
          </button>
        </section>

        <div className='rounded-full p-2 border border-gray-300 font-bold'>
          <IconSport size={50} type={event.type} />
        </div>

        <section className='w-full flex gap-2 items-center justify-center'>
          <span className='h-5 w-5 flex justify-center items-center text-xs text-white rounded-full bg-skyBold'>
            <p>{event.participantsCount}</p>
          </span>
          <p className='text-sm text-skyLight'>Participante(s)</p>
        </section>
        <section className='w-full flex justify-center'>
          <div>
            <p className='font-medium mb-2'>{event.name}</p>
            <div className='flex flex-1 overflow-y-auto'>
              <p className='text-zinc-500 text-sm'>{event.description}</p>
            </div>
          </div>
        </section>
        <div className='w-full flex justify-end py-2'>
          <button
            className='py-1 px-1 rounded-lg bg-skyBold font-semibold text-white border-none outline-none'
            onClick={() => handleSelectEvent(event.id)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

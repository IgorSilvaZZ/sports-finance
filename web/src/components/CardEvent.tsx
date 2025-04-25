import { Pencil, TrashSimple, Users } from "@phosphor-icons/react";

import { Event } from "../interfaces/Event.interface";

import { IconSport } from "./IconSport";

interface NewCardsEventProps {
  event: Event;
  onEditEvent: (event: Event) => void;
  onViewDetails: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
}

export const CardEvent = ({
  event,
  onEditEvent,
  onViewDetails,
  onDeleteEvent,
}: NewCardsEventProps) => {
  return (
    <>
      <div className='w-full h-[160px] bg-white rounded-xl flex gap-3 items-center justify-evenly px-7 py-2 relative shadow-sm hover:shadow-md transition'>
        <div className='flex gap-4 absolute top-2 right-6'>
          <button
            title='Editar'
            className='text-gray-500 transition-colors hover:text-gray-600'
            onClick={() => onEditEvent(event)}
          >
            <Pencil size={20} />
          </button>
          <button
            title='Remover'
            onClick={() => onDeleteEvent(event.id)}
            className='text-red-500 transition-colors hover:text-red-600'
          >
            <TrashSimple size={20} />
          </button>
        </div>

        <IconSport size={75} type={event.type} />

        <div className='flex flex-col gap-3 w-[650px]'>
          <p className='text-sm font-medium'>{event.name}</p>
          <p className='text-zinc-500 line-clamp-3 text-xs'>
            {event.description}
          </p>
          <section className='flex gap-2 items-center'>
            <span className='flex items-center gap-2 bg-gray-100 text-gray-700 text-xs px-1.5 py-1.5 rounded-full '>
              <Users /> {event.participantsCount} participante(s)
            </span>
          </section>
        </div>

        <button
          onClick={() => onViewDetails(event.id)}
          className='flex items-center px-3 py-2 rounded-xl bg-skyLight text-white transition-colors hover:bg-skyBold'
        >
          Ver Detalhes
        </button>
      </div>
    </>
  );
};

import {
  ArrowRight,
  Basketball,
  PersonSimpleThrow,
  Racquet,
  SoccerBall,
  Strategy,
  TennisBall,
  Trash,
} from "@phosphor-icons/react";

import { Event } from "../interfaces/Event.interface";
interface CardsProps {
  event: Event;
  selectEvent: (eventId: string) => void;
  deleteEvent: (eventId: string, responsibleId: string) => void;
}

const sizeIconTypeEvent = 70;

export const Cards = ({ event, selectEvent, deleteEvent }: CardsProps) => {
  function handleSelectEvent(eventId: string) {
    selectEvent(eventId);
  }

  function handleDeletEvent(eventId: string, responsibleId: string) {
    deleteEvent(eventId, responsibleId);
  }

  return (
    <>
      <div className='flex flex-col px-5 gap-5 items-center w-64 h-[400px] border border-gray-200 rounded-lg shadow-md'>
        <section className='w-full flex justify-end py-3'>
          <button
            title='Remover'
            onClick={() => handleDeletEvent(event.id, event.responsibleId)}
          >
            <Trash
              size={20}
              className='text-red-500 opacity-50 transition-all hover:opacity-100'
            />
          </button>
        </section>
        {event.type === "soccer" && <SoccerBall size={sizeIconTypeEvent} />}
        {event.type === "basketball" && <Basketball size={sizeIconTypeEvent} />}
        {event.type === "volleyball" && (
          <PersonSimpleThrow size={sizeIconTypeEvent} />
        )}
        {event.type === "tennis" && <TennisBall size={sizeIconTypeEvent} />}
        {event.type === "table_tennis" && <Racquet size={sizeIconTypeEvent} />}
        {event.type === "other" && <Strategy size={sizeIconTypeEvent} />}
        <section className='w-full flex gap-2 items-center'>
          <span className='h-5 w-5 flex justify-center items-center text-xs text-white rounded-full bg-skyBold'>
            <p>{event.participantsCount}</p>
          </span>
          <p className='text-sm text-skyLight'>Participante(s)</p>
        </section>
        <section className='w-full flex h-52 flex-col justify-between'>
          <div>
            <p className='font-medium mb-2'>{event.name}</p>
            <div className='flex flex-1 overflow-y-auto'>
              <p className='text-zinc-500 text-sm'>{event.description}</p>
            </div>
          </div>
          <div className='flex justify-end py-2'>
            <button
              className='py-2 px-3 rounded-xl bg-skyBold font-semibold text-white border-none outline-none'
              onClick={() => handleSelectEvent(event.id)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

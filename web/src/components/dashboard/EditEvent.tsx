/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from "react-redux";

import { IconSport } from "../IconSport";

import { selectEvent } from "../../store/events/event.slice";
import { selectResponsible } from "../../store/responsible/responsible.slice";

export const EditEvent = () => {
  const dispatch = useDispatch();

  const { id: responsibleId } = useSelector(selectResponsible);
  const { id: eventId } = useSelector(selectEvent);

  return (
    <div className='w-4/5 h-full flex flex-col gap-16 px-3 py-3'>
      <div className=' w-full flex items-center justify-between'>
        <span className='font-semibold text-xl'>Perfil do evento</span>
      </div>

      <section className='w-full py-3 px-3 gap-3 rounded-lg shadow-lg h-20'>
        <IconSport type='soccer' />
      </section>
    </div>
  );
};

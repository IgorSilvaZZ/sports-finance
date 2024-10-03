import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import Slider, { Settings } from "react-slick";

import { Cards } from "../components/Cards";

import {
  responsibleActions,
  selectResponsible,
} from "../store/responsible/responsible.slice";

import eventsImage from "../assets/events-image.png";
import emptyImage from "../assets/list-event-empty.png";
import { api } from "../lib/axios";
import { toast } from "sonner";
import { Event } from "../interfaces/Event.interface";

const settingsSlider: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  arrows: false,
  swipeToSlide: false,
  swipe: false,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responsible = useSelector(selectResponsible);

  const [events, setEvents] = useState<Event[]>([]);

  function goToBack() {
    dispatch(responsibleActions.clear());
    navigate("/");
  }

  async function getEvents() {
    try {
      const { data } = await api.get(`/events/responsible/${responsible.id}`);

      setEvents(data);
    } catch (error) {
      console.log(error);

      toast.error("Ocorreu algum erro ao listar os eventos!");
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <div className='h-full w-full py-10 flex flex-col gap-10'>
        <span
          className='flex gap-2 font-semibold text-zinc-500 text-sm cursor-pointer transition-all hover:text-skyBold'
          onClick={goToBack}
        >
          <ArrowLeft size={22} /> Voltar para pagina de login
        </span>
        <div className='h-full w-full flex flex-col gap-5 items-center justify-center leading-tight'>
          <img src={eventsImage} alt='Events list image' className='w-[50px]' />
          <p className='text-4xl font-medium'>Meus Eventos</p>
          <button className='flex gap-2 items-center font-semibold text-xs border-none outline-none rounded-md py-2 px-7 bg-red-500 text-white mb-4 transition-colors hover:bg-red-600'>
            <Plus />
            Criar um novo evento
          </button>

          {events.length > 0 ? (
            <div className='w-full flex flex-1 py-3 border-t border-zinc-300'>
              <Slider className='w-full h-full' {...settingsSlider}>
                {events.map((eventItem) => (
                  <>
                    <Cards key={eventItem.id} event={eventItem} />
                  </>
                ))}
              </Slider>
            </div>
          ) : (
            <div className='w-full flex flex-col flex-1 items-center justify-evenly border-t border-zinc-300'>
              <img
                src={emptyImage}
                alt='List empty events image'
                className='w-[200px]'
              />
              <span className='text-zinc-500 text-base'>
                Nenhum evento encontrado
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

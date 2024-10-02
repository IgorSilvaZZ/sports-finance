import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus } from "@phosphor-icons/react";
import Slider, { Settings } from "react-slick";

import { Cards } from "../components/Cards";

import { responsibleActions } from "../store/responsible/responsible.slice";

import eventsImage from "../assets/events-image.png";
import emptyImage from "../assets/list-event-empty.png";

const settingsSlider: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
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

  /* Variavel pra teste - retirar posteriormente */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEventsEmpty, setIsEventsEmpty] = useState(false);

  function goToBack() {
    dispatch(responsibleActions.clear());
    navigate("/");
  }

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

          {!isEventsEmpty ? (
            <div className='w-full flex flex-1 py-3 border-t border-zinc-300'>
              <Slider className='w-full h-full px-5' {...settingsSlider}>
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
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

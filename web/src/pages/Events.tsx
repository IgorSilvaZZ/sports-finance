import Carousel from "react-multi-carousel";
import { ArrowLeft, Plus } from "@phosphor-icons/react";

import { Cards } from "../components/Cards";

import eventsImage from "../assets/events-image.png";

export default function Events() {
  return (
    <>
      <div className='h-full w-full py-10 flex flex-col gap-10'>
        <button className='flex gap-2 font-semibold text-zinc-500 text-sm transition-all hover:text-skyBold'>
          <ArrowLeft size={22} /> Voltar para pagina de login
        </button>
        <div className='h-full w-full flex flex-col gap-5 items-center justify-center leading-tight'>
          <img src={eventsImage} alt='Events list image' className='w-[50px]' />
          <p className='text-4xl font-medium'>Meus Eventos</p>
          <button className='flex gap-2 items-center font-semibold text-xs border-none outline-none rounded-md py-2 px-7 bg-red-500 text-white mb-4'>
            <Plus />
            Criar um novo evento
          </button>
          <div className='w-full flex flex-1 flex-wrap overflow-y-auto'>
            <Carousel
              arrows
              draggable
              swipeable
              focusOnSelect
              keyBoardControl
              shouldResetAutoplay
              dotListClass=''
              rtl={false}
              rewind={false}
              showDots={false}
              centerMode={false}
              renderDotsOutside={false}
              rewindWithAnimation={false}
              renderButtonGroupOutside={false}
              renderArrowsWhenDisabled={false}
              autoPlaySpeed={0}
              slidesToSlide={1}
              minimumTouchDrag={80}
              additionalTransfrom={0}
              responsive={{
                superLargeDesktop: {
                  breakpoint: { max: 4000, min: 3000 },
                  items: 5,
                },
                desktop: {
                  breakpoint: { max: 3000, min: 1024 },
                  items: 3,
                },
                tablet: {
                  breakpoint: { max: 1024, min: 464 },
                  items: 2,
                },
                mobile: {
                  breakpoint: { max: 464, min: 0 },
                  items: 1,
                },
              }}
            >
              <Cards />
              <Cards />
              <Cards />
              <Cards />
              <Cards />
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
}

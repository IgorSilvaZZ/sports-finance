import { Trash } from "@phosphor-icons/react";

import cardImage from "../assets/card-image.png";

export const Cards = () => {
  return (
    <>
      <div className='flex flex-col px-5 gap-5 items-center justify-center w-64 h-[420px] shadow-lg cursor-pointer transition-all hover:shadow-2xl'>
        <section className='w-full flex justify-end'>
          <button title='Remover'>
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
        <section>
          <p className='font-medium mb-2'>Nome do Evento</p>
          <div>
            <p className='text-zinc-500 text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus ex accusantium nostrum nemo eaque ad distinctio,
              quibusdam debitis eum architecto et modi quaerat voluptatem qui
              dolor! Facere voluptatum possimus consequuntur!
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

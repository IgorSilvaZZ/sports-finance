import { Plus, X } from "@phosphor-icons/react";

import * as Dialog from "@radix-ui/react-dialog";

import { FormEvent } from "./forms/FormEvent";

import { Event } from "../interfaces/Event.interface";

interface ModalCreateEventProps {
  initialData: Event | null;
  modalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  getEvents: () => void;
}

export const ModalCreateEvent = ({
  modalOpen,
  initialData,
  onOpenModal,
  onCloseModal,
  getEvents,
}: ModalCreateEventProps) => {
  return (
    <Dialog.Root open={modalOpen} onOpenChange={onOpenModal}>
      <Dialog.Trigger className='outline-none'>
        <button className='flex gap-2 items-center text-xs border-none outline-none rounded-md py-2 px-7 bg-red-500 text-white mb-4 transition-colors hover:bg-red-600'>
          <Plus size={12} />
          Novo Evento
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

        <Dialog.Content className='absolute p-10 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.DialogClose
            onClick={onCloseModal}
            className='absolute right-6 top-6 rounded-full p-1 bg-zinc-200 transition-colors hover:bg-zinc-300 outline-none'
          >
            <X size={20} arial-label='Fechar' />
          </Dialog.DialogClose>

          <Dialog.Title className='text-xl leading-tight font-semibold'>
            Adicionar um novo evento
          </Dialog.Title>

          <FormEvent
            initialData={initialData}
            getEvents={getEvents}
            handleCloseModal={onCloseModal}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

import { useState } from "react";
import { Plus, X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";

import { FormEvent } from "./forms/FormEvent";

interface ModalCreateEventProps {
  getEvents: () => void;
}

export const ModalCreateEvent = ({ getEvents }: ModalCreateEventProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function handleOpenModal() {
    setModalOpen(!modalOpen);
  }

  return (
    <Dialog.Root open={modalOpen} onOpenChange={handleOpenModal}>
      <Dialog.Trigger className="outline-none">
        <button className="flex gap-2 items-center font-semibold text-xs border-none outline-none rounded-md py-2 px-7 bg-red-500 text-white mb-4 transition-colors hover:bg-red-600">
          <Plus />
          Criar um novo evento
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

        <Dialog.Content className="absolute p-10 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Dialog.DialogClose
            onClick={() => setModalOpen(false)}
            className="absolute right-6 top-6 rounded-lg text-red-500 transition-colors hover:text-red-600"
          >
            <X size={24} arial-label="Fechar" />
          </Dialog.DialogClose>

          <Dialog.Title className="text-xl leading-tight font-semibold">
            Adicionar um novo evento
          </Dialog.Title>

          <FormEvent
            getEvents={getEvents}
            handleCloseModal={() => setModalOpen(false)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

import { ReactNode, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";

interface ModalBaseProps {
  title: string;
  trigger: () => ReactNode;
  children?: ReactNode;
}

export const ModalBase = ({ title, trigger, children }: ModalBaseProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  function handleOpenModal() {
    setModalOpen(!modalOpen);
  }

  return (
    <Dialog.Root open={modalOpen} onOpenChange={handleOpenModal}>
      <Dialog.Trigger className='outline-none'>{trigger()}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />

        <Dialog.Content className='absolute p-10 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.DialogClose
            onClick={() => setModalOpen(false)}
            className='absolute right-6 top-6 rounded-lg text-red-500 transition-colors hover:text-red-600'
          >
            <X size={24} arial-label='Fechar' />
          </Dialog.DialogClose>

          <Dialog.Title className='text-xl leading-tight font-semibold'>
            {title}
          </Dialog.Title>

          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

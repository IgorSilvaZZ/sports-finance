import { InputMask } from "@react-input/mask";

import { Button } from "./ui/Button";
import { FormModalBase } from "./ui/FormModalBase";
import { ModalBase } from "./ui/ModalBase";
import { TextInput } from "./ui/TextInput";

export const ModalCreateParticipant = () => {
  return (
    <>
      <ModalBase
        title='Criar novo participante'
        trigger={() => (
          <Button className='py-1 px-1 w-40 rounded-md'>
            Novo participante
          </Button>
        )}
      >
        <FormModalBase>
          <TextInput label='Nome' className='text-sm py-3 px-3' />
          <TextInput label='Email' className='text-sm py-3 px-3' />
          <InputMask
            label='Telefone celular'
            mask='(__) _____-____'
            replacement='_'
            className='text-sm py-3 px-3'
            component={TextInput}
          />
          <Button className='py-3 px-3'>Criar</Button>
        </FormModalBase>
      </ModalBase>
    </>
  );
};

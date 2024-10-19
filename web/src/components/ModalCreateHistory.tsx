import { format } from "date-fns";

import { ModalBase } from "./ui/ModalBase";
import { Button } from "./ui/Button";
import { FormModalBase } from "./ui/FormModalBase";
import { TextInput } from "./ui/TextInput";
import { Select } from "./ui/Select";

import { TypeHistory } from "../enums/TypeHistory.enum";

export const ModalCreateHistory = () => {
  return (
    <ModalBase
      title='Criar nova transação'
      trigger={() => (
        <Button className='py-1 px-1 w-40 rounded-md'>Nova transação</Button>
      )}
    >
      <FormModalBase>
        <TextInput label='Nome' className='text-sm py-3 px-3' />
        <Select
          label='Participante'
          options={[{ label: "Igor Silva", value: "id-igor-silva" }]}
        />
        <TextInput label='Valor' className='text-sm py-3 px-3' />
        <Select
          label='Tipo'
          options={[
            { label: "Mensalista", value: TypeHistory.MONTHLY },
            { label: "Agregado", value: TypeHistory.AGGREGATE },
          ]}
        />
        <TextInput
          label='Data da Transação'
          className='text-sm py-3 px-3'
          type='date'
          max={format(new Date(), "yyyy-MM-dd")}
        />
        <Button className='py-3 px-3'>Criar</Button>
      </FormModalBase>
    </ModalBase>
  );
};

import { ModalBase } from "./ui/ModalBase";
import { Button } from "./ui/Button";
import { FormModalBase } from "./ui/FormModalBase";
import { TextInput } from "./ui/TextInput";
import { Select } from "./ui/Select";

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
          options={[{ label: "Mensalista", value: "mensalista" }]}
        />
        <Select
          label='Tipo'
          options={[{ label: "Agregado", value: "agregado" }]}
        />
        <Button className='py-3 px-3'>Criar</Button>
      </FormModalBase>
    </ModalBase>
  );
};

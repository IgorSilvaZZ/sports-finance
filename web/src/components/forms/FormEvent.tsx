import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";

export const FormEvent = () => {
  return (
    <>
      <form className='w-full flex flex-col gap-4 mt-5 px-2'>
        <div className='w-full flex gap-2 items-center'>
          <TextInput label='Nome' />
        </div>
        <TextArea label='Descrição' />
      </form>
    </>
  );
};

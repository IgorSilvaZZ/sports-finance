import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { z } from "zod";

import { Button } from "../ui/Button";
import { TextArea } from "../ui/TextArea";
import { TextInput } from "../ui/TextInput";
import { Select } from "../ui/Select";

import { handleErrors } from "../../utils/handleErrorsZod";
import { typesOptions } from "../../utils/optionsSports";

import { selectResponsible } from "../../store/responsible/responsible.slice";

import { api } from "../../lib/axios";

interface FormEventProps {
  getEvents: () => void;
  handleCloseModal?: () => void;
}

const createEventForm = z.object({
  name: z.string().min(3, "O nome precisa ter no mínimo 4 caracteres!"),
  type: z.string().min(1, "Selecione um tipo do seu evento para continuar!"),
  description: z.string().min(1, "Insira uma descrição para continuar!"),
});

type EventForm = z.infer<typeof createEventForm>;

export const FormEvent = ({ getEvents, handleCloseModal }: FormEventProps) => {
  const responsible = useSelector(selectResponsible);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EventForm>({
    resolver: zodResolver(createEventForm),
  });

  async function handleCreateNewEvent(eventForm: EventForm) {
    try {
      const dataNewEvent = {
        ...eventForm,
        responsibleId: responsible.id,
      };

      await api.post("/events", dataNewEvent);

      toast.success("Evento criado com sucesso");

      getEvents();

      if (handleCloseModal && !isSubmitting) {
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      }
    } catch (error) {
      console.log(error);

      toast.error("Erro ao cadastrar novo evento! Tente novamente!");
    }
  }

  return (
    <>
      <form
        className='w-full flex flex-col gap-4 mt-5'
        onSubmit={handleSubmit(handleCreateNewEvent, handleErrors)}
      >
        <TextInput
          label='Nome'
          className='text-sm py-3 px-3'
          {...register("name")}
        />
        <Select
          {...register("type")}
          label='Tipo do Evento'
          options={typesOptions}
        />
        <TextArea label='Descrição' {...register("description")} />
        <Button className='py-3 px-3'>
          {isSubmitting ? <ClipLoader color='white' size={20} /> : "Criar"}
        </Button>
      </form>
    </>
  );
};

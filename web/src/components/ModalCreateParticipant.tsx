import { useSelector } from "react-redux";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "./ui/Button";
import { FormModalBase } from "./ui/FormModalBase";
import { ModalBase } from "./ui/ModalBase";
import { TextInput } from "./ui/TextInput";

import { handleErrors } from "../utils/handleErrorsZod";
import { selectEvent } from "../store/events/event.slice";
import { Participant } from "../interfaces/Participant.interface";
import { useEffect } from "react";
import { api } from "../lib/axios";
import { toast } from "sonner";

interface ModalCreateParticipantProps {
  initialData: Participant | null;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  getParticipantsEvent: () => void;
}

const participantForm = z.object({
  name: z.string().min(1, "Insira o nome do participante para continuar!"),
  email: z.optional(z.string()),
  phoneNumber: z.optional(z.string()),
});

type ParticipantForm = z.infer<typeof participantForm>;

export const ModalCreateParticipant = ({
  initialData,
  isOpen,
  handleOpen,
  handleClose,
  getParticipantsEvent,
}: ModalCreateParticipantProps) => {
  const { id: eventId } = useSelector(selectEvent);

  const { register, handleSubmit, reset } = useForm<ParticipantForm>({
    resolver: zodResolver(participantForm),
  });

  async function handleSubmitParticipant(participantForm: ParticipantForm) {
    const dataParticipant = {
      ...participantForm,
      eventId,
    };

    try {
      const messageSuccess = initialData
        ? "Participante atualizado com sucesso"
        : "Participante criado com sucesso!";

      if (initialData) {
        await api.put(`/participants/${initialData.id}`, {
          name: dataParticipant.name,
          email: dataParticipant.email,
          phoneNumber: dataParticipant.phoneNumber,
        });
      } else {
        await api.post("/participants", dataParticipant);
      }

      getParticipantsEvent();

      setTimeout(() => {
        reset();

        handleClose();
      }, 1500);

      toast.success(messageSuccess);
    } catch (error) {
      console.log(error);

      const messageError = initialData
        ? "Erro ao atualizar participante!"
        : "Erro ao criar participante!";

      toast.error(messageError);
    }
  }

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? "",
        email: initialData.email ? initialData.email : "",
        phoneNumber: initialData.phoneNumber ?? "",
      });
    } else {
      reset({
        name: "",
        email: "",
        phoneNumber: "",
      });
    }
  }, [initialData, reset]);

  return (
    <>
      <ModalBase
        title="Criar novo participante"
        isOpen={isOpen}
        handleOpen={handleOpen}
        handleClose={() => {
          reset();
          handleClose();
        }}
        trigger={() => (
          <Button className="py-1 px-1 w-40 rounded-md">
            Novo participante
          </Button>
        )}
      >
        <FormModalBase
          onSubmit={handleSubmit(handleSubmitParticipant, handleErrors)}
        >
          <TextInput
            label="Nome"
            className="text-sm py-3 px-3"
            {...register("name")}
          />
          <TextInput
            label="Email"
            className="text-sm py-3 px-3"
            {...register("email")}
          />
          <InputMask
            label="Telefone celular"
            mask="(__) _____-____"
            replacement="_"
            className="text-sm py-3 px-3"
            component={TextInput}
            {...register("phoneNumber")}
          />
          <Button className="py-3 px-3">
            {initialData ? "Atualizar" : "Criar"}
          </Button>
        </FormModalBase>
      </ModalBase>
    </>
  );
};

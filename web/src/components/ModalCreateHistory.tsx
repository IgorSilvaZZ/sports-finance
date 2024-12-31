import { z } from "zod";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "react-query";
import { endOfMonth, format, isBefore, startOfMonth } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

import { ModalBase } from "./ui/ModalBase";
import { Button } from "./ui/Button";
import { FormModalBase } from "./ui/FormModalBase";
import { TextInput } from "./ui/TextInput";
import { Select } from "./ui/Select";

import { TypeHistory } from "../enums/TypeHistory.enum";

import { handleErrors } from "../utils/handleErrorsZod";

import { selectEvent } from "../store/events/event.slice";
import { selectDashboard } from "../store/dashboard/dashboard.slice";

import { api } from "../lib/axios";

interface ModalCreateHistoryProps {
  handleUpdating: () => void;
}

const createHistoryForm = z.object({
  name: z.optional(z.string()),
  value: z
    .string({
      message: "Insira um valor válido no campo de valor para continuar!",
    })
    .min(1, "Insira o valor para continuar!"),
  participantId: z.string().min(1, "Selecione o participante para continuar!"),
  type: z.string().min(1, "Selecione o tipo para continuar!"),
  createDate: z.string().min(1, "Insira a data da transação para continuar!"),
});

type HistoryForm = z.infer<typeof createHistoryForm>;

export const ModalCreateHistory = ({
  handleUpdating,
}: ModalCreateHistoryProps) => {
  const { id: eventId, participants } = useSelector(selectEvent);
  const { appliedFilters } = useSelector(selectDashboard);

  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [valueParsed, setValueParsed] = useState<number>(0);

  const participantsActive = participants.filter((item) => item.status);

  const optionsParticipants = participantsActive.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const today = new Date();

  const yearFilter = Number(Number(appliedFilters.year));
  const monthFilter = Number(appliedFilters.month);

  const startDate = startOfMonth(new Date(yearFilter, monthFilter - 1));
  const endDate = endOfMonth(new Date(yearFilter, monthFilter - 1));

  const maxDate = isBefore(today, endDate) ? today : endDate;

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<HistoryForm>({
    resolver: zodResolver(createHistoryForm),
  });

  function handleRefetch() {
    handleUpdating();

    queryClient.invalidateQueries("getHistories");
  }

  async function handleCreateNewHistory(historyForm: HistoryForm) {
    try {
      const dataNewHistory = {
        ...historyForm,
        value: valueParsed,
        eventId,
      };

      await api.post("/history", dataNewHistory);

      toast.success("Transação criada com sucesso!");

      setTimeout(() => {
        setModalOpen(false);

        reset();
      }, 2000);

      handleRefetch();
    } catch (error) {
      console.log(error);

      toast.error("Erro ao cadastrar nova transação! Tente novamente!");
    }
  }

  return (
    <ModalBase
      title="Criar nova transação"
      isOpen={modalOpen}
      handleOpen={() => setModalOpen(!modalOpen)}
      handleClose={() => {
        reset();

        setModalOpen(false);
      }}
      trigger={() => (
        <Button className="py-1 px-1 w-40 rounded-md">Nova transação</Button>
      )}
    >
      <FormModalBase
        onSubmit={handleSubmit(handleCreateNewHistory, handleErrors)}
      >
        <Select
          label="Participante"
          options={optionsParticipants}
          {...register("participantId")}
        />
        <TextInput
          label="Descrição"
          className="text-sm py-3 px-3"
          {...register("name")}
        />
        <Controller
          name="value"
          control={control}
          defaultValue="0"
          render={({ field }) => (
            <NumericFormat
              {...field}
              label="Valor"
              className="text-sm py-3 px-3"
              value={field.value}
              customInput={TextInput}
              prefix="R$"
              decimalScale={2}
              thousandSeparator="."
              decimalSeparator=","
              allowNegative={false}
              placeholder="R$ 0,00"
              fixedDecimalScale
              onValueChange={(value) => {
                setValueParsed(Number(value.floatValue));
              }}
            />
          )}
        />
        <Select
          label="Tipo"
          options={[
            { label: "Mensalista", value: TypeHistory.MONTHLY },
            { label: "Agregado", value: TypeHistory.AGGREGATE },
          ]}
          {...register("type")}
        />
        <TextInput
          label="Data da Transação"
          className="text-sm py-3 px-3"
          type="date"
          min={format(startDate, "yyyy-MM-dd")}
          max={format(maxDate, "yyyy-MM-dd")}
          {...register("createDate")}
        />
        <Button className="py-3 px-3">
          {isSubmitting ? <ClipLoader color="white" size={20} /> : "Criar"}
        </Button>
      </FormModalBase>
    </ModalBase>
  );
};

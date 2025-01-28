import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "sonner";

import { Table } from "../ui/Table";
import { ModalCreateParticipant } from "../ModalCreateParticipant";

import { Participant } from "../../interfaces/Participant.interface";

import { eventActions, selectEvent } from "../../store/events/event.slice";
import { selectResponsible } from "../../store/responsible/responsible.slice";

import { getParticipantsColumns } from "../utils/tablesColumns/participants";

import { api } from "../../lib/axios";

export const Participants = () => {
  const dispatch = useDispatch();

  const { id: responsibleId } = useSelector(selectResponsible);
  const { id: eventId, name, participants } = useSelector(selectEvent);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [participantSelected, setParticipantSelected] =
    useState<Participant | null>(null);

  async function getParticipantsEvent() {
    try {
      const { data: paymentsEvent } = await api.get(
        `events/${eventId}/responsible/${responsibleId}/participants`
      );

      dispatch(eventActions.setParticipants(paymentsEvent));
    } catch (error) {
      console.log(error);

      toast.error("Erro ao coletar participantes de um evento!");
    }
  }

  async function handleStatusParticipant(
    participantId: string,
    status: boolean
  ) {
    try {
      await api.put(`/participants/${participantId}`, { status });

      toast.success("Status atualizado com sucesso!");

      getParticipantsEvent();
    } catch (error) {
      console.log(error);
      toast.error("Erro em atualizar os status do participante!");
    }
  }

  function handleSelectParticipant(participant: Participant) {
    setParticipantSelected(participant);
    setModalOpen(true);
  }

  const participantsColumns = getParticipantsColumns({
    handleSelectParticipant,
    handleStatusParticipant,
  });

  return (
    <>
      <div className='w-4/5 h-full flex flex-col gap-4 px-3 py-3'>
        <div className=' w-full flex items-center justify-between'>
          <span className='font-semibold text-xl'>{name}</span>
          <ModalCreateParticipant
            initialData={participantSelected}
            isOpen={modalOpen}
            handleOpen={() => {
              setParticipantSelected(null);

              setModalOpen(!modalOpen);
            }}
            handleClose={() => {
              setParticipantSelected(null);

              setModalOpen(false);
            }}
            getParticipantsEvent={getParticipantsEvent}
          />
        </div>

        <Table data={participants} columns={participantsColumns} />

        <div className='w-full flex justify-end px-1'>
          <span className='text-sm text-zinc-500 font-semibold'>
            Total de Participantes: {participants.length}
          </span>
        </div>
      </div>
    </>
  );
};

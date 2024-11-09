import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  CheckCircle,
  PencilSimple,
  UserCircle,
  XCircle,
} from "@phosphor-icons/react";
import { toast } from "sonner";

import { EmptyList } from "../EmptyList";
import { ModalCreateParticipant } from "../ModalCreateParticipant";

import { Participant } from "../../interfaces/Participant.interface";

import { eventActions, selectEvent } from "../../store/events/event.slice";
import { selectResponsible } from "../../store/responsible/responsible.slice";

import { api } from "../../lib/axios";

export const Participants = () => {
  const dispatch = useDispatch();

  const { id: responsibleId } = useSelector(selectResponsible);
  const { id: eventId, name, participants } = useSelector(selectEvent);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [participantSelected, setParticipantSelected] =
    useState<Participant | null>(null);

  const isParticipantsEmpty = participants.length === 0;

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

        {!isParticipantsEmpty ? (
          <>
            <div className='w-full h-full flex flex-col gap-2 py-1 shadow-md overflow-y-auto'>
              <div className='w-full h-16 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
                <span className='text-sm font-semibold w-44'>Nome</span>
                <span className='text-sm w-36 font-semibold'>Email</span>
                <span className='text-sm w-32 font-semibold'>Status</span>
                <span className='text-sm w-36 font-semibold'>Telefone</span>
                <span className='text-sm w-40 font-semibold'>Ações</span>
              </div>
              {participants.map((participant) => (
                <div className='w-full h-10 flex gap-3 py-2 items-center justify-around border-b border-zinc-200'>
                  <div className='flex gap-3 items-center w-44'>
                    <UserCircle size={25} />
                    <span className='text-sm font-semibold'>
                      {participant.name}
                    </span>
                  </div>
                  <span className='text-sm w-36 text-zinc-500'>
                    {participant.email ?? "-"}
                  </span>
                  <span className='text-sm w-32 text-zinc-500'>
                    {participant.status ? "Ativo" : "Inativo"}
                  </span>
                  <span className='text-sm w-36 text-zinc-500'>
                    {participant.phoneNumber ?? "-"}
                  </span>
                  <div className='text-sm flex items-center w-40 gap-5 font-semibold'>
                    <button
                      title='Editar'
                      onClick={() => handleSelectParticipant(participant)}
                    >
                      <PencilSimple size={20} />
                    </button>
                    {participant.status ? (
                      <button
                        title='Inativar'
                        className='text-red-600'
                        onClick={() =>
                          handleStatusParticipant(participant.id, false)
                        }
                      >
                        <XCircle size={20} />
                      </button>
                    ) : (
                      <button
                        title='Ativar'
                        className='text-green-600'
                        onClick={() =>
                          handleStatusParticipant(participant.id, true)
                        }
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className='w-full flex justify-end px-1'>
              <span className='text-sm text-zinc-500 font-semibold'>
                Total de Participantes: {participants.length}
              </span>
            </div>
          </>
        ) : (
          <>
            <EmptyList>
              <span className='text-zinc-500 text-lg'>
                O evento não contem nenhum participante
              </span>
            </EmptyList>
          </>
        )}
      </div>
    </>
  );
};

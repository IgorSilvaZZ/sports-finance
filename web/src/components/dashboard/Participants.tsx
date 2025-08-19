import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Table } from "../ui/Table";
import { ModalCreateParticipant } from "../ModalCreateParticipant";
import { Card } from "../Card";

import { Participant } from "../../interfaces/Participant.interface";

import { eventActions, selectEvent } from "../../store/events/event.slice";
import { selectResponsible } from "../../store/responsible/responsible.slice";

import { getParticipantsColumns } from "../utils/tablesColumns/participants";

import { EventService } from "../../services/Event";
import { ParticipantsService } from "../../services/Participants";

export const Participants = () => {
  const dispatch = useDispatch();

  const { id: responsibleId } = useSelector(selectResponsible);
  const {
    id: eventId,
    name,
    participants,
    participantsCount,
    participantsActiveCount,
    participantsMonthlyCount,
    participantsAggregateCount,
  } = useSelector(selectEvent);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [participantSelected, setParticipantSelected] =
    useState<Participant | null>(null);

  async function getParticipantsEvent() {
    const participants = await EventService.getParticipantsByEventId(
      eventId,
      responsibleId
    );

    dispatch(eventActions.setParticipants(participants));
  }

  async function handleStatusParticipant(
    participantId: string,
    status: boolean
  ) {
    await ParticipantsService.handleStatusParticipant(participantId, status);

    getParticipantsEvent();
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
        {/* Header */}
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

        {/* Cards */}
        <div className='w-full flex flex-wrap justify-evenly gap-4 mb-3'>
          <Card label='Total' value={participantsCount} />
          <Card label='Mensalistas' value={participantsMonthlyCount} />
          <Card label='Agregados' value={participantsAggregateCount} />
          <Card label='Ativos' value={participantsActiveCount} />
        </div>

        <Table data={participants} columns={participantsColumns} />
      </div>
    </>
  );
};

import { CheckCircle, PencilSimple, XCircle } from "@phosphor-icons/react";
import { Participant } from "../../../interfaces/Participant.interface";

interface ParticipantsColumns {
  handleSelectParticipant: (participant: Participant) => void;
  handleStatusParticipant: (participantId: string, status: boolean) => void;
}

export const getParticipantsColumns = (props: ParticipantsColumns) => [
  {
    field: "name",
    label: "Nome",
  },
  {
    field: "email",
    label: "Email",
  },
  {
    field: "status",
    label: "Status",
    renderRow: (value: boolean) => (value ? "Ativo" : "Inativo"),
  },
  {
    field: "phoneNumber",
    label: "Telefone",
  },
  getParcipantsActions(props),
];

const getParcipantsActions = ({
  handleSelectParticipant,
  handleStatusParticipant,
}: ParticipantsColumns) => ({
  field: "actions",
  label: "Ações",
  getActions: (rowValue: Participant) => {
    const actionsList = [
      <button title='Editar' onClick={() => handleSelectParticipant(rowValue)}>
        <PencilSimple size={20} />
      </button>,
    ];

    if (rowValue.status) {
      actionsList.push(
        <button
          title='Inativar'
          className='text-red-600'
          onClick={() => handleStatusParticipant(rowValue.id, false)}
        >
          <XCircle size={20} />
        </button>
      );
    } else {
      actionsList.push(
        <button
          title='Ativar'
          className='text-green-600'
          onClick={() => handleStatusParticipant(rowValue.id, true)}
        >
          <CheckCircle size={20} />
        </button>
      );
    }

    return actionsList;
  },
});

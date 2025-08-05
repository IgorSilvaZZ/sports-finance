import { CheckCircle, PencilSimple, XCircle } from "@phosphor-icons/react";

import { Chip } from "../../ui/Chip";

import { Participant } from "../../../interfaces/Participant.interface";
import { ColumnsFieldsTable } from "../../../interfaces/Table.interface";
import { RoleParticipantEnum } from "../../../enums/RoleParticipant.enum";

import { roleColors, roleTranslate } from "../../../utils/participants";

interface ParticipantsColumns {
  handleSelectParticipant: (participant: Participant) => void;
  handleStatusParticipant: (participantId: string, status: boolean) => void;
}

export const getParticipantsColumns = (
  props: ParticipantsColumns
): ColumnsFieldsTable[] => [
  {
    field: "name",
    label: "Nome",
  },
  {
    field: "email",
    label: "Email",
  },
  {
    field: "role",
    label: "Tipo",
    renderRow: (role: RoleParticipantEnum) => {
      const roleTranslated = roleTranslate[role];
      const styledChipRole = roleColors[role];

      return <Chip className={`${styledChipRole}`}>{roleTranslated}</Chip>;
    },
  },
  {
    field: "status",
    label: "Status",
    renderRow: (value: boolean) => {
      const styledChipStatus = value ? "bg-green-500" : "bg-red-500";

      return (
        <Chip className={`${styledChipStatus} text-white`}>
          {value ? "Ativo" : "Inativo"}
        </Chip>
      );
    },
  },
  {
    field: "phoneNumber",
    label: "Telefone",
  },
  getParticipantsActions(props),
];

const getParticipantsActions = ({
  handleSelectParticipant,
  handleStatusParticipant,
}: ParticipantsColumns): ColumnsFieldsTable => ({
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

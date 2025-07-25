import { FieldsType } from "../types/FieldsType";

import { RoleParticipantEnum } from "../enums/RoleParticipant.enum";

export const roleTranslate: FieldsType = {
  [RoleParticipantEnum.MONTHLY]: "Mensalista",
  [RoleParticipantEnum.AGGREGATE]: "Agregado",
};

export const roleColors = {
  [RoleParticipantEnum.MONTHLY]: "bg-blue-100 text-blue-800",
  [RoleParticipantEnum.AGGREGATE]: "bg-yellow-100 text-yellow-800",
};

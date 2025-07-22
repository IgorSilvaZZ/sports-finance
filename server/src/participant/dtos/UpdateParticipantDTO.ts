import { RoleParticipant } from '../enums/role.enum';

export interface UpdateParticipantDTO {
  name?: string;
  phoneNumber?: string;
  email?: string;
  avatar?: string;
  status?: boolean;
  role?: RoleParticipant;
}

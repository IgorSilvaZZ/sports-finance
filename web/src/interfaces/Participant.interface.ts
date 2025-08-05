import { RoleParticipantEnum } from "../enums/RoleParticipant.enum";

export interface Participant {
  id: string;
  name: string;
  email: string | null;
  phoneNumber: string;
  role: RoleParticipantEnum;
  avatar: string;
  eventId: string;
  status: boolean;
  createDate: string;
  updateDate: string;
}

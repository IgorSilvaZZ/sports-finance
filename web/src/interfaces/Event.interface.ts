import { Participant } from "./Participant.interface";

export interface Event {
  id: string;
  name: string;
  description: string;
  type: string;
  responsibleId: string;
  participantsCount: number;
  participants: Participant[];
  createDate: string;
  updateDate: string;
}

import { Participant } from "./Participant.interface";

export interface Event {
  id: string;
  name: string;
  description: string;
  type: string;
  valueMonthly: number;
  dayMonthly: number;
  responsibleId: string;
  participantsCount: number;
  participants: Participant[];
  createDate: string;
  updateDate: string;
}

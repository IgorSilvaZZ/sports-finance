import { Participant } from "./Participant.interface";
import { Payment } from "./Payment.interface";

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
  payments: Payment[];
  createDate: string;
  updateDate: string;
}

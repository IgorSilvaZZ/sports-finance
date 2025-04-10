import { Participant } from "./Participant.interface";
import { Payment } from "./Payment.interface";

export type SportsType =
  | "soccer"
  | "basketball"
  | "volleyball"
  | "tennis"
  | "table_tennis"
  | "other";

export interface Event {
  id: string;
  name: string;
  description: string;
  type: SportsType;
  valueMonthly: number;
  dayMonthly: number;
  responsibleId: string;
  participantsCount: number;
  participants: Participant[];
  payments: Payment[];
  createDate: string;
  updateDate: string;
}

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
  participants: Participant[];
  participantsCount: number;
  participantsActiveCount: number;
  participantsMonthlyCount: number;
  participantsAggregateCount: number;
  paymentsCount: number;
  payments: Payment[];
  createDate: string;
  updateDate: string;
}

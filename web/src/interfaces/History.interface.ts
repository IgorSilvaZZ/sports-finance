import { Event } from "./Event.interface";
import { Participant } from "./Participant.interface";

export interface History {
  id: string;
  name: string;
  value: string;
  type: string;
  status: boolean;
  participantId: string;
  eventId: string;
  participant: Participant;
  event: Event;
  createDate: string;
  updateDate: string;
}

export interface FilterHistory {
  textParticipant?: string;
  status?: boolean | string;
  month?: string;
  type?: string;
  year?: string;
}

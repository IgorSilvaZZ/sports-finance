import { toast } from "sonner";

import { api } from "../lib/axios";
import { Participant } from "../interfaces/Participant.interface";
import { Event } from "../interfaces/Event.interface";

export class EventService {
  static async getEventByResponsibleId(
    eventId: string,
    responsibleId: string
  ): Promise<Event | null> {
    const { data } = await api.get(
      `/events/${eventId}/responsible/${responsibleId}`
    );

    return data;
  }

  static async getEventsByResponsible(responsibleId: string): Promise<Event[]> {
    const { data } = await api.get<Event[]>(
      `/events/responsible/${responsibleId}`
    );

    return data;
  }

  static async deleteEventById(
    eventId: string,
    responsibleId: string
  ): Promise<void> {
    await api.delete(`/events/${eventId}/responsible/${responsibleId}`);
  }

  static async getParticipantsByEventId(
    eventId: string,
    responsibleId: string
  ): Promise<Participant[]> {
    try {
      const { data: paymentsEvent } = await api.get<Participant[]>(
        `events/${eventId}/responsible/${responsibleId}/participants`
      );

      return paymentsEvent;
    } catch (error) {
      console.log(error);

      toast.error("Erro ao coletar participantes do evento atual!");
    }

    return [];
  }
}

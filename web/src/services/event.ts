import { api } from "../lib/axios";

export async function getEventsByResponsible(responsibleId: string) {
  const { data } = await api.get(`/events/responsible/${responsibleId}`);

  return data;
}

export async function deleteEventById(eventId: string, responsibleId: string) {
  await api.delete(`/events/${eventId}/responsible/${responsibleId}`);
}

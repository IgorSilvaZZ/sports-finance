import { randomUUID } from 'crypto';
import { Event as EventPrisma } from '@prisma/client';
import { Participant as ParticipantPrisma } from '@prisma/client';

import { EventRepository } from '@/event/repositories/EventRepository';
import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';

export class EventRepositoryInMemory implements EventRepository {
  public events: EventPrisma[] = [];

  public participants: ParticipantPrisma[] = [];

  async findById(id: string): Promise<EventPrisma | null> {
    const event = this.events.find((item) => item.id === id);

    return event;
  }

  async findByResponsibleId(
    responsibleId: string,
  ): Promise<(EventPrisma & { participants: number })[]> {
    const filteredEvents = this.events.filter(
      (item) => item.responsibleId === responsibleId,
    );

    const eventsWithParticipantsCount = filteredEvents.map((event) => {
      const participantsCount = this.participants.filter(
        (participant) => participant.eventId === event.id,
      ).length;

      return {
        ...event,
        participants: participantsCount,
      };
    });

    return eventsWithParticipantsCount;
  }

  async findOneEventByResponsibleId(
    id: string,
    responsibleId: string,
  ): Promise<EventPrisma | null> {
    const event = this.events.find(
      (item) => item.id === id && item.responsibleId === responsibleId,
    );

    return event;
  }

  async create(data: CreateEventDTO): Promise<EventPrisma> {
    const newEvent = {
      ...data,
      id: randomUUID(),
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.events.push(newEvent);

    return newEvent;
  }

  async createParticipantEvent({
    name,
    email,
    phoneNumber,
    avatar,
    eventId,
  }: CreateParticipantDTO) {
    const newParticipantEvent = {
      id: randomUUID(),
      name,
      email,
      phoneNumber,
      avatar,
      eventId,
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.participants.push(newParticipantEvent);

    return newParticipantEvent;
  }

  async deleteEventResponsibleById(
    id: string,
    responsibleId: string,
  ): Promise<void> {
    const eventIndex = this.events.findIndex(
      (item) => item.id === id && item.responsibleId === responsibleId,
    );

    if (eventIndex >= 0) {
      this.events.splice(eventIndex, 1);
    }
  }
}

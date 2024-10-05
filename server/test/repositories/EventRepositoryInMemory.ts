import { Event as EventPrisma } from '@prisma/client';

import { EventRepository } from '@/event/repositories/EventRepository';
import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { randomUUID } from 'crypto';

export class EventRepositoryInMemory implements EventRepository {
  public events: EventPrisma[] = [];

  async findById(id: string): Promise<EventPrisma | null> {
    const event = this.events.find((item) => item.id === id);

    return event;
  }

  async findByResponsibleId(responsibleId: string): Promise<EventPrisma[]> {
    const events = this.events.filter(
      (item) => item.responsibleId === responsibleId,
    );

    return events;
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

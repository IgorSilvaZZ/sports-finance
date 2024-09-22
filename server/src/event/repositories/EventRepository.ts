import { Event as EventPrisma } from '@prisma/client';

import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';

export abstract class EventRepository {
  abstract findById(id: string): Promise<EventPrisma | null>;
  abstract create(data: CreateEventDTO): Promise<EventPrisma>;
}

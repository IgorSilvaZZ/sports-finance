import { Event as EventPrisma } from '@prisma/client';

export abstract class EventRepository {
  abstract findById(id: string): Promise<EventPrisma>;
}

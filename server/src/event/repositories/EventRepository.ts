import {
  Event as EventPrisma,
  Participant as ParticipantPrisma,
} from '@prisma/client';

import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';

export abstract class EventRepository {
  abstract findById(
    id: string,
  ): Promise<(EventPrisma & { participants: ParticipantPrisma[] }) | null>;
  abstract findByResponsibleId(responsibleId: string): Promise<
    (EventPrisma & {
      participantsCount: number;
      participants: ParticipantPrisma[];
    })[]
  >;
  abstract findOneEventByResponsibleId(
    id: string,
    responsibleId: string,
  ): Promise<EventPrisma | null>;
  abstract create(data: CreateEventDTO): Promise<EventPrisma>;
  abstract deleteEventResponsibleById(
    id: string,
    responsibleId: string,
  ): Promise<void>;
}

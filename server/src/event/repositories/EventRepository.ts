import {
  Event as EventPrisma,
  Participant as ParticipantPrisma,
  Payments as PaymentsPrisma,
} from '@prisma/client';

import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { UpdateEventDTO } from '@/event/dtos/UpdateEventDTO';

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
  ): Promise<
    | (EventPrisma & {
        participants: ParticipantPrisma[];
        payments: PaymentsPrisma[];
      })
    | null
  >;
  abstract create(data: CreateEventDTO): Promise<EventPrisma>;
  abstract updateByEventResponsibleById(
    id: string,
    responsibleId: string,
    data: UpdateEventDTO,
  ): Promise<EventPrisma | null>;
  abstract deleteEventResponsibleById(
    id: string,
    responsibleId: string,
  ): Promise<void>;
}

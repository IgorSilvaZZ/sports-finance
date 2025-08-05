import {
  Event as EventPrisma,
  Participant as ParticipantPrisma,
} from '@prisma/client';

import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { UpdateEventDTO } from '@/event/dtos/UpdateEventDTO';

import {
  EventWithoutPaymentsOutput,
  EventWithPaymentsOutput,
} from '../interfaces/Event.interface';

export abstract class EventRepository {
  abstract findById(
    id: string,
  ): Promise<(EventPrisma & { participants: ParticipantPrisma[] }) | null>;

  abstract findByResponsibleId(
    responsibleId: string,
  ): Promise<EventWithoutPaymentsOutput[]>;

  abstract findOneEventByResponsibleId(
    id: string,
    responsibleId: string,
  ): Promise<EventWithPaymentsOutput | null>;

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

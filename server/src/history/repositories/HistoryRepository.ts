import {
  History as HistoryPrisma,
  Participant as ParticipantPrisma,
  Event as EventPrisma,
} from '@prisma/client';

import { CreateHistoryDTO } from '../dtos/CreateHistoryDTO';
import { FilterHistoryDTO } from '../dtos/FilterHistoryDTO';
import { UpdateHistoryDTO } from '../dtos/UpdateHistoryDTO';

export abstract class HistoryRepository {
  abstract listByFilters(
    filters: FilterHistoryDTO,
  ): Promise<
    (HistoryPrisma & { participant: ParticipantPrisma; event: EventPrisma })[]
  >;
  abstract findByEventId(
    historyId: string,
    eventId: string,
  ): Promise<HistoryPrisma | null>;
  abstract create(data: CreateHistoryDTO): Promise<HistoryPrisma>;
  abstract updateById(
    id: string,
    data: UpdateHistoryDTO,
  ): Promise<HistoryPrisma | null>;
}

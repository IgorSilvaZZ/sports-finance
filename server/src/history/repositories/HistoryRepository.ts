import {
  History as HistoryPrisma,
  Participant as ParticipantPrisma,
  Event as EventPrisma,
} from '@prisma/client';

import { CreateHistoryDTO } from '../dtos/CreateHistoryDTO';
import { FilterHistoryDTO } from '../dtos/FilterHistoryDTO';

export abstract class HistoryRepository {
  abstract listByFilters(
    filters: FilterHistoryDTO,
  ): Promise<
    (HistoryPrisma & { participant: ParticipantPrisma; event: EventPrisma })[]
  >;
  abstract create(data: CreateHistoryDTO): Promise<HistoryPrisma>;
}

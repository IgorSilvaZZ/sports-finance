import { History as HistoryPrisma } from '@prisma/client';

import { CreateHistoryDTO } from '../dtos/CreateHistoryDTO';

export abstract class HistoryRepository {
  abstract create(data: CreateHistoryDTO): Promise<HistoryPrisma>;
}

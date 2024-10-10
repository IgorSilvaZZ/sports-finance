import { History as HistoryPrisma, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';

import { CreateHistoryDTO } from '@/history/dtos/CreateHistoryDTO';
import { HistoryRepository } from '@/history/repositories/HistoryRepository';

export class HistoryRepositoryInMemory implements HistoryRepository {
  public histories: HistoryPrisma[] = [];

  async create({
    name,
    type,
    value,
    eventId,
    participantId,
  }: CreateHistoryDTO): Promise<HistoryPrisma> {
    const newHistory = {
      id: randomUUID(),
      name,
      type,
      value: new Prisma.Decimal(value),
      eventId,
      participantId,
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.histories.push(newHistory);

    return newHistory;
  }
}

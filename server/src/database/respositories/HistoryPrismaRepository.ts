import { Injectable } from '@nestjs/common';
import { History as HistoryPrisma, Prisma } from '@prisma/client';

import { CreateHistoryDTO } from '@/history/dtos/CreateHistoryDTO';
import { HistoryRepository } from '@/history/repositories/HistoryRepository';

import { DatabaseService } from '../database.service';

@Injectable()
export class HistoryPrismaRepository implements HistoryRepository {
  constructor(private prismaService: DatabaseService) {}

  async create({
    name,
    value,
    type,
    eventId,
    participantId,
  }: CreateHistoryDTO): Promise<HistoryPrisma> {
    const historyData = {
      name,
      value: new Prisma.Decimal(value),
      type,
      eventId,
      participantId,
    };

    const history = await this.prismaService.history.create({
      data: historyData,
    });

    return history;
  }
}

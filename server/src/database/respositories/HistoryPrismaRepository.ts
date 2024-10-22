import { Injectable } from '@nestjs/common';
import {
  Event,
  History as HistoryPrisma,
  Participant,
  Prisma,
} from '@prisma/client';

import { CreateHistoryDTO } from '@/history/dtos/CreateHistoryDTO';
import { FilterHistoryDTO } from '@/history/dtos/FilterHistoryDTO';

import { HistoryRepository } from '@/history/repositories/HistoryRepository';

import { DatabaseService } from '../database.service';

@Injectable()
export class HistoryPrismaRepository implements HistoryRepository {
  constructor(private prismaService: DatabaseService) {}

  async listByFilters({
    eventId,
    textParticipant,
    year,
    month,
    status,
    type,
  }: FilterHistoryDTO): Promise<
    (HistoryPrisma & { participant: Participant; event: Event })[]
  > {
    const where: Record<string, any> = {};

    const yearFilter = year ?? new Date().getFullYear();

    where.eventId = eventId;

    if (textParticipant) {
      where.participant = {
        OR: [
          { name: { contains: textParticipant } },
          { email: { contains: textParticipant } },
        ],
      };
    }

    if (year) {
      where.createDate = {
        gte: new Date(`${year}-01-02T00:00:00Z`),
        lt: new Date(`${Number(year) + 1}-01-02T00:00:00Z`),
      };
    }

    if (month) {
      const startDate = new Date(`${yearFilter}-${month}-02T00:00:00Z`);
      const endDateYear =
        Number(month) === 12 ? Number(yearFilter) + 1 : yearFilter;

      // Criando o mes de fim
      const monthEndDate = (Number(month) % 12) + 1;

      const monthEndDateFormatted = String(monthEndDate).padStart(2, '0');

      const endDate = new Date(
        `${endDateYear}-${monthEndDateFormatted}-01T00:00:00Z`,
      );

      where.createDate = {
        gte: startDate,
        lt: endDate,
      };
    }

    if (status) {
      where.status = status === 'true' ? true : false;
    }

    if (type) {
      where.type = type;
    }

    const histories = await this.prismaService.history.findMany({
      where,
      include: {
        event: true,
        participant: true,
      },
    });

    return histories;
  }

  async create({
    name,
    value,
    type,
    eventId,
    participantId,
    createDate,
  }: CreateHistoryDTO): Promise<HistoryPrisma> {
    const historyData = {
      name,
      value: new Prisma.Decimal(value),
      type,
      eventId,
      participantId,
      status: true,
      createDate,
    };

    const history = await this.prismaService.history.create({
      data: historyData,
    });

    return history;
  }
}

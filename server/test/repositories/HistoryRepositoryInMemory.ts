import {
  Prisma,
  History as HistoryPrisma,
  Event as EventPrisma,
  Participant as ParticipantPrisma,
} from '@prisma/client';
import { randomUUID } from 'crypto';

import { CreateHistoryDTO } from '@/history/dtos/CreateHistoryDTO';
import { FilterHistoryDTO } from '@/history/dtos/FilterHistoryDTO';
import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';
import { UpdateHistoryDTO } from '@/history/dtos/UpdateHistoryDTO';

import { HistoryRepository } from '@/history/repositories/HistoryRepository';

export class HistoryRepositoryInMemory implements HistoryRepository {
  public histories: HistoryPrisma[] = [];

  public events: EventPrisma[] = [];
  public participants: ParticipantPrisma[] = [];

  async findByEventId(
    historyId: string,
    eventId: string,
  ): Promise<HistoryPrisma | null> {
    const history = await this.histories.find(
      (history) => history.id === historyId && history.eventId === eventId,
    );

    return history;
  }

  async listByFilters({
    eventId,
    textParticipant,
    year,
    month,
    status,
    type,
  }: FilterHistoryDTO): Promise<
    (HistoryPrisma & { participant: ParticipantPrisma; event: EventPrisma })[]
  > {
    const filters: ((item: HistoryPrisma) => boolean)[] = [];

    filters.push((item: HistoryPrisma) => item.eventId === eventId);

    if (textParticipant) {
      filters.push((item: HistoryPrisma) =>
        this.participants.some(
          (participant) =>
            item.participantId === participant.id &&
            [
              participant.name?.toLowerCase(),
              participant.email?.toLowerCase(),
            ].includes(textParticipant.toLowerCase()),
        ),
      );
    }

    if (year) {
      filters.push(
        (item: HistoryPrisma) => item.createDate.getFullYear() === Number(year),
      );
    }

    if (month) {
      filters.push(
        (item: HistoryPrisma) =>
          item.createDate.getMonth() + 1 === Number(month),
      );
    }

    if (status) {
      filters.push((item: HistoryPrisma) => item.status === status);
    }

    if (type) {
      filters.push((item: HistoryPrisma) => item.type === type);
    }

    const filteredHistories = this.histories.filter((history) =>
      filters.every((callbackFilters) => callbackFilters(history)),
    );

    const historyWithDetails = [];

    for (const history of filteredHistories) {
      const event = this.events.find((event) => event.id === history.eventId);

      const participant = this.participants.find(
        (participant) => participant.id === history.participantId,
      );

      if (event && participant) {
        historyWithDetails.push({
          ...history,
          participant,
          event,
        });
      }
    }

    return historyWithDetails;
  }

  async create({
    name,
    type,
    value,
    status,
    eventId,
    createDate,
    participantId,
  }: CreateHistoryDTO & {
    createDate?: Date;
    status?: boolean;
  }): Promise<HistoryPrisma> {
    const newHistory = {
      id: randomUUID(),
      name,
      type,
      status: status ?? true,
      value: new Prisma.Decimal(value),
      eventId,
      participantId,
      createDate: createDate ?? new Date(),
      updateDate: new Date(),
    };

    this.histories.push(newHistory);

    return newHistory;
  }

  async createEventHistory(data: CreateEventDTO) {
    const newEvent = {
      ...data,
      id: randomUUID(),
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.events.push(newEvent);

    return newEvent;
  }

  async createParticipantHistory({
    name,
    email,
    phoneNumber,
    avatar,
    status,
    eventId,
  }: CreateParticipantDTO) {
    const newParticipantEvent = {
      id: randomUUID(),
      name,
      email,
      phoneNumber,
      avatar,
      status: status ?? true,
      eventId,
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.participants.push(newParticipantEvent);

    return newParticipantEvent;
  }

  async updateById(
    id: string,
    data: UpdateHistoryDTO,
  ): Promise<HistoryPrisma | null> {
    const historyIndex = this.histories.findIndex(
      (history) => history.id === id,
    );

    if (historyIndex >= 0) {
      const currentHistory = this.histories[historyIndex];

      if (data.name) {
        currentHistory.name = data.name;
      }

      if (data.status !== undefined) {
        currentHistory.status = data.status;
      }

      if (data.value) {
        currentHistory.value = new Prisma.Decimal(data.value);
      }

      this.histories[historyIndex] = currentHistory;

      return currentHistory;
    }

    return null;
  }
}

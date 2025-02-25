import { Injectable } from '@nestjs/common';
import { Event, Participant, Payments } from '@prisma/client';

import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { EventRepository } from '@/event/repositories/EventRepository';

import { DatabaseService } from '../database.service';
import { UpdateEventDTO } from '@/event/dtos/UpdateEventDTO';

@Injectable()
export class EventPrismaRepository implements EventRepository {
  constructor(private prismaService: DatabaseService) {}

  async findById(
    id: string,
  ): Promise<(Event & { participants: Participant[] }) | null> {
    const event = await this.prismaService.event.findFirst({
      where: {
        id,
      },
      include: {
        Participant: true,
      },
    });

    if (event) {
      const participants = event.Participant;

      delete event.Participant;

      return {
        ...event,
        participants,
      };
    }

    return null;
  }

  async findByResponsibleId(
    responsibleId: string,
  ): Promise<
    (Event & { participantsCount: number; participants: Participant[] })[]
  > {
    const events = await this.prismaService.event.findMany({
      where: {
        responsibleId,
      },
      orderBy: {
        createDate: 'asc',
      },
      include: {
        Participant: true,
        _count: {
          select: {
            Participant: true,
          },
        },
      },
    });

    return events.map((event) => {
      const participantsCount = event._count.Participant;
      const participants = event.Participant;

      delete event._count;
      delete event.Participant;

      return {
        ...event,
        participants,
        participantsCount,
      };
    });
  }

  async findOneEventByResponsibleId(
    id: string,
    responsibleId: string,
  ): Promise<
    (Event & { participants: Participant[]; payments: Payments[] }) | null
  > {
    const event = await this.prismaService.event.findFirst({
      where: {
        id,
        responsibleId,
      },
      include: {
        Participant: true,
        Payments: true,
      },
    });

    if (event) {
      const participants = event.Participant;
      const payments = event.Payments;

      delete event.Participant;
      delete event.Payments;

      return {
        ...event,
        participants,
        payments,
      };
    }

    return null;
  }

  async create(data: CreateEventDTO): Promise<Event> {
    const newEvent = await this.prismaService.event.create({
      data,
    });

    return newEvent;
  }

  async updateByEventResponsibleById(
    id: string,
    responsibleId: string,
    data: UpdateEventDTO,
  ): Promise<Event | null> {
    const eventUpdated = await this.prismaService.event.update({
      where: {
        id,
        responsibleId,
      },
      data,
    });

    return eventUpdated;
  }

  async deleteEventResponsibleById(
    id: string,
    responsibleId: string,
  ): Promise<void> {
    await this.prismaService.event.delete({
      where: {
        id,
        responsibleId,
      },
    });
  }
}

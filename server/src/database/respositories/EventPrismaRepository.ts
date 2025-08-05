import { Injectable } from '@nestjs/common';
import { Event, Participant } from '@prisma/client';

import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { UpdateEventDTO } from '@/event/dtos/UpdateEventDTO';

import { RoleParticipant } from '@/participant/enums/role.enum';

import {
  EventWithoutPaymentsOutput,
  EventWithPaymentsOutput,
} from '@/event/interfaces/Event.interface';

import { EventRepository } from '@/event/repositories/EventRepository';

import { DatabaseService } from '../database.service';

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
  ): Promise<EventWithoutPaymentsOutput[]> {
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
  ): Promise<EventWithPaymentsOutput | null> {
    const event = await this.prismaService.event.findFirst({
      where: {
        id,
        responsibleId,
      },
      include: {
        Participant: true,
        Payments: {
          orderBy: {
            createDate: 'desc',
          },
        },
        _count: {
          select: {
            Participant: true,
            Payments: true,
          },
        },
      },
    });

    if (!event) {
      return null;
    }

    const participants = event.Participant;
    const payments = event.Payments;
    const participantsCount = event._count.Participant;
    const paymentsCount = event._count.Payments;

    delete event.Participant;
    delete event.Payments;
    delete event._count;

    const [
      participantsActiveCount,
      participantsMonthlyCount,
      participantsAggregateCount,
    ] = await Promise.all([
      this.prismaService.participant.count({
        where: {
          eventId: event.id,
          status: true,
        },
      }),

      this.prismaService.participant.count({
        where: {
          eventId: event.id,
          role: RoleParticipant.MONTHLY,
        },
      }),

      this.prismaService.participant.count({
        where: {
          eventId: event.id,
          role: RoleParticipant.AGGREGATE,
        },
      }),
    ]);

    return {
      ...event,
      participants,
      payments,
      participantsCount,
      participantsActiveCount,
      participantsMonthlyCount,
      participantsAggregateCount,
      paymentsCount,
    };
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

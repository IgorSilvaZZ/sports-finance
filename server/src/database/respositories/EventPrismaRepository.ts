import { Injectable } from '@nestjs/common';
import { Event } from '@prisma/client';

import { CreateEventDTO } from '@/event/dtos/CreateEventDTO';
import { EventRepository } from '@/event/repositories/EventRepository';

import { DatabaseService } from '../database.service';

@Injectable()
export class EventPrismaRepository implements EventRepository {
  constructor(private prismaService: DatabaseService) {}

  async findById(id: string): Promise<Event | null> {
    const event = await this.prismaService.event.findFirst({
      where: {
        id,
      },
    });

    return event;
  }

  async findByResponsibleId(
    responsibleId: string,
  ): Promise<(Event & { participants: number })[]> {
    const events = await this.prismaService.event.findMany({
      where: {
        responsibleId,
      },
      orderBy: {
        createDate: 'asc',
      },
      include: {
        _count: {
          select: {
            Participant: true,
          },
        },
      },
    });

    return events.map((event) => {
      const participants = event._count.Participant;

      delete event._count;

      return {
        ...event,
        participants,
      };
    });
  }

  async findOneEventByResponsibleId(
    id: string,
    responsibleId: string,
  ): Promise<Event | null> {
    const event = await this.prismaService.event.findFirst({
      where: {
        id,
        responsibleId,
      },
    });

    return event;
  }

  async create(data: CreateEventDTO): Promise<Event> {
    const newEvent = await this.prismaService.event.create({
      data,
    });

    return newEvent;
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

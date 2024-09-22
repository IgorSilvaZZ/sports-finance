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

  async create(data: CreateEventDTO): Promise<Event> {
    const newEvent = await this.prismaService.event.create({
      data,
    });

    return newEvent;
  }
}

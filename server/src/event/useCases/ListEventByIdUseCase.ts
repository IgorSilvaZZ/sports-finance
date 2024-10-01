import { Injectable, NotFoundException } from '@nestjs/common';

import { EventRepository } from '../repositories/EventRepository';

@Injectable()
export class ListEventByIdUseCase {
  constructor(private eventRespository: EventRepository) {}

  async execute(eventId: string) {
    const event = await this.eventRespository.findById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found!');
    }

    return event;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';

import { UpdateEventDTO } from '../dtos/UpdateEventDTO';

import { EventRepository } from '../repositories/EventRepository';
import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';

@Injectable()
export class UpdateEventByResponsibleIdUseCase {
  constructor(
    private eventRepository: EventRepository,
    private responsibleRepository: ResponsibleRepository,
  ) {}

  async execute(responsibleId: string, eventId: string, data: UpdateEventDTO) {
    const responsibleAlreadyExists =
      await this.responsibleRepository.findById(responsibleId);

    if (!responsibleAlreadyExists) {
      throw new NotFoundException('Responsible not found!');
    }

    const eventAlreadyExists =
      await this.eventRepository.findOneEventByResponsibleId(
        eventId,
        responsibleId,
      );

    if (!eventAlreadyExists) {
      throw new NotFoundException('Event by responsible not found!');
    }

    const eventUpdated =
      await this.eventRepository.updateByEventResponsibleById(
        eventId,
        responsibleId,
        data,
      );

    return eventUpdated;
  }
}

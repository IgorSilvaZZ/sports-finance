import { Injectable, NotFoundException } from '@nestjs/common';

import { EventRepository } from '../repositories/EventRepository';
import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';

@Injectable()
export class ListParticipantsByEventResponsibleIdUseCase {
  constructor(
    private eventRepository: EventRepository,
    private responsibleRespository: ResponsibleRepository,
  ) {}

  async execute(eventId: string, responsibleId: string) {
    const responsibleExists =
      await this.responsibleRespository.findById(responsibleId);

    if (!responsibleExists) {
      throw new NotFoundException('Responsible not found!');
    }

    const eventResponsibleExists =
      await this.eventRepository.findOneEventByResponsibleId(
        eventId,
        responsibleId,
      );

    if (!eventResponsibleExists) {
      throw new NotFoundException('Event not found!');
    }

    return eventResponsibleExists.participants;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';

import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { EventRepository } from '../repositories/EventRepository';

@Injectable()
export class CreateEventUseCase {
  constructor(
    private eventRepository: EventRepository,
    private responsibleRepository: ResponsibleRepository,
  ) {}

  async execute({
    name,
    description,
    type,
    responsibleId,
    dayMonthly,
    valueMonthly,
  }: CreateEventDTO) {
    const responsibleAlreadyExists =
      await this.responsibleRepository.findById(responsibleId);

    if (!responsibleAlreadyExists) {
      throw new NotFoundException('Responsible not found!');
    }

    const newEventData = {
      name,
      type,
      description,
      responsibleId,
      dayMonthly,
      valueMonthly,
    };

    const event = await this.eventRepository.create(newEventData);

    return event;
  }
}

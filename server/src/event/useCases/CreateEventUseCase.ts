import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';
import { CreateEventDTO } from '../dtos/CreateEventDTO';
import { EventRepository } from '../repositories/EventRepository';
import { NotFoundException } from '@nestjs/common';

export class CreateEventUseCase {
  constructor(
    private eventRepository: EventRepository,
    private responsibleRepository: ResponsibleRepository,
  ) {}

  async execute({ name, description, responsibleId }: CreateEventDTO) {
    const responsibleAlreadyExists =
      await this.responsibleRepository.findById(responsibleId);

    if (!responsibleAlreadyExists) {
      throw new NotFoundException('Responsible not found!');
    }

    const newEventData = {
      name,
      description,
      responsibleId,
    };

    const event = await this.eventRepository.create(newEventData);

    return event;
  }
}

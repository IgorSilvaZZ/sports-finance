import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';
import { ParticipantRepository } from '@/participant/repositories/ParticipantRepository';
import { EventRepository } from '@/event/repositories/EventRepository';

@Injectable()
export class CreateParticipantUseCase {
  constructor(
    private participantRepository: ParticipantRepository,
    private eventRepository: EventRepository,
  ) {}

  async execute(data: CreateParticipantDTO) {
    const eventAlreadyExists = await this.eventRepository.findById(
      data.eventId,
    );

    if (!eventAlreadyExists) {
      throw new NotFoundException('Event not found!');
    }

    const participantAlreadyExists =
      await this.participantRepository.findByEventId(data.name, data.eventId);

    if (participantAlreadyExists) {
      throw new BadRequestException('Participant already exists in event!');
    }

    const participant = await this.participantRepository.create(data);

    return participant;
  }
}

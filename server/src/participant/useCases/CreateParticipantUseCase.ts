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

  async execute({
    name,
    eventId,
    phoneNumber,
    avatar,
    email,
    status,
  }: CreateParticipantDTO) {
    const eventAlreadyExists = await this.eventRepository.findById(eventId);

    if (!eventAlreadyExists) {
      throw new NotFoundException('Event not found!');
    }

    const participantActiveInEvent =
      await this.participantRepository.findActiveByEventId(name, eventId);

    if (participantActiveInEvent) {
      throw new BadRequestException('Participant already exists in event!');
    }

    const participant = await this.participantRepository.create({
      name,
      eventId,
      phoneNumber,
      avatar,
      email,
      status: status ?? true,
    });

    return participant;
  }
}

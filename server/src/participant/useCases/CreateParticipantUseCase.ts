import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateParticipantDTO } from '@/participant/dtos/CreateParticipantDTO';
import { RoleParticipant } from '../enums/role.enum';

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
    role,
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
      role: role ?? RoleParticipant.MONTHLY,
    });

    return participant;
  }
}

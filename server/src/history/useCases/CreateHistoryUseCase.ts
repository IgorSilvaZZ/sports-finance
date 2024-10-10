import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateHistoryDTO } from '../dtos/CreateHistoryDTO';

import { HistoryRepository } from '../repositories/HistoryRepository';
import { EventRepository } from '@/event/repositories/EventRepository';
import { ParticipantRepository } from '@/participant/repositories/ParticipantRepository';

@Injectable()
export class CreateHistoryUseCase {
  constructor(
    private historyRepository: HistoryRepository,
    private eventRepository: EventRepository,
    private participantRepository: ParticipantRepository,
  ) {}

  async execute({
    name,
    value,
    type,
    eventId,
    participantId,
  }: CreateHistoryDTO) {
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found!');
    }

    const participant =
      await this.participantRepository.findById(participantId);

    if (!participant) {
      throw new NotFoundException('Participant not found!');
    }

    const participantInEvent = await this.participantRepository.findByEventId(
      participant.name,
      eventId,
    );

    if (!participantInEvent) {
      throw new NotFoundException(
        'The participant is not present at the event!',
      );
    }

    if (value < 0) {
      throw new BadRequestException('The value cannot be less than zero!');
    }

    if (!name) {
      const today = new Date();

      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const monthFormatted = month < 10 ? `0${month}` : month;
      const date = today.getDate();

      name = `Nova transação - ${date}/${monthFormatted}/${year}`;
    }

    const newHistory = {
      name,
      value,
      type,
      eventId,
      participantId,
    };

    const history = await this.historyRepository.create(newHistory);

    return history;
  }
}

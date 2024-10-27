import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isAfter, isValid, parseISO, startOfDay } from 'date-fns';

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
    createDate,
  }: CreateHistoryDTO) {
    const currentDate = new Date();
    let createDateToDate = currentDate;

    if (createDate) {
      createDateToDate = parseISO(String(createDate));

      if (!isValid(createDateToDate)) {
        throw new BadRequestException('Create Date for history is invalid!');
      }

      // Rever se precisar realmente barrar uma data futura posteriormente pos MVP ou testes
      if (isAfter(startOfDay(createDateToDate), startOfDay(currentDate))) {
        throw new BadRequestException(
          'The create date cannot be a future date!',
        );
      }
    }
    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found!');
    }

    const participant =
      await this.participantRepository.findById(participantId);

    if (!participant) {
      throw new NotFoundException('Participant not found!');
    }

    const participantActiveInEvent =
      await this.participantRepository.findActiveByEventId(
        participant.name,
        eventId,
      );

    if (!participantActiveInEvent) {
      throw new NotFoundException(
        'The participant is not active at the event!',
      );
    }

    if (value <= 0) {
      throw new BadRequestException('The value cannot be less than zero!');
    }

    if (!name) {
      const year = createDateToDate.getFullYear();
      const month = createDateToDate.getMonth() + 1;
      const monthFormatted = month < 10 ? `0${month}` : month;
      const date = createDateToDate.getDate();

      name = `Nova Transação - ${date}/${monthFormatted}/${year}`;
    }

    const newHistory = {
      name,
      value,
      type,
      eventId,
      participantId,
      createDate: createDateToDate,
    };

    const history = await this.historyRepository.create(newHistory);

    return history;
  }
}

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '@/event/enums/typeEvent.enums';

import { HistoryRepositoryInMemory } from '../../../test/repositories/HistoryRepositoryInMemory';
import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { ParticipantRepositoryInMemory } from '../../../test/repositories/ParticipantRepositoryInMemory';

import { CreateHistoryUseCase } from './CreateHistoryUseCase';
import { TypeHistory } from '../enums/typeHistory.enum';

let historyRepositoryInMemory: HistoryRepositoryInMemory;
let eventRespositoryInMemory: EventRepositoryInMemory;
let participantRepositoryInMemory: ParticipantRepositoryInMemory;
let createHistoryUseCase: CreateHistoryUseCase;

describe('Create history', () => {
  beforeEach(() => {
    historyRepositoryInMemory = new HistoryRepositoryInMemory();
    eventRespositoryInMemory = new EventRepositoryInMemory();
    participantRepositoryInMemory = new ParticipantRepositoryInMemory();
    createHistoryUseCase = new CreateHistoryUseCase(
      historyRepositoryInMemory,
      eventRespositoryInMemory,
      participantRepositoryInMemory,
    );
  });

  it('should be able a create a new history', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.SOCCER,
    });

    const participant = await participantRepositoryInMemory.create({
      name: faker.person.fullName(),
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    const history = await createHistoryUseCase.execute({
      name: 'Pagamento mensalidade',
      value: 30,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.MONTHLY,
    });

    expect(historyRepositoryInMemory.histories).toHaveLength(1);
    expect(history.eventId).toEqual(event.id);
    expect(history.participantId).toEqual(participant.id);
  });

  it('should be able a create new history without name', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.SOCCER,
    });

    const participant = await participantRepositoryInMemory.create({
      name: faker.person.fullName(),
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    const history = await createHistoryUseCase.execute({
      value: 30,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.MONTHLY,
    });

    expect(history.name).not.toBeNull();
    expect(history.name).toContain('Nova Transação');
  });

  it('should not be able create history a event not found', () => {
    expect(async () => {
      return createHistoryUseCase.execute({
        name: 'Pagamento mensalidade',
        value: 30,
        eventId: 'event-id-not-found',
        participantId: 'participant-id',
        type: TypeHistory.MONTHLY,
      });
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });

  it('should not be able create history a participant not found', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.SOCCER,
    });

    expect(async () => {
      return createHistoryUseCase.execute({
        name: 'Pagamento mensalidade',
        value: 30,
        eventId: event.id,
        participantId: 'participant-not-found',
        type: TypeHistory.MONTHLY,
      });
    }).rejects.toEqual(new NotFoundException('Participant not found!'));
  });

  it('should not be able create history a participant is not present in event', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.SOCCER,
    });

    const event2 = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.BASKETBALL,
    });

    const participantNotEventOne = await participantRepositoryInMemory.create({
      name: faker.person.fullName(),
      eventId: event2.id,
      phoneNumber: faker.phone.number(),
    });

    expect(async () => {
      return createHistoryUseCase.execute({
        name: 'Pagamento mensalidade',
        value: 30,
        eventId: event.id,
        participantId: participantNotEventOne.id,
        type: TypeHistory.MONTHLY,
      });
    }).rejects.toEqual(
      new NotFoundException('The participant is not present at the event!'),
    );
  });

  it('should not be able create history with value is less than zero', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.SOCCER,
    });

    const participant = await participantRepositoryInMemory.create({
      name: faker.person.fullName(),
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    expect(async () => {
      return createHistoryUseCase.execute({
        name: 'Pagamento mensalidade',
        value: -1,
        eventId: event.id,
        participantId: participant.id,
        type: TypeHistory.MONTHLY,
      });
    }).rejects.toEqual(
      new BadRequestException('The value cannot be less than zero!'),
    );
  });
});

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '@/event/enums/typeEvent.enums';
import { TypeHistory } from '../enums/typeHistory.enum';

import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { HistoryRepositoryInMemory } from '../../../test/repositories/HistoryRepositoryInMemory';

import { UpdateHistoryByEventIdUseCase } from './UpdateHistoryByEventIdUseCase';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let historyRepositoryInMemory: HistoryRepositoryInMemory;
let updateHistoryByEventIdUseCase: UpdateHistoryByEventIdUseCase;

let eventId = null;
let participantId = null;

describe('Update history', () => {
  beforeEach(async () => {
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    historyRepositoryInMemory = new HistoryRepositoryInMemory();
    updateHistoryByEventIdUseCase = new UpdateHistoryByEventIdUseCase(
      historyRepositoryInMemory,
    );

    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const event = await historyRepositoryInMemory.createEventHistory({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event Test',
      responsibleId: responsible.id,
      dayMonthly: '08',
      valueMonthly: 450,
    });

    const participant =
      await historyRepositoryInMemory.createParticipantHistory({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });

    eventId = event.id;
    participantId = participant.id;
  });

  it('should be able update name a history', async () => {
    const oldNameHistory = 'Pagamento mensalidade';

    const history = await historyRepositoryInMemory.create({
      name: oldNameHistory,
      value: 30,
      eventId,
      participantId,
      type: TypeHistory.MONTHLY,
    });

    const newNameHistory = 'Name History updated';

    const historyUpdated = await updateHistoryByEventIdUseCase.execute(
      history.id,
      eventId,
      { name: newNameHistory },
    );

    expect(historyUpdated.name).toEqual(newNameHistory);
    expect(historyUpdated.name).not.toEqual(oldNameHistory);
  });

  it('should be able update status a history', async () => {
    const history = await historyRepositoryInMemory.create({
      value: 15,
      eventId,
      participantId,
      type: TypeHistory.AGGREGATE,
    });

    const historyUpdated = await updateHistoryByEventIdUseCase.execute(
      history.id,
      eventId,
      { status: false },
    );

    const historiesFilterStatus = await historyRepositoryInMemory.listByFilters(
      { eventId, status: false },
    );

    expect(historyUpdated.status).toEqual(false);
    expect(historiesFilterStatus).toHaveLength(1);
  });

  it('should be able update value a history', async () => {
    const oldValueHistory = 15;

    const history = await historyRepositoryInMemory.create({
      value: oldValueHistory,
      eventId,
      participantId,
      type: TypeHistory.AGGREGATE,
    });

    const newValueHistory = 20;

    const historyUpdated = await updateHistoryByEventIdUseCase.execute(
      history.id,
      eventId,
      { value: newValueHistory },
    );

    expect(Number(historyUpdated.value)).toEqual(newValueHistory);
    expect(Number(historyUpdated.value)).not.toEqual(0);
    expect(Number(historyUpdated.value)).not.toBeNaN();
  });

  it('should not be able update history not found', () => {
    expect(() => {
      return updateHistoryByEventIdUseCase.execute(
        'history-id-not-found',
        eventId,
        { name: 'History name updated' },
      );
    }).rejects.toEqual(new NotFoundException('History not found!'));
  });

  it('should not be able update with value is zero', async () => {
    const history = await historyRepositoryInMemory.create({
      value: 50,
      eventId,
      participantId,
      type: TypeHistory.MONTHLY,
    });

    expect(() => {
      return updateHistoryByEventIdUseCase.execute(history.id, eventId, {
        value: -50,
      });
    }).rejects.toEqual(
      new BadRequestException('The value cannot be less than zero!'),
    );
  });
});

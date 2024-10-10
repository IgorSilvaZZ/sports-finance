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
});

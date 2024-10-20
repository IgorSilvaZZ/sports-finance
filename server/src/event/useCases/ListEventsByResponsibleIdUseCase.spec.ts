import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '../enums/typeEvent.enums';

import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { ListEventsByResponsibleIdUseCase } from './ListEventsByResponsibleIdUseCase';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let eventRepositoryInMemory: EventRepositoryInMemory;
let listEventsByResponsibleIdUseCase: ListEventsByResponsibleIdUseCase;

describe('List Events By Responsible', () => {
  beforeEach(() => {
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    eventRepositoryInMemory = new EventRepositoryInMemory();
    listEventsByResponsibleIdUseCase = new ListEventsByResponsibleIdUseCase(
      eventRepositoryInMemory,
    );
  });

  it('should be able list events by responsible', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '04',
      valueMonthly: 700,
    });

    const eventsResponsible = await listEventsByResponsibleIdUseCase.execute(
      responsible.id,
    );

    expect(eventsResponsible).toHaveLength(1);
    expect.arrayContaining([
      expect.objectContaining({ responsibleId: responsible.id }),
    ]);
  });

  it('should not be able list events by responsible not contains events', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const eventsResponsible = await listEventsByResponsibleIdUseCase.execute(
      responsible.id,
    );

    expect(eventsResponsible).toHaveLength(0);
  });

  it('should be able list count participants and participants with events', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const event = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '04',
      valueMonthly: 700,
    });

    await Promise.all([
      eventRepositoryInMemory.createParticipantEvent({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      }),
      eventRepositoryInMemory.createParticipantEvent({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      }),
      eventRepositoryInMemory.createParticipantEvent({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      }),
    ]);

    const [firstEvent] = await listEventsByResponsibleIdUseCase.execute(
      responsible.id,
    );

    expect(firstEvent).toHaveProperty('participantsCount');
    expect(firstEvent).toHaveProperty('participants');
    expect(firstEvent.participantsCount).toEqual(3);
    expect(firstEvent.participants).toHaveLength(3);
  });
});

import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '../enums/typeEvent.enums';

import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { ListParticipantsByEventResponsibleIdUseCase } from './ListParticipantsByEventResponsibleIdUseCase';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let eventRepositoryInMemory: EventRepositoryInMemory;
let listParticipantsByEventResponsibleIdUseCase: ListParticipantsByEventResponsibleIdUseCase;

describe('List participants in event by responsible', () => {
  beforeEach(() => {
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    eventRepositoryInMemory = new EventRepositoryInMemory();
    listParticipantsByEventResponsibleIdUseCase =
      new ListParticipantsByEventResponsibleIdUseCase(
        eventRepositoryInMemory,
        responsibleRepositoryInMemory,
      );
  });

  it('should be able list participants in events by responsible id', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const event = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.TENNIS,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '04',
      valueMonthly: 300,
    });

    eventRepositoryInMemory.createParticipantEvent({
      name: faker.person.fullName(),
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    eventRepositoryInMemory.createParticipantEvent({
      name: faker.person.fullName(),
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    eventRepositoryInMemory.createParticipantEvent({
      name: faker.person.fullName(),
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    const participantsInEvent =
      await listParticipantsByEventResponsibleIdUseCase.execute(
        event.id,
        responsible.id,
      );

    expect(participantsInEvent).toHaveLength(3);
    expect(participantsInEvent).not.toBeNull();
  });

  it('should not be able list participants in event responsible not exists', async () => {
    const event1 = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.TENNIS,
      description: 'Event test created',
      responsibleId: 'responsible-id',
      dayMonthly: '04',
      valueMonthly: 300,
    });

    expect(async () => {
      await listParticipantsByEventResponsibleIdUseCase.execute(
        event1.id,
        'responsible-not-found',
      );
    }).rejects.toEqual(new NotFoundException('Responsible not found!'));
  });

  it('should not be able list participants in event not exists', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    expect(async () => {
      await listParticipantsByEventResponsibleIdUseCase.execute(
        'event-not-found',
        responsible.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });

  it('should not be able list participants in event not create responsible', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const eventResponsible1 = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.TENNIS,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '04',
      valueMonthly: 300,
    });

    const responsible2 = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const eventResponsible2 = await eventRepositoryInMemory.create({
      name: 'Event Test 2',
      type: TypeEvent.VOLLEYBALL,
      description: 'Event test 2 created',
      responsibleId: responsible2.id,
      dayMonthly: '04',
      valueMonthly: 300,
    });

    expect(async () => {
      await listParticipantsByEventResponsibleIdUseCase.execute(
        eventResponsible2.id,
        responsible.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));

    expect(async () => {
      await listParticipantsByEventResponsibleIdUseCase.execute(
        eventResponsible1.id,
        responsible2.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });
});

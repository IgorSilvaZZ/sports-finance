import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '../enums/typeEvent.enums';

import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { FindEventByResponsibleIdUseCase } from './FindEventByResponsibleIdUseCase';
import { NotFoundException } from '@nestjs/common';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let eventRepositoryInMemory: EventRepositoryInMemory;
let findEventByResponsibleIdUseCase: FindEventByResponsibleIdUseCase;

describe('Find event by responsible id', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    findEventByResponsibleIdUseCase = new FindEventByResponsibleIdUseCase(
      eventRepositoryInMemory,
      responsibleRepositoryInMemory,
    );
  });

  it('should be able get event by responsible', async () => {
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
      valueMonthly: 300,
    });

    const findEventResponsible = await findEventByResponsibleIdUseCase.execute(
      event.id,
      responsible.id,
    );

    expect(findEventResponsible).not.toBeNull();
    expect(findEventResponsible.responsibleId).toEqual(responsible.id);
    expect(findEventResponsible.id).toBe(event.id);
    expect(findEventResponsible).toHaveProperty('name');
  });

  it('should be able get event by responsible with participants', async () => {
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

    const findEventResponsible = await findEventByResponsibleIdUseCase.execute(
      event.id,
      responsible.id,
    );

    expect(findEventResponsible.responsibleId).toEqual(responsible.id);
    expect(findEventResponsible).toHaveProperty('participants');
    expect(findEventResponsible.participants).toHaveLength(3);
  });

  it('should not be able list a event responsible not exists', async () => {
    const event1 = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: 'responsible-id',
      dayMonthly: '04',
      valueMonthly: 300,
    });

    expect(async () => {
      return findEventByResponsibleIdUseCase.execute(
        event1.id,
        'responsible-not-found',
      );
    }).rejects.toEqual(new NotFoundException('Responsible not found!'));
  });

  it('should not be able list a event not exists', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    expect(async () => {
      return findEventByResponsibleIdUseCase.execute(
        'event-not-found',
        responsible.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });

  it('should not be able list a event not create responsible', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const eventResponsible1 = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
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
      type: TypeEvent.BASKETBALL,
      description: 'Event test 2 created',
      responsibleId: responsible2.id,
      dayMonthly: '04',
      valueMonthly: 300,
    });

    expect(async () => {
      return findEventByResponsibleIdUseCase.execute(
        eventResponsible2.id,
        responsible.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));

    expect(async () => {
      return findEventByResponsibleIdUseCase.execute(
        eventResponsible1.id,
        responsible2.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });
});

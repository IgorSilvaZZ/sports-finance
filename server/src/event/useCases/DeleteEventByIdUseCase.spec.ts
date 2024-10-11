import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '../enums/typeEvent.enums';

import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { DeleteEventResponsibleByIdUseCase } from './DeleteEventResponsibleByIdUseCase';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let eventRepositoryInMemory: EventRepositoryInMemory;
let deleteEventResponsibleByIdUseCase: DeleteEventResponsibleByIdUseCase;

describe('Delete Event by id', () => {
  beforeEach(() => {
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    eventRepositoryInMemory = new EventRepositoryInMemory();
    deleteEventResponsibleByIdUseCase = new DeleteEventResponsibleByIdUseCase(
      eventRepositoryInMemory,
      responsibleRepositoryInMemory,
    );
  });

  it('should be able a responsible delete event by id', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const event1 = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '04',
      valueMonthly: 300,
    });

    await eventRepositoryInMemory.create({
      name: 'Event Test 2',
      type: TypeEvent.BASKETBALL,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '04',
      valueMonthly: 300,
    });

    await deleteEventResponsibleByIdUseCase.execute(event1.id, responsible.id);

    const eventsReponsible = await eventRepositoryInMemory.findByResponsibleId(
      responsible.id,
    );

    expect(eventsReponsible).toHaveLength(1);
  });

  it('should not be able delete a event responsible not exists', async () => {
    const event1 = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: 'responsible-id',
      dayMonthly: '04',
      valueMonthly: 300,
    });

    expect(async () => {
      await deleteEventResponsibleByIdUseCase.execute(
        event1.id,
        'responsible-not-found',
      );
    }).rejects.toEqual(new NotFoundException('Responsible not found!'));
  });

  it('should not be able delete a event not exists', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    expect(async () => {
      await deleteEventResponsibleByIdUseCase.execute(
        'event-not-found',
        responsible.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });

  it('should not be able delete a event not create responsible', async () => {
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
      await deleteEventResponsibleByIdUseCase.execute(
        eventResponsible2.id,
        responsible.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));

    expect(async () => {
      await deleteEventResponsibleByIdUseCase.execute(
        eventResponsible1.id,
        responsible2.id,
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });
});

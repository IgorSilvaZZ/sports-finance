import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '../enums/typeEvent.enums';

import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';

import { ListEventByIdUseCase } from './ListEventByIdUseCase';

let eventRepositoryInMemory: EventRepositoryInMemory;
let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let listEventByIdUseCase: ListEventByIdUseCase;

describe('List event by id', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    listEventByIdUseCase = new ListEventByIdUseCase(eventRepositoryInMemory);
  });

  it('should be able list event by id', async () => {
    const nameEvent = 'Event Test';

    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const event = await eventRepositoryInMemory.create({
      name: nameEvent,
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: responsible.id,
    });

    const events = await listEventByIdUseCase.execute(event.id);

    expect(event).toBeTruthy();
    expect(event.id).toEqual(event.id);
    expect(events.name).toEqual(nameEvent);
  });

  it('should not be able list event by id not found', () => {
    expect(async () => {
      return listEventByIdUseCase.execute('event-id-not-found');
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });
});

import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '../enums/typeEvent.enums';

import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { CreateEventUseCase } from './CreateEventUseCase';

let eventRepositoryInMemory: EventRepositoryInMemory;
let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let createEventUseCase: CreateEventUseCase;

describe('Create a new event', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    createEventUseCase = new CreateEventUseCase(
      eventRepositoryInMemory,
      responsibleRepositoryInMemory,
    );
  });

  it('should be able create multiples events', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    await createEventUseCase.execute({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: responsible.id,
    });

    await createEventUseCase.execute({
      name: 'Event Test 2',
      type: TypeEvent.SOCCER,
      description: 'Event test 2 created',
      responsibleId: responsible.id,
    });

    expect(eventRepositoryInMemory.events).toHaveLength(2);
    expect(eventRepositoryInMemory.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ responsibleId: responsible.id }),
        expect.objectContaining({ responsibleId: responsible.id }),
      ]),
    );
  });

  it('should not be able create event if responsible not exists', async () => {
    expect(async () => {
      await createEventUseCase.execute({
        name: 'Event Test',
        type: TypeEvent.SOCCER,
        description: 'Event test created',
        responsibleId: 'responsibleId-not-found',
      });
    }).rejects.toEqual(new NotFoundException('Responsible not found!'));
  });
});

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { CreateParticipantDTO } from '../dtos/CreateParticipantDTO';

import { ParticipantRepositoryInMemory } from '../../../test/repositories/ParticipantRepositoryInMemory';
import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';

import { CreateParticipantUseCase } from './CreateParticipantUseCase';

let participantRepositoryInMemory: ParticipantRepositoryInMemory;
let eventRepositoryInMemory: EventRepositoryInMemory;
let createParticipantUseCase: CreateParticipantUseCase;

describe('Create Participant', () => {
  beforeEach(() => {
    participantRepositoryInMemory = new ParticipantRepositoryInMemory();
    eventRepositoryInMemory = new EventRepositoryInMemory();
    createParticipantUseCase = new CreateParticipantUseCase(
      participantRepositoryInMemory,
      eventRepositoryInMemory,
    );
  });

  it('should be able create a new participant', async () => {
    const event = await eventRepositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
    });

    const name = faker.person.fullName();

    const dataParticipant: CreateParticipantDTO = {
      name,
      phoneNumber: faker.phone.number(),
      eventId: event.id,
    };

    const newParticipant =
      await createParticipantUseCase.execute(dataParticipant);

    expect(newParticipant.name).toEqual(name);
    expect(newParticipant.eventId).toEqual(event.id);
  });

  it('should be able create multiples participants in event', async () => {
    const event = await eventRepositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
    });

    await createParticipantUseCase.execute({
      name: faker.person.fullName(),
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    await createParticipantUseCase.execute({
      name: faker.person.fullName(),
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    expect(participantRepositoryInMemory.participants).toHaveLength(2);
  });

  it('should not be able create participant in event not exists', () => {
    expect(async () => {
      await createParticipantUseCase.execute({
        name: faker.person.fullName(),
        eventId: 'eventId-not-found',
        phoneNumber: faker.phone.number(),
      });
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });

  it('should not be able create participant if name equals in event', async () => {
    const event = await eventRepositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
    });

    const name = faker.person.fullName();

    await createParticipantUseCase.execute({
      name: name,
      eventId: event.id,
      phoneNumber: faker.phone.number(),
    });

    expect(async () => {
      await createParticipantUseCase.execute({
        name: name,
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });
    }).rejects.toEqual(
      new BadRequestException('Participant already exists in event!'),
    );
  });
});

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
});

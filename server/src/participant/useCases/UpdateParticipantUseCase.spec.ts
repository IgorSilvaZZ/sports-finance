import { faker } from '@faker-js/faker/.';

import { TypeEvent } from '@/event/enums/typeEvent.enums';

import { ParticipantRepositoryInMemory } from '../../../test/repositories/ParticipantRepositoryInMemory';
import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { UpdateParticipantUseCase } from './UpdateParticipantUseCase';

let participantRepositoryInMemory: ParticipantRepositoryInMemory;
let eventRepositoryInMemory: EventRepositoryInMemory;
let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let updateParticipantUseCase: UpdateParticipantUseCase;

let eventId = null;

describe('Update Participant', () => {
  beforeEach(async () => {
    participantRepositoryInMemory = new ParticipantRepositoryInMemory();
    eventRepositoryInMemory = new EventRepositoryInMemory();
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    updateParticipantUseCase = new UpdateParticipantUseCase(
      participantRepositoryInMemory,
    );

    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const event = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event Test',
      responsibleId: responsible.id,
      dayMonthly: '08',
      valueMonthly: 450,
    });

    eventId = event.id;
  });

  it('should be able update name a participant', async () => {
    const oldNameParticipant = faker.person.fullName();

    const participant = await participantRepositoryInMemory.create({
      name: oldNameParticipant,
      eventId: eventId,
      phoneNumber: faker.phone.number(),
    });

    const newNameParticipant = 'Participant Name updated';

    const participantUpdated = await updateParticipantUseCase.execute(
      participant.id,
      { name: newNameParticipant },
    );

    expect(participantUpdated.name).toEqual(newNameParticipant);
    expect(participantUpdated.name).not.toEqual(oldNameParticipant);
  });

  it('should be able update phoneNumber a participant', async () => {
    const oldPhoneNumberParticipant = faker.phone.number();

    const participant = await participantRepositoryInMemory.create({
      name: faker.person.fullName(),
      eventId: eventId,
      phoneNumber: oldPhoneNumberParticipant,
    });

    const newPhoneNumberParticipant = faker.phone.number();

    const participantUpdated = await updateParticipantUseCase.execute(
      participant.id,
      { phoneNumber: newPhoneNumberParticipant },
    );

    expect(participantUpdated.phoneNumber).toEqual(newPhoneNumberParticipant);
    expect(participantUpdated.phoneNumber).not.toEqual(
      oldPhoneNumberParticipant,
    );
  });

  it('should be able update email a participant', async () => {
    const participant = await participantRepositoryInMemory.create({
      name: faker.person.fullName(),
      eventId: eventId,
      phoneNumber: faker.phone.number(),
    });

    const newEmailParticipant = faker.internet.email();

    const participantUpdated = await updateParticipantUseCase.execute(
      participant.id,
      { email: newEmailParticipant },
    );

    expect(participantUpdated.email).toEqual(newEmailParticipant);
  });

  it('should be able update name and email a participant', async () => {
    const oldNameParticipant = faker.person.fullName();
    const oldEmailParticipant = faker.internet.email();

    const participant = await participantRepositoryInMemory.create({
      name: oldNameParticipant,
      eventId: eventId,
      phoneNumber: faker.phone.number(),
      email: oldEmailParticipant,
    });

    const newNameParticipant = 'New name participant';
    const newEmailParticipant = 'test@email.com';

    const participantUpdated = await updateParticipantUseCase.execute(
      participant.id,
      { name: newNameParticipant, email: newEmailParticipant },
    );

    expect(participantUpdated.name).not.toEqual(oldNameParticipant);
    expect(participantUpdated.email).not.toEqual(oldEmailParticipant);

    expect(participantUpdated.name).toEqual(newNameParticipant);
    expect(participantUpdated.email).toEqual(newEmailParticipant);
  });

  it('should handle concurrent updates gracefully', async () => {
    const participant = await participantRepositoryInMemory.create({
      name: faker.person.fullName(),
      eventId: eventId,
      phoneNumber: faker.phone.number(),
    });

    await Promise.all([
      await updateParticipantUseCase.execute(participant.id, {
        name: 'Concurrent Update 1',
      }),
      await updateParticipantUseCase.execute(participant.id, {
        name: 'Concurrent Update 2',
      }),
    ]);

    const participantAfterUpdate = await participantRepositoryInMemory.findById(
      participant.id,
    );

    // Verificando se contém um dos dois nomes é possivel
    expect(['Concurrent Update 1', 'Concurrent Update 2']).toContain(
      participantAfterUpdate.name,
    );
  });
});

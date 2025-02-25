import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';

import { makeResponsible } from '../../../test/factories/responsible.factory';
import { makeEvent } from '../../../test/factories/event.factory';

import { UpdateEventByResponsibleIdUseCase } from './UpdateEventByResponsibleIdUseCase';
import { NotFoundException } from '@nestjs/common';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let eventRepositoryInMemory: EventRepositoryInMemory;
let updateEventByResponsibleIdUseCase: UpdateEventByResponsibleIdUseCase;

describe('Update Event By Responsible', () => {
  beforeEach(() => {
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    eventRepositoryInMemory = new EventRepositoryInMemory();

    updateEventByResponsibleIdUseCase = new UpdateEventByResponsibleIdUseCase(
      eventRepositoryInMemory,
      responsibleRepositoryInMemory,
    );
  });

  it('should be able update name event by responsible', async () => {
    const responsible =
      await responsibleRepositoryInMemory.create(makeResponsible());

    const event = await eventRepositoryInMemory.create(
      makeEvent({ responsibleId: responsible.id }),
    );

    const newNameEvent = 'Event Tennis com amigos';

    const eventUpdated = await updateEventByResponsibleIdUseCase.execute(
      responsible.id,
      event.id,
      { name: newNameEvent },
    );

    expect(eventUpdated.name).toEqual(newNameEvent);
  });

  it('should be able update description event by responsible', async () => {
    const responsible =
      await responsibleRepositoryInMemory.create(makeResponsible());

    const oldDescription = `New event test by ${responsible.name}`;

    const event = await eventRepositoryInMemory.create(
      makeEvent({ responsibleId: responsible.id, description: oldDescription }),
    );

    const newDescriptionEvent = 'Event Tennis com amigos';

    const eventUpdated = await updateEventByResponsibleIdUseCase.execute(
      responsible.id,
      event.id,
      { description: newDescriptionEvent },
    );

    expect(eventUpdated.description).toEqual(newDescriptionEvent);
    expect(eventUpdated.description).not.toEqual(oldDescription);
  });

  it('should be able update valueMonthly event by responsible', async () => {
    const responsible =
      await responsibleRepositoryInMemory.create(makeResponsible());

    const oldValueMonthly = 500;

    const event = await eventRepositoryInMemory.create(
      makeEvent({
        responsibleId: responsible.id,
        valueMonthly: oldValueMonthly,
      }),
    );

    const newValueMonthly = 600;

    const eventUpdated = await updateEventByResponsibleIdUseCase.execute(
      responsible.id,
      event.id,
      { valueMonthly: newValueMonthly },
    );

    expect(eventUpdated.valueMonthly).toEqual(newValueMonthly);
    expect(eventUpdated.valueMonthly).not.toEqual(oldValueMonthly);
  });

  it('should be able update dayMonthly event by responsible', async () => {
    const responsible =
      await responsibleRepositoryInMemory.create(makeResponsible());

    const oldDayMonthly = '18';

    const event = await eventRepositoryInMemory.create(
      makeEvent({
        responsibleId: responsible.id,
        dayMonthly: oldDayMonthly,
      }),
    );

    const newDayMonthly = '25';

    const eventUpdated = await updateEventByResponsibleIdUseCase.execute(
      responsible.id,
      event.id,
      { dayMonthly: newDayMonthly },
    );

    expect(eventUpdated.dayMonthly).toEqual(newDayMonthly);
    expect(eventUpdated.dayMonthly).not.toEqual(oldDayMonthly);
  });

  it('should not be able update responsible not found', async () => {
    const event = await eventRepositoryInMemory.create(makeEvent());

    expect(async () => {
      await updateEventByResponsibleIdUseCase.execute(
        'responsible-id-not-found',
        event.id,
        { name: 'New name event' },
      );
    }).rejects.toEqual(new NotFoundException('Responsible not found!'));
  });

  it('should not be able update responsible', async () => {
    const responsible =
      await responsibleRepositoryInMemory.create(makeResponsible());

    expect(async () => {
      await updateEventByResponsibleIdUseCase.execute(
        responsible.id,
        'event-id-not-found',
        { name: 'New name event' },
      );
    }).rejects.toEqual(
      new NotFoundException('Event by responsible not found!'),
    );
  });
});

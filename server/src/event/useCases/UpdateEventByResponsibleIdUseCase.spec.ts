import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';

import { makeResponsible } from '../../../test/factories/responsible.factory';
import { makeEvent } from '../../../test/factories/event.factory';

import { UpdateEventByResponsibleIdUseCase } from './UpdateEventByResponsibleIdUseCase';

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

  it('Update name event by responsible', async () => {
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
});

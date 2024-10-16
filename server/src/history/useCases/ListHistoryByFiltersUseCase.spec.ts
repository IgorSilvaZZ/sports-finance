import { Responsible as ResponsiblePrisma } from '@prisma/client';

import { TypeEvent } from '@/event/enums/typeEvent.enums';
import { TypeHistory } from '../enums/typeHistory.enum';

import { HistoryRepositoryInMemory } from '../../../test/repositories/HistoryRepositoryInMemory';
import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';

import { ListHistoryByFiltersUseCase } from './ListHistoryByFiltersUseCase';
import { faker } from '@faker-js/faker/.';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let historyRepositoryInMemory: HistoryRepositoryInMemory;
let listHistoryByFiltersUseCase: ListHistoryByFiltersUseCase;
let responsible: ResponsiblePrisma | null = null;

describe('List histories by filters', () => {
  beforeEach(async () => {
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    historyRepositoryInMemory = new HistoryRepositoryInMemory();
    listHistoryByFiltersUseCase = new ListHistoryByFiltersUseCase(
      historyRepositoryInMemory,
    );

    responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });
  });

  it('should be able list history by event', async () => {
    const event = await historyRepositoryInMemory.createEventHistory({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '04',
      valueMonthly: 700,
    });

    const participant =
      await historyRepositoryInMemory.createParticipantHistory({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });

    await historyRepositoryInMemory.create({
      name: 'Pagamento mensalidade',
      value: 35,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.MONTHLY,
    });

    await historyRepositoryInMemory.create({
      name: 'Pagamento Agregado',
      value: 15,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.AGGREGATE,
    });

    const listHistoryByEvent = await listHistoryByFiltersUseCase.execute({
      eventId: event.id,
    });

    expect(listHistoryByEvent).toHaveLength(2);
    expect(listHistoryByEvent).toEqual(
      expect.arrayContaining([expect.objectContaining({ eventId: event.id })]),
    );
  });

  it('should be able list history with name participant in filters', async () => {
    const nameParticipant = faker.person.fullName();

    const event = await historyRepositoryInMemory.createEventHistory({
      name: 'Event Test',
      type: TypeEvent.TENNIS,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '08',
      valueMonthly: 1450,
    });

    const participant1 =
      await historyRepositoryInMemory.createParticipantHistory({
        name: nameParticipant,
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });

    const participant2 =
      await historyRepositoryInMemory.createParticipantHistory({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });

    await historyRepositoryInMemory.create({
      name: 'Pagamento mensalidade',
      value: 50,
      eventId: event.id,
      participantId: participant1.id,
      type: TypeHistory.MONTHLY,
    });

    await historyRepositoryInMemory.create({
      name: 'Pagamento mensalidade',
      value: 50,
      eventId: event.id,
      participantId: participant2.id,
      type: TypeHistory.MONTHLY,
    });

    const listHistoryByNameParticipant =
      await listHistoryByFiltersUseCase.execute({
        eventId: event.id,
        textParticipant: nameParticipant,
      });

    expect(listHistoryByNameParticipant).toHaveLength(1);
    expect(listHistoryByNameParticipant).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({ participant: { name: 'Name not found' } }),
      ]),
    );
  });

  it('should be able list history with month in filters', async () => {
    const month = '03';

    const event = await historyRepositoryInMemory.createEventHistory({
      name: 'Event Test',
      type: TypeEvent.TABLE_TENNIS,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '02',
      valueMonthly: 450,
    });

    const participant =
      await historyRepositoryInMemory.createParticipantHistory({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });

    await historyRepositoryInMemory.create({
      name: 'Pagamento mensalidade',
      value: 30,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.MONTHLY,
      createDate: new Date('2024-03-15'),
    });

    const listHistoryByMonth = await listHistoryByFiltersUseCase.execute({
      eventId: event.id,
      month,
    });

    expect(listHistoryByMonth).toHaveLength(1);
  });

  it('should be able list history with year in filters', async () => {
    const years = ['2024', '2025', '2026', '2027'];

    const event = await historyRepositoryInMemory.createEventHistory({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '15',
      valueMonthly: 1250,
    });

    const participant =
      await historyRepositoryInMemory.createParticipantHistory({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });

    for (const currentYear of years) {
      await historyRepositoryInMemory.create({
        name: 'Pagamento mensalidade',
        value: 90,
        eventId: event.id,
        participantId: participant.id,
        type: TypeHistory.MONTHLY,
        createDate: new Date(`${currentYear}-01-15`),
      });
    }

    const listHistoryByYear1 = await listHistoryByFiltersUseCase.execute({
      eventId: event.id,
      year: '2024',
    });

    const listHistoryByYear2 = await listHistoryByFiltersUseCase.execute({
      eventId: event.id,
      year: '2025',
    });

    expect(listHistoryByYear1).toHaveLength(1);
    expect(listHistoryByYear2).toHaveLength(1);
  });

  it('should be able list history with type in filters', async () => {
    const event = await historyRepositoryInMemory.createEventHistory({
      name: 'Event Test',
      type: TypeEvent.BASKETBALL,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '20',
      valueMonthly: 1400,
    });

    const participant =
      await historyRepositoryInMemory.createParticipantHistory({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });

    await historyRepositoryInMemory.create({
      name: 'Pagamento Agregado',
      value: 40,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.AGGREGATE,
    });

    await historyRepositoryInMemory.create({
      name: 'Pagamento Agregado',
      value: 40,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.AGGREGATE,
    });

    await historyRepositoryInMemory.create({
      name: 'Pagamento Agregado',
      value: 40,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.AGGREGATE,
    });

    const listHistoryByTypeAggregate =
      await listHistoryByFiltersUseCase.execute({
        eventId: event.id,
        type: TypeHistory.AGGREGATE,
      });

    const listHistoryByTypeMonthly = await listHistoryByFiltersUseCase.execute({
      eventId: event.id,
      type: TypeHistory.MONTHLY,
    });

    expect(listHistoryByTypeAggregate).toHaveLength(3);
    expect(listHistoryByTypeMonthly).toHaveLength(0);
  });

  it('should be able list history with status in filters', async () => {
    const event = await historyRepositoryInMemory.createEventHistory({
      name: 'Event Test',
      type: TypeEvent.OTHER,
      description: 'Event test created',
      responsibleId: responsible.id,
      dayMonthly: '02',
      valueMonthly: 350,
    });

    const participant =
      await historyRepositoryInMemory.createParticipantHistory({
        name: faker.person.fullName(),
        eventId: event.id,
        phoneNumber: faker.phone.number(),
      });

    await historyRepositoryInMemory.create({
      name: 'Pagamento Mensal',
      value: 35,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.MONTHLY,
      status: false,
      createDate: new Date('2024-03-02'),
    });

    await historyRepositoryInMemory.create({
      name: 'Pagamento Agregado',
      value: 35,
      eventId: event.id,
      participantId: participant.id,
      type: TypeHistory.MONTHLY,
      status: false,
      createDate: new Date('2024-04-02'),
    });

    const listHistoryByTypeStatus = await listHistoryByFiltersUseCase.execute({
      eventId: event.id,
      status: false,
    });

    expect(listHistoryByTypeStatus).toHaveLength(2);
    expect(listHistoryByFiltersUseCase).toEqual(
      expect.not.arrayContaining([expect.objectContaining({ status: true })]),
    );
  });
});

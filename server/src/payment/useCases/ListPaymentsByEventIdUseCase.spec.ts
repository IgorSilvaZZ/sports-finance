import { NotFoundException } from '@nestjs/common';

import { TypeEvent } from '@/event/enums/typeEvent.enums';

import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { PaymentRepositoryInMemory } from '../../../test/repositories/PaymentRepositoryInMemory';

import { ListPaymentsByEventIdUseCase } from './ListPaymentsByEventIdUseCase';

let eventRespositoryInMemory: EventRepositoryInMemory;
let paymentRepositoryInMemory: PaymentRepositoryInMemory;
let listPaymentsByEventIdUseCase: ListPaymentsByEventIdUseCase;

describe('List payments by event', () => {
  beforeEach(() => {
    eventRespositoryInMemory = new EventRepositoryInMemory();
    paymentRepositoryInMemory = new PaymentRepositoryInMemory();

    listPaymentsByEventIdUseCase = new ListPaymentsByEventIdUseCase(
      paymentRepositoryInMemory,
      eventRespositoryInMemory,
    );
  });

  it('should be able list payments by event', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.TENNIS,
      dayMonthly: '20',
      valueMonthly: 1450,
    });

    paymentRepositoryInMemory.create({
      value: event.valueMonthly,
      datePayment: '2024-08-06',
      eventId: event.id,
      paymentRef: '2024-08',
    });

    paymentRepositoryInMemory.create({
      value: event.valueMonthly,
      datePayment: '2024-08-06',
      eventId: event.id,
      paymentRef: '2024-08',
    });

    const paymentsEvent = await listPaymentsByEventIdUseCase.execute(event.id);

    expect(paymentsEvent).toBeTruthy();
    expect(paymentsEvent).toHaveLength(2);
  });

  it('should not be able list payments by event not found', () => {
    expect(() => {
      return listPaymentsByEventIdUseCase.execute('event-id-not-found');
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });
});

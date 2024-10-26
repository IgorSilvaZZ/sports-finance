import { NotFoundException } from '@nestjs/common';

import { TypeEvent } from '@/event/enums/typeEvent.enums';

import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { PaymentRepositoryInMemory } from '../../../test/repositories/PaymentRepositoryInMemory';
import { DeletePaymentEventByIdUseCase } from './DeletePaymentEventByIdUseCase';

let eventRepositoryInMemory: EventRepositoryInMemory;
let paymentRepositoryInMemory: PaymentRepositoryInMemory;
let deletePaymentEventByIdUseCase: DeletePaymentEventByIdUseCase;

describe('Delete Payment By event', () => {
  beforeEach(() => {
    eventRepositoryInMemory = new EventRepositoryInMemory();
    paymentRepositoryInMemory = new PaymentRepositoryInMemory();

    deletePaymentEventByIdUseCase = new DeletePaymentEventByIdUseCase(
      paymentRepositoryInMemory,
    );
  });

  it('should be able delete payment by event', async () => {
    const event = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: 'responsible-id',
      dayMonthly: '24',
      valueMonthly: 300,
    });

    const payment = await paymentRepositoryInMemory.create({
      value: event.valueMonthly,
      datePayment: '2024-10-06',
      eventId: event.id,
      paymentRef: '2024-10',
    });

    await deletePaymentEventByIdUseCase.execute(payment.id, event.id);

    const paymentsByEvent = await paymentRepositoryInMemory.findByEventId(
      event.id,
    );

    expect(paymentsByEvent).toHaveLength(0);
  });

  it('should not be able delete payment event not exists', async () => {
    const payment = await paymentRepositoryInMemory.create({
      value: 600,
      datePayment: '2024-10-06',
      eventId: 'event-id',
      paymentRef: '2024-10',
    });

    expect(() => {
      return deletePaymentEventByIdUseCase.execute(
        payment.id,
        'event-not-exists',
      );
    }).rejects.toEqual(new NotFoundException('Payment not found!'));
  });

  it('should not be able delete payment not exists', async () => {
    const event = await eventRepositoryInMemory.create({
      name: 'Event Test',
      type: TypeEvent.SOCCER,
      description: 'Event test created',
      responsibleId: 'responsible-id',
      dayMonthly: '24',
      valueMonthly: 300,
    });

    expect(() => {
      return deletePaymentEventByIdUseCase.execute(
        'payment-id-not-found',
        event.id,
      );
    }).rejects.toEqual(new NotFoundException('Payment not found!'));
  });
});

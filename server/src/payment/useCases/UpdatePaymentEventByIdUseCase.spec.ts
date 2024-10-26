import { NotFoundException } from '@nestjs/common';

import { TypeEvent } from '@/event/enums/typeEvent.enums';

import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { PaymentRepositoryInMemory } from '../../../test/repositories/PaymentRepositoryInMemory';

import { UpdatePaymentEventByIdUseCase } from './UpdatePaymentEventByIdUseCase';

let eventRespositoryInMemory: EventRepositoryInMemory;
let paymentRepositoryInMemory: PaymentRepositoryInMemory;
let updatePaymentEventByIdUseCase: UpdatePaymentEventByIdUseCase;

describe('Update payment by event', () => {
  beforeEach(() => {
    eventRespositoryInMemory = new EventRepositoryInMemory();
    paymentRepositoryInMemory = new PaymentRepositoryInMemory();

    updatePaymentEventByIdUseCase = new UpdatePaymentEventByIdUseCase(
      paymentRepositoryInMemory,
      eventRespositoryInMemory,
    );
  });

  it('should be able update status a payment by event', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.VOLLEYBALL,
      dayMonthly: '12',
      valueMonthly: 500,
    });

    const payment1 = await paymentRepositoryInMemory.create({
      value: event.valueMonthly,
      datePayment: '2024-09-12',
      eventId: event.id,
      paymentRef: '2024-09',
    });

    const payment2 = await paymentRepositoryInMemory.create({
      value: event.valueMonthly,
      datePayment: '2024-10-12',
      eventId: event.id,
      paymentRef: '2024-10',
    });

    const updatedPaymentOne = await updatePaymentEventByIdUseCase.execute(
      event.id,
      payment1.id,
      { status: false },
    );

    const updatedPaymentTwo = await updatePaymentEventByIdUseCase.execute(
      event.id,
      payment2.id,
      { status: false },
    );

    expect(updatedPaymentOne.status).not.toEqual(true);
    expect(updatedPaymentTwo.status).not.toEqual(true);
    expect(updatedPaymentOne.status).toEqual(false);
    expect(updatedPaymentTwo.status).toEqual(false);
  });

  it('should not be able update payment by event not found!', () => {
    expect(() => {
      return updatePaymentEventByIdUseCase.execute(
        'event-id-not-found',
        'payment-id',
        { status: false },
      );
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });

  it('should not be able update payment not found', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.VOLLEYBALL,
      dayMonthly: '12',
      valueMonthly: 500,
    });

    expect(() => {
      return updatePaymentEventByIdUseCase.execute(
        event.id,
        'payment-id-not-found',
        { status: false },
      );
    }).rejects.toEqual(new NotFoundException('Payment not found!'));
  });
});

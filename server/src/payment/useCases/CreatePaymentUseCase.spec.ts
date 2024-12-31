import { BadRequestException, NotFoundException } from '@nestjs/common';
import { add, format } from 'date-fns';

import { TypeEvent } from '@/event/enums/typeEvent.enums';

import { EventRepositoryInMemory } from '../../../test/repositories/EventRepositoryInMemory';
import { PaymentRepositoryInMemory } from '../../../test/repositories/PaymentRepositoryInMemory';
import { CreatePaymentUseCase } from './CreatePaymentUseCase';

let eventRespositoryInMemory: EventRepositoryInMemory;
let paymentRepositoryInMemory: PaymentRepositoryInMemory;
let createPaymentUseCase: CreatePaymentUseCase;

describe('Create Payment', () => {
  beforeEach(() => {
    eventRespositoryInMemory = new EventRepositoryInMemory();
    paymentRepositoryInMemory = new PaymentRepositoryInMemory();
    createPaymentUseCase = new CreatePaymentUseCase(
      paymentRepositoryInMemory,
      eventRespositoryInMemory,
    );
  });

  it('should be able create a new monthly payment on time', async () => {
    const paymentRef = '2024-10';

    const namePayment = `Pagamento referente ao mês: 10`;

    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.SOCCER,
      dayMonthly: '06',
      valueMonthly: 500,
    });

    const payment = await createPaymentUseCase.execute({
      value: event.valueMonthly,
      datePayment: '2024-10-06',
      eventId: event.id,
      paymentRef,
    });

    expect(payment).toHaveProperty('paymentRef');
    expect(payment.paymentRef).toEqual(paymentRef);
    expect(payment.name).toEqual(namePayment);
  });

  it('should be able create a late monthly payment', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.SOCCER,
      dayMonthly: '20',
      valueMonthly: 500,
    });

    const paymentRef = '2024-09';
    const datePayment = '2024-10-01';

    const payment = await createPaymentUseCase.execute({
      datePayment: datePayment,
      eventId: event.id,
      paymentRef,
      value: 500,
    });

    expect(payment.paymentRef).toEqual(paymentRef);
    expect(format(payment.datePayment, 'yyyy-MM-dd')).toEqual(datePayment);
  });

  it('should not be able create payment with date invalid', () => {
    expect(async () => {
      return createPaymentUseCase.execute({
        datePayment: '2024-15-10',
        eventId: 'event-id',
        paymentRef: format(new Date(), 'yyyy-MM'),
        value: 500,
      });
    }).rejects.toEqual(new BadRequestException('Date for payment is invalid!'));
  });

  it('should not be able create payment with future date', () => {
    const dateFuture = add(new Date(), { days: 4 });

    expect(async () => {
      return createPaymentUseCase.execute({
        datePayment: format(dateFuture, 'yyyy-MM-dd'),
        eventId: 'event-id',
        paymentRef: format(new Date(), 'yyyy-MM'),
        value: 500,
      });
    }).rejects.toEqual(
      new BadRequestException('The payment date cannot be a future date'),
    );
  });

  it('should not be able create payment event not found', () => {
    expect(async () => {
      return createPaymentUseCase.execute({
        datePayment: format(new Date(), 'yyyy-MM-dd'),
        eventId: 'event-id-not-found',
        paymentRef: format(new Date(), 'yyyy-MM'),
        value: 500,
      });
    }).rejects.toEqual(new NotFoundException('Event not found!'));
  });

  it('should not be able create payment event not found', async () => {
    const event = await eventRespositoryInMemory.create({
      name: 'Event Test',
      description: 'Event Test',
      responsibleId: 'responsible-id',
      type: TypeEvent.SOCCER,
      dayMonthly: '20',
      valueMonthly: 500,
    });

    const paymentRef = format(new Date(), 'yyyy-MM');

    await createPaymentUseCase.execute({
      datePayment: format(new Date(), 'yyyy-MM-dd'),
      eventId: event.id,
      value: 500,
      paymentRef,
    });

    expect(async () => {
      return createPaymentUseCase.execute({
        datePayment: format(new Date(), 'yyyy-MM-dd'),
        eventId: event.id,
        paymentRef,
        value: 500,
      });
    }).rejects.toEqual(
      new BadRequestException(`Payment of ${paymentRef} already exists!`),
    );
  });
});

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

  //   it('should be able create a late monthly payment', async () => {
  //     const event = await eventRespositoryInMemory.create({
  //       name: 'Event Test',
  //       description: 'Event Test',
  //       responsibleId: 'responsible-id',
  //       type: TypeEvent.SOCCER,
  //       dayMonthly: '20',
  //       valueMonthly: 500,
  //     });

  //     const paymentDate = '2024-10-01';

  //     const payment = await createPaymentUseCase.execute({
  //       value: event.valueMonthly,
  //       datePayment: paymentDate,
  //       eventId: event.id,
  //     });

  //     // Para pagamentos atrasados o dia do pagamento vai com o valor do dia de vencimento do evento por padrão
  //     expect(format(payment.datePayment, 'yyyy-MM-dd')).toContain(
  //       `2024-09-${event.dayMonthly}`,
  //     );
  //   });
});

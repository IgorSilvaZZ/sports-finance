import { Payments as PaymentsPrisma, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { parseISO } from 'date-fns';

import { CreatePaymentDTO } from '@/payment/dtos/CreatePaymentDTO';
import { PaymentRepository } from '@/payment/repositories/PaymentRepository';

export class PaymentRepositoryInMemory implements PaymentRepository {
  public payments: PaymentsPrisma[] = [];

  async findByPaymentRef(valueRef: string): Promise<PaymentsPrisma | null> {
    const payment = this.payments.find(
      (item) => item.status && item.paymentRef === valueRef,
    );

    return payment;
  }

  async findByEventId(eventId: string): Promise<PaymentsPrisma[]> {
    const payments = this.payments.filter((item) => item.eventId === eventId);

    return payments;
  }

  async create({
    name,
    datePayment,
    eventId,
    value,
    status,
    paymentRef,
  }: CreatePaymentDTO): Promise<PaymentsPrisma> {
    const newPayment = {
      id: randomUUID(),
      name,
      datePayment: parseISO(datePayment),
      value: new Prisma.Decimal(value),
      eventId,
      paymentRef,
      status: status ?? true,
      createDate: parseISO(datePayment) ?? new Date(),
      updateDate: new Date(),
    };

    this.payments.push(newPayment);

    return newPayment;
  }
}

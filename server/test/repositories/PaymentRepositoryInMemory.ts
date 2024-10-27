import { Payments as PaymentsPrisma, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { parseISO } from 'date-fns';

import { CreatePaymentDTO } from '@/payment/dtos/CreatePaymentDTO';
import { PaymentRepository } from '@/payment/repositories/PaymentRepository';
import { UpdatePaymentDTO } from '@/payment/dtos/UpdatePaymentDTO';

export class PaymentRepositoryInMemory implements PaymentRepository {
  public payments: PaymentsPrisma[] = [];

  async findPaymentByEvent(
    paymentId: string,
    eventId: string,
  ): Promise<PaymentsPrisma | null> {
    const payment = this.payments.find(
      (item) => item.id === paymentId && item.eventId === eventId,
    );

    return payment;
  }

  async findByPaymentRefEvent(
    eventId: string,
    valueRef: string,
  ): Promise<PaymentsPrisma | null> {
    const payment = this.payments.find(
      (item) =>
        item.status && item.eventId === eventId && item.paymentRef === valueRef,
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

  async updateById(
    paymentId: string,
    data: UpdatePaymentDTO,
  ): Promise<PaymentsPrisma | null> {
    const paymentIndex = this.payments.findIndex(
      (item) => item.id === paymentId,
    );

    if (paymentIndex >= 0) {
      const currentPayment = this.payments[paymentIndex];

      if (data.status !== undefined) {
        currentPayment.status = data.status;
      }

      this.payments[paymentIndex] = currentPayment;

      return currentPayment;
    }

    return null;
  }

  async deleteById(id: string): Promise<void> {
    const eventIndex = this.payments.findIndex((item) => item.id === id);

    if (eventIndex >= 0) {
      this.payments.splice(eventIndex, 1);
    }
  }
}

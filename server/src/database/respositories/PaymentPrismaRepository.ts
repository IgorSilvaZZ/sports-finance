import { Injectable } from '@nestjs/common';
import { Payments, Prisma } from '@prisma/client';

import { CreatePaymentDTO } from '@/payment/dtos/CreatePaymentDTO';

import { PaymentRepository } from '@/payment/repositories/PaymentRepository';

import { DatabaseService } from '../database.service';
import { parseISO } from 'date-fns';

@Injectable()
export class PaymentPrismaRepository implements PaymentRepository {
  constructor(private prismaService: DatabaseService) {}

  async findByPaymentRef(valueRef: string): Promise<Payments | null> {
    const payment = this.prismaService.payments.findFirst({
      where: {
        paymentRef: valueRef,
      },
    });

    return payment;
  }

  async create({
    name,
    datePayment,
    eventId,
    paymentRef,
    value,
    status,
  }: CreatePaymentDTO): Promise<Payments> {
    const paymentData = {
      name,
      datePayment: parseISO(datePayment),
      eventId,
      paymentRef,
      value: new Prisma.Decimal(value),
      status,
    };

    const payment = await this.prismaService.payments.create({
      data: paymentData,
    });

    return payment;
  }
}

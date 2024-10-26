import { Injectable } from '@nestjs/common';
import { Payments, Prisma } from '@prisma/client';
import { parseISO } from 'date-fns';

import { CreatePaymentDTO } from '@/payment/dtos/CreatePaymentDTO';
import { UpdatePaymentDTO } from '@/payment/dtos/UpdatePaymentDTO';

import { PaymentRepository } from '@/payment/repositories/PaymentRepository';

import { DatabaseService } from '../database.service';

@Injectable()
export class PaymentPrismaRepository implements PaymentRepository {
  constructor(private prismaService: DatabaseService) {}

  async findPaymentByEvent(
    paymentId: string,
    eventId: string,
  ): Promise<Payments | null> {
    const payment = await this.prismaService.payments.findFirst({
      where: {
        id: paymentId,
        eventId,
      },
    });

    return payment;
  }

  async findByPaymentRef(valueRef: string): Promise<Payments | null> {
    const payment = this.prismaService.payments.findFirst({
      where: {
        paymentRef: valueRef,
      },
    });

    return payment;
  }

  async findByEventId(eventId: string): Promise<Payments[]> {
    const payments = await this.prismaService.payments.findMany({
      where: {
        eventId,
      },
    });

    return payments;
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

  async updateById(
    paymentId: string,
    data: UpdatePaymentDTO,
  ): Promise<Payments | null> {
    const updatePayment = await this.prismaService.payments.update({
      where: {
        id: paymentId,
      },
      data,
    });

    return updatePayment;
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.payments.delete({
      where: {
        id,
      },
    });
  }
}

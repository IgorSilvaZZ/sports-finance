import { Payments as PaymentsPrisma } from '@prisma/client';

import { CreatePaymentDTO } from '../dtos/CreatePaymentDTO';
import { UpdatePaymentDTO } from '../dtos/UpdatePaymentDTO';

export abstract class PaymentRepository {
  abstract findPaymentByEvent(
    paymentId: string,
    eventId: string,
  ): Promise<PaymentsPrisma | null>;
  abstract create(data: CreatePaymentDTO): Promise<PaymentsPrisma>;
  abstract findByPaymentRefEvent(
    eventId: string,
    valueRef: string,
  ): Promise<PaymentsPrisma | null>;
  abstract findByEventId(eventId: string): Promise<PaymentsPrisma[]>;
  abstract updateById(
    paymentId: string,
    data: UpdatePaymentDTO,
  ): Promise<PaymentsPrisma | null>;
  abstract deleteById(id: string): Promise<void>;
}

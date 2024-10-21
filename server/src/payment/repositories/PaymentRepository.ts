import { Payments as PaymentsPrisma } from '@prisma/client';

import { CreatePaymentDTO } from '../dtos/CreatePaymentDTO';

export abstract class PaymentRepository {
  abstract create(data: CreatePaymentDTO): Promise<PaymentsPrisma>;
  abstract findByMonthAndYear(valueRef: string): Promise<PaymentsPrisma | null>;
}

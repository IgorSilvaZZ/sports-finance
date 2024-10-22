import { Payments as PaymentsPrisma } from '@prisma/client';

import { CreatePaymentDTO } from '../dtos/CreatePaymentDTO';

export abstract class PaymentRepository {
  abstract create(data: CreatePaymentDTO): Promise<PaymentsPrisma>;
  abstract findByPaymentRef(valueRef: string): Promise<PaymentsPrisma | null>;
}

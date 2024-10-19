import { Participant as ParticipantPrisma } from '@prisma/client';

import { CreatePaymentDTO } from '../dtos/CreatePaymentDTO';

export abstract class PaymentRepository {
  abstract create(data: CreatePaymentDTO): Promise<ParticipantPrisma>;
  abstract findByMonthAndYear(
    month: number,
    year: string,
  ): Promise<ParticipantPrisma | null>;
}

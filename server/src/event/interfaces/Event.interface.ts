import {
  Event as EventPrisma,
  Participant as ParticipantPrisma,
  Payments as PaymentsPrisma,
} from '@prisma/client';

export interface EventWithoutPaymentsOutput extends EventPrisma {
  participantsCount: number;
  participants: ParticipantPrisma[];
}

export interface EventWithPaymentsOutput extends EventPrisma {
  participants: ParticipantPrisma[];
  payments: PaymentsPrisma[];
  participantsCount: number;
  participantsActiveCount: number;
  participantsAggregateCount: number;
  participantsMonthlyCount: number;
  paymentsCount: number;
}

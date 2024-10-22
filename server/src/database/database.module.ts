import { Module } from '@nestjs/common';

import { ParticipantRepository } from '@/participant/repositories/ParticipantRepository';
import { ParticipantPrismaRepository } from './respositories/ParticipantPrismaRepository';

import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';
import { ResponsiblePrismaRepository } from './respositories/ResponsiblePrismaRepository';

import { EventRepository } from '@/event/repositories/EventRepository';
import { EventPrismaRepository } from './respositories/EventPrismaRepository';

import { CategoryRepository } from '@/category/repositories/CategoryRepository';
import { CategoryPrismaRepository } from './respositories/CategoryPrismaRepository';

import { HistoryRepository } from '@/history/repositories/HistoryRepository';
import { HistoryPrismaRepository } from './respositories/HistoryPrismaRepository';

import { PaymentRepository } from '@/payment/repositories/PaymentRepository';
import { PaymentPrismaRepository } from './respositories/PaymentPrismaRepository';

import { DatabaseService } from './database.service';

@Module({
  providers: [
    DatabaseService,
    {
      provide: ResponsibleRepository,
      useClass: ResponsiblePrismaRepository,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryPrismaRepository,
    },
    {
      provide: ParticipantRepository,
      useClass: ParticipantPrismaRepository,
    },
    {
      provide: EventRepository,
      useClass: EventPrismaRepository,
    },
    {
      provide: HistoryRepository,
      useClass: HistoryPrismaRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PaymentPrismaRepository,
    },
  ],
  exports: [
    ResponsibleRepository,
    CategoryRepository,
    ParticipantRepository,
    EventRepository,
    HistoryRepository,
    PaymentRepository,
  ],
})
export class DatabaseModule {}

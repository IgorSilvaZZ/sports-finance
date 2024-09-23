import { Module } from '@nestjs/common';

import { ParticipantRepository } from '@/participant/repositories/ParticipantRepository';
import { ParticipantPrismaRepository } from './respositories/ParticipantPrismaRepository';

import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';
import { ResponsiblePrismaRepository } from './respositories/ResponsiblePrismaRepository';

import { EventRepository } from '@/event/repositories/EventRepository';
import { EventPrismaRepository } from './respositories/EventPrismaRepository';

import { CategoryRepository } from '@/category/repositories/CategoryRepository';
import { CategoryPrismaRepository } from './respositories/CategoryPrismaRepository';

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
  ],
  exports: [
    ResponsibleRepository,
    CategoryRepository,
    ParticipantRepository,
    EventRepository,
  ],
})
export class DatabaseModule {}

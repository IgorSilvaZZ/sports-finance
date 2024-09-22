import { Module } from '@nestjs/common';

import { ParticipantRepository } from '@/participant/repositories/ParticipantRepository';
import { ParticipantPrismaRepository } from './respositories/ParticipantPrismaRepository';

import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';
import { ResponsiblePrismaRepository } from './respositories/ResponsiblePrismaRepository';

import { EventRepository } from '@/event/repositories/EventRepository';
import { EventPrismaRepository } from './respositories/EventPrismaRepository';

import { DatabaseService } from './database.service';

@Module({
  providers: [
    DatabaseService,
    {
      provide: ResponsibleRepository,
      useClass: ResponsiblePrismaRepository,
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
  exports: [ResponsibleRepository, ParticipantRepository, EventRepository],
})
export class DatabaseModule {}

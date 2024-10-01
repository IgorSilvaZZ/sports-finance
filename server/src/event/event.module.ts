import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { EventController } from './event.controller';

import { CreateEventUseCase } from './useCases/CreateEventUseCase';
import { ListEventsByResponsibleIdUseCase } from './useCases/ListEventsByResponsibleIdUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [CreateEventUseCase, ListEventsByResponsibleIdUseCase],
})
export class EventModule {}

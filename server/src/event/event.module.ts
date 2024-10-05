import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { EventController } from './event.controller';

import { CreateEventUseCase } from './useCases/CreateEventUseCase';
import { ListEventsByResponsibleIdUseCase } from './useCases/ListEventsByResponsibleIdUseCase';
import { ListEventByIdUseCase } from './useCases/ListEventByIdUseCase';
import { DeleteEventResponsibleByIdUseCase } from './useCases/DeleteEventResponsibleByIdUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [
    CreateEventUseCase,
    ListEventsByResponsibleIdUseCase,
    ListEventByIdUseCase,
    DeleteEventResponsibleByIdUseCase,
  ],
})
export class EventModule {}

import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { EventController } from './event.controller';

import { CreateEventUseCase } from './useCases/CreateEventUseCase';
import { ListEventsByResponsibleIdUseCase } from './useCases/ListEventsByResponsibleIdUseCase';
import { DeleteEventResponsibleByIdUseCase } from './useCases/DeleteEventResponsibleByIdUseCase';
import { ListParticipantsByEventResponsibleIdUseCase } from './useCases/ListParticipantsByEventResponsibleIdUseCase';
import { FindEventByResponsibleIdUseCase } from './useCases/FindEventByResponsibleIdUseCase';
import { UpdateEventByResponsibleIdUseCase } from './useCases/UpdateEventByResponsibleIdUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [
    CreateEventUseCase,
    ListEventsByResponsibleIdUseCase,
    ListParticipantsByEventResponsibleIdUseCase,
    FindEventByResponsibleIdUseCase,
    UpdateEventByResponsibleIdUseCase,
    DeleteEventResponsibleByIdUseCase,
  ],
})
export class EventModule {}

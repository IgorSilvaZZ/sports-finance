import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { EventController } from './event.controller';
import { CreateEventUseCase } from './useCases/CreateEventUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [EventController],
  providers: [CreateEventUseCase],
})
export class EventModule {}

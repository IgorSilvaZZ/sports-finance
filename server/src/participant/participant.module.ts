import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { CreateParticipantUseCase } from './useCases/CreateParticipantUseCase';
import { UpdateParticipantUseCase } from './useCases/UpdateParticipantUseCase';

import { ParticipantController } from './participant.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ParticipantController],
  providers: [CreateParticipantUseCase, UpdateParticipantUseCase],
})
export class ParticipantModule {}

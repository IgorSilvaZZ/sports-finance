import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { ParticipantController } from './participant.controller';
import { CreateParticipantUseCase } from './useCases/CreateParticipantUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ParticipantController],
  providers: [CreateParticipantUseCase],
})
export class ParticipantModule {}

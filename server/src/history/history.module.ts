import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { HistoryController } from './history.controller';
import { CreateHistoryUseCase } from './useCases/CreateHistoryUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoryController],
  providers: [CreateHistoryUseCase],
})
export class HistoryModule {}

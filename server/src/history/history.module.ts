import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { HistoryController } from './history.controller';
import { CreateHistoryUseCase } from './useCases/CreateHistoryUseCase';
import { ListHistoryByFiltersUseCase } from './useCases/ListHistoryByFiltersUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoryController],
  providers: [CreateHistoryUseCase, ListHistoryByFiltersUseCase],
})
export class HistoryModule {}

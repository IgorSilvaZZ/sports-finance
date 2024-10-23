import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { CreateHistoryUseCase } from './useCases/CreateHistoryUseCase';
import { ListHistoryByFiltersUseCase } from './useCases/ListHistoryByFiltersUseCase';
import { UpdateHistoryByEventIdUseCase } from './useCases/UpdateHistoryByEventIdUseCase';

import { HistoryController } from './history.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [HistoryController],
  providers: [
    CreateHistoryUseCase,
    ListHistoryByFiltersUseCase,
    UpdateHistoryByEventIdUseCase,
  ],
})
export class HistoryModule {}

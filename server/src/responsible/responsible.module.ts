import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { ResponsibleController } from './responsible.controller';
import { CreateResponsibleUseCase } from './useCases/CreateResponsibleUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [ResponsibleController],
  providers: [CreateResponsibleUseCase],
})
export class ResponsibleModule {}

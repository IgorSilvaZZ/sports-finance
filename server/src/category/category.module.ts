import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { CategoryController } from './category.controller';
import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CreateCategoryUseCase],
})
export class CategoryModule {}

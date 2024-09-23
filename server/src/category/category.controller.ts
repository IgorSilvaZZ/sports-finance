import { Body, Controller, Post } from '@nestjs/common';

import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase';
import { CreateCategoryDTO } from './dtos/CreateCategoryDTO';

@Controller('/categories')
export class CategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  @Post('/')
  async create(@Body() createCategoryDTO: CreateCategoryDTO) {
    const category =
      await this.createCategoryUseCase.execute(createCategoryDTO);

    return category;
  }
}

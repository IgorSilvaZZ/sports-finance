import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guards';

import { CreateCategoryUseCase } from './useCases/CreateCategoryUseCase';
import { CreateCategoryDTO } from './dtos/CreateCategoryDTO';

@Controller('/categories')
export class CategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async create(
    @Request() request,
    @Body() createCategoryDTO: CreateCategoryDTO,
  ) {
    const category = await this.createCategoryUseCase.execute({
      ...createCategoryDTO,
      responsibleId: String(request.responsibleId),
    });

    return category;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCategoryDTO } from '../dtos/CreateCategoryDTO';

import { ResponsibleRepository } from '@/responsible/repositories/ResponsibleRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private responsibleRepository: ResponsibleRepository,
  ) {}

  async execute({ name, description, responsibleId }: CreateCategoryDTO) {
    const responsibleAlreadyExists =
      await this.responsibleRepository.findById(responsibleId);

    if (!responsibleAlreadyExists) {
      throw new NotFoundException('Responsible not found!');
    }

    const category = await this.categoryRepository.create({
      name,
      description,
      responsibleId,
    });

    return category;
  }
}

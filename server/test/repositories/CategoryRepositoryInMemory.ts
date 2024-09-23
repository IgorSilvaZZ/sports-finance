import { Category } from '@prisma/client';

import { CreateCategoryDTO } from '@/category/dtos/CreateCategoryDTO';
import { CategoryRepository } from '@/category/repositories/CategoryRepository';
import { randomUUID } from 'crypto';

export class CategoryRepositoryInMemory implements CategoryRepository {
  public categories: Category[] = [];

  async create({
    name,
    description,
    responsibleId,
  }: CreateCategoryDTO): Promise<Category> {
    const newCategoryData = {
      id: randomUUID(),
      name,
      description,
      responsibleId,
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.categories.push(newCategoryData);

    return newCategoryData;
  }
}

import { Category as CategoryPrisma } from '@prisma/client';
import { randomUUID } from 'crypto';

import { CreateCategoryDTO } from '@/category/dtos/CreateCategoryDTO';
import { CategoryRepository } from '@/category/repositories/CategoryRepository';

export class CategoryRepositoryInMemory implements CategoryRepository {
  public categories: CategoryPrisma[] = [];

  async create({
    name,
    description,
    participantId,
  }: CreateCategoryDTO): Promise<CategoryPrisma> {
    const categoryData = {
      id: randomUUID(),
      name,
      description,
      participantId,
      createDate: new Date(),
      updateDate: new Date(),
    };

    this.categories.push(categoryData);

    return categoryData;
  }
}

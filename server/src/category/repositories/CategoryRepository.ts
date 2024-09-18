import { Category as CategoryPrisma } from '@prisma/client';

import { CreateCategoryDTO } from '@/category/dtos/CreateCategoryDTO';

export abstract class CategoryRepository {
  abstract create(data: CreateCategoryDTO): Promise<CategoryPrisma>;
  abstract updateParticipantById(
    categoryName: string,
    participantId: string,
  ): Promise<CategoryPrisma | null>;
}

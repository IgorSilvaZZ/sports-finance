import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { CreateCategoryDTO } from '@/category/dtos/CreateCategoryDTO';

import { CategoryRepository } from '@/category/repositories/CategoryRepository';

import { DatabaseService } from '../database.service';

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private prismaService: DatabaseService) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = await this.prismaService.category.create({
      data,
    });

    return category;
  }
}

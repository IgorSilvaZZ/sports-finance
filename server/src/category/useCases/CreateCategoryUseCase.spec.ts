import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker/.';

import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoryRepositoryInMemomy: CategoryRepositoryInMemory;
let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create Category', () => {
  beforeEach(() => {
    categoryRepositoryInMemomy = new CategoryRepositoryInMemory();
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemomy,
      responsibleRepositoryInMemory,
    );
  });

  it('should be able responsible create a category', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const newCategory = await createCategoryUseCase.execute({
      name: 'New Category',
      description: 'Category created',
      responsibleId: responsible.id,
    });

    expect(newCategory.responsibleId).toEqual(responsible.id);
    expect(categoryRepositoryInMemomy.categories).toHaveLength(1);
  });

  it('should be able responsible create multiples categories', async () => {
    const responsible = await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      password: '123',
    });

    const [newCategoryOne, newCategoryTwo] = await Promise.all([
      await createCategoryUseCase.execute({
        name: 'New Category',
        description: 'Category created',
        responsibleId: responsible.id,
      }),
      await createCategoryUseCase.execute({
        name: 'New Category 2',
        description: 'Category created 2',
        responsibleId: responsible.id,
      }),
    ]);

    expect(newCategoryOne.responsibleId).toEqual(responsible.id);
    expect(newCategoryTwo.responsibleId).toEqual(responsible.id);
  });

  it('should not be able create category responsible not exists', () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: 'New Category',
        description: 'Category created',
        responsibleId: 'responsibleId-not-found',
      });
    }).rejects.toEqual(new NotFoundException('Responsible not found!'));
  });
});

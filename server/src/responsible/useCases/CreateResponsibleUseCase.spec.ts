import { faker } from '@faker-js/faker/.';
import { BadRequestException } from '@nestjs/common';

import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { CreateResponsibleDTO } from '../dtos/CreateResponsibleDTO';
import { CreateResponsibleUseCase } from './CreateResponsibleUseCase';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let createResponsibleUseCase: CreateResponsibleUseCase;

describe('Create Responsible', () => {
  beforeEach(() => {
    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    createResponsibleUseCase = new CreateResponsibleUseCase(
      responsibleRepositoryInMemory,
    );
  });

  it('should be able create a new responsible', async () => {
    const name = faker.person.fullName();
    const email = faker.internet.email();

    const newResponsibleData: CreateResponsibleDTO = {
      name,
      email,
      password: '1234',
      phoneNumber: faker.phone.number(),
    };

    const responsible =
      await createResponsibleUseCase.execute(newResponsibleData);

    expect(responsible.name).toEqual(name);
    expect(responsible.email).toEqual(email);
    expect(responsibleRepositoryInMemory.responsibles).toHaveLength(1);
  });

  it('should not be able create responsible already exists email', async () => {
    const email = faker.internet.email();

    await createResponsibleUseCase.execute({
      name: faker.person.fullName(),
      email,
      password: '123',
      phoneNumber: faker.phone.number(),
    });

    expect(async () => {
      await createResponsibleUseCase.execute({
        name: faker.person.fullName(),
        email,
        password: '5678',
        phoneNumber: faker.phone.number(),
      });
    }).rejects.toEqual(new BadRequestException('Responsible already exists!'));
  });
});

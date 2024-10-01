import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { faker } from '@faker-js/faker/.';

import { ResponsibleRepositoryInMemory } from '../../../test/repositories/ResponsibleRepositoryInMemory';
import { CategoryRepositoryInMemory } from '../../../test/repositories/CategoryRepositoryInMemory';
import { AuthenticationResponsibleUseCase } from './AuthenticationResponsibleUseCase';
import { JWT } from '../constants/auth.constant';

let responsibleRepositoryInMemory: ResponsibleRepositoryInMemory;
let categoryRespositoryInMemory: CategoryRepositoryInMemory;
let authenticationResponsibleUseCase: AuthenticationResponsibleUseCase;

let jwtService: JwtService;

describe('Authentication reponsible', () => {
  beforeEach(() => {
    jwtService = new JwtService(JWT.options);

    responsibleRepositoryInMemory = new ResponsibleRepositoryInMemory();
    categoryRespositoryInMemory = new CategoryRepositoryInMemory();
    authenticationResponsibleUseCase = new AuthenticationResponsibleUseCase(
      responsibleRepositoryInMemory,
      categoryRespositoryInMemory,
      jwtService,
    );
  });

  it('should be able authenticate a responsible', async () => {
    const email = faker.internet.email();
    const password = '123';

    await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email,
      password: await hash(password, 10),
    });

    const authenticate = await authenticationResponsibleUseCase.execute({
      email,
      password,
    });

    expect(authenticate).toBeTruthy();
    expect(authenticate).toHaveProperty('responsible');
    expect(authenticate).toHaveProperty('token');
    expect(authenticate.responsible).toHaveProperty('categories');
  });

  it('should not be able authenticate a responsible incorrect email', async () => {
    const email = faker.internet.email();
    const password = '123';

    await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email,
      password: await hash(password, 10),
    });

    expect(async () => {
      return authenticationResponsibleUseCase.execute({
        email: 'email@incorrect.com',
        password,
      });
    }).rejects.toEqual(new UnauthorizedException('Email/Password Incorrect'));
  });

  it('should not be able authenticate a responsible incorrect password', async () => {
    const email = faker.internet.email();
    const password = '123';

    await responsibleRepositoryInMemory.create({
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email,
      password: await hash(password, 10),
    });

    expect(async () => {
      return authenticationResponsibleUseCase.execute({
        email,
        password: 'password-incorrect',
      });
    }).rejects.toEqual(new UnauthorizedException('Email/Password Incorrect'));
  });
});

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { AuthenticateResponsibleDTO } from '../dtos/AuthenticateResponsibleDTO';

import { ResponsibleRepository } from '../repositories/ResponsibleRepository';
import { CategoryRepository } from '@/category/repositories/CategoryRepository';

@Injectable()
export class AuthenticationResponsibleUseCase {
  constructor(
    private responsibleRepository: ResponsibleRepository,
    private categoryResponsitory: CategoryRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: AuthenticateResponsibleDTO) {
    const responsibleAlreadyExists =
      await this.responsibleRepository.findByEmail(email);

    if (!responsibleAlreadyExists) {
      throw new UnauthorizedException('Email/Password Incorrect');
    }

    if (!(await compare(password, responsibleAlreadyExists.password))) {
      throw new UnauthorizedException('Email/Password Incorrect');
    }

    const categoriesResponsible =
      await this.categoryResponsitory.findByResponsibleId(
        responsibleAlreadyExists.id,
      );

    const token = await this.jwtService.signAsync({
      sub: responsibleAlreadyExists.id,
    });

    const responsible = {
      ...responsibleAlreadyExists,
      categories: categoriesResponsible,
    };

    return { responsible, token };
  }
}

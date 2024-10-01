import { Body, Controller, Post } from '@nestjs/common';

import { CreateResponsibleDTO } from './dtos/CreateResponsibleDTO';

import { CreateResponsibleUseCase } from './useCases/CreateResponsibleUseCase';
import { AuthenticationResponsibleUseCase } from './useCases/AuthenticationResponsibleUseCase';
import { AuthenticateResponsibleDTO } from './dtos/AuthenticateResponsibleDTO';

@Controller('/responsibles')
export class ResponsibleController {
  constructor(
    private createResponsibleUseCase: CreateResponsibleUseCase,
    private authenticationResponsibleUseCase: AuthenticationResponsibleUseCase,
  ) {}

  @Post('/')
  async create(@Body() createResponsibleDTO: CreateResponsibleDTO) {
    const responsible =
      await this.createResponsibleUseCase.execute(createResponsibleDTO);

    return responsible;
  }

  @Post('/login')
  async authenticate(@Body() { email, password }: AuthenticateResponsibleDTO) {
    const authenticate = await this.authenticationResponsibleUseCase.execute({
      email,
      password,
    });

    return authenticate;
  }
}

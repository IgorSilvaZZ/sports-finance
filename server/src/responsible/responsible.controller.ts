import { Body, Controller, Post } from '@nestjs/common';

import { CreateResponsibleUseCase } from './useCases/CreateResponsibleUseCase';
import { CreateResponsibleDTO } from './dtos/CreateResponsibleDTO';

@Controller('/responsibles')
export class ResponsibleController {
  constructor(private createResponsibleUseCase: CreateResponsibleUseCase) {}

  @Post('/')
  async create(@Body() createResponsibleDTO: CreateResponsibleDTO) {
    const responsible =
      await this.createResponsibleUseCase.execute(createResponsibleDTO);

    return responsible;
  }
}

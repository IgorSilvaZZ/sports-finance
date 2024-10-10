import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guards';

import { CreateHistoryDTO } from './dtos/CreateHistoryDTO';
import { CreateHistoryUseCase } from './useCases/CreateHistoryUseCase';

@Controller('/history')
export class HistoryController {
  constructor(private readonly createHistoryUseCase: CreateHistoryUseCase) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Body() createHistoryDTO: CreateHistoryDTO) {
    const history = await this.createHistoryUseCase.execute(createHistoryDTO);

    return history;
  }
}

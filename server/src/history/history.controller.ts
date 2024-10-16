import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guards';

import { CreateHistoryDTO } from './dtos/CreateHistoryDTO';
import { FilterHistoryDTO } from './dtos/FilterHistoryDTO';
import { ListHistoryByFiltersUseCase } from './useCases/ListHistoryByFiltersUseCase';
import { CreateHistoryUseCase } from './useCases/CreateHistoryUseCase';

@Controller('/history')
export class HistoryController {
  constructor(
    private readonly listHistoryByFiltersUseCase: ListHistoryByFiltersUseCase,
    private readonly createHistoryUseCase: CreateHistoryUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async listHistoryByFilters(@Query() queryParams: FilterHistoryDTO) {
    const histories =
      await this.listHistoryByFiltersUseCase.execute(queryParams);

    return histories;
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Body() createHistoryDTO: CreateHistoryDTO) {
    const history = await this.createHistoryUseCase.execute(createHistoryDTO);

    return history;
  }
}

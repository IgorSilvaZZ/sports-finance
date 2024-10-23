import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guards';

import { CreateHistoryDTO } from './dtos/CreateHistoryDTO';
import { FilterHistoryDTO } from './dtos/FilterHistoryDTO';
import { UpdateHistoryDTO } from './dtos/UpdateHistoryDTO';

import { ListHistoryByFiltersUseCase } from './useCases/ListHistoryByFiltersUseCase';
import { CreateHistoryUseCase } from './useCases/CreateHistoryUseCase';
import { UpdateHistoryByEventIdUseCase } from './useCases/UpdateHistoryByEventIdUseCase';

@Controller('/history')
export class HistoryController {
  constructor(
    private readonly listHistoryByFiltersUseCase: ListHistoryByFiltersUseCase,
    private readonly createHistoryUseCase: CreateHistoryUseCase,
    private readonly updateHistoryByEventIdUseCase: UpdateHistoryByEventIdUseCase,
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

  @UseGuards(AuthGuard)
  @Put('/:historyId/event/:eventId')
  async updateByEventId(
    @Param('historyId') historyId: string,
    @Param('eventId') eventId: string,
    @Body() updateHistoryDTO: UpdateHistoryDTO,
  ) {
    const historyUpdated = await this.updateHistoryByEventIdUseCase.execute(
      historyId,
      eventId,
      updateHistoryDTO,
    );

    return historyUpdated;
  }
}

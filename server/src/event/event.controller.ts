import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateEventDTO } from './dtos/CreateEventDTO';
import { CreateEventUseCase } from './useCases/CreateEventUseCase';
import { ListEventsByResponsibleIdUseCase } from './useCases/ListEventsByResponsibleIdUseCase';

@Controller('/events')
export class EventController {
  constructor(
    private createEventUseCase: CreateEventUseCase,
    private listEventsByResponsibleIdUseCase: ListEventsByResponsibleIdUseCase,
  ) {}

  @Get('/responsible/:responsibleId')
  async getEventsByResponsible(@Param('responsibleId') responsibleId: string) {
    const events =
      await this.listEventsByResponsibleIdUseCase.execute(responsibleId);

    return events;
  }

  @Post('/')
  async create(@Body() createEventDTO: CreateEventDTO) {
    const event = await this.createEventUseCase.execute(createEventDTO);

    return event;
  }
}

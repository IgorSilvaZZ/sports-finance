import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateEventDTO } from './dtos/CreateEventDTO';

import { CreateEventUseCase } from './useCases/CreateEventUseCase';
import { ListEventsByResponsibleIdUseCase } from './useCases/ListEventsByResponsibleIdUseCase';
import { ListEventByIdUseCase } from './useCases/ListEventByIdUseCase';

@Controller('/events')
export class EventController {
  constructor(
    private createEventUseCase: CreateEventUseCase,
    private listEventsByResponsibleIdUseCase: ListEventsByResponsibleIdUseCase,
    private listEventByIdUseCase: ListEventByIdUseCase,
  ) {}

  @Get('/:eventId')
  async getById(@Param('eventId') eventId: string) {
    const event = await this.listEventByIdUseCase.execute(eventId);

    return event;
  }

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

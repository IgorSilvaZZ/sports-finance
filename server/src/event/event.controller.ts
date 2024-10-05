import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateEventDTO } from './dtos/CreateEventDTO';

import { AuthGuard } from '@/guards/auth.guards';

import { CreateEventUseCase } from './useCases/CreateEventUseCase';
import { ListEventsByResponsibleIdUseCase } from './useCases/ListEventsByResponsibleIdUseCase';
import { ListEventByIdUseCase } from './useCases/ListEventByIdUseCase';
import { DeleteEventResponsibleByIdUseCase } from './useCases/DeleteEventResponsibleByIdUseCase';

@Controller('/events')
export class EventController {
  constructor(
    private createEventUseCase: CreateEventUseCase,
    private listEventsByResponsibleIdUseCase: ListEventsByResponsibleIdUseCase,
    private listEventByIdUseCase: ListEventByIdUseCase,
    private deleteEventResponsibleByIdUseCase: DeleteEventResponsibleByIdUseCase,
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

  @UseGuards(AuthGuard)
  @Delete('/:eventId/responsible/:responsibleId')
  async deleteEventResponsible(
    @Param('eventId') eventId: string,
    @Param('responsibleId') responsibleId: string,
  ) {
    await this.deleteEventResponsibleByIdUseCase.execute(
      eventId,
      responsibleId,
    );
  }
}

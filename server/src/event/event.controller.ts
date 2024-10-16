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
import { DeleteEventResponsibleByIdUseCase } from './useCases/DeleteEventResponsibleByIdUseCase';
import { ListParticipantsByEventResponsibleIdUseCase } from './useCases/ListParticipantsByEventResponsibleIdUseCase';
import { FindEventByResponsibleIdUseCase } from './useCases/FindEventByResponsibleIdUseCase';

@Controller('/events')
export class EventController {
  constructor(
    private createEventUseCase: CreateEventUseCase,
    private listEventsByResponsibleIdUseCase: ListEventsByResponsibleIdUseCase,
    private listParticipantsByEventResponsibleIdUseCase: ListParticipantsByEventResponsibleIdUseCase,
    private findEventByResponsibleIdUseCase: FindEventByResponsibleIdUseCase,
    private deleteEventResponsibleByIdUseCase: DeleteEventResponsibleByIdUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/:eventId/responsible/:responsibleId')
  async getEventByResponsible(
    @Param('eventId') eventId: string,
    @Param('responsibleId') responsibleId: string,
  ) {
    const event = await this.findEventByResponsibleIdUseCase.execute(
      eventId,
      responsibleId,
    );

    return event;
  }

  @UseGuards(AuthGuard)
  @Get('/responsible/:responsibleId')
  async getEventsByResponsible(@Param('responsibleId') responsibleId: string) {
    const events =
      await this.listEventsByResponsibleIdUseCase.execute(responsibleId);

    return events;
  }

  @UseGuards(AuthGuard)
  @Get('/:eventId/responsible/:responsibleId/participants')
  async getParticipantsEventByResponsible(
    @Param('eventId') eventId: string,
    @Param('responsibleId') responsibleId: string,
  ) {
    const participants =
      await this.listParticipantsByEventResponsibleIdUseCase.execute(
        eventId,
        responsibleId,
      );

    return participants;
  }

  @UseGuards(AuthGuard)
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

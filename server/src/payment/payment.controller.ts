import { AuthGuard } from '@/guards/auth.guards';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreatePaymentDTO } from './dtos/CreatePaymentDTO';

import { ListPaymentsByEventIdUseCase } from './useCases/ListPaymentsByEventIdUseCase';
import { CreatePaymentUseCase } from './useCases/CreatePaymentUseCase';

@Controller('payments')
export class PaymentController {
  constructor(
    private listPaymentsByEventIdUseCase: ListPaymentsByEventIdUseCase,
    private createPaymentUseCase: CreatePaymentUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/event/:eventId')
  async findByEventId(@Param('eventId') eventId: string) {
    const payments = await this.listPaymentsByEventIdUseCase.execute(eventId);

    return payments;
  }

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Body() createPaymentDTO: CreatePaymentDTO) {
    const payment = await this.createPaymentUseCase.execute(createPaymentDTO);

    return payment;
  }
}

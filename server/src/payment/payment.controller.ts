import { AuthGuard } from '@/guards/auth.guards';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreatePaymentDTO } from './dtos/CreatePaymentDTO';

import { ListPaymentsByEventIdUseCase } from './useCases/ListPaymentsByEventIdUseCase';
import { CreatePaymentUseCase } from './useCases/CreatePaymentUseCase';
import { UpdatePaymentEventByIdUseCase } from './useCases/UpdatePaymentEventByIdUseCase';
import { UpdatePaymentDTO } from './dtos/UpdatePaymentDTO';

@Controller('payments')
export class PaymentController {
  constructor(
    private listPaymentsByEventIdUseCase: ListPaymentsByEventIdUseCase,
    private createPaymentUseCase: CreatePaymentUseCase,
    private updatePaymentEventByIdUseCase: UpdatePaymentEventByIdUseCase,
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

  @UseGuards(AuthGuard)
  @Put('/:paymentId/event/:eventId')
  async updatePaymentByEvent(
    @Param('paymentId') paymentId: string,
    @Param('eventId') eventId: string,
    @Body() updatePaymentDTO: UpdatePaymentDTO,
  ) {
    const updatePayment = await this.updatePaymentEventByIdUseCase.execute(
      eventId,
      paymentId,
      updatePaymentDTO,
    );

    return updatePayment;
  }
}

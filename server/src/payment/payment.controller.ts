import { AuthGuard } from '@/guards/auth.guards';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { CreatePaymentDTO } from './dtos/CreatePaymentDTO';
import { UpdatePaymentDTO } from './dtos/UpdatePaymentDTO';

import { ListPaymentsByEventIdUseCase } from './useCases/ListPaymentsByEventIdUseCase';
import { CreatePaymentUseCase } from './useCases/CreatePaymentUseCase';
import { UpdatePaymentEventByIdUseCase } from './useCases/UpdatePaymentEventByIdUseCase';
import { DeletePaymentEventByIdUseCase } from './useCases/DeletePaymentEventByIdUseCase';

@Controller('payments')
export class PaymentController {
  constructor(
    private listPaymentsByEventIdUseCase: ListPaymentsByEventIdUseCase,
    private createPaymentUseCase: CreatePaymentUseCase,
    private updatePaymentEventByIdUseCase: UpdatePaymentEventByIdUseCase,
    private deletePaymentEventByIdUseCase: DeletePaymentEventByIdUseCase,
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

  @UseGuards(AuthGuard)
  @Delete('/:paymentId/event/:eventId')
  async deletePaymentByEvent(
    @Param('paymentId') paymentId: string,
    @Param('eventId') eventId: string,
  ) {
    await this.deletePaymentEventByIdUseCase.execute(paymentId, eventId);
  }
}

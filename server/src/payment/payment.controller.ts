import { AuthGuard } from '@/guards/auth.guards';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreatePaymentDTO } from './dtos/CreatePaymentDTO';

import { CreatePaymentUseCase } from './useCases/CreatePaymentUseCase';

@Controller('payments')
export class PaymentController {
  constructor(private createPaymentUseCase: CreatePaymentUseCase) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Body() createPaymentDTO: CreatePaymentDTO) {
    const payment = await this.createPaymentUseCase.execute(createPaymentDTO);

    return payment;
  }
}

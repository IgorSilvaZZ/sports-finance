import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { PaymentController } from './payment.controller';

import { CreatePaymentUseCase } from './useCases/CreatePaymentUseCase';
import { ListPaymentsByEventIdUseCase } from './useCases/ListPaymentsByEventIdUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [CreatePaymentUseCase, ListPaymentsByEventIdUseCase],
})
export class PaymentModule {}

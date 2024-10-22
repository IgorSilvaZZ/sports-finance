import { Module } from '@nestjs/common';

import { DatabaseModule } from '@/database/database.module';

import { PaymentController } from './payment.controller';
import { CreatePaymentUseCase } from './useCases/CreatePaymentUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentController],
  providers: [CreatePaymentUseCase],
})
export class PaymentModule {}

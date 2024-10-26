import { Injectable, NotFoundException } from '@nestjs/common';

import { PaymentRepository } from '../repositories/PaymentRepository';

@Injectable()
export class DeletePaymentEventByIdUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(paymentId: string, eventId: string) {
    const paymentByEvent = await this.paymentRepository.findPaymentByEvent(
      paymentId,
      eventId,
    );

    if (!paymentByEvent) {
      throw new NotFoundException('Payment not found!');
    }

    await this.paymentRepository.deleteById(paymentId);
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isAfter, isValid, parseISO, startOfDay } from 'date-fns';

import { CreatePaymentDTO } from '../dtos/CreatePaymentDTO';

import { PaymentRepository } from '../repositories/PaymentRepository';
import { EventRepository } from '@/event/repositories/EventRepository';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private eventRepository: EventRepository,
  ) {}

  async execute({
    name,
    eventId,
    value,
    status,
    paymentRef,
    datePayment,
  }: CreatePaymentDTO) {
    let namePayment = name;
    const statusPayment = status ?? true;

    const currentDate = startOfDay(new Date());
    const datePaymentToDate = parseISO(datePayment);

    if (!isValid(datePaymentToDate)) {
      throw new BadRequestException('Date for payment is invalid!');
    }

    if (isAfter(startOfDay(datePaymentToDate), currentDate)) {
      throw new BadRequestException('The payment date cannot be a future date');
    }

    if (!namePayment) {
      const [, monthRef] = paymentRef.split('-');

      namePayment = `Pagamento referente ao mês: ${monthRef}`;
    }

    const event = await this.eventRepository.findById(eventId);

    if (!event) {
      throw new NotFoundException('Event not found!');
    }

    // Verificando se existe um pagamento no mesmo mes do ano
    const paymentExists = await this.paymentRepository.findByPaymentRefEvent(
      eventId,
      paymentRef,
    );

    if (paymentExists) {
      throw new BadRequestException(`Payment of ${paymentRef} already exists!`);
    }

    const newPayment = {
      name: namePayment,
      eventId,
      value,
      datePayment,
      paymentRef,
      status: statusPayment,
    };

    const payment = await this.paymentRepository.create(newPayment);

    return payment;
  }
}

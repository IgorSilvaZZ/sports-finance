import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ParticipantModule } from './participant/participant.module';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { HistoryModule } from './history/history.module';
import { PaymentModule } from './payment/payment.module';
import { ResponsibleModule } from './responsible/responsible.module';

@Module({
  imports: [
    DatabaseModule,
    ParticipantModule,
    CategoryModule,
    EventModule,
    HistoryModule,
    PaymentModule,
    ResponsibleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

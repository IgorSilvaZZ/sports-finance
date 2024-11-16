import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';
import { join } from 'path';

import { DatabaseModule } from './database/database.module';
import { ParticipantModule } from './participant/participant.module';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { HistoryModule } from './history/history.module';
import { PaymentModule } from './payment/payment.module';
import { ResponsibleModule } from './responsible/responsible.module';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
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
export class AppModule {
  constructor() {
    console.log(join(__dirname, 'i18n'));
  }
}

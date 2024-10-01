import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JWT } from './constants/auth.constant';

import { DatabaseModule } from '@/database/database.module';

import { ResponsibleController } from './responsible.controller';

import { CreateResponsibleUseCase } from './useCases/CreateResponsibleUseCase';
import { AuthenticationResponsibleUseCase } from './useCases/AuthenticationResponsibleUseCase';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: JWT.options.global,
      secret: JWT.options.secret,
      signOptions: { expiresIn: JWT.options.signOptions.expiresIn },
    }),
  ],
  controllers: [ResponsibleController],
  providers: [CreateResponsibleUseCase, AuthenticationResponsibleUseCase],
})
export class ResponsibleModule {}

import { Module } from '@nestjs/common';
import { ReusableController } from './reusable.controller';

@Module({
  controllers: [ReusableController]
})
export class ReusableModule {}

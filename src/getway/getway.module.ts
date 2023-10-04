import { Module } from '@nestjs/common';
import { MyGetway } from './getway';

@Module({
  providers: [MyGetway],
})
export class GetwayModule {}

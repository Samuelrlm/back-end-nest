import { Module } from '@nestjs/common';
import { SoketClient } from './soket.client';

@Module({
  providers: [SoketClient],
})
export class SoketModule {}

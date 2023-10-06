import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [MyGateway],
})
export class GetwayModule {}

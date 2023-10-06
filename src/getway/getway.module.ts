import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { SessionUserSchema } from 'src/schemas/session.user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'SessionUser', schema: SessionUserSchema },
    ]),
  ],
  providers: [MyGateway],
})
export class GetwayModule {}
